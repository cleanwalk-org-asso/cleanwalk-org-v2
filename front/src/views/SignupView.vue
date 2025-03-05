<script setup lang="ts">
import AuthTemplate from '@/components/auth/authTemplate.vue';
import Signup from '@/components/auth/Signup.vue';

</script>
<template>
    <!-- <SwithChoice categorie1="particulier" categorie2="associations/Organization" route1="signup" route2="signup/Organization" :activeCategory="true" /> -->
    <main>
        <AuthTemplate>
            <Signup />
        </AuthTemplate>
    </main>
</template>