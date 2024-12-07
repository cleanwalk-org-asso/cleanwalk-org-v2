<script setup lang="ts">

import { useCleanwalkMap } from '@/composables/useCleanwalkMap';
import { LMap, LTileLayer, LMarker, LIcon } from "@vue-leaflet/vue-leaflet";
import L, { LatLng, LatLngBounds, Map, type PointExpression } from "leaflet";
import { ref, type Ref } from 'vue';
import greenMapIcon from "@/assets/green-map.svg";
import blueMapIcon from "@/assets/blue-map.svg";
import { useCleanwalkStore } from '@/stores/CleanwalkStore';
import BaseSearchInput from './base/BaseSearchInput.vue';
import CleanwalkListCard from './cards/CleanwalkListCard.vue';
import CleanwalkSoloCard from './cards/CleanwalkSoloCard.vue';

const cleanwalkStore = useCleanwalkStore();

const {
    mapInstance,
    filteredCleanwalks,
    selectedCleanwalk,
    searchInput,
    setMapEvents,
    setSelectedCleanwalk,
    mapClick,
} = useCleanwalkMap();



const draggableCard = ref<HTMLElement | null>(null);
let zoom = ref(6);
let center: Ref<PointExpression> = ref([47.2, 2.333333]);

const showSoloCW = (id: number) => {
    setSelectedCleanwalk(id);
    const card = document.getElementById(`cleanwalk-${id}`);
    if (card) {
        card.scrollIntoView({ behavior: "smooth", block: "center" });
    }
};

</script>

<template>
    <main>
        <div class="map-container">
            <l-map ref="map" v-model:zoom="zoom" v-model:center="center" @ready="setMapEvents" :min-zoom="5"
                @click="mapClick()" :useGlobalLeaflet="false">
                <l-tile-layer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base"></l-tile-layer>
                <div v-for="cleanwalk in cleanwalkStore.cleanwalksTab" :key="cleanwalk.id">
                    <l-marker @click="showSoloCW(cleanwalk.id!)" :lat-lng="L.latLng(cleanwalk.pos_lat, cleanwalk.pos_long)">
                        <l-icon :icon-size="[25, 41]" :icon-anchor="[12, 41]"
                            :iconUrl="cleanwalk.host?.role_id === 1 ? blueMapIcon : greenMapIcon">
                        </l-icon>
                    </l-marker>
                    <CleanwalkSoloCard :cleanwalk="cleanwalk" v-if="filteredCleanwalks.length === 1"/>
                </div>
            </l-map>
        </div>

        <div class="cleanwalk-container">
            <BaseSearchInput v-model="searchInput" name="search" placeholder="Rechercher une cleanwalk" />
            <div class="container" ref="cleanwalkListContainer">
                <router-link v-for="cleanwalk in filteredCleanwalks"
                    :to="{ name: 'cleanwalk', params: { id: cleanwalk.id } }" :key="cleanwalk.id" class="listContainer">
                    <CleanwalkListCard :cleanwalk="cleanwalk" />
                </router-link>
            </div>
        </div>
    </main>
</template>

<style scoped lang="scss">
html,
body,
main {
    margin: 0;
    padding: 0;
    height: 100vh;
    width: 100vw;
}

.map-container {
    height: 100%;
    width: 100%;
    padding-top: 5.5rem;
}

.cleanwalk-container {
    position: fixed;
    bottom: 50%;
    left: 1rem;
    transform: translateY(calc(50% + 2.75rem));
    width: 30rem;
    padding: 1rem;
    background-color: #F8FAFD;
    box-shadow: 0px -10px 100px rgba(194, 194, 194, 0.2);
    z-index: 999;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: calc(100% - 9rem);
    border-radius: 8px;

    .container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow-y: auto;
        max-height: 100%;
    }
}
</style>