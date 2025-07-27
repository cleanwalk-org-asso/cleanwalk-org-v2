import fastify from "fastify";
import prismaPlugin from "./plugins/prisma";
import userRoutes from "./routes/user.route";
import cors from "@fastify/cors";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import jwtPlugin from "./plugins/jwt";
import authRoutes from "./routes/auth.route";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

const server = fastify().withTypeProvider<TypeBoxTypeProvider>();

server.register(cors, {
  origin: true,
});
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

//routes
server.register(userRoutes);
server.register(authRoutes);

server.get("/ping", async (request, reply) => {
  return "pong\n";
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
