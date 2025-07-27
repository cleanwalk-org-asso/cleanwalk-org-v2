import { FastifyInstance } from "fastify";
import {
  updateAssociation,
  getAllAssociations,
  getAssociationById,
} from "../controllers/association.controller";
import { Type } from "@sinclair/typebox";
import { UpdateAssociationSchema } from "../schemas/association.schema";

export default async function userRoutes(app: FastifyInstance) {
  app.get("/association", getAllAssociations);

  app.get("/association/:id", getAssociationById);

  app.put("/association/:id", updateAssociation);
}
