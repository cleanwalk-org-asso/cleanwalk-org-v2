import "fastify";

export interface AuthenticatedUser {
  id: number;
  email: string;
  role: 'USER' | 'ADMIN' | 'ASSOCIATION';
}

declare module "fastify" {
  interface FastifyRequest {
    user?: AuthenticatedUser;
  }
  
  interface FastifyInstance {
    authenticate: any;
    authorizeUser: any;
    requireAdmin: any;
    getUserId: (req: FastifyRequest, reply: FastifyReply) => Promise<string>;
  }
}
