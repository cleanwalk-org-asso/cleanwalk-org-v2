<script setup lang="ts">
import navBar from '@/components/navBar.vue';
import TopBar from '@/components/TopBar.vue';
import AddArticle from '@/components/AddArticle.vue';
</script>
<template>
    <TopBar back-url="/add" page-name="Ajouter un article" />
    <AddArticle />
    <navBar />
</template>