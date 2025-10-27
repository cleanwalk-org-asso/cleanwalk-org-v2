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
  const socket = new WebSocket(wsUrl);

  const messages = ref<Message[]>([]);
  const newMessage = ref("");

  onMounted(() => {
    socket.onopen = () => {
      console.log("🟢 Connecté à la room", cleanwalkId);
    };

    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      messages.value.push(msg);
    };

    socket.onclose = () => {
      console.log("🔴 Déconnecté du chat Cleanwalk");
    };

    socket.onerror = (err) => {
      console.error("❌ Erreur WebSocket :", err);
    };
  });

  onUnmounted(() => {
    socket.close();
  });

  const sendMessage = () => {
    if (newMessage.value.trim()) {
      const msg: Message = {
        user: username,
        avatar,
        text: newMessage.value,
        date: new Date().toISOString(),
      };
      socket.send(JSON.stringify(msg));
      newMessage.value = "";
    }
  };

  return { messages, newMessage, sendMessage };
}
