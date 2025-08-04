import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { CreateUserInput, LoginInput } from "../schemas/auth.schema.js";
import { randomUUID } from "crypto";
import { addMinutes } from "date-fns";

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
