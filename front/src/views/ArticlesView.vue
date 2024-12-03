<script setup lang="ts">
import navBar from '@/components/NavBar.vue';
import SwithChoice from '@/components/SwithChoice.vue';
import ArticlesList from '@/components/ArticlesList.vue';
import { onMounted } from 'vue';

onMounted(() => {
    localStorage.setItem('discoverPage', 'articles');
});

</script>
<template>
    <SwithChoice categorie1="articles" categorie2="associations" route1="articles" route2="associations" :activeCategory="true" />
    <ArticlesList />
    <navBar />
</template>