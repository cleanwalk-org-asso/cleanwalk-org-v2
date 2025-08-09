import { googleOAuthCallback } from "../controllers/auth.controller.js";
import { FastifyInstance } from "fastify";
import {
  registerUser,
  loginUser,
  getCurrentUser,
  refreshTokenHandler,
  logoutUser,
  resetPassword,
  forgetPassword,
} from "../controllers/auth.controller.js";
import { CreateUserSchema, LoginSchema, ForgotPasswordSchema, ResetPasswordSchema } from "../schemas/auth.schema.js";

export default async function authRoutes(app: FastifyInstance) {
  app.get("/login/google/callback", googleOAuthCallback);
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

  // Route pour demander la réinitialisation du mot de passe

  app.post("/forgot-password", {
    schema: {
      body: ForgotPasswordSchema,
    },
  }, forgetPassword);

  // Route pour réinitialiser le mot de passe

  app.post("/reset-password", {
    schema: {
      body: ResetPasswordSchema,
    },
  }, resetPassword);
}
