<script setup lang="ts">

import DesktopHomeBanner from '@/components/DesktopHomeBanner.vue';
import DesktopHomeBody from '@/components/DesktopHomeBody.vue';
import DesktopFooter from '@/components/DesktopFooter.vue';
import DesktopHeader from '@/components/DesktopHeader.vue';
</script>

<template>
  <DesktopHeader></DesktopHeader>

  <main>
    <DesktopHomeBanner/>
    <DesktopHomeBody/>

  </main>
  <DesktopFooter></DesktopFooter>
</template>

<style lang='scss'>
  @import '../assets/main.scss';

  
</style>
