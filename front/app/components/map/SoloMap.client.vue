<script setup lang="ts">
import type { SingleCleanwalk } from '@/interfaces/cleanwalkInterface'

const props = defineProps<{ cleanwalk: SingleCleanwalk }>()

const center = ref<[number, number]>([props.cleanwalk.pos_lat, props.cleanwalk.pos_long])
const zoom = ref(12)
</script>

<template>
  <LazyMapView v-model:zoom="zoom" v-model:center="center">
    <LazyMapCleanwalkMarker :cleanwalk="cleanwalk" />
  </LazyMapView>
</template>
