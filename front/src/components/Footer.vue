<script setup lang="ts">
import Discord from './icons/Discord.vue';
import Facebook from './icons/Facebook.vue';
import Insta from './icons/Insta.vue';
import LinkedIn from './icons/LinkedIn.vue';

</script>

<template>
    <footer class="flex flex-col bg-[#37363F] text-[#E5E7EB] p-12">
        <div class="flex justify-between">
            <div>
                <img src="../assets/logo.svg" alt="logo cleanwalk.org" class="w-48.5 mx-auto pb-10">
                <p>
                    La plateforme qui centralise les actions <br> citoyennes de ramassage des déchets
                </p>
            </div>
            <div class="flex gap-12">
                <div>
                    <div class="font-bold">
                        Nos réseaux sociaux
                    </div>
                    <div class="flex gap-4 mt-4">
                        <a href="https://www.facebook.com/cleanwalk.org" target="_blank">
                            <Facebook class="w-6 h-6" />
                        </a>
                        <a href="https://www.instagram.com/cleanwalk.org/" target="_blank">
                            <Insta class="w-6 h-6" />
                        </a>
                        <a href="https://www.linkedin.com/company/cleanwalkorg/" target="_blank">
                            <LinkedIn class="w-6 h-6" />
                        </a>
                        <a href="https://discord.gg/cleanwalk" target="_blank">
                            <Discord class="w-6 h-6" />
                        </a>
                    </div>
                </div>

                <div>
                    <div class="font-bold">Nous contacter</div>
                    <div>
                        contact@cleanwalk.org
                    </div>
                </div>
            </div>
            <div class="flex">

            </div>
        </div>

    </footer>
</template>