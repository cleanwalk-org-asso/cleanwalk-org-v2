<script setup lang="ts">
import "leaflet/dist/leaflet.css"
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet"
import { ref } from "vue"
import { LMarker } from "@vue-leaflet/vue-leaflet";
let zoom = ref(5)
let centerMap = ref([48.866667, 2.333333])

let point1 = ref([47.866667, 2.333333])

const printCo = () => {
    console.log(zoom.value)
}

</script>

<template>
    <main>
        <l-map ref="map" v-model:zoom="zoom" v-model:center="centerMap" :useGlobalLeaflet="false">
            <l-tile-layer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base">

            </l-tile-layer>
            <l-marker @click="printCo" :lat-lng="point1"></l-marker>
        </l-map>
    </main>
    <button @click="printCo()" class="test">
        lalla
    </button>
</template>


<style lang="scss" scoped>

.test {
    position: absolute;
    z-index: 999;
    top: 0;
    right: 0;
    background-color: rebeccapurple;
    padding: 10px;
    color: white;


}
html,
body {
    margin: 0;
    padding: 0;
}

main {
    height: 100vh;
    width: 100vw;
}
</style>