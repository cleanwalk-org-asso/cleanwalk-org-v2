import fastify from "fastify";
import prismaPlugin from "./plugins/prisma.js";
import userRoutes from "./routes/user.route.js";
import cors from "@fastify/cors";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import multipart from "@fastify/multipart";
import jwtPlugin from "./plugins/security.js";
import authRoutes from "./routes/auth.route.js";
import associationRoutes from "./routes/association.route.js";
import cityRoutes from "./routes/city.route.js";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import loggingPlugin from "./plugins/logging.js";
import cleanwalkRoutes from "./routes/cleanwalk.route.js";
import { articleRoutes } from "./routes/article.route.js";
import uploadRoutes from "./routes/upload.route.js";
import s3Plugin from "./plugins/s3.js";
import dotenv from "dotenv";
import oauthPlugin from '@fastify/oauth2';
import adminRoutes from "./routes/admin.route.js";
import fastifyRedis from '@fastify/redis';
import rateLimit from '@fastify/rate-limit'


dotenv.config();

const server = fastify({
  logger: {
    level: "debug",
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
}).withTypeProvider<TypeBoxTypeProvider>();

server.register(cors, {
  origin: true,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

server.register(multipart);
server.register(prismaPlugin);
server.register(swagger, {
  openapi: {
    info: {
      title: "API V2",
      version: "1.0.0",
    },
  },
});
server.register(swaggerUi, {
  routePrefix: "/docs",
});
server.register(jwtPlugin);
server.register(loggingPlugin);

server.register(oauthPlugin, {
  name: 'googleOAuth2',
  scope: ['email', 'profile'],
  credentials: {
    client: {
      id: process.env.GOOGLE_CLIENT_ID!,
      secret: process.env.GOOGLE_CLIENT_SECRET!
    },
    auth: oauthPlugin.GOOGLE_CONFIGURATION
  },
  // register a fastify url to start the redirect flow
  startRedirectPath: '/auth/google',
  callbackUri: process.env.CALLBACK_URL!,
})

server.decorate('config', {
  isProduction: process.env.NODE_ENV === 'production',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
  SMTP_SECURE: process.env.SMTP_SECURE === 'true',
});

// Register Redis
server.register(fastifyRedis, { url: process.env.REDIS_URL });

await server.register(rateLimit, {
  global: false,
  redis: server.redis,
  addHeaders: {
    'x-ratelimit-limit': true,
    'x-ratelimit-remaining': true,
    'x-ratelimit-reset': true,
    'retry-after': true,
  },
})

//routes
server.register(userRoutes, { prefix: '/users' });
server.register(authRoutes, { prefix: '/auth' });
server.register(associationRoutes, { prefix: '/associations' });
server.register(cityRoutes, { prefix: '/cities' });
server.register(cleanwalkRoutes, { prefix: '/cleanwalks' });
server.register(articleRoutes, { prefix: '/articles' });
server.register(uploadRoutes, { prefix: '/upload' });
server.register(adminRoutes, { prefix: '/admin' });
server.register(s3Plugin);

server.get("/ping", async (request, reply) => {
  return "pong\n";
});

server.listen({ port: 8080, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
