<script setup lang="ts">
import { useAccountStore } from '@/stores/AccountStore';
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useDevice } from '@/composables/useDevice';
import { Plus, MapPin, Compass, Menu } from 'lucide-vue-next';

const currentPage = ref('');
const route = useRoute();
const { isMobile } = useDevice(); // Utilisation du composable pour détecter mobile/desktop
const user = useAccountStore().CurrentUser;

// Update currentPage when component is mounted
onMounted(() => {
    currentPage.value = route.name as string;
});

// Watch for route changes and update currentPage
watch(() => route.name, (newName) => {
    currentPage.value = newName as string;
});


</script>
<template>
    <nav class="nav" v-if="isMobile">
        <ul class="container" :class="{ 'shadow': currentPage !== 'map' }">
            <li :class="{ 'active': currentPage === 'map' || currentPage === 'cleanwalk' }">
                <router-link :to="{name: 'map'}" class="redirect">
                    <MapPin />
                    <div>Carte</div>
                </router-link>
            </li>
            <li :class="{ 'active': currentPage.includes('add') }">
                <router-link :to="{ name: 'addCleanwalk'}" class="redirect">
                    <Plus />
                    <div>Ajouter </div>
                </router-link>
            </li>
            <li :class="{ 'active': currentPage === 'associations' || currentPage === 'associations' }">
                <router-link :to="{ name: 'associations'}" class="redirect">
                    <Compass />
                    <div>Découvrir</div>
                </router-link>
            </li>
            <li :class="{ 'active': currentPage.includes('menu') }">
                <router-link :to="{ name:'menu'}" class="redirect">
                    <Menu />
                    <div>Menu</div>
                </router-link>
            </li>
        </ul>
    </nav>
    <nav class="nav-desktop" v-else>
        <router-link  to="/">
            <img class="logo" src="../assets/logo.svg" alt="logo cleanwalk.org">
        </router-link>
        <div class="links">
            <router-link class="link" :to="{name: 'home'}" :class="{ 'active': currentPage === 'home' }">Accueil</router-link>
            <router-link class="link" :to="{name: 'map'}"
                :class="{ 'active': currentPage === 'map' || currentPage === 'cleanwalk' }">Carte</router-link>
            <router-link class="link" :to="{name: 'addCleanwalk'}" :class="{ 'active': currentPage.includes('add') }">Ajouter
                cleanwalk</router-link>
            <router-link class="link" :to="{ name: 'associations'}"
                :class="{ 'active': currentPage === 'associations' || currentPage === 'associations' }">Découvrir</router-link>
            <router-link class="link" :to="{name: 'menu'}" :class="{ 'active': currentPage.includes('menu') }">Menu</router-link>
        </div>
        <div v-if="user">
            <router-link :to="{name:'menuProfile'}" class="account">
                <div>{{ user.name }}</div>
                <img :src="user.profilePicture" alt="profilePicture">
            </router-link>
        </div>
        <div class="infos" v-else>
            <router-link :to="{name: 'login'}">Se connecter</router-link>
            <router-link :to="{name:'signup'}">S'inscrire</router-link>
        </div>

    </nav>

</template>

<style scoped lang="scss">
@use '@/assets/main.scss';

.nav {
    position: fixed;
    bottom: 0;
    width: 100%;
    font-size: 12px;
    font-weight: 500;
    z-index: 999;
    background-color: var(--color-nav-bg);
    font-family: "Roboto", sans-serif;

    .container {
        display: flex;
        justify-content: space-around;
        padding: 0.5rem;

        &.shadow {
            box-shadow: 0px -10px 100px rgba(194, 194, 194, 0.2);
        }

        li {
            list-style: none;
            stroke: var(--text-color-nav);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            color: var(--text-color-nav);

            width: 100%;

            .redirect {
                background: none;
                padding: 0.3rem 0;
                border-radius: 12px;
                text-decoration: none;
                color: inherit;
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100%;

                .pp {
                    width: 26px;
                    height: 26px;
                    border-radius: 999px;
                    border: 2px solid #111;
                }
            }

            &.active {
                stroke: var(--text-color-nav-active);
                fill: var(--text-color-nav-active);
                color: var(--text-color-nav-active);

                .redirect {
                    background-color: var(--color-primary);
                }
            }
        }
    }
}

.nav-desktop {
    display: flex;
    justify-content: space-between;
    background-color: var(--color-primary);
    width: 100vw;
    color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    height: 5.5rem;
    width: 100%;
    align-items: center;
    padding: 0 2rem;
    z-index: 9998;

    .logo {
        display: block;
    }


    .link {
        font-weight: 700;
        margin: 0 1px;
        padding: 0.5rem 1rem;
        border-radius: 8px;

        &.active {
            background-color: #fff;
            color: var(--text-color-primary);
        }

    }

    .account {
        display: flex;
        gap: 1rem;
        align-items: center;

        img {
            width: 46px;
            height: 46px;
            border-radius: 999px;
            border: 1px solid #fff;
        }

        div {
            font-weight: 700;
        }
    }

    .infos {
        display: flex;
        gap: 1rem;

        div {
            font-weight: 700;
        }
    }


}
</style>