<script setup lang="ts">
import type { Cleanwalk } from '@/interfaces/cleanwalkInterface'

defineProps<{ cleanwalk: Cleanwalk }>()
</script>

<template>
  <div class="flex w-full justify-between rounded-xl border border-border bg-base-100 p-2.5 text-muted">
    <div class="flex flex-col justify-evenly">
      <div class="font-medium text-base-content">{{ cleanwalk.name }}</div>
      <CleanwalkWhenWhere :date="cleanwalk.date_begin" :duration="cleanwalk.duration" :address="cleanwalk.address" />
      <div class="w-fit rounded-full bg-neutral-content px-3">{{ cleanwalk.host?.name }}</div>
    </div>
    <img :src="cleanwalk.img_url || '/default_cover.webp'" alt="cleanwalk" class="ml-2.5 size-34 rounded-lg object-cover">
  </div>
</template>
