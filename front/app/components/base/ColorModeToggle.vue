<script setup lang="ts">
import { IconMonitor as Monitor, IconMoon as Moon, IconSun as Sun } from '#components'

const colorMode = useColorMode()

const modes = [
  { value: 'system', label: 'système', icon: Monitor },
  { value: 'light', label: 'clair', icon: Sun },
  { value: 'dark', label: 'sombre', icon: Moon },
] as const

const current = computed(() => modes.find((mode) => mode.value === colorMode.preference) ?? modes[0])

const next = () => {
  const index = modes.indexOf(current.value)
  colorMode.preference = modes[(index + 1) % modes.length]!.value
}
</script>

<template>
  <!-- La préférence n'est connue que dans le navigateur. -->
  <ClientOnly>
    <button
      type="button"
      class="flex items-center justify-center rounded-lg p-2 text-current transition-colors hover:bg-current/10"
      :aria-label="`Thème ${current.label}, cliquer pour changer`"
      :title="`Thème ${current.label}`"
      @click="next"
    >
      <component :is="current.icon" :size="20" />
    </button>
    <template #fallback>
      <span class="block size-9" />
    </template>
  </ClientOnly>
</template>
