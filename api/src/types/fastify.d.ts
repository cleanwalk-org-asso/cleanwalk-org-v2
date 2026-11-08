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
    authenticateUserOrAdmin: any;
    authorizeUser: any;
    requireAdmin: any;
    verifyAdmin: (req: FastifyRequest) => Promise<boolean>;
    getUserId: (req: FastifyRequest, reply: FastifyReply) => Promise<string>;
  }
}
