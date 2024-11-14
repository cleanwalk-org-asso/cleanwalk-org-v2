<script setup lang="ts">
import iconAdd from '@/components/icons/icon-add.vue';
import iconDiscover from '@/components/icons/icon-discover.vue';
import iconMap from '@/components/icons/icon-map.vue';
import iconBurger from '@/components/icons/icon-burger.vue';
// import { useAccountStore } from '@/stores/AccountStore';

import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const currentPage = ref('');
const route = useRoute();
let discoverPageName:string = '';

//local storage
onMounted(() => {
    currentPage.value = route.name as string;
    discoverPageName = localStorage.getItem('discoverPage') ?? 'associations';
});


</script>
<template>
    <nav class="nav">
        <ul class="container" :class="{ 'shadow': currentPage !== 'home'}">
            <li :class="{ 'active': currentPage === 'home' || currentPage === 'cleanwalk'}">
                <router-link to="/" class="redirect">
                    <iconMap />
                    <div>Carte</div>
                </router-link>
            </li>
            <li :class="{ 'active': currentPage.includes('add')}">
                <router-link to="/add/cleanwalk" class="redirect">
                    <iconAdd />
                    <div>Ajouter</div>
                </router-link>
            </li>
            <li :class="{ 'active': currentPage === 'associations' || currentPage === 'associations'}">
                <router-link :to="'/'+ discoverPageName" class="redirect">
                    <iconDiscover />
                    <div>Découvrir</div>
                </router-link>
            </li>
            <li :class="{ 'active': currentPage.includes('menu')}" >
                <router-link to='/menu' class="redirect">
                    <iconBurger />
                    <!-- <img v-else :src="currenUserProfilePicture" class="pp" alt="profile picture" /> -->
                    <div>Menu</div>
                </router-link>
            </li>
        </ul>
    </nav>

</template>

<style scoped lang="scss">
    @import '@/assets/base.scss';
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
</style>