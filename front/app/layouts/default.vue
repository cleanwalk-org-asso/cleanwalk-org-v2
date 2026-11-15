<script setup lang="ts">
const route = useRoute()
const showFooter = computed(() => !['map', 'addCleanwalk', 'editCleanwalk'].includes(String(route.name)))
</script>

<template>
  <div class="flex min-h-screen flex-col pb-15 lg:pt-22 lg:pb-0">
    <Navbar />
    <main class="flex-1">
      <slot />
      <Footer v-if="showFooter" class="hidden md:flex" />
    </main>
  </div>
</template>
