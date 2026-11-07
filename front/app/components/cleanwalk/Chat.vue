<script setup lang="ts">
const props = defineProps<{ cleanwalkId: string }>()

const route = useRoute()
const { CurrentUser: user } = storeToRefs(useAccountStore())

const { messages, newMessage, sendMessage } = useCleanwalkChat(props.cleanwalkId)

// Distance au bas de la liste sous laquelle on considère que la personne suit la conversation.
const STICK_THRESHOLD_PX = 80

const list = useTemplateRef<HTMLElement>('list')
// Vrai pour l'historique et après un envoi : on descend même si la personne relisait plus haut.
let forceScroll = true
let firstLoad = true

const isNearBottom = () => {
  const el = list.value
  return !el || el.scrollHeight - el.scrollTop - el.clientHeight < STICK_THRESHOLD_PX
}

// Appelé avant la mise à jour du DOM : la position mesurée est celle d'avant le nouveau message.
watch(
  () => messages.value.length,
  async () => {
    const stick = forceScroll || isNearBottom()
    const behavior = firstLoad ? 'instant' : 'smooth'
    forceScroll = false
    firstLoad = false
    if (!stick) return

    await nextTick()
    list.value?.scrollTo({ top: list.value.scrollHeight, behavior })
  },
)

const send = () => {
  if (!newMessage.value.trim()) return
  forceScroll = true
  sendMessage()
}
</script>

<template>
  <div class="mx-auto w-full max-w-2xl">
    <div class="border-b border-border px-4 py-3" />

    <div ref="list" class="flex h-72 flex-col gap-2 overflow-y-auto px-4 py-4">
      <div
        v-for="(message, index) in messages"
        :key="index"
        class="flex flex-col gap-1.5 rounded-lg border px-3 py-2"
        :class="message.isOrganizer ? 'border-accent/60 bg-accent/15' : 'border-border bg-neutral'"
      >
        <div class="flex items-center gap-2 text-xs font-semibold" :class="message.isOrganizer ? 'text-accent-content' : 'text-muted'">
          <BaseAvatar :src="message.avatar" :alt="message.user" class="size-6" />
          {{ message.user }}
          <span v-if="message.isOrganizer" class="rounded-full bg-accent px-2 py-0.5 text-[0.625rem] font-bold tracking-wide text-accent-content uppercase">
            Organisateur
          </span>
        </div>
        <div class="text-sm leading-relaxed break-all text-strong">{{ message.text }}</div>
      </div>
    </div>

    <div v-if="user" class="flex gap-3 border-t border-border px-4 py-3">
      <input
        v-model="newMessage"
        placeholder="Écris ton message..."
        aria-label="Message"
        class="flex-1 rounded-lg border border-border bg-base-100 px-3 py-2 text-sm text-strong placeholder:text-secondary-content focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none"
        @keyup.enter="send"
      >
      <BaseButton size="sm" class="font-semibold" @click="send">Envoyer</BaseButton>
    </div>

    <div v-else class="border-t border-border px-4 py-3">
      <BaseButton :to="{ name: 'login', query: { redirect: route.fullPath } }" size="sm" block class="font-semibold">
        Connectez-vous pour envoyer un message
      </BaseButton>
    </div>
  </div>
</template>
