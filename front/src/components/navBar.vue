<script setup lang="ts">
import iconAdd from '@/components/icons/icon-add.vue';
import iconArticle from '@/components/icons/icon-article.vue';
import iconMap from '@/components/icons/icon-map.vue';
import iconProfile from '@/components/icons/icon-profile.vue';

import { ref, onMounted, onUnmounted } from 'vue';

const currentPage = ref('');

const navigateTo = (page: string) => {
    currentPage.value = page;
};


</script>
<template>
    <nav class="nav">
        <ul class="container">
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
            <li :class="{ 'active': currentPage === 'profile'}">
                <button @click="navigateTo('profile')" >
                    <iconProfile />
                    <Div>Profile</Div>
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

        .container {
            display: flex;
            justify-content: space-around;
            padding: 1rem;

            li {
                list-style: none;
                stroke: var(--text-color-secondary);
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                a {
                    text-decoration: none;
                    color: var(--text-color-secondary);
                    
                }

                &.active {
                    stroke: red
                }
            }
        }

        
    }
</style>