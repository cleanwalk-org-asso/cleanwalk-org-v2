<script setup lang="ts">
import HeroSection from '@/components/home/HeroSection.vue';
import MapSection from '@/components/home/MapSection.vue';
import StatSection from '@/components/home/StatSection.vue';
import NavBar from '@/components/NavBar.vue';
import { useDevice } from '@/composables/useDevice';

const { isMobile } = useDevice();

import { useRouter } from 'vue-router';

const router = useRouter();

if (isMobile) {
    router.push('/map');
}

</script>

<template>
    <HeroSection />
    <MapSection />
    <StatSection />
    <NavBar />
</template>
