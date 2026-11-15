<script setup lang="ts">
import homeBannerUrl from '~/assets/home-banner.webp'
</script>

<template>
  <section
    class="flex h-122.75 items-center justify-center bg-cover bg-center px-2 text-brand"
    :style="{ backgroundImage: `url(${homeBannerUrl})` }"
  >
    <h1 class="mb-28 flex flex-col gap-4 font-bold">
      <div class="w-fit rounded-lg bg-frosted p-2.5 text-3xl leading-9.5 font-bold shadow-[0_4px_5.3px_rgba(0,0,0,0.08)]">
        La plateforme française
      </div>
      <div class="w-fit rounded-lg bg-frosted p-2.5 text-3xl leading-9.5 font-bold">
        qui centralise les ramassages citoyens de déchets !
      </div>
    </h1>
  </section>
</template>
