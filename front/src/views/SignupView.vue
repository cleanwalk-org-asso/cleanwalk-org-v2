<script setup lang="ts">
import Signup from '@/components/Signup.vue';
import SwithChoice from '@/components/SwithChoice.vue';

</script>
<template>
    <SwithChoice categorie1="particulier" categorie2="associations/Organisation" route1="signup" route2="signup/organisation" :activeCategory="true" />

    <Signup />
</template>