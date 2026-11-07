<script setup lang="ts">
import type { Cleanwalk } from '@/interfaces/cleanwalkInterface'
import { getCleanwalkRouteParams } from '@/services/cleanwalkSlug'

const router = useRouter()
const getCleanwalkHref = (cleanwalk: Cleanwalk) => router.resolve({ name: 'cleanwalk', params: getCleanwalkRouteParams(cleanwalk) }).href
const { cleanwalksTab } = storeToRefs(useCleanwalkStore())
const { mapInstance, filteredCleanwalks, searchInput, selectedCleanwalk, setMapEvents, setSelectedCleanwalk, mapClick } =
  useCleanwalkMap()

const OVERVIEW_ZOOM = 5
const CLEANWALK_ZOOM = 12

const zoom = ref(OVERVIEW_ZOOM)
const center = ref<[number, number]>([47.2, 0])

// Une recherche qui ne donne qu'un résultat l'ouvre directement.
watch(filteredCleanwalks, (cleanwalks) => {
  const [first] = cleanwalks
  if (cleanwalks.length === 1 && first?.id) {
    setSelectedCleanwalk(first.id)
  } else if (cleanwalks.length === 0) {
    selectedCleanwalk.value = null
  }
})

watch(selectedCleanwalk, (cleanwalk) => {
  if (cleanwalk && mapInstance.value) {
    center.value = [cleanwalk.pos_lat, cleanwalk.pos_long]
    zoom.value = CLEANWALK_ZOOM
  }
})

const resetSelection = () => {
  searchInput.value = ''
  selectedCleanwalk.value = null
  zoom.value = OVERVIEW_ZOOM
}

const onMapClick = () => {
  if (selectedCleanwalk.value) {
    zoom.value = OVERVIEW_ZOOM
  }
  mapClick()
}
</script>

<template>
  <div class="h-[calc(100vh-5.5rem)] w-full">
    <LazyMapView
      v-model:zoom="zoom"
      v-model:center="center"
      @ready="setMapEvents"
      @click="onMapClick"
    >
      <LazyMapCleanwalkMarker
        v-for="cleanwalk in cleanwalksTab"
        :key="cleanwalk.id"
        :cleanwalk="cleanwalk"
        @select="setSelectedCleanwalk(cleanwalk.id!)"
      />
    </LazyMapView>

    <div class="fixed bottom-1/2 left-4 z-[999] flex h-[calc(100%-9rem)] w-120 translate-y-[calc(50%+2.75rem)] flex-col gap-4 rounded-lg bg-neutral p-4 shadow-[0_-10px_100px_rgba(194,194,194,0.2)]">
      <BaseSearchInput v-model="searchInput" name="search" placeholder="Rechercher une cleanwalk" />
      <div v-if="filteredCleanwalks.length === 0" class="p-8 text-center text-muted italic">
        Aucune cleanwalk trouvée
      </div>
      <div class="scrollbar-thin flex max-h-full flex-col gap-4 overflow-y-auto">
        <a
          v-for="cleanwalk in filteredCleanwalks"
          :key="cleanwalk.id"
          :href="getCleanwalkHref(cleanwalk)"
          @click.prevent="setSelectedCleanwalk(cleanwalk.id!)"
        >
          <CardsCleanwalkListCard :cleanwalk="cleanwalk" />
        </a>
      </div>
    </div>

    <NuxtLink
      :to="{ name: 'addCleanwalk' }"
      class="fixed right-6 bottom-8 z-[1001] flex size-12 items-center justify-center rounded-full bg-primary text-[2rem] leading-none text-primary-content"
      aria-label="Ajouter une cleanwalk"
    >
      +
    </NuxtLink>

    <CardsCleanwalkSoloCard v-if="selectedCleanwalk" :cleanwalk="selectedCleanwalk" @close="resetSelection" />
  </div>
</template>
