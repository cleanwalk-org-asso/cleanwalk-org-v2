import 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    config: {
      isProduction: boolean;
      FRONTEND_URL: string;
      SMTP_SECURE: boolean;
    };
  }
}