import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { CreateUserInput, LoginInput } from "../schemas/auth.schema";
import { randomUUID } from "crypto";
import { addMinutes } from "date-fns";

const prisma = new PrismaClient();

export async function registerUser(
  req: FastifyRequest<{ Body: CreateUserInput }>,
  reply: FastifyReply,
) {
  const { name, email, password, role, profilePicture } = req.body;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return reply.status(400).send({ message: "Email already registered" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
      profilePicture,
    },
  });

  return reply
    .code(201)
    .send({ id: user.id, email: user.email, name: user.name });
}

export async function loginUser(
  req: FastifyRequest<{ Body: LoginInput }>,
  reply: FastifyReply,
) {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return reply.status(401).send({ message: "Invalid credentials" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password ?? "");
  if (!isPasswordValid) {
    return reply.status(401).send({ message: "Invalid credentials" });
  }

  // Génère le JWT (valide 1h)
  const token = await reply.jwtSign(
    { id: user.id, role: user.role },
    { expiresIn: "1h" },
  );

  // Génère le refresh token UUID (valide 7j)
  const refreshToken = randomUUID();
  const refreshExpires = addMinutes(new Date(), 60 * 24 * 7);

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt: refreshExpires,
    },
  });

  // Set cookie access_token (JWT)
  reply.setCookie("access_token", token, {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60, // 1h
  });

  // Set cookie refresh_token
  reply.setCookie("refresh_token", refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 7 jours
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
    maxAge: 60 * 60 * 24 * 7, // 7 jours
  });

  return reply.send({ token: jwt });
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
