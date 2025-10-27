import { FastifyInstance, FastifyRequest } from "fastify";
import { WebSocket } from "ws";

interface ChatMessage {
  user: string;
  text: string;
  avatar?: string;
  date?: string;
}

interface Room {
  clients: Set<WebSocket>;
}

export class CleanwalkChatController {
  private rooms = new Map<string, Room>();

  constructor(private readonly fastify: FastifyInstance) {}

  handleConnection(socket: WebSocket, req: FastifyRequest<{ Params: { id: string } }>) {
    const cleanwalkId = req.params.id;

    let room = this.rooms.get(cleanwalkId);
    if (!room) {
      room = { clients: new Set() };
      this.rooms.set(cleanwalkId, room);
    }

    room.clients.add(socket);
    this.fastify.log.info(`🟢 Client connecté à la Cleanwalk ${cleanwalkId}`);

    socket.on("message", (raw) => {
      try {
        const msg = JSON.parse(raw.toString()) as ChatMessage;
        this.fastify.log.info(`💬 [${cleanwalkId}] ${msg.user}: ${msg.text}`);

        for (const client of room!.clients) {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ ...msg, date: new Date().toISOString() }));
          }
        }
      } catch (err) {
        this.fastify.log.error("⚠️ Message JSON invalide :", err as any);
      }
    });

    socket.on("close", () => {
      room!.clients.delete(socket);
      this.fastify.log.info(`🔴 Client déconnecté de la Cleanwalk ${cleanwalkId}`);

      if (room!.clients.size === 0) {
        this.rooms.delete(cleanwalkId);
        this.fastify.log.info(`🧹 Room ${cleanwalkId} supprimée`);
      }
    });
  }
}
 