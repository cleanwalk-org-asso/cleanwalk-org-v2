<script setup lang="ts">
import iconRightArrow from '@/components/icons/icon-right-arrow.vue';
import iconCalendar from '@/components/icons/icon-calendar.vue';
import iconSettings from '@/components/icons/icon-settings.vue';
import iconBackTime from '@/components/icons/icon-back-time.vue';
import iconFile from '@/components/icons/icon-file.vue';
import iconPaperPlane from '@/components/icons/icon-paper-plane.vue';
import iconLogout from '@/components/icons/icon-logout.vue';
import { useAccountStore } from '@/stores/AccountStore';
const accountStore = useAccountStore();

const currentUser = accountStore.CurrentUser!;

</script>

<template>
    <section class="container">
        <router-link to="/profile" class="profil">
            <img class="img" src="https://cdn2.thecatapi.com/images/tv8tNeYaU.jpg" alt="">
            <h3>{{ currentUser.firstname }} {{ currentUser.lastname }}</h3>
            <iconRightArrow />
        </router-link>
        <ul class="list">
            <li>
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

        <button @click="accountStore.logout()" class="logout">
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


    .profil {
        stroke: #94A3B8;
        border: 1px solid #CBD5E1;
        width: 100%;
        display: flex;
        align-items: center;
        padding: 1rem;
        border-radius: 8px;

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