<script setup lang="ts">
import iconLeftArrow from './icons/icon-left-arrow.vue';
import iconInfo from './icons/icon-info.vue';

const props = defineProps({
  backUrl: String,
  pageName: String
})

</script>

<template>
  <div class="top-bar">
    <router-link class="back" :to="backUrl" v-if="backUrl">
      <iconLeftArrow />
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
  stroke: #fff;
  display: flex;
  padding: 20px;
  flex-direction: center;
  justify-content: space-between;
  height: 78px;

  .back {
    position: absolute;
    top: 34px;
    left: 20px;

    svg {
      width: 24px;
      height: 24px;
    }
  }

  h2 {
    color: #FFF;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    padding-top: 1rem;
    text-align: center;
    width: 100%;
  }


}
</style>
