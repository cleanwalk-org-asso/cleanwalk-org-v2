<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import { useDevice } from '@/composables/useDevice';
import router from '@/router';
import { useCleanwalkStore } from '@/stores/CleanwalkStore';
import { onMounted } from 'vue';



const store = useCleanwalkStore();

const { isMobile } = useDevice();
onMounted( async () => {
  await store.getAllCleanwalks();
  if (isMobile.value) {
    router.push('/map');
  }
});

</script>

<template>

    <NavBar />
</template>
