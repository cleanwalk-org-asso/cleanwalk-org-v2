<script setup lang="ts">
import { CalendarDays, Settings, History, File, Send, ChevronRight } from 'lucide-vue-next';
import { useAccountStore } from '@/stores/AccountStore';
import DeleteAccountButton from './buttons/DeleteAccountButton.vue';
import LogoutButton from './buttons/LogoutButton.vue';

const accountStore = useAccountStore();
const currentUser = accountStore.CurrentUser!;
</script>

<template>
    <section class="container">
        <router-link v-if="currentUser" :to="{name: 'menuProfile'}" class="profil">
            <img class="img" :src="currentUser.profile_picture" alt="profile picture" />
            <h3>{{ currentUser.name }}</h3>
            <ChevronRight />
        </router-link>
        <div v-if="!currentUser" class="unlog-profiles">
            <router-link :to="{name: 'login'}" class="profil unlog">
                <h3>Se connecter</h3>
                <ChevronRight/>
            </router-link>
            <router-link :to="{name: 'signup'}" class="profil unlog">
                <h3>S'inscrire</h3>
                <ChevronRight/>
            </router-link>
        </div>
        <ul class="list">
            <li v-if="currentUser">
                <CalendarDays />
                <h3>Mes évènements</h3>
                <ChevronRight :size="22"/>
            </li>
            <li>
                <Settings />
                <h3>Paramètres</h3>
                <ChevronRight :size="22"/>
            </li>
            <li>
                <History />
                <h3>L'histoire de Cleanwalk.org</h3>
                <ChevronRight :size="22"/>
            </li>
            <li>
                <File />
                <h3>Guide de la cleanwalk</h3>
                <ChevronRight :size="22"/>
            </li>
            <li>
                <Send />
                <h3>Nous contacter</h3>
                <ChevronRight :size="22"/>
            </li>
        </ul>

        <div v-if="currentUser" class="account-actions">
            <LogoutButton />
            <DeleteAccountButton />
        </div>
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
    height: 100dvh;

    .unlog-profiles {
        width: 100%;
        gap: 1rem;
        display: flex;
        flex-direction: column;
    }

    .account-actions {
        width: 100%;
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
        margin-top: 2remw;

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

    @media (min-width: 768px) {
        width: 40rem;
        margin: 0 auto;
        padding-top: 8rem;
    }
}
</style>