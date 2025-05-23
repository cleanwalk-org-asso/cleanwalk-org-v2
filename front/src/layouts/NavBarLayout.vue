<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
</script>

<template>
  <div class="navbar-layout">
    <NavBar />
    <main class="main-content">
      <router-view />
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
