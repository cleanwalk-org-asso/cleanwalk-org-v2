export interface ChatMessage {
  user: string
  avatar?: string
  text: string
  date?: string
  isOrganizer?: boolean
}

export function useCleanwalkChat(cleanwalkId: string) {
  const apiBaseUrl = useRuntimeConfig().public.apiUrl.replace(/\/$/, '')
  const wsUrl = `${apiBaseUrl.replace(/^http/, 'ws')}/ws/cleanwalk/${cleanwalkId}`
  const socket = ref<WebSocket | null>(null)
  let unmounted = false

  const messages = ref<ChatMessage[]>([])
  const newMessage = ref('')

  onMounted(async () => {
    // L'API identifie l'auteur grâce au cookie envoyé à l'ouverture du WebSocket :
    // la vérification de session le rafraîchit d'abord s'il a expiré.
    await useAccountStore().checkAuth()
    if (unmounted) return

    const ws = new WebSocket(wsUrl)
    socket.value = ws

    ws.onmessage = (event) => {
      const payload = JSON.parse(event.data)
      if (payload?.type === 'history' && Array.isArray(payload.messages)) {
        messages.value = payload.messages
        return
      }
      messages.value.push(payload)
    }
  })

  onUnmounted(() => {
    unmounted = true
    socket.value?.close()
  })

  // Le nom et la photo sont ajoutés par l'API.
  const sendMessage = () => {
    const text = newMessage.value.trim()
    if (!text) return

    socket.value?.send(JSON.stringify({ text }))
    newMessage.value = ''
  }

  return { messages, newMessage, sendMessage }
}
