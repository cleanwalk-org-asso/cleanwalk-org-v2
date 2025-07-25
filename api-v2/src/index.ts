import fastify from "fastify";
import prismaPlugin from "./plugins/prisma";
import userRoutes from "./routes/user.route";
import cors from "@fastify/cors";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import {
  ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";

const server = fastify().withTypeProvider<ZodTypeProvider>();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

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
server.register(userRoutes);

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
