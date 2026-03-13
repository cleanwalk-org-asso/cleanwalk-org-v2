<script lang="ts" setup>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LIcon } from "@vue-leaflet/vue-leaflet";
import L, { type PointExpression } from "leaflet";
import { onMounted, ref, watch, type Ref } from 'vue';
import greenMapIcon from "@/assets/green-map.svg";
import blueMapIcon from "@/assets/blue-map.svg";
import { useCleanwalkStore } from '@/stores/CleanwalkStore';
import { useDevice } from '@/composables/useDevice';

let zoom = ref(6);
let center: Ref<PointExpression> = ref([47.5, 2.333333]);
const { isMobile } = useDevice();

const cleanwalkStore = useCleanwalkStore();

const updateZoomForViewport = () => {
    zoom.value = isMobile.value ? 5 : 6;
}

watch(isMobile, updateZoomForViewport, { immediate: true });

onMounted(async () => {
    await cleanwalkStore.getAllCleanwalks();
});

</script>
<template>
    <section class="p-8 flex flex-col items-center gap-8 relative pb-32 overflow-hidden">
        <svg class="h-fit absolute bottom-0 left-1/2 -translate-x-1/2 w-[1500px] md:w-[2500px]"
            height="750" viewBox="0 0 3500 750" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 750C0 335.786 783.502 0 1750 0C2716.5 0 3500 335.786 3500 750H0Z"
                fill="url(#paint0_radial_1230_13104)" />
            <defs>
                <radialGradient id="paint0_radial_1230_13104" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(1481.5 -56.4999) rotate(68.6345) scale(2746.23 21878.1)">
                    <stop stop-color="#132778" />
                    <stop offset="1" stop-color="#2348DE" />
                </radialGradient>
            </defs>
        </svg>
        <div class="m-5 relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden group shadow-lg">

            <l-map ref="map" v-model:zoom="zoom" v-model:center="center" :min-zoom="isMobile ? 5 : 6" :max-zoom="isMobile ? 5 : 6"
                :useGlobalLeaflet="false">
                <l-tile-layer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base"></l-tile-layer>
                <div v-for="cleanwalk in cleanwalkStore.cleanwalksTab" :key="cleanwalk.id">
                    <l-marker :lat-lng="L.latLng(cleanwalk.pos_lat, cleanwalk.pos_long)">
                        <l-icon :icon-size="[25, 41]" :icon-anchor="[12, 41]"
                            :iconUrl="cleanwalk.host?.role === 'ASSOCIATION' ? greenMapIcon : blueMapIcon">
                        </l-icon>
                    </l-marker>
                </div>
            </l-map>
            <div
                class="hidden group-hover:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-400 bg-gray-800/20 backdrop-blur-[2px] p-8 rounded-2xl w-full h-full hover:flex hover:items-center hover:justify-center flex-col text-center gap-8">
                <h3 class="text-2xl font-bold mb-2">
                    Découvrir les Cleanwalks
                </h3>
                <div class="mb-4">
                    Pas d'inscription requise
                </div>
                <router-link :to="{ name: 'map' }"
                    class="inline-block px-6 py-3 bg-primary text-white! md:text-2xl rounded-lg font-medium transition-colors">Ouvrir
                    la carte</router-link>
            </div>
        </div>
    </section>
</template>
