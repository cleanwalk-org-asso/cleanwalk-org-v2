<script setup lang="ts">
import Footer from '@/components/Footer.vue';
import AccountSelector from '@/components/home/AccountSelector.vue';
import CwOrgStory from '@/components/home/CwOrgStory.vue';
import DiscoverCwSection from '@/components/home/DiscoverCwSection.vue';
import DonationCwAsso from '@/components/home/DonationCwAsso.vue';
import HeroSection from '@/components/home/HeroSection.vue';
import MapSection from '@/components/home/MapSection.vue';
import Questions from '@/components/home/Questions.vue';
import SocialMediaSection from '@/components/home/SocialMediaSection.vue';
import StatSection from '@/components/home/StatSection.vue';
import NavBar from '@/components/NavBar.vue';

</script>

<template>
    <header class="bg-primary flex justify-center pt-4 md:hidden">
        <router-link to="/">
            <img class="logo mx-auto py-4" src="../assets/logo.svg" alt="logo cleanwalk.org">
        </router-link>
    </header>
    <HeroSection />
    <DiscoverCwSection/>
    <MapSection />
    <CwOrgStory />
    <AccountSelector />
    <DonationCwAsso />
    <Questions />
    <SocialMediaSection />
</template>
