import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { LoginInput } from "../schemas/auth.schema.js";

const ADMIN_TOKEN_MAX_AGE = 60 * 30; // 1 heure en secondes

const prisma = new PrismaClient();

export async function loginAdmin(
  req: FastifyRequest<{ Body: LoginInput }>,
  reply: FastifyReply,
) {

  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || user.role !== "ADMIN") {
    return reply.status(401).send({ message: "Unauthorized" });
  }

  if (!user || !(await bcrypt.compare(password, user.password ?? ""))) {
    return reply.status(401).send({ message: "Invalid credentials" });
  }

  const adminToken = await reply.adminJwtSign(
    { id: user.id, role: user.role },
    { expiresIn: "30m" },
  );

  reply.setCookie("admin_token", adminToken, {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: ADMIN_TOKEN_MAX_AGE,
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

export async function logoutUser(req: FastifyRequest, reply: FastifyReply) {
  const refreshToken = req.cookies?.refresh_token;
  if (refreshToken) {
    await prisma.refreshToken.deleteMany({ where: { token: refreshToken } });
  }
  reply.clearCookie("admin_token", {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  return reply.code(204).send();
}

export async function getAdmin(req: FastifyRequest, reply: FastifyReply) {
  try {
    const decoded = (await req.adminJwtVerify()) as { id: number; role: string };

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

