<script setup lang="ts">
import SignupOrganisation from '@/components/SignupOrganisation.vue';
import SwithChoice from '@/components/SwithChoice.vue';

</script>
<template>
    <SwithChoice categorie1="particulier" categorie2="associations/Organisation" route1="signup" route2="signup/organisation" :activeCategory="false" />
    <SignupOrganisation />
</template>