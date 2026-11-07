<script setup lang="ts">
import type { Cleanwalk } from '@/interfaces/cleanwalkInterface'
import { getCleanwalkRouteParams } from '@/services/cleanwalkSlug'

const props = defineProps<{ cleanwalk: Cleanwalk }>()
const emit = defineEmits<{ close: [] }>()

const { actionLabel, showJoinPopup, showLeavePopup, runAction, join, leave } = useCleanwalkParticipation(
  () => props.cleanwalk,
)
</script>

<template>
  <div class="fixed bottom-1/2 left-4 z-[10000] flex h-[calc(100%-9rem)] w-120 translate-y-[calc(50%+2.75rem)] flex-col overflow-hidden rounded-lg bg-base-100 text-lg text-muted">
    <img :src="cleanwalk.img_url || '/default_cover.webp'" alt="cleanwalk image" class="aspect-21/9 w-full object-cover">

    <div class="absolute top-4 right-4 flex gap-6">
      <NuxtLink
        class="flex size-10 items-center justify-center rounded-full bg-neutral-content"
        :to="{ name: 'cleanwalk', params: getCleanwalkRouteParams(cleanwalk) }"
        aria-label="Ouvrir la fiche"
      >
        <IconExternalLink />
      </NuxtLink>
      <button type="button" class="flex size-10 items-center justify-center rounded-full bg-neutral-content" aria-label="Fermer" @click="emit('close')">
        <IconX />
      </button>
    </div>

    <CleanwalkLeavePopup v-model:open="showLeavePopup" @confirm="leave" />
    <CleanwalkParticipationPopup v-model:open="showJoinPopup" @confirm="join" />

    <div class="flex min-h-0 flex-1 flex-col justify-between p-6">
      <div class="flex min-h-0 flex-col">
        <div class="pb-6 text-[1.5625rem] font-bold text-base-content">{{ cleanwalk.name }}</div>
        <CleanwalkWhenWhere
          :date="cleanwalk.date_begin"
          :duration="cleanwalk.duration"
          :address="cleanwalk.address"
          :icon-size="20"
          icon-class="text-base-content"
        />
        <p class="scrollbar-thin overflow-y-auto pt-9 pr-1.5">{{ cleanwalk.description }}</p>
      </div>

      <div class="flex flex-col gap-8 pt-4 pb-3">
        <div class="rounded-lg bg-neutral p-2 text-base">
          <div>Organisé par:</div>
          <h3 class="text-xl font-bold">{{ cleanwalk.host?.name }}</h3>
        </div>
        <BaseButton size="lg" block @click="runAction">{{ actionLabel }}</BaseButton>
      </div>
    </div>
  </div>
</template>
