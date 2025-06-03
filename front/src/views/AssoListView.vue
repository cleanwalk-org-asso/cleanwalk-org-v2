<script setup lang="ts">
import SwichChoice from '@/components/SwithChoice.vue';
import AssoList from '@/components/AssoList.vue';
import { onMounted} from 'vue';

onMounted(() => {
    localStorage.setItem('discoverPage', 'associations');
});

</script>

<template>
    <!-- <div>
        <SwichChoice categorie1="articles" categorie2="associations" :activeCategory="false" route1="articles" route2="associations" />
    </div> -->
    <AssoList />
</template>