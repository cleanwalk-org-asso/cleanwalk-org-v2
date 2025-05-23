<script setup lang="ts">
import navBar from '@/components/NavBar.vue';
import TopBar from '@/components/TopBar.vue';
import SwithChoice from '@/components/SwithChoice.vue';
import AssoList from '@/components/AssoList.vue';
import { onMounted, onUnmounted, ref } from 'vue';

onMounted(() => {
    localStorage.setItem('discoverPage', 'associations');
});

const isDesktop = ref(window.innerWidth > 768);

const handleResize = () => {
    isDesktop.value = window.innerWidth > 768;
};

onMounted(() => {
    window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
});
</script>

<template>
    <!-- <TopBar pageName="Découvrir"/> -->
    <div v-if="isDesktop">
        <SwithChoice categorie1="articles" categorie2="associations" :activeCategory="false" route1="articles" route2="associations" />
    </div>
    <AssoList />
</template>