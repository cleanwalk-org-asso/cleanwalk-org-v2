<script setup lang="ts">
const defaultCover = new URL('../assets/default_cover.webp', import.meta.url).href
</script>

<template>
  <div class="min-h-screen bg-white font-sans flex flex-col items-center w-full">
    <section
      class="text-white pb-20 pt-10 px-8 flex flex-col items-center relative overflow-hidden w-full bg-cover bg-center"
      :style="{ backgroundImage: `linear-gradient(rgba(19, 39, 120, 0.78), rgba(19, 39, 120, 0.78)), url(${defaultCover})` }"
    >
      <div class="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center">
        <span class="bg-white/15 text-white text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider mb-5">Proposition</span>
        <h1 class="text-5xl md:text-6xl font-black tracking-tight mb-6 leading-tight">
          Notre <span class="text-secondary">histoire</span>
        </h1>
        <p class="text-white/80 text-lg max-w-2xl leading-relaxed">
          Le parcours de Cleanwalk.org depuis 2019, et la nouvelle dynamique portée par les bénévoles.
        </p>
      </div>
    </section>

    <section class="py-16 px-8 w-full flex flex-col items-center">
      <article class="max-w-4xl w-full flex flex-col items-start gap-4">
        <div class="p-7 rounded-2xl border-2 border-primary/10 bg-white">
          <p class="text-gray-700 leading-relaxed">
            Lancée en juin 2019, Cleanwalk.org est née de la volonté de trois jeunes engagés – Dorian Wansek, Adrien Lefebvre et Baptiste Frelot – de lutter contre les déchets sauvages et la pollution des océans. En créant cette plateforme, leur objectif était clair : fédérer citoyens, associations et collectivités autour d'une action simple mais percutante – les cleanwalks.
          </p>
        </div>

        <div class="p-7 rounded-2xl border-2 border-primary/10 bg-white">
          <p class="text-gray-700 leading-relaxed">
            Pendant ses premières années, la plateforme a permis de mobiliser un grand nombre de participants et de mettre en lumière des initiatives locales dans plusieurs pays : France, Belgique, Suisse et Luxembourg.
          </p>
        </div>

        <div class="p-7 rounded-2xl border-2 border-primary/10 bg-white">
          <p class="text-gray-700 leading-relaxed">
            Après une période d'inactivité (de 2021 à 2023), 2024 marque un tournant pour Cleanwalk.org. Une toute nouvelle équipe de bénévoles passionnés a repris le flambeau, avec l'ambition de redonner vie à la plateforme et d'en faire un outil incontournable dans la lutte contre les déchets sauvages.
          </p>
        </div>

        <div class="p-7 rounded-2xl border-2 border-primary/10 bg-white">
          <p class="text-gray-700 leading-relaxed">
            Depuis septembre 2024, Cleanwalk.org a également évolué pour devenir une association à part entière. Cette nouvelle structure nous permet de formaliser nos engagements et d'aller encore plus loin dans nos missions !
          </p>
        </div>

        <div class="p-7 rounded-2xl bg-secondary/10 border-l-4 border-secondary rounded-r-xl">
          <p class="text-gray-700 leading-relaxed">
            Avec la refonte prochaine de notre site web, l'élargissement de nos formats de sensibilisation et une présence renforcée sur les réseaux sociaux, nous écrivons aujourd'hui un nouveau chapitre de cette belle aventure collective.
          </p>
        </div>
      </article>
    </section>
  </div>
</template>
