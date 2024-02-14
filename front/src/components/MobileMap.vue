<script setup lang="ts">
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
import L, { LatLng, LatLngBounds, Map, type PointExpression } from "leaflet";
import draggableCard from "@/components/dragCard.vue";

import { ref, type Ref, onMounted } from "vue";

let zoom = ref(5);
let centerMap = ref([48.866667, 2.333333]);
let center: Ref<PointExpression> = ref([48.866667, 2.333333]);

let point1: Ref<LatLng> = ref(L.latLng(48.866667, 2.333333));
let mapInstance: Ref<Map | null> = ref(null);

// Fonction pour initialiser les écouteurs d'événements de la carte
const setMapEvents = (map: Map) => {
    mapInstance.value = map;
    // Ici, vous pouvez ajouter d'autres écouteurs d'événements ou logique relative à la carte
};

function isPointVisible(lat: number, lng: number): boolean {
    if (!mapInstance.value) {
        console.error("Map instance is not available");
        return false;
    }
    // Obtenir les limites actuelles de la carte
    const bounds: LatLngBounds = mapInstance.value.getBounds();

    // Créer un point Leaflet avec les coordonnées
    const point: LatLng = L.latLng(lat, lng);

    // Vérifier si le point est dans les limites
    return bounds.contains(point);
}

const printCo = () => {
    console.log(zoom.value);
    if(mapInstance.value) {
        console.log(isPointVisible(point1.value.lat, point1.value.lng));
    }
};
</script>

<template>
    <main>
        <l-map ref="map" v-model:zoom="zoom" v-model:center="center" @ready="setMapEvents" :min-zoom="5" :useGlobalLeaflet="false">
            <l-tile-layer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base"></l-tile-layer>
            <l-marker @click="printCo" :lat-lng="point1"></l-marker>
        </l-map>
    </main>
    <button @click="printCo" class="test">
        lalla
    </button>
</template>

<style scoped>
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
body,
main {
    margin: 0;
    padding: 0;
    height: 100vh;
    width: 100vw;
}
</style>
