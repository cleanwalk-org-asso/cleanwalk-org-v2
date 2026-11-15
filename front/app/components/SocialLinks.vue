<script setup lang="ts">
import { IconsDiscord, IconsFacebook, IconsInsta, IconsLinkedIn } from '#components'

defineProps<{ iconClass?: string }>()

const links = [
  { href: 'https://www.facebook.com/cleanwalk.org', label: 'Facebook', icon: IconsFacebook },
  { href: 'https://www.instagram.com/cleanwalk_org/', label: 'Instagram', icon: IconsInsta },
  { href: 'https://www.linkedin.com/company/cleanwalkorg/', label: 'LinkedIn', icon: IconsLinkedIn },
  { href: 'https://discord.gg/gPQn9YcrTZ', label: 'Discord', icon: IconsDiscord },
]
</script>

<template>
  <div class="flex gap-4">
    <a v-for="link in links" :key="link.href" :href="link.href" :aria-label="link.label" target="_blank" rel="noopener noreferrer">
      <component :is="link.icon" :class="iconClass" />
    </a>
  </div>
</template>
