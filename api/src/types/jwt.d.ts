import "@fastify/jwt";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: {
      id: number;
      role: string;
      email?: string;
      purpose?: string;
      // Ajoute d'autres champs si besoin
    };
    user: {
      id: number;
      role: string;
      email?: string;
      purpose?: string;
    };
  }
}
