import { FastifyInstance } from "fastify";
import {
  registerUser,
  loginUser,
  getCurrentUser,
  refreshTokenHandler,
} from "../controllers/auth.controller";
import { CreateUserSchema, LoginSchema } from "../schemas/auth.schema";

export default async function authRoutes(app: FastifyInstance) {
  app.post(
    "/register",
    {
      schema: {
        body: CreateUserSchema,
      },
    },
    registerUser,
  );

  app.post(
    "/login",
    {
      schema: {
        body: LoginSchema,
      },
    },
    loginUser,
  );

  app.post("/refresh", refreshTokenHandler);

  app.get("/me", { preHandler: app.authenticate }, getCurrentUser);
}
