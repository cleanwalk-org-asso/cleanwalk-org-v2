// types/fastify-jwt.d.ts
import "@fastify/jwt";
import "fastify";

// 1) Ta définition de payload/user (conserve-la)
declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: {
      id: number;
      role: string;
      email?: string;
      purpose?: string;
    };
    user: {
      id: number;
      role: string;
      email?: string;
      purpose?: string;
    };
  }
}

// 2) Augmentations explicites des méthodes namespacées
declare module "fastify" {
  interface FastifyRequest {
    userJwtVerify: FastifyRequest["jwtVerify"];
    userJwtDecode: FastifyRequest["jwtDecode"];
    adminJwtVerify: FastifyRequest["jwtVerify"];
    adminJwtDecode: FastifyRequest["jwtDecode"];
  }
  interface FastifyReply {
    userJwtSign: FastifyReply["jwtSign"];
    adminJwtSign: FastifyReply["jwtSign"];
  }
}