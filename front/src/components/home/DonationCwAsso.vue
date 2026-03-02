<template>
    <div class="bg-base flex justify-between">
        <div class="flex flex-col p-8 gap-4">
            <h4 class="text-2xl font-black text-primary">
                <span class="relative w-fit">
                    <span class="block relative z-10 w-fit">Soutenez</span>
                    <span class="absolute block h-full bg-secondary/50  w-30 -top-1 -left-2 rounded-sm -rotate-1"></span>
                </span>
                la mission de Cleanwalk.org
            </h4>
            <p class="max-w-xl">
                Cleanwalk.org est une plateforme gratuite, gérée par une association. Si vous appréciez notre mission, aidez-nous à continuer et à développer nos actions en faisant un don.
            </p>
            <div class="flex gap-8 font-bold">
                <button class="bg-primary flex-1 text-white! rounded-lg p-4!">Faire un Don</button>
                <button class="flex-1 rounded-lg border-2! text-text border-border! p-4!" >Devenir Adhérant</button>
            </div>
        </div>
        <img class="hidden md:block w-[430px] h-[420px]" src="../../assets/Donate.png" alt="illustration soutenir l'association">
    </div>
</template>