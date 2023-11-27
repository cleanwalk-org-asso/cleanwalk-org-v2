<script setup lang="ts">

import DesktopHomeBanner from '@/components/DesktopHomeBanner.vue';
import DesktopCleanwalkToCome from '@/components/DesktopCleanwalkToCome.vue';
import DesktopFooter from '@/components/DesktopFooter.vue';
import DesktopHeader from '@/components/DesktopHeader.vue';
</script>

<template>
  <DesktopHeader></DesktopHeader>

  <main>
    <DesktopHomeBanner/>
    <DesktopCleanwalkToCome/>

  </main>
  <DesktopFooter></DesktopFooter>
</template>

<style lang='scss'>
  @import '../assets/main.scss';

  
</style>
