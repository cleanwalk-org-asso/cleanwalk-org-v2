<script setup lang="ts">
import navBar from '@/components/navBar.vue';
import TopBar from '@/components/TopBar.vue';
import AddCleanwalk from '@/components/AddCleanwalk.vue';
</script>
<template>
    <TopBar back-url="/add" page-name="Ajouter une cleanwalk" />
    <AddCleanwalk />
    <navBar />
</template>