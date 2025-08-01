import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";
import { UpdateAssociationInput } from "../schemas/association.schema";

const prisma = new PrismaClient();

export async function getAssociationById(
  req: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply,
) {
  const user = await req.server.prisma.user.findFirst({
    where: {
      id: Number(req.params.id),
      role: "ASSOCIATION",
    },
    include: {
      organization: true,
    },
  });

  if (!user)
    return reply.code(404).send({ message: "Association introuvable" });

  // On mappe pour exclure le mot de passe et aplatir l'organisation
  const result = {
    id: user.id,
    name: user.name,
    email: user.email,
    profilePicture: user.profilePicture,
    role: user.role,
    createdAt: user.createdAt,
    description: user.organization?.description,
    webSite: user.organization?.webSite,
    socialMedias: user.organization?.socialMedias,
    bannerImg: user.organization?.bannerImg,
    lastEvent: user.organization?.lastEvent,
  };

  reply.send(result);
}

export async function getAllAssociations(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const associations = await req.server.prisma.user.findMany({
    where: {
      role: "ASSOCIATION",
      organization: { is: {} },
    },
    include: {
      organization: true,
    },
  });

  const result = associations.map((a) => ({
    id: a.id,
    name: a.name,
    email: a.email,
    profilePicture: a.profilePicture,
    role: a.role,
    createdAt: a.createdAt,
    description: a.organization?.description,
    webSite: a.organization?.webSite,
    socialMedias: a.organization?.socialMedias,
    bannerImg: a.organization?.bannerImg,
    lastEvent: a.organization?.lastEvent,
  }));

  reply.send(result);
}

export async function updateAssociation(
  req: FastifyRequest<{ Params: { id: string }; Body: UpdateAssociationInput }>,
  reply: FastifyReply,
) {
  const userId = Number(req.params.id);
  const body = req.body;
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user)
    return reply.code(404).send({ message: "Utilisateur introuvable" });

  const org = await prisma.organization.findUnique({ where: { userId } });
  if (!org) return reply.code(404).send({ message: "Association non trouvée" });

  try {
    await prisma.organization.update({
      where: { userId },
      data: {
        description: body.description,
        webSite: body.webSite,
        socialMedias: body.socialMedias,
        bannerImg: body.bannerImg,
      },
    });

    await prisma.user.update({
      where: { id: userId },
      data: {
        profilePicture: body.profile_picture,
      },
    });

    return reply.send({ message: "Association mise à jour avec succès" });
  } catch (err) {
    return reply.code(500).send({
      message: "Erreur serveur",
      error: (err as Error).message,
    });
  }
}
