<script setup lang="ts">
import {RouterView } from 'vue-router'
import Toast from './components/Toast.vue';
import FirstLaunchNoticeModal from './components/FirstLaunchNoticeModal.vue';

</script>

<template>
  <Toast />
  <FirstLaunchNoticeModal />
  <RouterView />
</template>
