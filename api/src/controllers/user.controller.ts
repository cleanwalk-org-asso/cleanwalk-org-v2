import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateUserInput, UserParams } from "../schemas/user.schema.js";

// GET /users
export async function getAllUsers(req: FastifyRequest, reply: FastifyReply) {
  try {
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
