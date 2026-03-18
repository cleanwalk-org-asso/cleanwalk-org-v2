<script setup lang="ts">
import type { CleanwalkUserSummary, SingleCleanwalk } from '@/interfaces/cleanwalkInterface'
import { onMounted, ref, onUnmounted, computed, watch } from 'vue';
import router from '@/router';
import dateService from '@/services/dateService';
import { useAccountStore } from '@/stores/AccountStore';
import LeaveCwPopup from './popups/LeaveCwPopup.vue';
import ParticipationPopup from './popups/ParticipationPopup.vue';
import MapSoloCw from '@/components/map/MapSoloCw.vue';
import TopBar from './TopBar.vue';
import { useUtilsStore } from '@/stores/UtilsStore';
import { useCleanwalkStore } from '@/stores/CleanwalkStore';
import { Clock, MapPin } from 'lucide-vue-next';
import CleanwalkChat from './CleanwalkChat.vue';
import { getCleanwalkRouteParams } from '@/services/cleanwalkSlug';

const cleanwalkStore = useCleanwalkStore();
const accountStore = useAccountStore();
const currenUserId = computed(() => accountStore.CurrentUser?.id);
const currentUsername = computed(() => accountStore.CurrentUser?.name ?? 'Anonyme');
const showToast = useUtilsStore().showToast;

// Define props with modelValue for two-way binding
const props = defineProps<{ 
  modelValue: SingleCleanwalk 
}>();

// Define emit to update the parent's value
const emit = defineEmits<{
  (e: 'update:modelValue', value: SingleCleanwalk): void
}>();

// Create computed property for two-way binding
const cleanwalk = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const showLeaveCwPopup = ref(false);
const toogleLeaveCwPopup = () => {
  showLeaveCwPopup.value = !showLeaveCwPopup.value;
}

const cleanwalkUsers = ref<CleanwalkUserSummary[]>([]);
const isUsersAccordionOpen = ref(false);
const isLoadingCleanwalkUsers = ref(false);

const isCurrentUserHost = computed(() => {
  return !!cleanwalk.value?.host?.id && cleanwalk.value.host.id === currenUserId.value;
});

const canShowParticipantCount = computed(() => {
  return isCurrentUserHost.value || !!cleanwalk.value?.participant_count_public;
});

const toggleUsersAccordion = () => {
  isUsersAccordionOpen.value = !isUsersAccordionOpen.value;
};

const fetchCleanwalkUsers = async () => {
  if (!cleanwalk.value?.id || !isCurrentUserHost.value) {
    cleanwalkUsers.value = [];
    isUsersAccordionOpen.value = false;
    return;
  }

  isLoadingCleanwalkUsers.value = true;
  cleanwalkUsers.value = await cleanwalkStore.getCleanwalkUsers(cleanwalk.value.id);
  isLoadingCleanwalkUsers.value = false;
};

let showParticipationPopup = ref(false);
const toggleParticipationPopup = () => {
  showParticipationPopup.value = !showParticipationPopup.value;
}

const getDate = () => {
  if (cleanwalk.value && cleanwalk.value.date_begin && cleanwalk.value.duration) {
    return dateService.getCleanwalkWrittenDate(new Date(cleanwalk.value.date_begin), cleanwalk.value.duration);
  }
}

const leaveCleanwalk = async () => {
  if (!cleanwalk.value || !currenUserId.value) {
    router.push({ name: 'login', query: { redirect: router.currentRoute.value.fullPath } });
    return;
  }
  await cleanwalkStore.leaveCleanwalk(cleanwalk.value.id, currenUserId.value);
  
  // Update the cleanwalk object through the computed setter
  const updatedCleanwalk = { ...cleanwalk.value };
  updatedCleanwalk.is_user_participant = false;
  cleanwalk.value = updatedCleanwalk;
  
  showToast('Désinscription réussie', true);
  toogleLeaveCwPopup();
}

const handleJoinCleanwalk = async (data: { participantCount: number, isAnonymous: boolean }) => {
  if (!cleanwalk.value || !currenUserId.value) {
    router.push({ name: 'login', query: { redirect: router.currentRoute.value.fullPath } });
    return;
  }
  await cleanwalkStore.joinCleanwalk(cleanwalk.value.id, data.participantCount, currenUserId.value);
  
  // Update the cleanwalk object through the computed setter
  const updatedCleanwalk = { ...cleanwalk.value };
  updatedCleanwalk.is_user_participant = true;
  cleanwalk.value = updatedCleanwalk;
  
  showToast('Inscription réussie', true);
  toggleParticipationPopup();
}

const actionButton = () => {
  if (!cleanwalk.value || !currenUserId.value) {
    router.push({ name: 'login', query: { redirect: router.currentRoute.value.fullPath } });
    return;
  }
  if (cleanwalk.value.host.id === currenUserId.value) {
    // edit cleanwalk
    router.push({ name: 'editCleanwalk', params: getCleanwalkRouteParams(cleanwalk.value) });
    return;
  }
  if (cleanwalk.value.is_user_participant === true) {
    // leave cleanwalk
    toogleLeaveCwPopup();
    return;
  }
  if (cleanwalk.value.is_user_participant === false) {
    // join cleanwalk
    toggleParticipationPopup();
    return;
  }
}

const getActionButtonText = (): string => {
  if (isCurrentUserHost.value) {
    return "Editer la cleanwalk";
  }
  if (cleanwalk.value?.is_user_participant === true) {
    return "Se désinscrire";
  }
  if (cleanwalk.value?.is_user_participant === false) {
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

watch(
  () => [cleanwalk.value?.id, cleanwalk.value?.host?.id],
  async () => {
    await fetchCleanwalkUsers();
  },
  { immediate: true }
);

// Clean up event listener
onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize);
});
</script>

<template>
  <TopBar backUrl="/cleanwalks" pageName="Cleanwalk" />
  <LeaveCwPopup :isVisible="showLeaveCwPopup" :tooglePopup="toogleLeaveCwPopup" :leaveCw="leaveCleanwalk" />
  <ParticipationPopup :isVisible="showParticipationPopup" @close="toggleParticipationPopup" @confirm="handleJoinCleanwalk" format="screen" />
  
  <main>
    <div>
      
    </div>

    <div class="desktop-layout" v-if="isDesktop && cleanwalk">
      <div class="container">
        <img v-if="cleanwalk" class="cover" :src="cleanwalk?.img_url" alt="cover image" />
        <h1>{{ cleanwalk?.name }}</h1>
        <div class="date-location">
          <div class="top">
            <Clock :size="16" color="#363545"/>
            <div>{{ getDate() }}</div>
          </div>
          <div class="bot">
            <MapPin :size="16" color="#363545"/>
            <div>{{ cleanwalk?.address }}</div>
          </div>
        </div>
        
        <div class="map-links">
          <a v-if="isIOS" 
             :href="`https://maps.apple.com/?q=${cleanwalk?.address}&ll=${cleanwalk?.pos_lat},${cleanwalk?.pos_long}`"
             target="_blank">
            <img src="../assets/appleMap.svg" alt="Apple Maps logo">
            <h4>Ouvrir dans Plans</h4>
          </a>
          <a v-else 
             :href="`https://www.google.com/maps/?q=${cleanwalk?.pos_lat},${cleanwalk?.pos_long}`"
             target="_blank">
            <img src="../assets/googleMap.svg" alt="Google Maps logo">
            <h4>Ouvrir dans Google Maps</h4>
          </a>
          
          <a :href="`https://www.openstreetmap.org/?mlat=${cleanwalk?.pos_lat}&mlon=${cleanwalk?.pos_long}`"
            target="_blank">
            <img src="../assets/osm_logo.webp" alt="OpenStreetMap logo">
            <h4>Ouvrir dans OpenStreetMap</h4>
          </a>
        </div>
        
        <div v-if="canShowParticipantCount" class="participant-count">
          {{ cleanwalk?.participant_count }} participant(s)
        </div>

        <div v-if="isCurrentUserHost" class="participants-accordion">
          <button class="participants-accordion-header" @click="toggleUsersAccordion">
            <span>Participants inscrits</span>
            <span class="participants-accordion-icon" :class="{ open: isUsersAccordionOpen }">⌄</span>
          </button>

          <div v-show="isUsersAccordionOpen" class="participants-accordion-content">
            <div v-if="isLoadingCleanwalkUsers" class="participants-empty">Chargement...</div>
            <div v-else-if="cleanwalkUsers.length === 0" class="participants-empty">Aucun participant pour le moment.</div>

            <div v-else class="participants-list">
              <div v-for="user in cleanwalkUsers" :key="user.id" class="participant-item">
                <div class="participant-left">
                  <img v-if="user.profilePicture" :src="user.profilePicture" alt="photo de profil" class="participant-avatar" />
                  <div v-else class="participant-avatar participant-avatar-fallback">{{ user.name.charAt(0).toUpperCase() }}</div>

                  <div class="participant-name">{{ user.name }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="orga">
          <div class="left">
            <div>organisé par:</div>
            <h2> {{ cleanwalk?.host?.name }} </h2>
          </div>
          <div class="right" v-if="cleanwalk?.host?.profilePicture">
            <img :src="cleanwalk.host.profilePicture" alt="profile-picture">
          </div>
        </div>
        
        <button class="button-primary" @click="actionButton()">
          {{ getActionButtonText() }}
        </button>
        
        <p class="description text-sm">
          {{ cleanwalk?.description }}
        </p>
      </div>
      
      <div class="right-section">
        <h3>Localisation</h3>
        <div class="map-container">
          <MapSoloCw 
            v-if="cleanwalk?.pos_lat && cleanwalk?.pos_long"
            :cleanwalk = "cleanwalk"
          />
        </div>
        <div>
          <CleanwalkChat
            v-if="cleanwalk?.id"
            :username="currentUsername"
            :cleanwalkId="cleanwalk.id.toString()"
          />
        </div>
      </div>

    </div>

    <div class="container" v-if="!isDesktop">
      <img v-if="cleanwalk" class="cover" :src="cleanwalk?.img_url" alt="cover image" />
      <div class="content">
        <h1>{{ cleanwalk?.name }}</h1>
        <div class="date-location">
          <div class="top">
            <Clock :size="16" color="#363545"/>
            <div>{{ getDate() }}</div>
          </div>
          <div class="bot">
            <MapPin :size="16" color="#363545"/>
            <div>{{ cleanwalk?.address }}</div>
          </div>
        </div>
        
        <div class="map-links">
          <a v-if="isIOS" 
             :href="`https://maps.apple.com/?q=${cleanwalk?.address}&ll=${cleanwalk?.pos_lat},${cleanwalk?.pos_long}`"
             target="_blank">
            <img src="../assets/appleMap.svg" alt="Apple Maps logo">
            <h4>Ouvrir dans Plans</h4>
          </a>
          <a v-else
             :href="`https://www.google.com/maps/?q=${cleanwalk?.pos_lat},${cleanwalk?.pos_long}`"
             target="_blank">
            <img src="../assets/googleMap.svg" alt="Google Maps logo">
            <h4>Ouvrir dans Google Maps</h4>
          </a>
  
          <a :href="`https://www.openstreetmap.org/?mlat=${cleanwalk?.pos_lat}&mlon=${cleanwalk?.pos_long}`"
            target="_blank">
            <img src="../assets/osm_logo.webp" alt="OpenStreetMap logo">
            <h4>Ouvrir dans OpenStreetMap</h4>
          </a>
        </div>
        
        <div v-if="canShowParticipantCount" class="participant-count">
          {{ cleanwalk?.participant_count }} participant(s)
        </div>

        <div v-if="isCurrentUserHost" class="participants-accordion">
          <button class="participants-accordion-header" @click="toggleUsersAccordion">
            <span>Participants inscrits</span>
            <span class="participants-accordion-icon" :class="{ open: isUsersAccordionOpen }">⌄</span>
          </button>

          <div v-show="isUsersAccordionOpen" class="participants-accordion-content">
            <div v-if="isLoadingCleanwalkUsers" class="participants-empty">Chargement...</div>
            <div v-else-if="cleanwalkUsers.length === 0" class="participants-empty">Aucun participant pour le moment.</div>

            <div v-else class="participants-list">
              <div v-for="user in cleanwalkUsers" :key="user.id" class="participant-item">
                <div class="participant-left">
                  <img v-if="user.profilePicture" :src="user.profilePicture" alt="photo de profil" class="participant-avatar" />
                  <div v-else class="participant-avatar participant-avatar-fallback">{{ user.name.charAt(0).toUpperCase() }}</div>

                  <div class="participant-name">{{ user.name }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="orga">
          <div class="left">
            <div>organisé par:</div>
            <h2> {{ cleanwalk?.host?.name }} </h2>
          </div>
          <div class="right" v-if="cleanwalk?.host?.profilePicture">
            <img :src="cleanwalk.host.profilePicture" alt="profile-picture">
          </div>
        </div>
        
        <button class="button-primary" @click="actionButton()">
          {{ getActionButtonText() }}
        </button>
        
        <p class="description">
          {{ cleanwalk?.description }}
        </p>

        <div class="mt-6">
          <CleanwalkChat
            v-if="cleanwalk?.id"
            :username="currentUsername"
            :cleanwalkId="cleanwalk.id.toString()"
          />
        </div>
      </div>
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

  @media (min-width: 768px) {
    height: 12rem;
    width: 100%;
    margin-top: 3rem;
    border-radius: 8px;
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

  .right-section {
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
  font-size: 12px;
  padding-top: 3.5rem;

  .content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0 26px;

  }

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

  .participants-accordion {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    margin-bottom: 1rem;
    overflow: hidden;
    background-color: #ffffff;
  }

  .participants-accordion-header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    border: none;
    background: #f8f9fa;
    font-size: 14px;
    font-weight: 600;
    color: #2f2f2f;
    cursor: pointer;
  }

  .participants-accordion-icon {
    transition: transform 0.2s ease;
    display: inline-flex;
  }

  .participants-accordion-icon.open {
    transform: rotate(180deg);
  }

  .participants-accordion-content {
    border-top: 1px solid #e9ecef;
    padding: 0.5rem;
  }

  .participants-empty {
    font-size: 13px;
    color: #6b7280;
    padding: 0.5rem;
  }

  .participants-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 0.5rem;
  }

  .participant-item {
    display: block;
    padding: 0.5rem;
    border-radius: 8px;
    background: #f7f7f7;
  }

  .participant-left {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-width: 0;
  }

  .participant-avatar {
    width: 32px;
    height: 32px;
    border-radius: 9999px;
    object-fit: cover;
    flex-shrink: 0;
  }

  .participant-avatar-fallback {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    color: #1f2937;
    background: #dbe4ff;
  }

  .participant-name {
    font-size: 14px;
    font-weight: 500;
    color: #1f2937;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .orga {
    display: flex;
    background-color: #F5F5F5;
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