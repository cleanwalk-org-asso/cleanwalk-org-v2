<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const isNotFound = computed(() => props.error.status === 404)

useSeoMeta({
  title: () => (isNotFound.value ? 'Page Non Trouvée | Cleanwalk.org' : 'Erreur | Cleanwalk.org'),
  description: 'Cette page n’existe pas.',
})
</script>

<template>
  <NuxtLayout name="default">
    <section class="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 class="text-2xl font-black text-primary">
        {{ isNotFound ? '404 not found' : 'Une erreur est survenue' }}
      </h1>
      <BaseButton @click="clearError({ redirect: '/' })">Retour à l'accueil</BaseButton>
    </section>
  </NuxtLayout>
</template>
