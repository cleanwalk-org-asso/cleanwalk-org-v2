// user.route.ts
import { FastifyInstance } from "fastify";
import { createUser, getAllUsers } from "../controllers/user.controller";
import { createUserSchema } from "../schemas/user.schema";

export default async function userRoutes(app: FastifyInstance) {
  app.get("/users", getAllUsers);

  app.post(
    "/users",
    {
      schema: {
        body: createUserSchema,
        response: {
          201: createUserSchema, // facultatif
        },
      },
    },
    createUser,
  );
}
