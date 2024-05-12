<script setup lang="ts">
import iconRightArrow from '@/components/icons/icon-right-arrow.vue';
import iconCalendar from '@/components/icons/icon-calendar.vue';
import iconSettings from '@/components/icons/icon-settings.vue';
import iconBackTime from '@/components/icons/icon-back-time.vue';
import iconFile from '@/components/icons/icon-file.vue';
import iconPaperPlane from '@/components/icons/icon-paper-plane.vue';
import iconLogout from '@/components/icons/icon-logout.vue';
import { useAccountStore } from '@/stores/AccountStore';
import { ref } from 'vue';
import LogoutPopup from './LogoutPopup.vue';
const accountStore = useAccountStore();

const isPopupVisible = ref(false);

const togglePopup = () => {
    isPopupVisible.value = !isPopupVisible.value;
};

const currentUser = accountStore.CurrentUser!;

</script>

<template>
    <LogoutPopup :is-visible="isPopupVisible" :toggle-popup="togglePopup" />
    <section class="container">
        <router-link v-if="currentUser" to="/menu/profile" class="profil">
            <img class="img" :src="currentUser.profile_picture" alt="">
            <h3 >{{ currentUser.firstname }} {{ currentUser.lastname }}</h3>
            <iconRightArrow />
        </router-link>
        <div v-if="!currentUser" class="unlog-profiles">
            <router-link to="/login" class="profil unlog">
                <h3 >Se connecter</h3>
                <iconRightArrow />
            </router-link>
            <router-link to="/signup" class="profil unlog">
                <h3 >S'inscrire</h3>
                <iconRightArrow />
            </router-link>
        </div>
        <ul class="list">
            <li v-if="currentUser">
                <iconCalendar />
                <h3>Mes évènements</h3>
                <iconRightArrow />
            </li>
            <li>
                <iconSettings />
                <h3>Paramètres</h3>
                <iconRightArrow />
            </li>
            <li>
                <iconBackTime />
                <h3>L’histoire de Cleanwalk.org</h3>
                <iconRightArrow />
            </li>
            <li>
                <iconFile />
                <h3>Guide de la cleanwalk</h3>
                <iconRightArrow />
            </li>
            <li>
                <iconPaperPlane />
                <h3>Nous contacter</h3>
                <iconRightArrow />
            </li>
        </ul>

        <button v-if="currentUser" @click="togglePopup()" class="logout">
            <iconLogout />
            <h3>Se Déconnecter</h3>
            <iconRightArrow class="arrow"/>
        </button>
    </section>
</template>

<style scoped lang="scss">
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    padding: 100px 1.6rem 100px 1.6rem;
    color: #94A3B8;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    justify-content: space-between;
    height: 100vh;

    .unlog-profiles {
        width: 100%;
        gap: 1rem;
        display: flex;
        flex-direction: column;
    }


    .profil {
        stroke: #94A3B8;
        border: 1px solid #CBD5E1;
        width: 100%;
        display: flex;
        align-items: center;
        padding: 1rem;
        border-radius: 8px;

        &.unlog {
            color: var(--color-primary);
            ;
        }



        .img {
            width: 44px;
            aspect-ratio: 1;
            object-fit: cover;
            border-radius: 9999px;
        }
    }

    h3 {
        margin: 0 1rem;
        flex-grow: 1;
    }

    .list {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;

        li {
            stroke: #94A3B8;
            display: flex;
            width: 100%;
            border: 1px solid #CBD5E1;
            border-radius: 8px;
            align-items: center;
            padding: 12px;
        }
    }

    .logout {
        stroke: #FF5757;
        background-color: transparent;
        border: 1px solid #CBD5E1;
        color: #FF5757;
        width: 100%;
        display: flex;
        align-items: center;
        padding: 1rem;
        border-radius: 8px;
        margin-top: 50px;

        .arrow {
            stroke: #94A3B8;
        }
    }


}
</style>