import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserInput } from "../schemas/user.schema";
import { Prisma } from "@prisma/client";

export async function getAllUsers(req: FastifyRequest, reply: FastifyReply) {
  const users = await req.server.prisma.user.findMany();
  reply.send(users);
}

export async function createUser(
  req: FastifyRequest<{ Body: CreateUserInput }>,
  reply: FastifyReply,
) {
  const { name, email, password, role } = req.body;

  const userData: Prisma.UserCreateInput = {
    name,
    email,
    password,
    role: role ?? "USER",
  };

  const newUser = await req.server.prisma.user.create({ data: userData });

  reply.code(201).send(newUser);
}
