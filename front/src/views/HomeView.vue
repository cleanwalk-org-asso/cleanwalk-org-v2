<script setup lang="ts">
import MobileHome from '@/components/MobileHome.vue';
import navBar from '@/components/navBar.vue';
import { useCleanwalkStore } from '@/stores/CleanwalkStore';
import { onMounted } from 'vue';


const store = useCleanwalkStore();
console.log('test');
console.log(store.getAllCleanwalks());

onMounted( async () => {
  const data = await store.getAllCleanwalks();
  if (data) {
    console.log(data);
  }
  
});
</script>

<template>
  <main>
    <MobileHome />
    <navBar />
  </main>
</template>
