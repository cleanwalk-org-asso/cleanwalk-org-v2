<script setup lang="ts">
import MobileMap from '@/components/map/MobileMap.vue';
import DesktopMap from '@/components/map/DesktopMap.vue';
import navBar from '@/components/NavBar.vue';
import { useCleanwalkStore } from '@/stores/CleanwalkStore';
import { onMounted } from 'vue';
import { useDevice } from '@/composables/useDevice';


const store = useCleanwalkStore();

const { isMobile } = useDevice();
onMounted( async () => {
  await store.getAllCleanwalks();
});
</script>

<template>
    <MobileMap v-if="isMobile" />
    <DesktopMap v-if="!isMobile" />
    <navBar />
</template>
