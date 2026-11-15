<script setup lang="ts">
import type { CleanwalkUserSummary, SingleCleanwalk } from '@/interfaces/cleanwalkInterface'

const props = defineProps<{ cleanwalk: SingleCleanwalk }>()

const cleanwalkStore = useCleanwalkStore()
const { isHost, actionLabel, showJoinPopup, showLeavePopup, runAction, join, leave } = useCleanwalkParticipation(
  () => props.cleanwalk,
  'Je participe',
)

const users = ref<CleanwalkUserSummary[]>([])
const loadingUsers = ref(false)

const showParticipantCount = computed(() => isHost.value || props.cleanwalk.participant_count_public)

const participantCount = computed(() => {
  if (!isHost.value || loadingUsers.value) return props.cleanwalk.participant_count
  return users.value.reduce((total, user) => total + (user.nb_person || 0), 0)
})

// La liste des inscrits n'est lisible que par l'organisateur, une fois la session connue.
watch(
  isHost,
  async (host) => {
    if (!host) {
      users.value = []
      return
    }
    loadingUsers.value = true
    try {
      users.value = await cleanwalkStore.getCleanwalkUsers(props.cleanwalk.id)
    } catch (error) {
      console.error('Failed to fetch cleanwalk users:', error)
    } finally {
      loadingUsers.value = false
    }
  },
  { immediate: import.meta.client },
)
</script>

<template>
  <div>
    <CleanwalkLeavePopup v-model:open="showLeavePopup" @confirm="leave" />
    <CleanwalkParticipationPopup v-model:open="showJoinPopup" @confirm="join" />

    <img
      :src="cleanwalk.img_url || '/default_cover.webp'"
      alt="cover image"
      class="aspect-21/9 w-full object-cover md:mt-12 md:h-48 md:rounded-lg"
    >

    <div class="px-6.5 md:px-0">
      <h1 class="pt-5 pb-12.5 text-xl md:pb-7.5 font-bold text-base-content">{{ cleanwalk.name }}</h1>
      <CleanwalkWhenWhere
        class="pb-9 md:pb-5"
        :date="cleanwalk.date_begin"
        :duration="cleanwalk.duration"
        :address="cleanwalk.address"
        icon-class="text-base-content"
      />

      <CleanwalkMapLinks class="mb-9 md:mb-5" :cleanwalk="cleanwalk" />

      <div v-if="showParticipantCount" class="mb-8 font-medium md:mb-4">{{ participantCount }} participant(s)</div>
      <CleanwalkParticipants v-if="isHost" :users="users" :loading="loadingUsers" />

      <div class="mb-9 flex justify-between rounded-lg bg-neutral px-3.5 pt-2.75 pb-3 md:mb-5">
        <div class="flex flex-col">
          <div>organisé par:</div>
          <h2 class="text-[15px] font-bold">{{ cleanwalk.host?.name }}</h2>
        </div>
        <BaseAvatar v-if="cleanwalk.host?.profilePicture" :src="cleanwalk.host.profilePicture" alt="" class="size-11" />
      </div>

      <BaseButton block @click="runAction">{{ actionLabel }}</BaseButton>

      <p class="w-full overflow-hidden pt-5 leading-6 wrap-break-word md:text-sm">{{ cleanwalk.description }}</p>
    </div>
  </div>
</template>
