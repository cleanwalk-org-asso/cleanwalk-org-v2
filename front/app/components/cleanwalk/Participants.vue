<script setup lang="ts">
import type { CleanwalkUserSummary } from '@/interfaces/cleanwalkInterface'

defineProps<{
  users: CleanwalkUserSummary[]
  loading: boolean
}>()
</script>

<template>
  <BaseAccordion title="Participants inscrits" class="mb-4">
    <div v-if="loading" class="text-sm text-muted">Chargement...</div>
    <div v-else-if="users.length === 0" class="text-sm text-muted">Aucun participant pour le moment.</div>
    <div v-else class="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2">
      <div v-for="user in users" :key="user.id" class="flex items-center justify-between gap-3 rounded-lg bg-neutral p-2">
        <div class="flex min-w-0 items-center gap-2">
          <BaseAvatar :src="user.profilePicture" class="size-8" />
          <div class="truncate text-sm font-medium text-strong">{{ user.name }}</div>
        </div>
        <div class="shrink-0 rounded-full bg-secondary px-2 py-0.5 text-xs font-bold text-strong">x{{ user.nb_person }}</div>
      </div>
    </div>
  </BaseAccordion>
</template>
