<template>
  <div class="flex justify-between bg-tint md:px-32">
    <div class="flex flex-col gap-4 p-8">
      <h4 class="text-2xl font-black text-primary">
        <span class="relative block w-fit">
          <span class="relative z-10 block w-fit">Soutenez</span>
          <span class="absolute -top-1 -left-2 block h-full w-30 -rotate-1 rounded-sm bg-accent/50" />
        </span>
        <span>la mission de Cleanwalk.org</span>
      </h4>
      <p class="max-w-xl">
        Cleanwalk.org est une plateforme gratuite, gérée par une association. Si vous appréciez notre mission, aidez-nous à continuer et à développer nos actions en faisant un don.
      </p>
      <div class="flex gap-8 font-bold">
        <a
          href="https://www.helloasso.com/associations/cleanwalk-org"
          target="_blank"
          rel="noopener noreferrer"
          class="flex-1 rounded-lg bg-primary p-4 text-center text-primary-content"
        >
          Faire un Don
        </a>
        <a
          href="https://www.helloasso.com/associations/cleanwalk-org/adhesions/jadhere-et-je-soutiens-cleanwalk-org"
          target="_blank"
          rel="noopener noreferrer"
          class="flex-1 rounded-lg border-2 border-border p-4 text-center text-base-content"
        >
          Devenir Adhérent
        </a>
      </div>
    </div>
    <img class="hidden h-[420px] w-[430px] md:block" src="~/assets/Donate.png" alt="illustration soutenir l'association">
  </div>
</template>
