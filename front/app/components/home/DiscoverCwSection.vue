<template>
  <div class="flex flex-col gap-8 p-8 md:px-32">
    <h2 class="flex flex-col text-2xl font-black text-primary">
      <span>Découvrez les ramassages</span>
      <span class="relative w-fit">
        <span class="relative z-10 block">organisés près de chez vous !</span>
        <span class="absolute top-0 -left-2 block h-full w-[105%] -rotate-1 rounded-sm bg-accent/50" />
      </span>
    </h2>
    <p>
      Parcourez les événements organisés partout en France par la  communauté Cleawalk.org grâce à notre carte interactive.
    </p>
    <BaseButton :to="{ name: 'map' }" size="sm" class="w-fit font-medium">Participer à un ramassage</BaseButton>
  </div>
</template>
