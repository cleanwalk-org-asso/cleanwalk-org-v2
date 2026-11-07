import { FastifyInstance } from "fastify";
import { getAdmin, loginAdmin, logoutUser } from "../controllers/admin.controller.js";
import { LoginSchema } from "../schemas/auth.schema.js";
import { Type } from "@sinclair/typebox";
import { createProfanityWord, deleteProfanityWord, getProfanityWords } from "../controllers/profanityWord.controller.js";
import {
  CreateProfanityWordSchema,
  ProfanityWordParamsSchema,
  ProfanityWordSchema,
} from "../schemas/profanityWord.schema.js";

const MessageSchema = Type.Object({ message: Type.String() });

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

  // Mots et expressions du filtre du chat. Chaque modification recharge le filtre aussitôt.
  app.get("/profanity-words", {
    preHandler: [app.requireAdmin],
    schema: { response: { 200: Type.Array(ProfanityWordSchema) } },
    handler: getProfanityWords,
  });

  app.post("/profanity-words", {
    preHandler: [app.requireAdmin],
    schema: {
      body: CreateProfanityWordSchema,
      response: {
        201: Type.Object({ message: Type.String(), word: ProfanityWordSchema }),
        400: MessageSchema,
        409: MessageSchema,
      },
    },
    handler: createProfanityWord,
  });

  app.delete("/profanity-words/:id", {
    preHandler: [app.requireAdmin],
    schema: { params: ProfanityWordParamsSchema, response: { 200: MessageSchema, 404: MessageSchema } },
    handler: deleteProfanityWord,
  });
}
