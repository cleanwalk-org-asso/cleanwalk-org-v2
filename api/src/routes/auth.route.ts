import { FastifyInstance } from "fastify";
import {
  registerUser,
  loginUser,
  getCurrentUser,
  refreshTokenHandler,
  logoutUser,
} from "../controllers/auth.controller.js";
import { CreateUserSchema, LoginSchema } from "../schemas/auth.schema.js";

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

  app.post("/logout", logoutUser);


  app.post("/refresh", refreshTokenHandler);

  app.get("/me", { preHandler: app.authenticate }, getCurrentUser);
}
