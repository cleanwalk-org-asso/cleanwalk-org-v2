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

  // Route prep pour stocker le rôle dans un cookie avant le login Google
export default async function authRoutes(app: FastifyInstance) {

   app.get("/login/google/role/:role", async (req, reply) => {
    const allowedRoles = ["USER", "ASSOCIATION"];
    const role = allowedRoles.includes((req.params as any).role) ? (req.params as any).role : "USER";
    reply.setCookie("desired_role", role, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 600,
    });
    return reply.redirect("/auth/google");
  });
 
  app.get("/login/google/callback", googleOAuthCallback);
  app.post(
    "/register",
    {
      schema: {
        body: CreateUserSchema,
      },
      config: {
        rateLimit: {
          max: 5,
          timeWindow: '1 minute',
        },
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
      config: {
        rateLimit: {
          max: 10,
          timeWindow: '1 minute',
        },
      },
    },
    loginUser,
  );

  app.post("/logout", logoutUser);


  app.post("/refresh", refreshTokenHandler);

  app.get("/me", getCurrentUser);

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
