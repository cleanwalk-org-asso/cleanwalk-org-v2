<script setup lang="ts">
import type { Cleanwalk, SingleCleanwalk } from '@/interfaces/cleanwalkInterface'
import iconClock from './icons/icon-clock.vue';
import iconMiniMap from './icons/icon-mini-map.vue';
import { useCleanwalkStore } from '@/stores/CleanwalkStore';
import { onMounted, ref, type Ref, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router';
import dateService from '@/services/dateService';
import { useAccountStore } from '@/stores/AccountStore';
import LeaveCwPopup from './popups/LeaveCwPopup.vue';
import ParticipationPopup from './popups/ParticipationPopup.vue';
import MapView from './map/MapView.vue';
import TopBar from './TopBar.vue';

const cleanwalkStore = useCleanwalkStore();
const currenUserId = ref(useAccountStore().CurrentUser?.id);
const token = ref(useAccountStore().getAccessToken());

let currentCleanwalk: Ref<SingleCleanwalk | undefined> = ref(undefined);

onMounted(async () => {
  const id = +useRoute().params.id; // + to convert string to number

  // id is NaN if it's not a number
  if (isNaN(id)) {
    router.push('/404');
    return;
  }


  currentCleanwalk.value = await cleanwalkStore.getCleanwalkById(id, useAccountStore().CurrentUser?.id);

  if (!currentCleanwalk.value) {
    router.push('/404');
  }
})

const showLeaveCwPopup = ref(false);

const toogleLeaveCwPopup = () => {
  showLeaveCwPopup.value = !showLeaveCwPopup.value;
}

let showParticipationPopup = ref(false);

const toggleParticipationPopup = () => {
  showParticipationPopup.value = !showParticipationPopup.value;
}

const getDate = () => {
  if (currentCleanwalk.value && currentCleanwalk.value.date_begin && currentCleanwalk.value.duration) {
    return dateService.getCleanwalkWrittenDate(new Date(currentCleanwalk.value.date_begin), currentCleanwalk.value.duration);
  }
}

const leaveCleanwalk = () => {
  if (!currentCleanwalk.value || !currenUserId.value || !token.value) {
    router.push('/login');
    return;
  }
  cleanwalkStore.leaveCleanwalk(currentCleanwalk.value.id, token.value, currenUserId.value);
  currentCleanwalk.value.is_user_participant = false;
  toogleLeaveCwPopup();
}

const handleJoinCleanwalk = (data: { participantCount: number, isAnonymous: boolean }) => {
  if (!currentCleanwalk.value || !currenUserId.value || !token.value) {
    router.push('/login');
    return;
  }
  cleanwalkStore.joinCleanwalk(currentCleanwalk.value?.id, token.value, data.participantCount, currenUserId.value);
  currentCleanwalk.value.is_user_participant = true;
}

const actionButton = () => {
  if (!currentCleanwalk.value || !currenUserId.value || !token.value) {
    router.push('/login');
    return;
  }
  if (currentCleanwalk.value.host.author_id === currenUserId.value) {
    // edit cleanwalk
    router.push(`/cleanwalk/edit/${currentCleanwalk.value.id}`);
    return;
  }
  if (currentCleanwalk.value.is_user_participant === true) {
    // leave cleanwalk
    toogleLeaveCwPopup();
    return;
  }
  if (currentCleanwalk.value.is_user_participant === false) {
    // join cleanwalk
    toggleParticipationPopup();
    return;
  }
}

const getActionButtonText = (): string => {
  if (currentCleanwalk.value?.host.author_id === currenUserId.value) {
    return "Editer la cleanwalk";
  }
  if (currentCleanwalk.value?.is_user_participant === true) {
    return "Se désinscrire";
  }
  if (currentCleanwalk.value?.is_user_participant === false) {
    return "Je participe";
  }
  return "";
}

// Add a function to check if we're on desktop
const isDesktop = ref(false);
// Add a function to check if we're on iOS
const isIOS = ref(false);

// Check screen size and device OS on mount and when window resizes
const checkScreenSize = () => {
  isDesktop.value = window.innerWidth >= 768;
  // Check if device is iOS (iPhone, iPad, iPod)
  isIOS.value = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});

// Clean up event listener
onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize);
});
</script>

<template>
  <TopBar backUrl="/" pageName="Cleanwalk" />
  <LeaveCwPopup :isVisible="showLeaveCwPopup" :tooglePopup="toogleLeaveCwPopup" :leaveCw="leaveCleanwalk" />
  <ParticipationPopup :isVisible="showParticipationPopup" @close="toggleParticipationPopup" @confirm="handleJoinCleanwalk" />
  
  <main>
    <div>
      <img v-if="currentCleanwalk" class="cover" :src="currentCleanwalk?.img_url" alt="" />
    </div>

    <div class="desktop-layout" v-if="isDesktop && currentCleanwalk">
      <div class="container">
        <h1>{{ currentCleanwalk?.name }}</h1>
        <div class="date-location">
          <div class="top">
            <icon-clock />
            <div>{{ getDate() }}</div>
          </div>
          <div class="bot">
            <iconMiniMap />
            <div>{{ currentCleanwalk?.address }}</div>
          </div>
        </div>
        
        <div class="map-links">
          <!-- Conditionally show Apple Maps or Google Maps depending on device -->
          <a v-if="isIOS" 
             :href="`https://maps.apple.com/?q=${currentCleanwalk?.address}&ll=${currentCleanwalk?.pos_lat},${currentCleanwalk?.pos_long}`"
             target="_blank">
            <img src="../assets/appleMap.svg" alt="Apple Maps logo">
            <h4>Ouvrir dans Plans</h4>
          </a>
          <a v-else 
             :href="`https://www.google.com/maps/?q=${currentCleanwalk?.pos_lat},${currentCleanwalk?.pos_long}`"
             target="_blank">
            <img src="../assets/googleMap.svg" alt="Google Maps logo">
            <h4>Ouvrir dans Google Maps</h4>
          </a>
          
          <a :href="`https://www.openstreetmap.org/?mlat=${currentCleanwalk?.pos_lat}&mlon=${currentCleanwalk?.pos_long}`"
            target="_blank">
            <img src="../assets/osm_logo.webp" alt="OpenStreetMap logo">
            <h4>Ouvrir dans OpenStreetMap</h4>
          </a>
        </div>
        
        <div v-if="currentCleanwalk?.host.author_id === currenUserId" class="participant-count">
          {{ currentCleanwalk?.participant_count }} participant(s)
        </div>
        
        <div class="orga">
          <div class="left">
            <div>organisé par:</div>
            <h2> {{ currentCleanwalk?.host?.name }} </h2>
          </div>
          <div class="right" v-if="currentCleanwalk?.host?.profile_picture">
            <img :src="currentCleanwalk.host.profile_picture" alt="profile-picture">
          </div>
        </div>
        
        <button class="button-primary" @click="actionButton()">
          {{ getActionButtonText() }}
        </button>
        
        <p class="description">
          {{ currentCleanwalk?.description }}
        </p>
      </div>
      
      <div class="map-section">
        <h3>Localisation</h3>
        <div class="map-container">
          <MapView 
            v-if="currentCleanwalk?.pos_lat && currentCleanwalk?.pos_long"
            :cleanwalk = "currentCleanwalk"
          />
        </div>
      </div>
    </div>

    <!-- Mobile layout -->
    <div class="container" v-if="!isDesktop">
      <h1>{{ currentCleanwalk?.name }}</h1>
      <div class="date-location">
        <div class="top">
          <icon-clock />
          <div>{{ getDate() }}</div>
        </div>
        <div class="bot">
          <iconMiniMap />
          <div>{{ currentCleanwalk?.address }}</div>
        </div>
      </div>
      
      <div class="map-links">
        <!-- Conditionally show Apple Maps or Google Maps depending on device -->
        <a v-if="isIOS" 
           :href="`https://maps.apple.com/?q=${currentCleanwalk?.address}&ll=${currentCleanwalk?.pos_lat},${currentCleanwalk?.pos_long}`"
           target="_blank">
          <img src="../assets/appleMap.svg" alt="Apple Maps logo">
          <h4>Ouvrir dans Plans</h4>
        </a>
        <a v-else
           :href="`https://www.google.com/maps/?q=${currentCleanwalk?.pos_lat},${currentCleanwalk?.pos_long}`"
           target="_blank">
          <img src="../assets/googleMap.svg" alt="Google Maps logo">
          <h4>Ouvrir dans Google Maps</h4>
        </a>

        <!-- Always show OpenStreetMap -->
        <a :href="`https://www.openstreetmap.org/?mlat=${currentCleanwalk?.pos_lat}&mlon=${currentCleanwalk?.pos_long}`"
          target="_blank">
          <img src="../assets/osm_logo.webp" alt="OpenStreetMap logo">
          <h4>Ouvrir dans OpenStreetMap</h4>
        </a>
      </div>
      
      <div v-if="currentCleanwalk?.host.author_id === currenUserId">
        {{ currentCleanwalk?.participant_count }} participant(s)
      </div>
      
      <div class="orga">
        <div class="left">
          <div>organisé par:</div>
          <h2> {{ currentCleanwalk?.host?.name }} </h2>
        </div>
        <div class="right" v-if="currentCleanwalk?.host?.profile_picture">
          <img :src="currentCleanwalk.host.profile_picture" alt="profile-picture">
        </div>
      </div>
      
      <button class="button-primary" @click="actionButton()">
        {{ getActionButtonText() }}
      </button>
      
      <p class="description">
        {{ currentCleanwalk?.description }}
      </p>
    </div>
  </main>
</template>

<style scoped lang="scss">
@use '@/assets/main.scss';

main {
  overflow-y: auto;
}

.cover {
  width: 100vw;
  object-fit: cover;
  aspect-ratio: 21/9;
  margin-top: 58px;

  @media (min-width: 768px) {
    height: 20rem;
    width: 100%;
  }
}

.desktop-layout {
  display: flex;
  width: 90%;
  max-width: 1200px;
  margin: 2rem auto;
  gap: 2rem;

  .container {
    flex: 1;
    padding: 0;
  }

  .map-section {
    flex: 1;
    
    h3 {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: var(--text-color-primary);
    }

    .map-container {
      height: 400px;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid #ddd;
    }
  }
}

.container {
  padding: 0 26px;
  font-size: 12px;

  .description {
    width: 100%;
    //le texte ne dois pas depasser et sauter une ligne si besoins
    overflow: hidden;
    word-wrap: break-word;
  }

  h1 {
    color: var(--text-color-primary);
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    padding: 20px 0 30px;
  }

  .date-location {
    display: flex;
    stroke: var(--text-color-primary);
    flex-direction: column;
    padding-bottom: 20px;
    font-size: 12px;

    .top {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .bot {
      margin-top: 5px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }

  .map-links {
    display: flex;
    justify-content: space-between;
    border: dashed 2px #0cab2e;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 8px;

    a {
      display: flex;
      align-items: center;
      gap: 10px;

      img {
        width: 30px;
        height: 30px;
      }

      h4 {
        font-size: 12px;
        font-style: normal;
        font-weight: 500;
        line-height: 18px;
        letter-spacing: 0em;
        text-align: center;
        text-align: left;
        max-width: 6rem;
      }
    }
  }

  .participant-count {
    margin-bottom: 1rem;
    font-weight: 500;
  }

  .orga {
    display: flex;
    background-color: var(--color-secondary);
    justify-content: space-between;
    border-radius: 8px;
    padding: 11px 20px 4px 14px;
    margin-bottom: 20px;

    .left {
      display: flex;
      flex-direction: column;

      h2 {
        font-size: 15px;
        font-style: normal;
        font-weight: 700;
      }
    }

    .right {
      img {
        border-radius: 9999px;
        width: 44px;
        height: 44px;
        object-fit: cover;
      }
    }
  }

  .button-primary {
    padding: 15px 0;
    width: 100%;
    text-align: center;
  }

  p {
    padding-top: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
  }

  @media (min-width: 768px) {
    width: 100%;
    margin: 0;
    padding: 0;
  }
}
</style>