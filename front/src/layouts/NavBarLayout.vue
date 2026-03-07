<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Footer from '@/components/Footer.vue';
import NavBar from '@/components/NavBar.vue';

const route = useRoute();
const showFooter = computed(() => route.name !== 'map');
</script>

<template>
  <div class="navbar-layout">
    <NavBar />
    <main class="main-content">
      <router-view />
      <Footer v-if="showFooter" class="hidden md:block"></Footer>
    </main>
  </div>
</template>

<style scoped lang="scss">
.navbar-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-bottom: 3.75rem;

  @media (min-width: 1024px) {
    padding-bottom: 0;
    padding-top: 5.5rem;
  }
}

.main-content {
  flex: 1;
}
</style>
