<script setup lang="ts">
import { onMounted, ref } from 'vue';
import dragDrop from './dragDrop.vue';
import type { ApiResponse } from '@/interfaces/apiResponseInterface';
import { useCleanwalkStore } from '@/stores/CleanwalkStore';

const cleanwalkStore = useCleanwalkStore();

const dragDropRef = ref(null as any);

onMounted (async() => {
  console.log("Mounted");
  console.log("test", await cleanwalkStore.getAllCleanwalks());
});

const triggerUpload = async() => {
  if (dragDropRef.value) {
    const response:ApiResponse = await dragDropRef.value.handleUpload(); // Appel de la méthode handleUpload du composant dragDrop
    console.log(response);
}
};
</script>

<template>
  <dragDrop ref="dragDropRef"/>
  <button @click="triggerUpload">Upload File</button>
</template>