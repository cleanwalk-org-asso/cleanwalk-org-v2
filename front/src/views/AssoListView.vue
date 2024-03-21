<script setup lang="ts">
import navBar from '@/components/navBar.vue';
import TopBar from '@/components/TopBar.vue';
import SwithChoice from '@/components/SwithChoice.vue';
</script>
<template>
    <TopBar />
    <SwithChoice categorie1="articles" categorie2="associations" :activeCategory="false" />
    <navBar />
</template>