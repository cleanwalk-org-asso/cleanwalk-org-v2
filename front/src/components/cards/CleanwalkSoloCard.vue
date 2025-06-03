<script setup lang="ts">
import type { Cleanwalk } from '@/interfaces/cleanwalkInterface';
import dateService from '@/services/dateService';
import { Clock, MapPin, ExternalLink, X } from 'lucide-vue-next';
import ParticipationPopup from '../popups/ParticipationPopup.vue';
import LeaveCwPopup from '../popups/LeaveCwPopup.vue';
import { onMounted, ref } from 'vue';
import router from '@/router';
import { useAccountStore } from '@/stores/AccountStore';
import { useUtilsStore } from '@/stores/UtilsStore';
import { useCleanwalkStore } from '@/stores/CleanwalkStore';

//define props
const props = defineProps<{
    cleanwalk: Cleanwalk,
    onClose: Function
}>()

const cleanwalkStore = useCleanwalkStore();
const currenUserId = ref(useAccountStore().CurrentUser?.id);
const token = ref(useAccountStore().getAccessToken());
const showToast = useUtilsStore().showToast;

const defaultCover = '/src/assets/default_cover.webp'
const showParticipationPopup = ref(false);
const showLeaveCwPopup = ref(false);

const currenCleanwalkParticipation = ref<{
    is_participant: boolean,
    is_host: boolean
} | null>(null);

onMounted(async() => {
    //check if user is participating in the cleanwalk
    if (!props.cleanwalk.id || !currenUserId.value) {
        return;
    }
    currenCleanwalkParticipation.value = await cleanwalkStore.checkUserParticipation(props.cleanwalk.id!, currenUserId.value!);
    
});

const toggleParticipationPopup = () => {
    showParticipationPopup.value = !showParticipationPopup.value;
}

const toggleLeaveCwPopup = () => {
    showLeaveCwPopup.value = !showLeaveCwPopup.value;
}

const handleJoinCleanwalk = async (data: { participantCount: number, isAnonymous: boolean }) => {
    if (!props.cleanwalk || !currenUserId.value || !token.value) {
        router.push({ name: 'login', query: { redirect: router.currentRoute.value.fullPath } });
        return;
    }
    
    try {
        await cleanwalkStore.joinCleanwalk(props.cleanwalk.id!, token.value, data.participantCount, currenUserId.value);
        
        // Update participation status
        currenCleanwalkParticipation.value = {
            is_participant: true,
            is_host: false
        };
        
        showToast('Inscription réussie', true);
        toggleParticipationPopup();
    } catch (error) {
        showToast('Erreur lors de l\'inscription', false);
        console.error('Error joining cleanwalk:', error);
    }
}

const leaveCleanwalk = async () => {
    if (!props.cleanwalk || !currenUserId.value || !token.value) {
        router.push({ name: 'login', query: { redirect: router.currentRoute.value.fullPath } });
        return;
    }
    
    try {
        await cleanwalkStore.leaveCleanwalk(props.cleanwalk.id!, token.value, currenUserId.value);
        
        // Update participation status
        currenCleanwalkParticipation.value = {
            is_participant: false,
            is_host: false
        };
        
        showToast('Désinscription réussie', true);
        toggleLeaveCwPopup();
    } catch (error) {
        showToast('Erreur lors de la désinscription', false);
        console.error('Error leaving cleanwalk:', error);
    }
}

const ShowParticipationPopup = () => {
    if (!currenUserId.value || !token.value) {
        router.push({ name: 'login', query: { redirect: router.currentRoute.value.fullPath } });
        return;
    }
    
    // Check if user is the host
    if (currenCleanwalkParticipation.value?.is_host) {
        // Redirect to edit cleanwalk
        router.push({ name: 'editCleanwalk', params: { id: props.cleanwalk.id!.toString() } });
        return;
    }
    
    // Check if user is already participating
    if (currenCleanwalkParticipation.value?.is_participant) {
        // Show leave popup
        toggleLeaveCwPopup();
    } else {
        // Show participation popup
        toggleParticipationPopup();
    }
}

const getButtonParticipationText = () => {
    if (currenCleanwalkParticipation.value?.is_host) {
        return 'Éditer la cleanwalk';
    } else if (currenCleanwalkParticipation.value?.is_participant) {
        return 'Se désinscrire';
    } else {
        return 'S\'inscrire';
    }
}

</script>

<template>
    <div class="solo-cw">
        <img :src="props.cleanwalk.img_url ?? defaultCover" alt="cleanwalk image">
        <div class="btn-container">
            <router-link class="btn" :to="{ name: 'cleanwalk', params: { id: props.cleanwalk.id } }">
                <ExternalLink color="#65707F" />
            </router-link>
            <button class="btn" @click="props.onClose()">
                <X color="#65707F" />
            </button>
        </div>
        <div class="container">
            <LeaveCwPopup :isVisible="showLeaveCwPopup" :tooglePopup="toggleLeaveCwPopup" :leaveCw="leaveCleanwalk" />
            <ParticipationPopup 
                :is-visible="showParticipationPopup" 
                format="card" 
                @close="toggleParticipationPopup"
                @confirm="handleJoinCleanwalk"
            />
            <div class="content">
                <div class="title">{{ props.cleanwalk.name }}</div>
                <div class="date">
                    <Clock :size="20" color="#363545" />
                    <div>{{ dateService.getCleanwalkWrittenDate(new Date(props.cleanwalk.date_begin), props.cleanwalk.duration) }}
                    </div>
                </div>
                <div>
                    <MapPin :size="20" color="#363545"/>
                    <div>{{ props.cleanwalk.address }}</div>
                </div>
                <p>
                    {{ props.cleanwalk.description }}
                </p>
            </div>

            <div class="bot">
                <div class="organizer">
                    <div class="label">
                        Organisé par:
                    </div>
                    <h3>
                        {{ props.cleanwalk.host!.name }}
                    </h3>
                </div>
                <button class="action-button" @click="ShowParticipationPopup()">
                    {{ getButtonParticipationText() }}
                </button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.solo-cw {
    position: fixed;
    transform: translateY(calc(50% + 2.75rem));
    background-color: #fff;
    z-index: 10000;
    bottom: 50%;
    left: 1rem;
    height: calc(100% - 9rem);
    border-radius: 8px;
    width: 30rem;
    overflow: hidden;
    stroke: #65707F;
    color: #65707F;
    font-size: 1.125rem;

    .btn-container {
        position: absolute;
        top:1rem;
        right: 1rem;
        z-index: 10001;
        display: flex;
        gap: 1.5rem;

        .btn {
            background-color: #E8E8E8;
            display: flex;
            width: 2.5rem;
            height: 2.5rem;
            align-items: center;
            justify-content: center;
            border-radius: 999px;
        }
    }

    img {
        width: 100%;
        aspect-ratio: 21/9;
        object-fit: cover;
    }

    .container {
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: calc(100% - 205px); // 205px = static height of the banner
    }

    
    .content {
        
        .title {
            padding-bottom: 1.5rem;
            color: #373646;
            font-size: 1.5625rem;
            font-weight: 700;
        }
        div {
            display: flex;
            align-items: center;
            gap: 5px;
        }
        p {
            padding-top: 2.2rem;
        }
    }
    

    .bot {
        display: flex;
        flex-direction: column;
        padding-bottom: 0.7rem;
        gap:2rem;
    }
    .organizer {
        background-color: (var(--color-secondary));
        padding: 0.5rem;
        font-size: 1rem;
        border-radius: 8px;

        h3 {
            font-weight: 700;
            font-size: 1.25rem;
        }


    }

}
</style>