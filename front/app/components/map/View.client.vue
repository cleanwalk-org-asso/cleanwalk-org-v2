<script setup lang="ts">
import { Map as MapLibreMap, setWorkerUrl, type ExpressionSpecification } from 'maplibre-gl'
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?url'
import 'maplibre-gl/dist/maplibre-gl.css'

// MapLibre cherche son worker à côté de son propre fichier, qui n'y est plus une fois le code bundlé.
setWorkerUrl(workerUrl)

// Les zooms sont en unités MapLibre : un cran de moins que Leaflet pour la même vue.
// maxZoom 17 correspond au zoom 18 de Leaflet.
const props = withDefaults(defineProps<{ minZoom?: number; maxZoom?: number }>(), { minZoom: 4, maxZoom: 17 })
const emit = defineEmits<{ ready: [map: MapLibreMap]; click: [] }>()

// Le centre reste en [latitude, longitude], l'ordre utilisé par l'API et le reste du front.
const center = defineModel<[number, number]>('center', { required: true })
const zoom = defineModel<number>('zoom', { required: true })

// Tuiles vectorielles OpenFreeMap (données OpenStreetMap), sans clé d'API.
const MAP_STYLE = 'https://tiles.openfreemap.org/styles/liberty'
const FRENCH_LABEL: ExpressionSpecification = ['coalesce', ['get', 'name:fr'], ['get', 'name:latin'], ['get', 'name']]

const EPSILON = 1e-6

const container = ref<HTMLElement | null>(null)
const map = shallowRef<MapLibreMap | null>(null)
const unavailable = ref(false)

provide(mapInjectionKey, map)

// Vrai pendant un déplacement demandé par le parent : easeTo interrompt l'animation en cours,
// et la position intermédiaire de cette interruption ne doit pas remonter au parent.
let applyingView = false

const isCurrentView = (instance: MapLibreMap, [lat, lng]: [number, number], nextZoom: number) => {
  const current = instance.getCenter()
  return (
    Math.abs(current.lat - lat) < EPSILON
    && Math.abs(current.lng - lng) < EPSILON
    && Math.abs(instance.getZoom() - nextZoom) < EPSILON
  )
}

onMounted(async () => {
  // Nuxt n'affiche le template d'un composant .client qu'après son montage.
  await nextTick()
  if (!container.value) return

  let instance: MapLibreMap
  try {
    instance = new MapLibreMap({
      container: container.value,
      style: MAP_STYLE,
      center: [center.value[1], center.value[0]],
      zoom: zoom.value,
      minZoom: props.minZoom,
      maxZoom: props.maxZoom,
      // Carte à plat et au nord, sans contrôle affiché, comme avec Leaflet.
      attributionControl: false,
      dragRotate: false,
      pitchWithRotate: false,
      touchPitch: false,
      maxPitch: 0,
    })
  } catch (error) {
    // MapLibre a besoin de WebGL, qui peut manquer ou être désactivé.
    console.error('Carte indisponible', error)
    unavailable.value = true
    return
  }

  // Le style affiche les noms en anglais. Les numéros de route ne sont pas concernés.
  instance.on('style.load', () => {
    for (const layer of instance.getStyle().layers) {
      if (layer.type === 'symbol' && JSON.stringify(layer.layout?.['text-field'])?.includes('name')) {
        instance.setLayoutProperty(layer.id, 'text-field', FRENCH_LABEL)
      }
    }
  })

  instance.touchZoomRotate.disableRotation()
  instance.keyboard.disableRotation()

  instance.on('moveend', () => {
    if (applyingView) return
    const { lat, lng } = instance.getCenter()
    if (isCurrentView(instance, center.value, zoom.value)) return
    center.value = [lat, lng]
    zoom.value = instance.getZoom()
  })
  instance.on('click', () => emit('click'))

  map.value = instance
  emit('ready', instance)
})

watch([center, zoom], ([nextCenter, nextZoom]) => {
  const instance = map.value
  if (!instance || isCurrentView(instance, nextCenter, nextZoom)) return

  applyingView = true
  instance.easeTo({ center: [nextCenter[1], nextCenter[0]], zoom: nextZoom })
  applyingView = false
})

watch([() => props.minZoom, () => props.maxZoom], ([minZoom, maxZoom]) => {
  const instance = map.value
  if (!instance) return

  // MapLibre refuse un minimum supérieur au maximum en place : on lève d'abord le minimum.
  instance.setMinZoom(null)
  instance.setMaxZoom(maxZoom)
  instance.setMinZoom(minZoom)
})

// onUnmounted : les marqueurs enfants sont retirés avant la carte.
onUnmounted(() => map.value?.remove())
</script>

<template>
  <div class="relative size-full">
    <div ref="container" class="size-full" />
    <p v-if="unavailable" class="absolute inset-0 flex items-center justify-center p-4 text-center text-muted">
      La carte ne peut pas s'afficher sur cet appareil.
    </p>
    <slot v-if="map" />
  </div>
</template>
