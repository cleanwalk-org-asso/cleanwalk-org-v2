<script setup lang="ts">
import type { SingleCleanwalk } from '@/interfaces/cleanwalkInterface'
import appleMapIcon from '~/assets/appleMap.svg'
import googleMapIcon from '~/assets/googleMap.svg'
import osmIcon from '~/assets/osm_logo.webp'

const props = defineProps<{ cleanwalk: SingleCleanwalk }>()

// Le serveur ne connaît pas l'appareil : Plans remplace Google Maps après l'affichage.
const isIOS = ref(false)
onMounted(() => {
  isIOS.value = /iPad|iPhone|iPod/.test(navigator.userAgent)
})

const links = computed(() => {
  const { address, pos_lat: lat, pos_long: long } = props.cleanwalk
  return [
    isIOS.value
      ? {
          href: `https://maps.apple.com/?q=${encodeURIComponent(address)}&ll=${lat},${long}`,
          icon: appleMapIcon,
          alt: 'Apple Maps logo',
          label: 'Ouvrir dans Plans',
        }
      : {
          href: `https://www.google.com/maps/?q=${lat},${long}`,
          icon: googleMapIcon,
          alt: 'Google Maps logo',
          label: 'Ouvrir dans Google Maps',
        },
    {
      href: `https://www.openstreetmap.org/?mlat=${lat}&mlon=${long}`,
      icon: osmIcon,
      alt: 'OpenStreetMap logo',
      label: 'Ouvrir dans OpenStreetMap',
    },
  ]
})
</script>

<template>
  <div class="flex justify-between rounded-lg border-2 border-dashed border-accent p-2.5">
    <a
      v-for="link in links"
      :key="link.label"
      :href="link.href"
      target="_blank"
      rel="noopener noreferrer"
      class="flex items-center gap-2.5"
    >
      <img :src="link.icon" :alt="link.alt" class="size-7.5">
      <h4 class="max-w-24 text-xs leading-4.5 font-medium">{{ link.label }}</h4>
    </a>
  </div>
</template>
