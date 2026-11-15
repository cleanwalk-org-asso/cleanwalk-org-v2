import { FastifyReply, FastifyRequest } from "fastify";
import { Prisma } from "@prisma/client";
import { normalizeProfanityValue } from "../plugins/profanity.js";
import { CreateProfanityWordInput, TestProfanityInput } from "../schemas/profanityWord.schema.js";

const isPrismaError = (err: unknown, code: string) =>
  err instanceof Prisma.PrismaClientKnownRequestError && err.code === code;

export async function getProfanityWords(req: FastifyRequest, reply: FastifyReply) {
  const words = await req.server.prisma.profanityWord.findMany({
    orderBy: [{ kind: "asc" }, { value: "asc" }],
  });
  reply.send(words);
}

export async function createProfanityWord(
  req: FastifyRequest<{ Body: CreateProfanityWordInput }>,
  reply: FastifyReply,
) {
  const value = normalizeProfanityValue(req.body.value);
  if (!value) {
    return reply.status(400).send({ message: "Le mot est vide" });
  }

  try {
    const word = await req.server.prisma.profanityWord.create({ data: { value, kind: req.body.kind } });
    await req.server.profanity.reload();
    return reply.status(201).send({ message: "Mot ajouté", word });
  } catch (err) {
    if (isPrismaError(err, "P2002")) {
      return reply.status(409).send({ message: "Ce mot est déjà dans la liste" });
    }
    throw err;
  }
}

export async function deleteProfanityWord(
  req: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply,
) {
  try {
    await req.server.prisma.profanityWord.delete({ where: { id: req.params.id } });
    await req.server.profanity.reload();
    return reply.send({ message: "Mot retiré" });
  } catch (err) {
    if (isPrismaError(err, "P2025")) {
      return reply.status(404).send({ message: "Mot introuvable" });
    }
    throw err;
  }
}

export async function testProfanity(req: FastifyRequest<{ Body: TestProfanityInput }>, reply: FastifyReply) {
  reply.send({ censored: req.server.profanity.censor(req.body.text) });
}
