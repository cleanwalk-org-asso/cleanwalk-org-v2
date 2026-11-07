<script setup lang="ts">

defineProps<{
  backUrl?: string
  pageName?: string
}>()
</script>

<template>
  <div class="fixed top-0 left-0 z-[999] flex h-14.5 w-screen items-center justify-between bg-brand lg:hidden">
    <NuxtLink v-if="backUrl" class="absolute top-4 left-5 text-on-brand" :to="backUrl" aria-label="Retour">
      <IconChevronLeft />
    </NuxtLink>
    <h2 class="w-full text-center text-lg font-bold text-on-brand">{{ pageName }}</h2>
  </div>
</template>
