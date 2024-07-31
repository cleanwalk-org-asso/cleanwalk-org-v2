<script setup lang="ts">
import navBar from '@/components/navBar.vue';
import TopBar from '@/components/TopBar.vue';
import SwithChoice from '@/components/SwithChoice.vue';
import ArticlesList from '@/components/ArticlesList.vue';
</script>
<template>
    <TopBar page-name="Découvrir" />
    <SwithChoice categorie1="articles" categorie2="associations" route1="articles" route2="associations" :activeCategory="true" />
    <ArticlesList />
    <navBar />
</template>