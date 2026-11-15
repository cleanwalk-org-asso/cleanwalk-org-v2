<script setup lang="ts">
import { getCleanwalkRouteParams } from '@/services/cleanwalkSlug'

const CARD_CLOSED = -10
const CARD_OPEN = 65

const { cleanwalksTab } = storeToRefs(useCleanwalkStore())
const { mapInstance, filteredCleanwalks, selectedCleanwalk, searchInput, setMapEvents, setSelectedCleanwalk, isPointVisible, mapClick } =
  useCleanwalkMap()

const zoom = ref(4)
const center = ref<[number, number]>([47.866667, 2.333333])
const showList = ref(false)
const cardBottom = ref(CARD_CLOSED)

const visibleCleanwalks = computed(() => {
  // La zone visible change avec le zoom et le centre.
  void zoom.value
  void center.value
  if (!mapInstance.value) return []
  return cleanwalksTab.value.filter((cleanwalk) => isPointVisible(cleanwalk.pos_lat, cleanwalk.pos_long))
})

const openCard = (id?: number) => {
  if (!id) return
  setSelectedCleanwalk(id)
  cardBottom.value = CARD_OPEN
}

// Une seule cleanwalk dans la zone : sa carte s'ouvre.
watch(visibleCleanwalks, (cleanwalks) => {
  if (cleanwalks.length === 1) {
    openCard(cleanwalks[0]?.id)
  }
})

watch(showList, (isOpen) => {
  if (isOpen) cardBottom.value = CARD_CLOSED
})

const onMapClick = () => {
  mapClick()
  cardBottom.value = CARD_CLOSED
}

let startY = 0
let startBottom = CARD_CLOSED

const onTouchMove = (event: TouchEvent) => {
  event.preventDefault()
  const touch = event.touches[0]
  if (!touch) return

  // Sans cleanwalk sélectionnée, glisser vers le haut ouvre la liste.
  if (!selectedCleanwalk.value) {
    showList.value = true
    return
  }
  const bottom = startBottom + startY - touch.clientY
  cardBottom.value = bottom < 0 ? CARD_CLOSED : Math.min(bottom, CARD_OPEN)
}

const onTouchEnd = () => {
  document.removeEventListener('touchmove', onTouchMove)
  document.removeEventListener('touchend', onTouchEnd)
}

const onTouchStart = (event: TouchEvent) => {
  startY = event.touches[0]?.clientY ?? 0
  startBottom = cardBottom.value
  document.addEventListener('touchmove', onTouchMove, { passive: false })
  document.addEventListener('touchend', onTouchEnd)
}

onUnmounted(onTouchEnd)
</script>

<template>
  <div>
    <div class="mt-14.5 h-[calc(100dvh-7.375rem)]">
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
          @select="openCard(cleanwalk.id)"
        />
      </LazyMapView>
    </div>

    <SearchBar v-model="searchInput" v-model:active="showList">
      <template #actions>
        <NuxtLink
          :to="{ name: 'addCleanwalk' }"
          class="flex size-9.5 items-center justify-center rounded-lg text-[1.75rem] leading-none text-on-brand"
          aria-label="Ajouter une cleanwalk"
        >
          +
        </NuxtLink>
      </template>
    </SearchBar>

    <div
      class="fixed left-0 z-[998] w-full touch-none rounded-t-2xl bg-base-100 transition-[bottom] duration-300"
      :style="{ bottom: `${cardBottom}px` }"
      @touchstart="onTouchStart"
    >
      <button
        type="button"
        class="flex h-5 w-full items-center justify-center"
        aria-label="Afficher la liste des cleanwalks"
        @click="!selectedCleanwalk && (showList = true)"
      >
        <span class="block h-0.75 w-10.75 rounded-full bg-base-content" />
      </button>

      <div v-if="selectedCleanwalk" class="px-5 pb-5">
        <h3 class="text-sm font-medium">{{ selectedCleanwalk.name }}</h3>
        <NuxtLink
          :to="{ name: 'cleanwalk', params: getCleanwalkRouteParams(selectedCleanwalk) }"
          class="flex justify-between text-xs"
        >
          <CleanwalkWhenWhere
            class="w-4/5 pt-5"
            :date="selectedCleanwalk.date_begin"
            :duration="selectedCleanwalk.duration"
            :address="selectedCleanwalk.address"
          />
          <div class="mt-1.25 flex w-1/5 flex-col items-center gap-2 overflow-hidden">
            <BaseAvatar :src="selectedCleanwalk.host?.profilePicture" class="size-9.5" />
            <div class="max-w-full truncate text-center text-[0.7rem]">{{ selectedCleanwalk.host?.name }}</div>
          </div>
        </NuxtLink>
      </div>
      <div v-else class="px-5 pb-5">
        <h3 class="pb-15 text-center text-sm font-medium">{{ visibleCleanwalks.length }} cleanwalks à proximité</h3>
      </div>
    </div>

    <div v-if="showList" class="fixed inset-0 z-[999] bg-overlay backdrop-blur-sm">
      <div class="mt-20 flex h-[calc(100%-5rem)] w-full flex-col items-center gap-2.5 overflow-auto px-[5%] pt-4 pb-20">
        <NuxtLink
          v-for="cleanwalk in filteredCleanwalks"
          :key="cleanwalk.id"
          :to="{ name: 'cleanwalk', params: getCleanwalkRouteParams(cleanwalk) }"
          class="flex w-full flex-col items-center"
        >
          <CardsCleanwalkListCard :cleanwalk="cleanwalk" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
