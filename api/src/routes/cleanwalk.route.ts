import { FastifyInstance } from "fastify";
import { Type } from "@sinclair/typebox";
import {
  getCleanwalkById,
  getAllCleanwalks,
  checkUserParticipation,
  createCleanwalk,
  joinCleanwalk,
  updateCleanwalk,
  deleteCleanwalk,
  leaveCleanwalk
} from "../controllers/cleanwalk.controller.js";
import {
  CleanwalkSchema,
  CreateCleanwalkSchema,
  SoloCleanwalkSchema,
  UpdateCleanwalkSchema
} from "../schemas/cleanwalk.schema.js";

export default async function cleanwalkRoutes(fastify: FastifyInstance) {
  fastify.get("/:cleanwalkId", {
    preHandler: [fastify.getUserId],
    schema: {
      params: Type.Object({ cleanwalkId: Type.Integer() }),
      querystring: Type.Object({ user_id: Type.Optional(Type.Integer()) }),
      response: { 200: SoloCleanwalkSchema, 404: Type.Object({ message: Type.String() }) },
    },
    handler: getCleanwalkById,
  });

  fastify.get("", {
    schema: {
      response: { 200: Type.Array(CleanwalkSchema) },
    },
    handler: getAllCleanwalks,
  });

  fastify.get("/check_user_participation", {
    schema: {
      querystring: Type.Object({ user_id: Type.Integer(), cleanwalk_id: Type.Integer() }),
      response: { 200: Type.Object({ is_participant: Type.Boolean(), is_host: Type.Optional(Type.Boolean()), nb_person: Type.Optional(Type.Integer()) }), 400: Type.Object({ message: Type.String() }) },
    },
    handler: checkUserParticipation,
  });

  fastify.post("", {
    schema: {
      body: CreateCleanwalkSchema,
      response: { 201: Type.Object({ message: Type.String() }) },
    },
    handler: createCleanwalk,
  });

  fastify.post("/join", {
    schema: {
      body: Type.Object({ cleanwalk_id: Type.Integer(), user_id: Type.Integer(), nb_person: Type.Integer() }),
      response: { 201: Type.Object({ message: Type.String() }) },
    },
    handler: joinCleanwalk,
  });

  fastify.put("/:cleanwalkId", {
    schema: {
      params: Type.Object({ cleanwalkId: Type.Integer() }),
      body: UpdateCleanwalkSchema,
      response: { 200: Type.Object({ message: Type.String() }), 404: Type.Object({ message: Type.String() }) },
    },
    handler: updateCleanwalk,
  });

  fastify.delete("/:cleanwalkId", {
    schema: {
      params: Type.Object({ cleanwalkId: Type.Integer() }),
      response: { 200: Type.Object({ message: Type.String() }), 404: Type.Object({ message: Type.String() }) },
    },
    handler: deleteCleanwalk,
  });

  fastify.delete("/leave", {
    schema: {
      body: Type.Object({ cleanwalk_id: Type.Integer(), user_id: Type.Integer() }),
      response: { 200: Type.Object({ message: Type.String() }), 404: Type.Object({ message: Type.String() }) },
    },
    handler: leaveCleanwalk,
  });
}
