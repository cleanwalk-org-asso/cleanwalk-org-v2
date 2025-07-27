import { FastifyRequest, FastifyReply } from "fastify";
import { CreateUserInput } from "../schemas/user.schema";
import { Prisma } from "@prisma/client";

// GET /users
export async function getAllUsers(req: FastifyRequest, reply: FastifyReply) {
  const users = await req.server.prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      profilePicture: true,
    },
  });

  reply.send(users);
}

// GET /users/:id
export async function getUserById(
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  const user = await req.server.prisma.user.findUnique({
    where: { id: Number(req.params.id) },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      profilePicture: true,
    },
  });

  if (!user)
    return reply.code(404).send({ message: "Utilisateur introuvable" });
  reply.send(user);
}
