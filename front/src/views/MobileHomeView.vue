<script setup lang="ts">
import mobileHeader from '@/components/MobileHeader.vue';
import navigationBar from '@/components/MobileNavigationBar.vue';
import mobileHome from '@/components/MobileHome.vue';
</script>

<template>
    <mobileHeader></mobileHeader>

    <mobileHome></mobileHome>

    <navigationBar selected-menu="home"/>
</template>

<style lang="scss" scoped>

</style>