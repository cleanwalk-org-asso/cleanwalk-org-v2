interface Message {
  user: string
  avatar?: string
  text: string
  date?: string
}

export function useCleanwalkChat(
  cleanwalkId: string,
  username: MaybeRefOrGetter<string>,
  avatar?: MaybeRefOrGetter<string | undefined>,
) {
  const apiBaseUrl = useRuntimeConfig().public.apiUrl.replace(/\/$/, '')
  const wsUrl = `${apiBaseUrl.replace(/^http/, 'ws')}/ws/cleanwalk/${cleanwalkId}`
  const socket = ref<WebSocket | null>(null)

  const messages = ref<Message[]>([])
  const newMessage = ref('')

  onMounted(() => {
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
    socket.value?.close()
  })

  const sendMessage = () => {
    if (!newMessage.value.trim()) return

    const msg: Message = {
      user: toValue(username),
      avatar: toValue(avatar),
      text: newMessage.value,
      date: new Date().toISOString(),
    }
    socket.value?.send(JSON.stringify(msg))
    newMessage.value = ''
  }

  return { messages, newMessage, sendMessage }
}
