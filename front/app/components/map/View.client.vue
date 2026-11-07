<script setup lang="ts">
import { LngLat, Map as MapLibreMap, setWorkerUrl, type ExpressionSpecification } from 'maplibre-gl'
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?url'
import 'maplibre-gl/dist/maplibre-gl.css'
import { MAP_BOUNDS } from '@/services/mapBounds'

// MapLibre cherche son worker à côté de son propre fichier, qui n'y est plus une fois le code bundlé.
setWorkerUrl(workerUrl)

// Zoom maximal 17 : assez près pour lire le nom des rues.
const props = withDefaults(defineProps<{ minZoom?: number; maxZoom?: number }>(), { minZoom: 4, maxZoom: 17 })
const emit = defineEmits<{ ready: [map: MapLibreMap]; click: [] }>()

// Le centre reste en [latitude, longitude], l'ordre utilisé par l'API et le reste du front.
const center = defineModel<[number, number]>('center', { required: true })
const zoom = defineModel<number>('zoom', { required: true })

// Tuiles vectorielles OpenFreeMap (données OpenStreetMap), sans clé d'API.
const MAP_STYLE = 'https://tiles.openfreemap.org/styles/liberty'
const FRENCH_LABEL: ExpressionSpecification = ['coalesce', ['get', 'name:fr'], ['get', 'name:latin'], ['get', 'name']]

const EPSILON = 1e-6
// Si le premier rendu complet n'arrive pas (tuiles en erreur...), la carte s'affiche quand même.
const REVEAL_TIMEOUT_MS = 6000

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

// Le centre de la carte reste dans MAP_BOUNDS. maxBounds interdirait d'afficher quoi que ce soit hors de la zone,
// ce qui forcerait un zoom plus fort sur grand écran. Remplacer la contrainte de MapLibre
// remplace aussi son respect du zoom min/max, d'où le clamp du zoom.
const constrainToBounds = (lngLat: LngLat, nextZoom: number) => ({
  center: new LngLat(clamp(lngLat.lng, MAP_BOUNDS.west, MAP_BOUNDS.east), clamp(lngLat.lat, MAP_BOUNDS.south, MAP_BOUNDS.north)),
  zoom: clamp(nextZoom, props.minZoom, props.maxZoom),
})

const container = ref<HTMLElement | null>(null)
const map = shallowRef<MapLibreMap | null>(null)
const unavailable = ref(false)
// La carte reste masquée tant que MapLibre dessine les tuiles une à une.
const loaded = ref(false)
// Le fond de chargement est retiré une fois le fondu de la carte terminé, pour ne plus animer sous la carte.
const faded = ref(false)
let revealTimer: ReturnType<typeof setTimeout> | undefined

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
      transformConstrain: constrainToBounds,
      // Carte à plat et orientée au nord, sans contrôle affiché.
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
  // Les bâtiments en 3D sont retirés : ceux dessinés à plat (calque « building ») restent.
  instance.on('style.load', () => {
    for (const layer of instance.getStyle().layers) {
      if (layer.type === 'fill-extrusion') {
        instance.removeLayer(layer.id)
      } else if (layer.type === 'symbol' && JSON.stringify(layer.layout?.['text-field'])?.includes('name')) {
        instance.setLayoutProperty(layer.id, 'text-field', FRENCH_LABEL)
      }
    }
  })

  const reveal = () => {
    clearTimeout(revealTimer)
    loaded.value = true
  }
  instance.once('load', reveal)
  revealTimer = setTimeout(reveal, REVEAL_TIMEOUT_MS)

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
onUnmounted(() => {
  clearTimeout(revealTimer)
  map.value?.remove()
})
</script>

<template>
  <div class="relative size-full">
    <div v-if="!faded" class="absolute inset-0 flex items-center justify-center bg-base-200">
      <div v-if="!unavailable" role="status" class="flex flex-col items-center text-primary">
        <IconMapPin :size="36" class="animate-bounce motion-reduce:animate-none" aria-hidden="true" />
        <span class="h-1.5 w-6 animate-pulse rounded-full bg-primary/20 motion-reduce:animate-none" aria-hidden="true" />
        <span class="mt-3 text-sm font-medium text-muted">Chargement de la carte…</span>
      </div>
    </div>
    <!-- La carte passe au-dessus du fond de chargement (relative, après lui) et le recouvre en fondu. -->
    <div
      ref="container"
      class="relative size-full transition-opacity duration-500 motion-reduce:transition-none"
      :class="loaded ? 'opacity-100' : 'opacity-0'"
      @transitionend.self="faded = loaded"
    />
    <p v-if="unavailable" class="absolute inset-0 flex items-center justify-center p-4 text-center text-muted">
      La carte ne peut pas s'afficher sur cet appareil.
    </p>
    <slot v-if="map" />
  </div>
</template>
