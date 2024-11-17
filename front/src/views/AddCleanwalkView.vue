<script setup lang="ts">
import navBar from '@/components/navBar.vue';
import TopBar from '@/components/TopBar.vue';
import MobileAddCleanwalk from '@/components/MobileAddCleanwalk.vue';
import DesktopAddCleanwalk from '@/components/DesktopAddCleanwalk.vue';
import { ref, watchEffect } from 'vue';

const titles = ref([
    'Nom de votre évènement',
    'Lieu de votre évènement',
    'Date et horaire',
    'Description de votre évènement ',
    'Ajouter une image',
    'Aperçu de votre cleanwalk'
]);

const isDesktop = ref(window.innerWidth > 1024);

watchEffect(() => {
    const handleResize = () => {
        isDesktop.value = window.innerWidth > 1024;
    };
    window.addEventListener('resize', handleResize);
    return () => {
        window.removeEventListener('resize', handleResize);
    };
});
</script>

<template>
    <TopBar back-url="/add" page-name="Ajouter une cleanwalk" />
    <MobileAddCleanwalk v-if="!isDesktop" :titles="titles" />
    <DesktopAddCleanwalk v-if="isDesktop" :titles="titles" />
    <navBar />
</template>