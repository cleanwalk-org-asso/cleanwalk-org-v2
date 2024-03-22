<script setup lang="ts">
import iconLeftArrow from './icons/icon-left-arrow.vue';
import iconInfo from './icons/icon-info.vue';

const props = defineProps({
  backUrl: String,
})

</script>

<template>
  <div class="top-bar">
    <router-link class="back" :to="backUrl" v-if="backUrl">
      <iconLeftArrow />
    </router-link>
    <img src="../assets/logo.svg" alt="logo">
    <button class="info">
      <iconInfo />
    </button>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/base.scss';

.top-bar {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  z-index: 999;
  background-color: var(--color-primary);
  stroke: #fff;
  display: flex;
  padding: 20px;
  flex-direction: center;
  justify-content: space-between;

  .back {
    display: flex;
    flex-direction: column;
    justify-content: end;
    padding-bottom: 5px;
    svg {
      width: 24px;
      height: 24px;
    }
  }

  img {
    width: 104px;
    margin-top: 10px;
  }

  .info {
    background-color: #fff;
    border-radius: 8px;
    border: 1px solid #CBD5E1;
    width: 38px;
    height: 38px;
    stroke: #94A3B8;
  }
}
</style>
