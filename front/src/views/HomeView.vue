<script setup lang="ts">
import MobileHome from '@/components/MobileHome.vue';
import navBar from '@/components/NavBar.vue';
import { useCleanwalkStore } from '@/stores/CleanwalkStore';
import { onMounted } from 'vue';


const store = useCleanwalkStore();
onMounted( async () => {
  const data = await store.getAllCleanwalks();
});
</script>

<template>
  <main>
    <MobileHome />
    <navBar />
  </main>
</template>
