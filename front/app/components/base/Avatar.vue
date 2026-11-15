<script setup lang="ts">

withDefaults(
  defineProps<{
    src?: string | null
    alt?: string
  }>(),
  { src: undefined, alt: 'Photo de profil' },
)
</script>

<template>
  <img v-if="src" :src="src" :alt="alt" class="aspect-square shrink-0 rounded-full object-cover">
  <span v-else class="flex aspect-square shrink-0 items-center justify-center rounded-full bg-neutral text-secondary-content">
    <IconUserRound class="size-3/5" />
  </span>
</template>
