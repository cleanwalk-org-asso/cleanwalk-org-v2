<script setup lang="ts">
import {ref} from 'vue';

import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";

defineProps({
    coordinates: Array<Array<number>>
});

const zoom = ref(5.4);


const emit = defineEmits([
  'selected',
])

</script>

<template>
      <div class="map-container">
      <l-map ref="map" class="map" v-model:zoom="zoom" :center="[47.31322, 1.419482]">
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
        ></l-tile-layer>
        <div v-if="coordinates !== undefined && coordinates.length > 0">
          <l-marker v-for="(coor, index) in coordinates" :key="index" :lat-lng="coor" @click="emit('selected', index)"> </l-marker>
        </div>
      </l-map>
    </div>
</template>

<style lang="scss" scoped>

  .map-container{

    width: 100%;
    position: absolute;
    top: 4rem;
    bottom: 5rem;
  }

  .map {
    height: 100%;
    width: 100%;
    z-index: 1;
    }

</style>