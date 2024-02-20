<script setup lang="ts">
import type { Cleanwalk } from '@/interfaces/cleanwalkInterface'

const currentCleanwalk = {
  id: 1,
  title: 'Cleanwalk 2',
  addess: 'Rue de la paix',
  isAsso: false
}
</script>

<template>
    <main>
        <div>
            <img class="cover" src="../assets/desert.png" alt="" />
            <h1>{{ currentCleanwalk.title }}</h1>
        </div>
    </main>
</template>

<style scoped lang="scss">
 @import '@/assets/base.scss';
h1 {
  color: var(text-color-primary);
  font-family: Catamaran;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.cover {
  width: 100vw;
  object-fit: cover;
  aspect-ratio: 21/9;
}
</style>
