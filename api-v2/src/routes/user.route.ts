import { FastifyInstance } from "fastify";
import { getAllUsers, getUserById } from "../controllers/user.controller.js";
import { Type } from "@sinclair/typebox";

export default async function userRoutes(app: FastifyInstance) {
  app.get("", getAllUsers);

  app.get("/:id", getUserById);
}
