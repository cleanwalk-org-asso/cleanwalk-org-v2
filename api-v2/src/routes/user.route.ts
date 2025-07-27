import { FastifyInstance } from "fastify";
import { getAllUsers, getUserById } from "../controllers/user.controller";
import { Type } from "@sinclair/typebox";

export default async function userRoutes(app: FastifyInstance) {
  app.get("/users", getAllUsers);

  app.get("/users/:id", getUserById);
}
