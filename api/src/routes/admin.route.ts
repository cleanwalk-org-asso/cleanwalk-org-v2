import { FastifyInstance } from "fastify";
import { getAdmin, loginAdmin, logoutUser } from "../controllers/admin.controller.js";
import { LoginSchema } from "../schemas/auth.schema.js";

  // Route prep pour stocker le rôle dans un cookie avant le login Google
export default async function authRoutes(app: FastifyInstance) {
  
  app.post(
    "/login",
    {
      schema: {
        body: LoginSchema,
      },
      config: {
        rateLimit: {
          max: 5,
          timeWindow: '1 minute',
        },
      },
    },
    loginAdmin,
  );

  app.post("/logout", logoutUser);

  app.get("/me", getAdmin);
}
