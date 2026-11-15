<script setup lang="ts">
import { Marker } from 'maplibre-gl'
import type { Cleanwalk, SingleCleanwalk } from '@/interfaces/cleanwalkInterface'
import blueMapIcon from '~/assets/blue-map.svg'
import greenMapIcon from '~/assets/green-map.svg'

const props = defineProps<{ cleanwalk: Cleanwalk | SingleCleanwalk }>()
const emit = defineEmits<{ select: [] }>()

// MapView n'affiche ses enfants qu'une fois la carte créée.
const map = inject(mapInjectionKey)

// L'élément appartient à MapLibre, qui le déplace dans la carte : Vue ne doit pas le gérer.
const icon = document.createElement('img')
icon.width = 25
icon.height = 41
icon.alt = ''
icon.draggable = false
// drop-shadow suit la forme du pin, là où box-shadow dessinerait un rectangle.
icon.className = 'drop-shadow-[0_2px_2px_rgb(0_0_0/0.35)]'

const button = document.createElement('button')
button.type = 'button'
button.className = 'block cursor-pointer'
button.append(icon)
button.addEventListener('click', (event) => {
  // Sans cela, le clic atteint aussi la carte, qui fermerait la sélection.
  event.stopPropagation()
  emit('select')
})

const marker = new Marker({ element: button, anchor: 'bottom' })

watchEffect(() => {
  const { cleanwalk } = props
  button.setAttribute('aria-label', cleanwalk.name)
  icon.src = cleanwalk.host?.role === 'ASSOCIATION' ? greenMapIcon : blueMapIcon
  marker.setLngLat([cleanwalk.pos_long, cleanwalk.pos_lat])
})

if (map?.value) {
  marker.addTo(map.value)
}

onBeforeUnmount(() => marker.remove())
</script>

<template>
  <span hidden />
</template>
