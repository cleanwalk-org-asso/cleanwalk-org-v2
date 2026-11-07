<script setup lang="ts">
const props = defineProps<{ cleanwalkId: string }>()

const route = useRoute()
const { CurrentUser: user } = storeToRefs(useAccountStore())

const { messages, newMessage, sendMessage } = useCleanwalkChat(props.cleanwalkId, () => user.value?.name ?? 'Anonyme')
</script>

<template>
  <div class="mx-auto w-full max-w-2xl">
    <div class="border-b border-border px-4 py-3" />

    <div class="flex h-72 flex-col gap-2 overflow-y-auto px-4 py-4">
      <div
        v-for="(message, index) in messages"
        :key="index"
        class="flex flex-col gap-1 rounded-lg border border-border bg-neutral px-3 py-2"
      >
        <div class="text-xs font-semibold text-muted">{{ message.user }}</div>
        <div class="text-sm leading-relaxed break-all text-strong">{{ message.text }}</div>
      </div>
    </div>

    <div v-if="user" class="flex gap-3 border-t border-border px-4 py-3">
      <input
        v-model="newMessage"
        placeholder="Écris ton message..."
        aria-label="Message"
        class="flex-1 rounded-lg border border-border bg-base-100 px-3 py-2 text-sm text-strong placeholder:text-secondary-content focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none"
        @keyup.enter="sendMessage"
      >
      <BaseButton size="sm" class="font-semibold" @click="sendMessage">Envoyer</BaseButton>
    </div>

    <div v-else class="border-t border-border px-4 py-3">
      <BaseButton :to="{ name: 'login', query: { redirect: route.fullPath } }" size="sm" block class="font-semibold">
        Connectez-vous pour envoyer un message
      </BaseButton>
    </div>
  </div>
</template>
