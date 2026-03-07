import { ref, onMounted, onUnmounted } from "vue";

interface Message {
  user: string;
  avatar?: string;
  text: string;
  date?: string;
}

export function useCleanwalkChat(cleanwalkId: string, username: string, avatar?: string) {
  const apiBaseUrl = String(import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
  const wsBaseUrl = apiBaseUrl.replace(/^http/, "ws");
  const wsUrl = `${wsBaseUrl}/ws/cleanwalk/${cleanwalkId}`;
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
