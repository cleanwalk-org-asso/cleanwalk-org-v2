import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateUserInput, UserParams } from "../schemas/user.schema.js";

// GET /users
export async function getAllUsers(req: FastifyRequest, reply: FastifyReply) {
  try {
    const users = await req.server.prisma.user.findMany({
      where: {
        email: { not: null },
      },
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
  } catch (error) {
    req.log.error(error);
    reply.code(500).send({ message: "Erreur serveur" });
  }
}

// GET /users/:id
export async function getUserById(
  req: FastifyRequest<{ Params: UserParams }>,
  reply: FastifyReply,
) {
  try {
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

    if (!user) {
      return reply.code(404).send({ message: "Utilisateur introuvable" });
    }
    
    reply.send(user);
  } catch (error) {
    req.log.error(error);
    reply.code(500).send({ message: "Erreur serveur" });
  }
}

export async function updateUser(
  req: FastifyRequest<{
    Params: UserParams;
    Body: UpdateUserInput;
  }>,
  reply: FastifyReply,
) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Vérifier si l'utilisateur existe avant de le mettre à jour
    const existingUser = await req.server.prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!existingUser) {
      return reply.code(404).send({ message: "Utilisateur introuvable" });
    }

    const user = await req.server.prisma.user.update({
      where: { id: Number(id) },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        profilePicture: true,
      },
    });

    reply.send(user);
  } catch (error) {
    req.log.error(error);
    reply.code(500).send({ message: "Erreur serveur" });
  }
}

export async function deleteUser(
  req: FastifyRequest<{ Params: UserParams }>,
  reply: FastifyReply,
) {
  try {
    const { id } = req.params;

    // Vérifier si l'utilisateur existe avant de le supprimer
    const existingUser = await req.server.prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!existingUser) {
      return reply.code(404).send({ message: "Utilisateur introuvable" });
    }

    if (existingUser.role === "ADMIN") {
      return reply.code(403).send({ message: "Vous ne pouvez pas supprimer un utilisateur avec le rôle ADMIN" });
    }

    if (existingUser.role === "ASSOCIATION") {
      await req.server.prisma.organization.delete({
        where: { userId: Number(id) },
      });
    }

    await req.server.prisma.user.update({
      where: { id: Number(id) },
      data: { 
        name: 'deleted_user',
        email: null,
        role: 'USER',
        profilePicture: null,
        password: null,
      },
    });

    reply.code(204).send();
  } catch (error) {
    req.log.error(error);
    reply.code(500).send({ message: "Erreur serveur" });
  }
}
