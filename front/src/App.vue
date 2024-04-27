<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import Toast from './components/Toast.vue';

</script>

<template>
  <Toast />
  <RouterView />
</template>
