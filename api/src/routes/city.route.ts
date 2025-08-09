import { FastifyInstance } from "fastify";
import { Type } from "@sinclair/typebox";
import { getCity, getAllCities, createCity, updateCity, deleteCity } from "../controllers/city.controller.js";
import { CitySchema, CreateCitySchema, UpdateCitySchema } from "../schemas/city.schema.js";

export default async function cityRoutes(fastify: FastifyInstance) {
  fastify.get("/:cityId", {
    schema: {
      params: Type.Object({ cityId: Type.Integer() }),
      response: { 200: CitySchema, 404: Type.Object({ message: Type.String() }) },
    },
    handler: getCity,
  });

  fastify.get("", {
    schema: {
      response: { 200: Type.Array(CitySchema), 404: Type.Object({ message: Type.String() }) },
    },
    handler: getAllCities,
  });

  fastify.post("", {
    schema: {
      body: CreateCitySchema,
      response: { 201: Type.Object({ message: Type.String(), city: CitySchema }) },
    },
    handler: createCity,
  });

  fastify.put("/:cityId", {
    schema: {
      params: Type.Object({ cityId: Type.Integer() }),
      body: UpdateCitySchema,
      response: { 200: Type.Object({ message: Type.String() }), 404: Type.Object({ message: Type.String() }) },
    },
    handler: updateCity,
  });

  fastify.delete("/:cityId", {
    schema: {
      params: Type.Object({ cityId: Type.Integer() }),
      response: { 200: Type.Object({ message: Type.String() }), 404: Type.Object({ message: Type.String() }) },
    },
    handler: deleteCity,
  });
}
