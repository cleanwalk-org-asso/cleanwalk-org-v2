<template>
    <div class="flex flex-col p-8 items-left gap-8">
        <h2 class="text-primary font-catamaran font-black text-2xl flex flex-col">
            <span>
                Découvrez les ramassages
            </span>
            <span class="relative w-fit">
                <span class="block relative z-10">organisés près de chez vous !</span>
                <span class="absolute block h-full bg-secondary/50 w-[105%] top-0 -left-2 rounded-sm -rotate-1"></span>
            </span>
        </h2>
        <p>
            Parcourez les événements organisés partout en France par la  communauté Cleawalk.org grâce à notre carte interactive.
        </p>
        <button class="w-fit">
            <router-link :to="{name: 'map'}" class="px-4 py-2 bg-primary text-white! rounded-md font-catamaran font-medium">
                Participer à un ramassage
            </router-link>
        </button>
    </div>
</template>