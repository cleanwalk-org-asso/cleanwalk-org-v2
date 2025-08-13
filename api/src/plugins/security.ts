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
    namespace: "user",
  });

  fastify.register(jwt, {
    secret: process.env.JWT_SECRET!,
    cookie: {
      cookieName: "admin_token",
      signed: false,
    },
    namespace: "admin",
  });

  fastify.decorate(
    "authenticate",
    async function (req: FastifyRequest, reply: FastifyReply) {
      try {
        await req.userJwtVerify();
      } catch (err) {
        reply.code(401).send({ error: "Unauthorized" });
      }
    },
  );

  fastify.decorate(
  "authorizeUser",
  async function (req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };

    try {
      await req.adminJwtVerify();
      return;
    } catch (_) {
    }

    try {
      await req.userJwtVerify();
    } catch (_) {
      return reply.code(401).send({ error: "Unauthorized" });
    }

    const userId = String(req.user?.id ?? "");
    if (userId !== String(id)) {
      return reply.code(403).send({ error: "Forbidden: You can only access your own resources" });
    }
  },
);


  fastify.decorate(
    "requireAdmin",
    async function (req: FastifyRequest, reply: FastifyReply) {
      try {
        await req.adminJwtVerify();
      } catch (err) {
        reply.code(401).send({ error: "Unauthorized" });
      }
    },
  );

  fastify.decorate(
    "getUserId",
    async function (req: FastifyRequest, reply: FastifyReply): Promise<string> {
      try {
        if (!req.user) {
          try {
            await req.userJwtVerify();
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


