<template>
  <section class="relative flex flex-col items-center gap-8 overflow-hidden p-8 pb-32">
    <svg
      class="absolute bottom-0 left-1/2 h-fit w-[1500px] -translate-x-1/2 md:w-[2500px]"
      height="750"
      viewBox="0 0 3500 750"
      fill="none"
      aria-hidden="true"
    >
      <path d="M0 750C0 335.786 783.502 0 1750 0C2716.5 0 3500 335.786 3500 750H0Z" fill="url(#map-section-gradient)" />
      <defs>
        <radialGradient
          id="map-section-gradient"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(1481.5 -56.4999) rotate(68.6345) scale(2746.23 21878.1)"
        >
          <stop stop-color="var(--color-brand)" />
          <stop offset="1" stop-color="var(--color-brand-end)" />
        </radialGradient>
      </defs>
    </svg>
    <div class="group relative m-5 aspect-video w-full max-w-4xl overflow-hidden rounded-2xl bg-neutral shadow-lg">
      <MapHomeMap />
      <div class="absolute top-1/2 left-1/2 z-[400] hidden size-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-8 rounded-2xl bg-overlay/20 p-8 text-center backdrop-blur-[2px] group-hover:flex">
        <h3 class="mb-2 text-2xl font-bold">Découvrir les Cleanwalks</h3>
        <div class="mb-4">Pas d'inscription requise</div>
        <BaseButton :to="{ name: 'map' }" class="font-medium md:text-2xl">Ouvrir la carte</BaseButton>
      </div>
    </div>
  </section>
</template>
