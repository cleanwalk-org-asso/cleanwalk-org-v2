<script setup lang="ts">
import { storeToRefs } from 'pinia';
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
import { LogIn } from 'lucide-vue-next';
import { useAccountStore } from '@/stores/AccountStore';

const accountStore = useAccountStore();
const { CurrentUser: user } = storeToRefs(accountStore);

</script>

<template>
    <header class="bg-primary relative flex justify-center pt-4 md:hidden">
        <router-link to="/">
            <img class="logo mx-auto py-4" src="../assets/logo.svg" alt="logo cleanwalk.org">
        </router-link>
        <router-link :to="{ name: user ? 'menuProfile' : 'login' }" class="absolute right-4 top-1/2 -translate-y-1/2">
            <img v-if="user?.profilePicture" :src="user.profilePicture" alt="profilePicture" class="h-9 w-9 rounded-full border border-white">
            <LogIn v-else class="text-white" />
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
