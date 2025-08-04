import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getCity(
  req: FastifyRequest<{ Params: {cityId: number} }>,
  reply: FastifyReply
) {
  const cityId = req.params.cityId;
  const city = await prisma.city.findUnique({ where: { id: cityId } });
  if (city) {
    reply.send(city);
  } else {
    reply.status(404).send({ message: "City not found" });
  }
}

export async function getAllCities(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const cities = await prisma.city.findMany();
  if (cities.length > 0) {
    reply.send(cities);
  } else {
    reply.status(404).send({ message: "Cities not found" });
  }
}

export async function createCity(
  req: FastifyRequest<{ Body: { name: string } }>,
  reply: FastifyReply
) {
  const { name } = req.body;
  const newCity = await prisma.city.create({ data: { name } });
  reply.status(201).send({ message: "City created successfully", city: newCity });
}

export async function updateCity(
  req: FastifyRequest<{ Params: { cityId: number}; Body: { name: string } }>,
  reply: FastifyReply
) {
  const cityId = req.params.cityId;
  const { name } = req.body;
  const city = await prisma.city.findUnique({ where: { id: cityId } });
  if (city) {
    await prisma.city.update({ where: { id: cityId }, data: { name } });
    reply.send({ message: "City updated successfully" });
  } else {
    reply.status(404).send({ message: "City not found" });
  }
}

export async function deleteCity(
  req: FastifyRequest<{ Params: { cityId: number } }>,
  reply: FastifyReply
) {
  const cityId = req.params.cityId;
  const city = await prisma.city.findUnique({ where: { id: cityId } });
  if (city) {
    await prisma.city.delete({ where: { id: cityId } });
    reply.send({ message: "City deleted successfully" });
  } else {
    reply.status(404).send({ message: "City not found" });
  }
}
