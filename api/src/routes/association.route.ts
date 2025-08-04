import { FastifyInstance } from "fastify";
import {
  updateAssociation,
  getAllAssociations,
  getAssociationById,
} from "../controllers/association.controller.js";
import { UpdateAssociationSchema } from "../schemas/association.schema.js";

export default async function userRoutes(app: FastifyInstance) {
  app.get("", getAllAssociations);

  app.get("/:id", getAssociationById);

  app.put("/:id", updateAssociation);
}
