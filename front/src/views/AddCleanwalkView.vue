<script setup lang="ts">
import navBar from '@/components/NavBar.vue';
import TopBar from '@/components/TopBar.vue';
import MobileAddCleanwalk from '@/components/MobileAddCleanwalk.vue';
import DesktopAddCleanwalk from '@/components/DesktopAddCleanwalk.vue';
import { ref, watchEffect } from 'vue';


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
    <TopBar v-if="!isDesktop" back-url="/add" page-name="Ajouter une cleanwalk" />
    <MobileAddCleanwalk v-if="!isDesktop" />
    <DesktopAddCleanwalk v-if="isDesktop" />
    <navBar />
</template>