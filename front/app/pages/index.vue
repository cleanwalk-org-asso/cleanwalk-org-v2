<script setup lang="ts">

definePageMeta({ name: 'home' })

usePageSeo({
  title: 'Cleanwalk.org - Événements de Nettoyage Citoyen',
  description: 'Rejoignez Cleanwalk.org pour organiser et participer à des événements de nettoyage citoyen.',
})

const { CurrentUser: user } = storeToRefs(useAccountStore())
</script>

<template>
  <div>
    <header class="relative flex justify-center bg-brand pt-4 md:hidden">
      <NuxtLink to="/">
        <img class="mx-auto py-4" src="~/assets/logo.svg" alt="logo cleanwalk.org">
      </NuxtLink>
      <NuxtLink
        :to="{ name: user ? 'menuProfile' : 'login' }"
        :aria-label="user ? 'Mon profil' : 'Se connecter'"
        class="absolute top-1/2 right-4 -translate-y-1/2"
      >
        <BaseAvatar v-if="user?.profilePicture" :src="user.profilePicture" class="size-9 border border-on-brand" />
        <IconLogIn v-else class="text-on-brand" />
      </NuxtLink>
    </header>
    <HomeHeroSection />
    <HomeDiscoverCwSection />
    <HomeMapSection />
    <HomeCwOrgStory />
    <HomeAccountSelector />
    <HomeDonationCwAsso />
    <HomeQuestions />
    <HomeSocialMediaSection />
  </div>
</template>
