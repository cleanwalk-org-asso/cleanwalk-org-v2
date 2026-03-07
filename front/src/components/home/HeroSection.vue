<script setup lang="ts">
import homeBannerUrl from '@/assets/home-banner.webp'
</script>

<template>
    <section 
        class="h-122.75 bg-cover bg-center flex justify-center items-center text-primary px-2"
        :style="{ backgroundImage: `url(${homeBannerUrl})` }"
    >
        <h1 class="flex flex-col gap-4 mb-28 font-bold">
            <div class=" text-3xl font-bold bg-secondary rounded-lg leading-9.5 py-2.5 px-2.5 w-fit bg-white/80 shadow-[0px_4px_5.3px_rgba(0,0,0,0.08)]">
                La plateforme française
            </div>
            <div class="text-3xl font-bold bg-secondary rounded-lg leading-9.5 py-2.5 px-2.5 w-fit bg-white/80">
                qui centralise les ramassages citoyens de déchets !
            </div>
        </h1>
    </section>
</template>