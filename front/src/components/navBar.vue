<script setup lang="ts">
import iconAdd from '@/components/icons/icon-add.vue';
import iconArticle from '@/components/icons/icon-article.vue';
import iconMap from '@/components/icons/icon-map.vue';
import iconProfile from '@/components/icons/icon-profile.vue';

import { ref, onMounted, onUnmounted } from 'vue';

const currentPage = ref('carte');

const navigateTo = (page: string) => {
    currentPage.value = page;
};


</script>
<template>
    <nav class="nav">
        <ul class="container" :class="{ 'shadow': currentPage !== 'carte'}">
            <li :class="{ 'active': currentPage === 'carte'}">
                <button @click="navigateTo('carte')" >
                    <iconMap />
                    <div>Carte</div>
                </button>
            </li>
            <li :class="{ 'active': currentPage === 'add'}">
                <button @click="navigateTo('add')" >
                    <iconAdd />
                    <div>Ajouter</div>
                </button>
            </li>
            <li :class="{ 'active': currentPage === 'article'}">
                <button @click="navigateTo('article')" >
                    <iconArticle />
                    <div>Articles</div>
                </button>
            </li>
            <li :class="{ 'active': currentPage === 'profile'}" >
                <button @click="navigateTo('profile')" >
                    <iconProfile />
                    <div>Profile</div>
                </button>
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
                button {
                    padding: 0.3rem 0;
                    border-radius: 12px;
                    text-decoration: none;
                    color: inherit;
                    width: 100%;
                    
                }

                &.active {
                    stroke: var(--text-color-nav-active);
                    color: var(--text-color-nav-active);
                    
                    button {
                        background-color: var(--color-primary);
                    }
                }
            }
        }

        
    }
</style>