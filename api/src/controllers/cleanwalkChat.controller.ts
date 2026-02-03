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
    const cleanwalkIdNum = Number(cleanwalkId);

    let room = this.rooms.get(cleanwalkId);
    if (!room) {
      room = { clients: new Set() };
      this.rooms.set(cleanwalkId, room);
    }

    room.clients.add(socket);
    this.fastify.log.info(`🟢 Client connecté à la Cleanwalk ${cleanwalkId}`);

    if (!Number.isNaN(cleanwalkIdNum)) {
      (async () => {
        try {
          const history = await this.fastify.prisma.cleanwalkChatMessage.findMany({
            where: { cleanwalkId: cleanwalkIdNum },
            orderBy: { createdAt: "asc" },
            take: 50,
          });

          socket.send(
            JSON.stringify({
              type: "history",
              messages: history.map((msg) => ({
                user: msg.user,
                text: msg.text,
                avatar: msg.avatar ?? undefined,
                date: msg.createdAt.toISOString(),
              })),
            })
          );
        } catch (err) {
          this.fastify.log.error("⚠️ Erreur lors de la récupération de l'historique :", err as any);
        }
      })();
    }

    socket.on("message", async (raw) => {
      try {
        const rawText = raw.toString();
        if (!rawText.trim().startsWith("{")) {
          return;
        }

        const msg = JSON.parse(rawText) as ChatMessage;
        if (!msg.user || !msg.text) {
          return;
        }
        this.fastify.log.info(`💬 [${cleanwalkId}] ${msg.user}: ${msg.text}`);

        let savedDate = new Date();
        if (!Number.isNaN(cleanwalkIdNum)) {
          const saved = await this.fastify.prisma.cleanwalkChatMessage.create({
            data: {
              cleanwalkId: cleanwalkIdNum,
              user: msg.user,
              text: msg.text,
              avatar: msg.avatar,
            },
          });
          savedDate = saved.createdAt;
        }

        for (const client of room!.clients) {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ ...msg, date: savedDate.toISOString() }));
          }
        }
      } catch {
        return;
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
 