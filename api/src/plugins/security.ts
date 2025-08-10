import fp from "fastify-plugin";
import jwt from "@fastify/jwt";
import cookie from "@fastify/cookie";
import { FastifyInstance } from "fastify";
import { FastifyRequest } from "fastify/types/request";
import { FastifyReply } from "fastify/types/reply";

export default fp(async (fastify: FastifyInstance) => {
  fastify.register(cookie);

  fastify.register(jwt, {
    secret: process.env.JWT_SECRET!,
    cookie: {
      cookieName: "access_token",
      signed: false,
    },
  });

  fastify.decorate(
    "authenticate",
    async function (req: FastifyRequest, reply: FastifyReply) {
      try {
        await req.jwtVerify();
      } catch (err) {
        reply.code(401).send({ error: "Unauthorized" });
      }
    },
  );

  fastify.decorate(
    "authorizeUser",
    async function (req: FastifyRequest, reply: FastifyReply) {
      try {
        // Vérifier que l'utilisateur est authentifié
        if (!req.user) {
          return reply.code(401).send({ error: "Authentication required" });
        }

        const { id } = req.params as { id: string };
        const userId = req.user.id;
        const userRole = req.user.role;

        // Admin peut accéder à toutes les ressources
        if (userRole === "ADMIN") {
          return;
        }

        // Utilisateur normal ne peut accéder qu'à ses propres données
        if (userId.toString() !== id) {
          return reply.code(403).send({ 
            error: "Forbidden: You can only access your own resources" 
          });
        }
      } catch (err) {
        reply.code(500).send({ error: "Authorization check failed" });
      }
    },
  );

  fastify.decorate(
    "requireAdmin",
    async function (req: FastifyRequest, reply: FastifyReply) {
      try {
        // Vérifier que l'utilisateur est authentifié
        if (!req.user) {
          return reply.code(401).send({ error: "Authentication required" });
        }

        const userRole = req.user.role;

        // Vérifier si l'utilisateur est admin
        if (userRole !== "ADMIN") {
          return reply.code(403).send({ 
            error: "Forbidden: Admin access required" 
          });
        }
      } catch (err) {
        reply.code(500).send({ error: "Admin check failed" });
      }
    },
  );

  fastify.decorate(
    "getUserId",
    async function (req: FastifyRequest, reply: FastifyReply): Promise<string> {
      try {
        if (!req.user) {
          try {
            await req.jwtVerify();
          } catch (err) {
            return "";
          }
        }
        const id = req.user?.id;
        return id ? id.toString() : "";
      } catch (err) {
        return "";
      }
    }
  );

  
});


