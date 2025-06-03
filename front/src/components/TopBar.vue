<script setup lang="ts">

import { ChevronLeft } from 'lucide-vue-next';

import { useDevice } from '@/composables/useDevice';

const { isMobile } = useDevice();


const props = defineProps({
  backUrl: String,
  pageName: String
})

</script>

<template>
  <div class="top-bar" v-if="isMobile" >
    <router-link class="back" :to="backUrl" v-if="backUrl">
      <ChevronLeft color="#fff" />
    </router-link>
    <h2>{{ pageName }}</h2>
  </div>
</template>

<style scoped lang="scss">
.top-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 999;
  background-color: var(--color-primary);
  display: flex;
  padding: 0px;
  justify-content: space-between;
  align-items: center;
  height: 58px;

  .back {
    position: absolute;
    top: 1rem;
    left: 20px;
  }

  h2 {
    color: #FFF;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    text-align: center;
    width: 100%;
  }


}
</style>
