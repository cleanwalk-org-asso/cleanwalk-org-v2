import { ref, onMounted, onUnmounted } from "vue";

interface Message {
  user: string;
  avatar?: string;
  text: string;
  date?: string;
}

export function useCleanwalkChat(cleanwalkId: string, username: string, avatar?: string) {
  // URL du serveur WebSocket Fastify
  const wsUrl = `ws://localhost:8080/ws/cleanwalk/${cleanwalkId}`;
  const socket = ref<WebSocket | null>(null);

  const messages = ref<Message[]>([]);
  const newMessage = ref("");

  onMounted(() => {
    const ws = new WebSocket(wsUrl);
    socket.value = ws;

    ws.onopen = () => {};

    ws.onmessage = (event) => {
      const payload = JSON.parse(event.data);
      if (payload?.type === "history" && Array.isArray(payload.messages)) {
        messages.value = payload.messages;
        return;
      }
      messages.value.push(payload);
    };

    ws.onclose = () => {};

    ws.onerror = () => {};
  });

  onUnmounted(() => {
    socket.value?.close();
  });

  const sendMessage = () => {
    if (newMessage.value.trim()) {
      const msg: Message = {
        user: username,
        avatar,
        text: newMessage.value,
        date: new Date().toISOString(),
      };
      socket.value?.send(JSON.stringify(msg));
      newMessage.value = "";
    }
  };

  return { messages, newMessage, sendMessage };
}
