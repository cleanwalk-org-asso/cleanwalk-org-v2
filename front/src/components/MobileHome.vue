<script setup lang="ts">
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LIcon } from "@vue-leaflet/vue-leaflet";
import L, { LatLng, LatLngBounds, Map, type PointExpression } from "leaflet";
import { ref, type Ref, onMounted, nextTick } from "vue";
import iconLeftArrow from "@/components/icons/icon-left-arrow.vue";
import iconSearch from "@/components/icons/icon-search.vue";
import iconInfo from "./icons/icon-info.vue";
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
let mapInstance: Ref<Map | null> = ref(null);
let cardListBool = ref(false);  //to display or not the cleanwalk list
const cleanwalkListContainer = ref<HTMLElement | null>(null); //ref to the html cleanwalk list container

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

const searchInput = ref("");

const backButton = () => {
    cardListBool.value = false
    searchInput.value = "" //reset the search input
};


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
            showCleanwalkList();
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
function showCleanwalkList() {
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
    // get current map limit
    const bounds: LatLngBounds = mapInstance.value.getBounds();

    // create leaflet point whith coordinates
    const point: LatLng = L.latLng(lat, lng);

    // verif if the point is on limit
    return bounds.contains(point);
}

function mapClick() {
    slideDown()
}

</script>

<template>
    <main>
        <div class="map-container">
            <l-map ref="map" v-model:zoom="zoom" v-model:center="center" @ready="setMapEvents" :min-zoom="5"
                @click="mapClick()" :useGlobalLeaflet="false">
                <l-tile-layer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base"></l-tile-layer>
                <div v-for="cleanwalk in testCleanwalkList">
                    <l-marker @click="slideUp()" :lat-lng="L.latLng(cleanwalk.lat, cleanwalk.lng)">
                        <l-icon :icon-size="[25, 41]" :icon-anchor="[12, 41]"
                            :iconUrl="cleanwalk.isAsso ? 'https://i.ibb.co/XkyvQmm/blue-map.png' : 'https://i.ibb.co/zZjWfnp/green-map.png'">
                        </l-icon>
                    </l-marker>
                </div>
            </l-map>
        </div>
        <div class="top-bar">
            <img src="../assets/logo.svg" alt="logo" v-if="!cardListBool">
            <div class="search-bar" :class="{ 'active': cardListBool, 'base': !cardListBool }">
                <button @click="backButton()">
                    <iconLeftArrow />
                </button>
                <input @click="hideCleanwalkList()" name="search" type="text" placeholder="Rechercher une cleanwalk" v-model="searchInput" />
                <label for="search" @click="cardListBool = true">
                    <iconSearch />
                </label>
            </div>
            <button class="info">
                <iconInfo />
            </button>
        </div>
        <div ref="draggableCard" class="draggable-card">
            <div class="card-handle" @click="!cleanwalkStore.cleanwalkIsSelect && (cardListBool = true);">
                <svg width="43" height="3" viewBox="0 0 43 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="43" height="3" rx="1.5" fill="#373646" />
                </svg>
            </div>
            <div class="card-content" v-if="cleanwalkStore.cleanwalkIsSelect">
                <h3>Je nettoie la Nature</h3>
                <router-link to="/cleanwalk" class="flex-container">
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
                        <img src="../assets/defaultprofile.png" alt="profile_picture">
                        <div>username</div>
                    </div>
                </router-link>
            </div>
            <div class="card-nb-cw" v-else>
                <h3>10 cleanwalks à proximité</h3>
            </div>
        </div>
        <div class="cleanwalk-list" :class="{ 'active': cardListBool === false }">
            <div class="container" ref="cleanwalkListContainer">
                <router-link to="/cleanwalk" v-for="cleanwalk in testCleanwalkList" :key="cleanwalk.id" class="cleanwalk">
                    <div class="title">{{ cleanwalk.title }}</div>
                    <div class="flex">
                        <icon-clock />
                        <div>Date et heure de l’évènement</div>
                    </div>
                    <div class="flex">
                        <iconMiniMap />
                        <div>Localité, France</div>
                    </div>
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
    height: 100%;
    width: 100vw;

    .top-bar {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        z-index: 9998;
        background-color: var(--color-primary);
        display: flex;
        padding: 30px 19px 20px;
        justify-content: end;

        img {
            position: absolute;
            left: 31px;
            width: 104px;
            margin-top: 8px;
        }

        .info {
            background-color: #fff;
            border-radius: 8px;
            border: 1px solid #CBD5E1;
            width: 38px;
            height: 38px;
            margin-left: 8px;

            svg {
                stroke: #94A3B8;
            }

        }

        .search-bar {
            &.base {

                input {
                    opacity: 0;
                    position: absolute;
                    width: 1px;
                }
                button {
                    display: none;
                }

                background-color: #fff;
                border-radius: 8px;
                border: 1px solid #CBD5E1;
                width: 38px;
                height: 38px;
                display: flex;
                align-items: center;
                justify-content: center;

                svg {
                    stroke: #94A3B8;
                    width: 24px;
                    height: 24px;
                    margin: 5px 1px 0 0;
                }

            }

            &.active {

                flex-grow: 1;
                display: flex;
                justify-content: space-between;
                align-items: center;
                background-color: white;
                border-radius: 8px;
                border: 1px solid #CBD5E1;
                stroke: #CBD5E1;

                button {
                    padding: 0px 5px 0px 10px;
                    background: none;
                }

                input {
                    width: 100%;
                    border: none;
                    outline: none;
                    font-size: 14px;
                    font-weight: 500;
                    color: #373646;
                    background-color: white;
                    padding: 10px 0;
                }

                label {
                    padding-top: 8px;
                    padding-right: 10px;
                }

                svg {
                    width: 20px;
                    height: 20px;
                    stroke: #94A3B8;
                }

            }
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
        background-color: rgba(128, 128, 128, 0.5);
        /* Semi-transparent */
        backdrop-filter: blur(5px);
        /* Appliquer l'effet de flou */
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
            margin-top: 80px;
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
