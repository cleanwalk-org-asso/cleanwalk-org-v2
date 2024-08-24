<script setup lang="ts">
import navBar from '@/components/navBar.vue';
import TopBar from '@/components/TopBar.vue';
import SwithChoice from '@/components/SwithChoice.vue';
import AssoList from '@/components/AssoList.vue';
import { onMounted } from 'vue';

onMounted(() => {
    localStorage.setItem('discoverPage', 'associations');
});

</script>
<template>
    <!-- <TopBar pageName="Découvrir"/> -->
    <SwithChoice categorie1="articles" categorie2="associations" :activeCategory="false" route1="articles" route2="associations" />
    <AssoList />
    <navBar />
</template>