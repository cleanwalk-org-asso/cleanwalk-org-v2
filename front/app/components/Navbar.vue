<script setup lang="ts">
import { IconCompass as Compass, IconHouse as House, IconMapPin as MapPin, IconMenu as Menu, IconPlus as Plus } from '#components'

const route = useRoute()
const { CurrentUser: user } = storeToRefs(useAccountStore())

const page = computed(() => String(route.name ?? ''))

const links = computed(() => [
  { to: { name: 'home' }, label: 'Accueil', desktopLabel: 'Accueil', icon: House, active: page.value === 'home' },
  {
    to: { name: 'map' },
    label: 'Carte',
    desktopLabel: 'Carte',
    icon: MapPin,
    active: page.value === 'map' || page.value === 'cleanwalk',
  },
  {
    to: { name: 'addCleanwalk' },
    label: 'Ajouter',
    desktopLabel: 'Ajouter cleanwalk',
    icon: Plus,
    active: page.value.includes('add'),
  },
  {
    to: { name: 'associations' },
    label: 'Découvrir',
    desktopLabel: 'Découvrir',
    icon: Compass,
    active: page.value.includes('association'),
  },
  {
    to: { name: 'menu' },
    label: 'Menu',
    desktopLabel: 'Menu',
    icon: Menu,
    active: page.value.toLowerCase().includes('menu'),
  },
])
</script>

<template>
  <!-- Mobile et bureau sont choisis en CSS pour que le rendu serveur soit correct dès le premier affichage. -->
  <nav class="fixed bottom-0 z-[999] w-full bg-base-100 font-nav text-xs font-medium lg:hidden">
    <ul class="flex justify-around p-2" :class="{ 'shadow-[0_-10px_100px_rgba(194,194,194,0.2)]': page !== 'map' }">
      <li v-for="link in links" :key="link.label" class="flex w-full flex-col items-center justify-center">
        <NuxtLink
          :to="link.to"
          class="flex size-full flex-col items-center justify-center rounded-xl py-1"
          :class="link.active ? 'bg-brand text-on-brand' : 'text-base-content'"
        >
          <component :is="link.icon" />
          <div>{{ link.label }}</div>
        </NuxtLink>
      </li>
    </ul>
  </nav>

  <nav class="fixed top-0 left-0 z-[9998] hidden h-22 w-full items-center justify-between bg-brand px-8 text-on-brand lg:flex">
    <NuxtLink to="/">
      <img class="block" src="~/assets/logo.svg" alt="logo cleanwalk.org">
    </NuxtLink>

    <div>
      <NuxtLink
        v-for="link in links"
        :key="link.label"
        :to="link.to"
        class="mx-px rounded-lg px-4 py-2 font-bold"
        :class="{ 'bg-on-brand text-brand': link.active }"
      >
        {{ link.desktopLabel }}
      </NuxtLink>
    </div>

    <div class="flex items-center gap-4">
      <NuxtLink v-if="user" :to="{ name: 'menuProfile' }" class="flex items-center gap-4">
        <div class="font-bold">{{ user.name }}</div>
        <BaseAvatar :src="user.profilePicture" class="size-11.5 border border-on-brand" />
      </NuxtLink>
      <div v-else class="flex gap-4">
        <NuxtLink :to="{ name: 'login' }">Se connecter</NuxtLink>
        <NuxtLink :to="{ name: 'signup' }">S'inscrire</NuxtLink>
      </div>
    </div>
  </nav>
</template>
