<script lang="ts" setup>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LIcon } from "@vue-leaflet/vue-leaflet";
import L, { type PointExpression } from "leaflet";
import { onMounted, ref, type Ref } from 'vue';
import greenMapIcon from "@/assets/green-map.svg";
import blueMapIcon from "@/assets/blue-map.svg";
import { useCleanwalkStore } from '@/stores/CleanwalkStore';

let zoom = ref(6);
let center: Ref<PointExpression> = ref([47.866667, 2.333333]);

const cleanwalkStore = useCleanwalkStore();

onMounted(async () => {
    await cleanwalkStore.getAllCleanwalks();
});

</script>
<template>
    <section class="map-section">
        <div class="container">
            <h2>
                Découvrez les ramassages organisés près de chez vous !
            </h2>
            <p>
                Parcourez les événements organisés partout en France par la communauté Cleawalk.org grâce à notre carte
                interactive.
            </p>
        </div>
        <div class="map-container">
            <l-map ref="map" v-model:zoom="zoom" v-model:center="center" :min-zoom="5" :useGlobalLeaflet="false">
                <l-tile-layer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base"></l-tile-layer>
                <div v-for="cleanwalk in cleanwalkStore.cleanwalksTab" :key="cleanwalk.id">
                    <l-marker :lat-lng="L.latLng(cleanwalk.pos_lat, cleanwalk.pos_long)">
                        <l-icon :icon-size="[25, 41]" :icon-anchor="[12, 41]"
                            :iconUrl="cleanwalk.host?.role_id === 1 ? blueMapIcon : greenMapIcon">
                        </l-icon>
                    </l-marker>
                </div>
            </l-map>
            <div class="map-overlay">
                <h3>
                    Découvrir les Cleanwalks
                </h3>
                <div>
                    Pas d'inscription requise
                </div>
                <router-link to="/map" class="action-button">Ouvrir la carte</router-link>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.map-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f5f5f5;
    position: relative;
}

.map-container {
    border-radius: 8px;
    overflow: hidden;
    width: 1340px;
    height: 571px;
    position: relative;
    
    .map-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(15px);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
        z-index: 1000;
        pointer-events: none;
        flex-direction: column;
        color: var(--text-color-secondary);

        h3 {
            font-size: 2.5rem;
            font-weight: 900;
            line-height: 2.375rem;
            padding-bottom: 1rem;
            padding-top: 15.38rem;
        }

        div {
            color: var(--Gris-textes-principaux, #373646);
            text-align: center;
            font-family: "DM Sans";
            font-size: 1.25rem;
            font-style: normal;
            font-weight: 500;
            line-height: 1.5rem;
            padding-bottom: 7.69rem;
        }

        .action-button {
            display: flex;
            width: 16rem;
            height: 4rem;
            padding: 0.75rem;
            justify-content: center;
            align-items: center;
            gap: 0.5rem;
            flex-shrink: 0;
        }
    }
    
    &:hover {
        .map-overlay {
            opacity: 1;
            pointer-events: auto; /* Rend l'overlay cliquable au survol */
        }
    }

}

.container {
    width: 1340px;
    h2 {
        width: 547px;
        color: var(--color-primary);
        font-size: 40px;
        font-style: normal;
        font-weight: 900;
        line-height: 50px;
        padding-bottom: 1.5rem;
        padding-top: 9.38rem;
    }
    
    p {
        max-width: 455px;
        color: var(--text-color-secondary);
        font-family: "DM Sans";
        font-size: 20px;
        font-style: normal;
        font-weight: 500;
        line-height: 2rem;
        padding-bottom: 4.75rem;
    }
}
</style>