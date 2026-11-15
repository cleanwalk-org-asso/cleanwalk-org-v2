<script setup lang="ts">
const { isMobile } = useDevice()
const cleanwalkStore = useCleanwalkStore()
const { cleanwalksTab } = storeToRefs(cleanwalkStore)

const zoom = ref(5)
const center = ref<[number, number]>([47.5, 2.333333])

watch(
  isMobile,
  () => {
    zoom.value = isMobile.value ? 4 : 5
  },
  { immediate: true },
)

onMounted(() => {
  cleanwalkStore.getAllCleanwalks()
})
</script>

<template>
  <LazyMapView
    v-model:zoom="zoom"
    v-model:center="center"
    :min-zoom="isMobile ? 4 : 5"
    :max-zoom="isMobile ? 4 : 5"
  >
    <LazyMapCleanwalkMarker v-for="cleanwalk in cleanwalksTab" :key="cleanwalk.id" :cleanwalk="cleanwalk" />
  </LazyMapView>
</template>
