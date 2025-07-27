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
    "/auth/register",
    {
      schema: {
        body: CreateUserSchema,
      },
    },
    registerUser,
  );

  app.post(
    "/auth/login",
    {
      schema: {
        body: LoginSchema,
      },
    },
    loginUser,
  );

  app.post("/auth/refresh", refreshTokenHandler);

  app.get("/auth/me", { preHandler: app.authenticate }, getCurrentUser);
}
