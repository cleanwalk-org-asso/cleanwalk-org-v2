import { FastifyInstance, FastifyRequest } from "fastify";
import { WebSocket } from "ws";

const MAX_MESSAGE_LENGTH = 1000;

// Ce que le serveur renvoie aux clients. Le nom et la photo viennent de la base, pas du client.
interface ChatMessagePayload {
  user: string;
  text: string;
  avatar?: string;
  date: string;
  isOrganizer: boolean;
}

interface StoredMessage {
  user: string;
  text: string;
  avatar: string | null;
  userId: number | null;
  createdAt: Date;
  author: { name: string; profilePicture: string | null; deletedAt: Date | null } | null;
}

interface Room {
  clients: Set<WebSocket>;
}

const authorSelect = { select: { name: true, profilePicture: true, deletedAt: true } } as const;

function toPayload(msg: StoredMessage, hostId: number | null, censor: (text: string) => string): ChatMessagePayload {
  // Nom et photo à jour si l'auteur existe encore, sinon ceux enregistrés avec le message.
  const author = msg.author && !msg.author.deletedAt ? msg.author : null;
  return {
    user: author?.name ?? msg.user,
    // Censuré à l'envoi et non à l'enregistrement : la base garde le texte d'origine,
    // et un changement de la liste s'applique aussi aux anciens messages.
    text: censor(msg.text),
    avatar: (author ? author.profilePicture : msg.avatar) ?? undefined,
    date: msg.createdAt.toISOString(),
    isOrganizer: msg.userId !== null && msg.userId === hostId,
  };
}

export class CleanwalkChatController {
  private rooms = new Map<string, Room>();

  constructor(private readonly fastify: FastifyInstance) {}

  handleConnection(socket: WebSocket, req: FastifyRequest<{ Params: { id: string } }>) {
    const cleanwalkId = req.params.id;
    const cleanwalkIdNum = Number(cleanwalkId);
    const prisma = this.fastify.prisma;

    let room = this.rooms.get(cleanwalkId);
    if (!room) {
      room = { clients: new Set() };
      this.rooms.set(cleanwalkId, room);
    }

    room.clients.add(socket);
    this.fastify.log.info(`🟢 Client connecté à la Cleanwalk ${cleanwalkId}`);

    // Le cookie de session n'est envoyé qu'à l'ouverture du WebSocket : l'auteur est fixé ici.
    // Sans session valide, la connexion permet seulement de lire.
    const senderId: Promise<number | null> = req
      .userJwtVerify()
      .then(() => req.user?.id ?? null)
      .catch(() => null);

    const hostId: Promise<number | null> = Number.isNaN(cleanwalkIdNum)
      ? Promise.resolve(null)
      : prisma.cleanwalkUser
          .findFirst({ where: { cleanwalkId: cleanwalkIdNum, isHost: true }, select: { userId: true } })
          .then((host) => host?.userId ?? null)
          .catch(() => null);

    if (!Number.isNaN(cleanwalkIdNum)) {
      (async () => {
        try {
          const history = await prisma.cleanwalkChatMessage.findMany({
            where: { cleanwalkId: cleanwalkIdNum },
            orderBy: { createdAt: "asc" },
            take: 50,
            include: { author: authorSelect },
          });
          const host = await hostId;

          socket.send(
            JSON.stringify({
              type: "history",
              messages: history.map((msg) => toPayload(msg, host, this.fastify.profanity.censor)),
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

        const { text } = JSON.parse(rawText) as { text?: unknown };
        if (typeof text !== "string" || !text.trim() || Number.isNaN(cleanwalkIdNum)) {
          return;
        }

        const userId = await senderId;
        if (userId === null) {
          return;
        }
        const sender = await prisma.user.findFirst({
          where: { id: userId, deletedAt: null },
          select: { name: true, profilePicture: true },
        });
        if (!sender) {
          return;
        }

        const saved = await prisma.cleanwalkChatMessage.create({
          data: {
            cleanwalkId: cleanwalkIdNum,
            userId,
            user: sender.name,
            avatar: sender.profilePicture,
            text: text.trim().slice(0, MAX_MESSAGE_LENGTH),
          },
          include: { author: authorSelect },
        });
        this.fastify.log.info(`💬 [${cleanwalkId}] ${sender.name}: ${saved.text}`);

        const payload = JSON.stringify(toPayload(saved, await hostId, this.fastify.profanity.censor));
        for (const client of room!.clients) {
          if (client.readyState === WebSocket.OPEN) {
            client.send(payload);
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
