<template>
    <div class="px-8 pb-16">
        <h4 class="font-black text-2xl text-center">
            Choisissez votre profil Cleanwalk.org
        </h4>
        <div class="text-center pt-4 pb-8">
            Inscrivez vous en quelques clics et accédez aux fonctionnalités adaptées à vos besoins.
        </div>
        <div class="flex flex-col gap-16 md:flex-row items-center justify-center">
            <div class="border-2 rounded-lg p-8 border-border text-text">
                <div class="flex flex-col items-center gap-2 pb-4">
                    <img src="../../assets/PersonalAccount.svg" alt="icon compte personnel">
                    <h4 class="text-lg font-bold">Compte personnel</h4>
                </div>
                <ul class="block pt-8! pb-24!">
                    <li class="list-disc">Organisez vos propres cleanwalks</li>
                    <li class="list-disc">Rejoignez des initiatives près de chez vous</li>
                    <li class="list-disc">Ressources organisateurs</li>
                    <li class="list-disc">Profil privé</li>
                </ul>
                <button class="w-full">
                    <router-link :to="{ name: 'signupPerso' }" class="py-2 block bg-primary text-white! rounded-md font-catamaran font-medium">
                        Créer son compte personnel
                    </router-link>
                 </button>
            </div>
                    <div class="border-2 rounded-lg p-8 border-border text-text">
                <div class="flex flex-col items-center gap-2 pb-4">
                    <img src="../../assets/AssoAccount.svg" alt="icon compte personnel">
                    <h4 class="text-lg font-bold">Compte association</h4>
                </div>
                <ul class="block pt-8! pb-24!">
                    <li class="list-disc">Organisez vos propres cleanwalks</li>
                    <li class="list-disc">Rejoignez des initiatives près de chez vous</li>
                    <li class="list-disc">Ressources organisateurs</li>
                    <li class="list-disc">Profil public (A venir)</li>
                </ul>
                <button class="w-full">
                    <router-link :to="{ name: 'signupAsso' }" class="py-2 block bg-primary text-white! rounded-md font-catamaran font-medium">
                        Créer son compte association
                    </router-link>
                 </button>
    
            </div>
        </div>
    </div>
</template>