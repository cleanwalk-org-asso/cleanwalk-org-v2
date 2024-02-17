<script setup lang="ts">
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LIcon } from "@vue-leaflet/vue-leaflet";
import L, { LatLng, LatLngBounds, Map, type PointExpression } from "leaflet";
import { ref, type Ref, onMounted, nextTick } from "vue";
import iconLeftArrow from "@/components/icons/icon-left-arrow.vue";
import iconSearch from "@/components/icons/icon-search.vue";
import { useCleanwalkStore } from '@/stores/CleanwalkStore';
import iconClock from './icons/icon-clock.vue';
import iconMiniMap from './icons/icon-mini-map.vue';
import router from "@/router";
import { max } from "date-fns";

const cleanwalkStore = useCleanwalkStore()

const draggableCard = ref<HTMLElement | null>(null);
let zoom = ref(5);
let centerMap = ref([48.866667, 2.333333]);
let center: Ref<PointExpression> = ref([48.866667, 2.333333]);

let point1: Ref<LatLng> = ref(L.latLng(48.866667, 2.333333));
let mapInstance: Ref<Map | null> = ref(null);
let cardListBool = ref(false);
const cleanwalkListContainer =  ref<HTMLElement | null>(null);

const testCleanwalkList = ref([
    {
        id: 1,
        title: "Cleanwalk 1",
        lat: 42.866667,
        lng: 2.333333,
        isAsso: true
    },
    {
        id: 1,
        title: "Cleanwalk 2",
        lat: 45.866667,
        lng: 1.333333,
        isAsso: false
    },
    {
        id: 1,
        title: "Cleanwalk 3",
        lat: 48.866667,
        lng: 4.333333,
        isAsso: false
    },
    {
        id: 1,
        title: "Cleanwalk 4",
        lat: 49.866667,
        lng: 3.333333,
        isAsso: true
    },
    {
        id: 1,
        title: "Cleanwalk 1",
        lat: 42.866667,
        lng: 2.333333,
        isAsso: true
    },
    {
        id: 1,
        title: "Cleanwalk 2",
        lat: 45.866667,
        lng: 1.333333,
        isAsso: false
    },
    {
        id: 1,
        title: "Cleanwalk 3",
        lat: 48.866667,
        lng: 4.333333,
        isAsso: false
    },
    {
        id: 1,
        title: "Cleanwalk 4",
        lat: 49.866667,
        lng: 3.333333,
        isAsso: true
    },
    {
        id: 1,
        title: "Cleanwalk 2",
        lat: 45.866667,
        lng: 1.333333,
        isAsso: false
    },
    {
        id: 1,
        title: "Cleanwalk 3",
        lat: 48.866667,
        lng: 4.333333,
        isAsso: false
    },
    {
        id: 1,
        title: "Cleanwalk 4",
        lat: 49.866667,
        lng: 3.333333,
        isAsso: true
    },
]);


// Fonction pour initialiser les écouteurs d'événements de la carte
const setMapEvents = (map: Map) => {
    mapInstance.value = map;
    // Ici, vous pouvez ajouter d'autres écouteurs d'événements ou logique relative à la carte
};

onMounted(() => {
    console.log(cleanwalkStore.cleanwalkIsSelect.valueOf())
    const card = draggableCard.value;
    if (!card) return;

    let startY = 0;
    let initialBottom = -10;
    let maxHeight = -10 // Limite de hauteur en px

    const onTouchStart = (e: TouchEvent) => {
        if (cleanwalkStore.cleanwalkIsSelect) { //bloquer le slide si aucune cleanwalk sélectionnée
            maxHeight = 65;
        } else {
            maxHeight = -10;
        }
        startY = e.touches[0].clientY;
        initialBottom = parseInt(window.getComputedStyle(card).bottom, 10);
        document.addEventListener('touchmove', onTouchMove, { passive: false });
        document.addEventListener('touchend', onTouchEnd);
    };

    const onTouchMove = (e: TouchEvent) => {
        e.preventDefault(); // Prévenir le scroll de la page
        const diffY = startY - e.touches[0].clientY;
        let newBottom = initialBottom + diffY;
        if (!cleanwalkStore.cleanwalkIsSelect) { // si aucune cleanwalk n'est sélectionnée on affiche la liste
            setCleanwalkList();
        }
        if (newBottom > maxHeight) {
            newBottom = maxHeight; // Appliquer la limite de hauteur
            // Vérifier si la card est à son maximum et logger l'événement
        }
        if (newBottom < 0) newBottom = -10; // Empêcher la card de descendre sous le niveau initial
        card.style.bottom = `${newBottom}px`;
    };

    const onTouchEnd = () => {
        document.removeEventListener('touchmove', onTouchMove);
        document.removeEventListener('touchend', onTouchEnd);
    };

    card.addEventListener('touchstart', onTouchStart);
});

function slideUp() {
    cleanwalkStore.cleanwalkIsSelect = true;
    if (draggableCard.value) {
        draggableCard.value.style.bottom = '65px'; // Modifiez cette valeur selon la hauteur désirée
    }
    }

function slideDown() {
    if (draggableCard.value) {
        draggableCard.value.style.bottom = '-10px';
    }
}

function setCleanwalkList() {
    cardListBool.value = true;
    slideDown();
}

function hideCleanwalkList() {
    cardListBool.value = true;
    nextTick(() => {
        if (cleanwalkListContainer.value) {
            cleanwalkListContainer.value.scrollTop = 0;
        }
    });
}


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
    if (mapInstance.value) {
        console.log(isPointVisible(point1.value.lat, point1.value.lng));
    }
};
function mapClick() {
    slideDown()
}

</script>

<template>
    <main>
        <div class="map-container">
            <l-map ref="map" v-model:zoom="zoom" v-model:center="center" @ready="setMapEvents" :min-zoom="5" @click="mapClick()"
                :useGlobalLeaflet="false">
                <l-tile-layer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base"></l-tile-layer>
                <div v-for="cleanwalk in testCleanwalkList">
                    <l-marker @click="slideUp()" :lat-lng="L.latLng(cleanwalk.lat, cleanwalk.lng)" >
                        <l-icon 
                        :icon-size="[25, 41]"
                        :icon-anchor="[12, 41]"
                        :iconUrl="cleanwalk.isAsso ? 'https://i.ibb.co/XkyvQmm/blue-map.png' : 'https://i.ibb.co/zZjWfnp/green-map.png'"
                        >
                        </l-icon>
                    </l-marker>
                </div>
            </l-map>
        </div>
        <div class="search-bar">
            <button @click="cardListBool = false">
                <iconLeftArrow />
            </button>
            <input @click="hideCleanwalkList()" name="search" type="text" placeholder="Rechercher une cleanwalk" />
            <label for="search">
                <iconSearch />
            </label>
        </div>
        <div ref="draggableCard" class="draggable-card">
            <div class="card-handle">
                <svg width="43" height="3" viewBox="0 0 43 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="43" height="3" rx="1.5" fill="#373646" />
                </svg>
            </div>
            <div class="card-content" v-if="cleanwalkStore.cleanwalkIsSelect">
                <h3>Je nettoie la Nature</h3>
                <div class="flex-container">
                    <div class="left">
                        <div class="top">
                            <icon-clock />
                            <div>Date et heure de l’évènement</div>
                        </div>
                        <div class="bot">
                            <iconMiniMap />
                            <div>Localité, France</div>
                        </div>
                    </div>
                    <div class="right">
                        <img src="../assets/defaultprofile.jpg" alt="profile_picture">
                        <div>username</div>
                    </div>
                </div>
            </div>
            <div class="card-nb-cw" v-else>
                <h3>10 cleanwalks à proximité</h3>
            </div>
        </div>
        <div class="cleanwalk-list" :class="{ 'active': cardListBool === false }">
            <div class="container" ref="cleanwalkListContainer">
                <div v-for="cleanwalk in testCleanwalkList" :key="cleanwalk.id" class="cleanwalk">
                    <div class="title">{{ cleanwalk.title }}</div>
                    <div class="flex">
                        <icon-clock />
                        <div>Date et heure de l’évènement</div>
                    </div>
                    <div class="flex">
                        <iconMiniMap />
                        <div>Localité, France</div>
                    </div>
                </div>
            </div>


        </div>
    </main>
</template>

<style scoped>

html,
body,
main {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100vw;

    .search-bar {
        position: fixed;
        top: 50px;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 90%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: white;
        z-index: 9999;
        border-radius: 12px;
        border: 1px solid #CBD5E1;
        stroke: #CBD5E1;

        input {
            width: 100%;
            padding: 10px;
            border: none;
            outline: none;
            font-size: 14px;
            font-weight: 500;
            color: #373646;
            background-color: white;
            padding: 15px 0;
        }
        label {
            padding-top: 8px;
            padding-right: 10px;
        }

        svg {
            width: 20px;
            height: 20px;
            stroke: #373646;
        }
        
    }

    .map-container {
        height: 100vh;
    }

    .cleanwalk-list {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(128, 128, 128, 0.5); /* Semi-transparent */
        backdrop-filter: blur(5px); /* Appliquer l'effet de flou */
        z-index: 999;
        stroke: black;
        &.active {
            display: none;
        }
        .container {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 73px;
            padding-top: 15px;
            gap: 10px;
            overflow: auto;

            .cleanwalk {
                border: 2px solid rgb(155, 155, 155);
                border-radius: 12px;
                padding: 10px;
                background-color: white;
                width: 90%;
    
                .title {
                    font-size: 16px;
                    font-style: normal;
                    font-weight: 500;
                }
        
                .flex {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
    
            }
        }

    }

    .draggable-card {
        position: fixed;
        bottom: -10px;
        left: 0;
        width: 100%;
        background-color: white;
        border-top-left-radius: 16px;
        border-top-right-radius: 16px;
        z-index: 998;
        transition: bottom 0.3s ease;
        touch-action: none;

        /* Pour améliorer les performances des événements touch */
        .card-handle {
            width: 100%;
            height: 20px;
            border-radius: 10px 10px 0 0;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .card-nb-cw {
            padding: 0 20px 20px 20px;

            h3 {
                font-size: 14px;
                font-style: normal;
                font-weight: 500;
                text-align: center;
                padding-bottom: 60px;
            }

        }

        .card-content {
            padding: 0 20px 20px 20px;

            h3 {
                font-size: 14px;
                font-style: normal;
                font-weight: 500;
            }

            .flex-container {
                display: flex;
                justify-content: space-between;
                line-height: 2px;
                font-size: 12px;

                .left {
                    padding-top: 20px;
                    display: flex;
                    stroke: black;
                    flex-direction: column;

                    .top {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    }

                    .bot {
                        margin-top: 10px;
                        display: flex;
                        align-items: center;
                        gap: 10px;

                    }
                }

                .right {
                    margin-top: 5px;
                    display: flex;
                    align-items: center;
                    flex-direction: column;

                    img {
                        width: 38px;
                        height: 38px;
                        border-radius: 50%;
                        margin-bottom: 10px;
                    }

                    div {
                        font-size: 12px;
                        text-align: center;
                    }
                }
            }
        }
    }
}</style>
