import { FastifyInstance } from "fastify";
import websocket from "@fastify/websocket";
import { CleanwalkChatController } from "../controllers/cleanwalkChat.controller.js";

export async function cleanwalkChatRoutes(fastify: FastifyInstance) {
  // 📡 On instancie le contrôleur avec accès à fastify
  const controller = new CleanwalkChatController(fastify);

  // 🔌 On enregistre le support WebSocket (version GitHub ou future v6)
  await fastify.register(websocket);

  // 🧠 Une route = une room (par ID)
  fastify.get("/ws/cleanwalk/:id", { websocket: true }, (connection, req) => {
    controller.handleConnection(connection, req as any);
  });
}
