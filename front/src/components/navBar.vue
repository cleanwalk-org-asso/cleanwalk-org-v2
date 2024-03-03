<script setup lang="ts">
import iconAdd from '@/components/icons/icon-add.vue';
import iconArticle from '@/components/icons/icon-article.vue';
import iconMap from '@/components/icons/icon-map.vue';
import iconProfile from '@/components/icons/icon-profile.vue';

import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';

const currentPage = ref('');
const route = useRoute();

onMounted(() => {
    currentPage.value = route.name as string;
    console.log('mounted', currentPage.value);

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
            <li :class="{ 'active': currentPage === 'add'}">
                <router-link to="/add" class="redirect">
                    <iconAdd />
                    <div>Ajouter</div>
                </router-link>
            </li>
            <li :class="{ 'active': currentPage === 'article'}">
                <router-link to="/article" class="redirect">
                    <iconArticle />
                    <div>Articles</div>
                </router-link>
            </li>
            <li :class="{ 'active': currentPage === 'profile'}" >
                <router-link to='profile' class="redirect">
                    <iconProfile />
                    <div>Profile</div>
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
                    
                }

                &.active {
                    stroke: var(--text-color-nav-active);
                    color: var(--text-color-nav-active);
                    
                    .redirect {
                        background-color: var(--color-primary);
                    }
                }
            }
        }

        
    }
</style>