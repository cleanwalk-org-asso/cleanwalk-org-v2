import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { CreateUserInput, LoginInput } from "../schemas/auth.schema.js";
import { randomUUID } from "crypto";
import { addMinutes } from "date-fns";
import { generatePasswordResetEmail, sendMail } from "../utils/mailer.js";

const ACCESS_TOKEN_MAX_AGE = 60 * 60; // 1 heure en secondes
const REFRESH_TOKEN_MAX_AGE = 60 * 60 * 24 * 30; // 30 jours en secondes

const prisma = new PrismaClient();

export async function registerUser(
  req: FastifyRequest<{ Body: CreateUserInput }>,
  reply: FastifyReply,
) {
  const body = req.body;

  const existing = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (existing) {
    return reply.status(400).send({ message: "Email already registered" });
  }

  const hashedPassword = await bcrypt.hash(body.password, 10);

  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: hashedPassword,
      role: body.role,
      profilePicture: body.profilePicture,
    },
  });

  // create new association if role is ASSOCIATION
  if (user.role === "ASSOCIATION") {
    await prisma.organization.create({
      data: {
        userId: user.id,
      },
    });
  }

  return reply.code(201).send({
    id: user.id,
    email: user.email,
    name: user.name,
  });
}

export async function loginUser(
  req: FastifyRequest<{ Body: LoginInput }>,
  reply: FastifyReply,
) {

  const { email, password } = req.body;

  // Supprime l'ancien refresh token si présent
  const oldRefreshToken = req.cookies?.refresh_token;
  if (oldRefreshToken) {
    await prisma.refreshToken.deleteMany({ where: { token: oldRefreshToken } });
    reply.clearCookie("refresh_token", {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password ?? ""))) {
    return reply.status(401).send({ message: "Invalid credentials" });
  }

  const token = await reply.jwtSign(
    { id: user.id, role: user.role },
    { expiresIn: "1h" },
  );

  const refreshToken = randomUUID();
  const refreshExpires = addMinutes(new Date(), 60 * 24 * 7);

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt: refreshExpires,
    },
  });

  reply.setCookie("access_token", token, {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: ACCESS_TOKEN_MAX_AGE,
  });

  reply.setCookie("refresh_token", refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: REFRESH_TOKEN_MAX_AGE,
  });

  return reply.send({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      profilePicture: user.profilePicture,
      createdAt: user.createdAt,
    },
  });
}

export async function refreshTokenHandler(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const refreshToken = req.cookies.refresh_token;

  if (!refreshToken) {
    return reply.code(401).send({ message: "No refresh token provided" });
  }

  const existing = await prisma.refreshToken.findUnique({
    where: { token: refreshToken },
    include: { user: true },
  });

  if (!existing || existing.expiresAt < new Date()) {
    return reply
      .code(401)
      .send({ message: "Refresh token expired or invalid" });
  }

  // Rotation : supprime l’ancien token
  await prisma.refreshToken.delete({ where: { token: refreshToken } });

  // Crée un nouveau refresh token
  const newRefreshToken = randomUUID();
  const expiresAt = addMinutes(new Date(), 60 * 24 * 7); // 7 jours

  await prisma.refreshToken.create({
    data: {
      token: newRefreshToken,
      userId: existing.userId,
      expiresAt,
    },
  });

  // Crée un nouveau JWT
  const jwt = await reply.jwtSign(
    { id: existing.user.id, role: existing.user.role },
    { expiresIn: "1h" },
  );

  // Set le nouveau cookie refresh
  reply.setCookie("refresh_token", newRefreshToken, {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: REFRESH_TOKEN_MAX_AGE,
  });

  // Set le cookie access_token (JWT)
  reply.setCookie("access_token", jwt, {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: ACCESS_TOKEN_MAX_AGE,
  });

  // Optionnel : renvoyer un message ou rien
  return reply.code(204).send();
}

export async function getCurrentUser(req: FastifyRequest, reply: FastifyReply) {
  try {
    const decoded = (await req.jwtVerify()) as { id: number; role: string };

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        profilePicture: true,
        createdAt: true,
      },
    });

    if (!user) {
      return reply.code(404).send({ message: "Utilisateur non trouvé" });
    }

    return reply.send(user);
  } catch {
    return reply.code(401).send({ message: "Unauthorized" });
  }
  
}

export async function logoutUser(req: FastifyRequest, reply: FastifyReply) {
  const refreshToken = req.cookies?.refresh_token;
  if (refreshToken) {
    await prisma.refreshToken.deleteMany({ where: { token: refreshToken } });
  }
  reply.clearCookie("access_token", {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  reply.clearCookie("refresh_token", {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  return reply.code(204).send();
}

export async function forgetPassword(request: FastifyRequest, reply: FastifyReply) {
  const { email } = request.body as { email: string };

  if (!email) {
    return reply.code(400).send({ error: "L'email est obligatoire." });
  }

  const user = await request.server.prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    return reply.send({ 
      message: "Si un compte existe avec cet email, un lien de réinitialisation sera envoyé."
    });
  }

  const resetToken = await reply.jwtSign(
    { 
      id: user.id, 
      role: user.role,
      email: user.email,
      purpose: 'password-reset'
    },
    { 
      expiresIn: '1h' 
    }
  );

  // Générer et envoyer l'email
  try {
    const emailContent = generatePasswordResetEmail(email, resetToken);
    await sendMail({
      to: email,
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text
    });

    return reply.send({ 
      message: "Si un compte existe avec cet email, un lien de réinitialisation sera envoyé." 
    });
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return reply.code(500).send({ 
      error: "Une erreur est survenue lors de l'envoi de l'email."
    });
  }
}

export async function resetPassword(request: FastifyRequest, reply: FastifyReply) {
  const { token, newPassword } = request.body as { 
    token: string;
    newPassword: string;
  };

  if (!token || !newPassword) {
    return reply.code(400).send({ 
      error: "Le token et le nouveau mot de passe sont obligatoires." 
    });
  }

  try {
    // Vérifier le JWT token
    const payload = await request.server.jwt.verify(token) as { 
      id: string; 
      email: string;
      purpose: string;
    };
    
    // Vérifier si c'est bien un token de réinitialisation de mot de passe
    if (payload.purpose !== 'password-reset') {
      return reply.code(400).send({ 
        error: "Ce lien de réinitialisation est invalide." 
      });
    }
    
    // Vérifier si l'utilisateur existe
    const user = await request.server.prisma.user.findUnique({
      where: { 
        id: Number(payload.id),
        email: payload.email
      }
    });

    if (!user) {
      return reply.code(400).send({ 
        error: "Ce lien de réinitialisation est invalide ou a expiré." 
      });
    }

    // Hacher le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Mettre à jour le mot de passe
    await request.server.prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword
      }
    });

    return reply.send({ 
      message: "Votre mot de passe a été réinitialisé avec succès. Vous pouvez maintenant vous connecter avec votre nouveau mot de passe." 
    });
  } catch (error) {
    // Si le token est expiré ou invalide, JWT va lancer une erreur
    return reply.code(400).send({ 
      error: "Ce lien de réinitialisation est invalide ou a expiré." 
    });
  }
}

export async function googleOAuthCallback(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    // 1. Récupération du token Google
    const result = await new Promise<any>((resolve, reject) => {
      (request.server as any).googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(
        request,
        (err: any, tokenResult: any) => {
          if (err) return reject(err);
          resolve(tokenResult);
        }
      );
    });

    // 2. Appel à Google pour récupérer les infos utilisateur
    const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${result.token.access_token}`,
      },
    });

    if (!response.ok) {
      return reply.status(response.status).send({
        error: 'Failed to fetch user info',
      });
    }

    const userInfo = await response.json();

    // 3. Vérifie si l'utilisateur existe
    let user = await prisma.user.findUnique({ where: { email: userInfo.email } });

    // 4. Si l'utilisateur n'existe pas, on le crée
    if (!user) {
      user = await prisma.user.create({
        data: {
          name: userInfo.name,
          email: userInfo.email,
          password: null,
          profilePicture: userInfo.picture,
          role: 'USER', // ou 'BENEVOLE', à adapter selon votre modèle
        },
      });
    }

    // 5. Supprime les anciens refresh token
    const oldRefreshToken = request.cookies?.refresh_token;
    if (oldRefreshToken) {
      await prisma.refreshToken.deleteMany({ where: { token: oldRefreshToken } });
      reply.clearCookie("refresh_token", {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });
    }

    // 6. Génération du JWT
    const jwt = await reply.jwtSign(
      { id: user.id, role: user.role },
      { expiresIn: '1h' }
    );

    // 7. Création du refresh token
    const refreshToken = randomUUID();
    const refreshExpires = addMinutes(new Date(), 60 * 24 * 7); // 7 jours

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: refreshExpires,
      },
    });

    // 8. Pose des cookies
    reply.setCookie("access_token", jwt, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: ACCESS_TOKEN_MAX_AGE,
    });

    reply.setCookie("refresh_token", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: REFRESH_TOKEN_MAX_AGE,
    });

    reply.redirect((request.server as any).FRONTEND_URL);

  } catch (error: any) {
    return reply.status(500).send({
      error: 'OAuth callback failed',
      details: error.message,
    });
  }
}


