<script setup lang="ts">
import navBar from '@/components/navBar.vue';
import TopBar from '@/components/TopBar.vue';
import AddCleanwalk from '@/components/AddCleanwalk.vue';
import { ref } from 'vue';


const titles = ref([
    'Nom de votre évènement',
    'Lieu de votre évènement',
    'Date et horaire',
    'Description de votre évènement ',
    'Ajouter une image',
    'Aperçu de votre cleanwalk'
]);

</script>
<template>
    <TopBar back-url="/add" page-name="Ajouter une cleanwalk" />
    <AddCleanwalk :titles="titles" />
    <navBar />
</template>