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
                <img src="../assets/logo.svg" alt="logo cleanwalk.org" class="w-48.5 mx-auto pb-4">
                <p>
                    La plateforme qui centralise les actions <br> citoyennes de ramassage des déchets
                </p>
            </div>
            <div class="flex gap-12">
                <div>
                    <div class="font-bold pb-2">
                        Nos réseaux sociaux
                    </div>
                    <div class="flex gap-4 mt-4">
                        <a href="https://www.facebook.com/cleanwalk.org" target="_blank">
                            <Facebook class="w-6 h-6" />
                        </a>
                        <a href="https://www.instagram.com/cleanwalk_org/" target="_blank">
                            <Insta class="w-6 h-6" />
                        </a>
                        <a href="https://www.linkedin.com/company/cleanwalkorg/" target="_blank">
                            <LinkedIn class="w-6 h-6" />
                        </a>
                        <a href="https://discord.gg/gPQn9YcrTZ" target="_blank">
                            <Discord class="w-6 h-6" />
                        </a>
                    </div>
                </div>

                <div>
                    <div class="font-bold pb-2.5">Nous contacter</div>
                    <div>
                        <a href="mailto:contact@cleanwalk.org">contact@cleanwalk.org</a>
                    </div>
                </div>
            </div>
            <div class="flex">
                <div>
                    <div class="font-bold">Ressources</div>
                    <div class="w-48">
                        <router-link to="/notre-histoire">Histoire de Cleanwalk.org</router-link> <br>
                        <router-link to="/cleanwalk-guide">Guide de la Cleanwalk</router-link>
                    </div>
                </div>
                <div>
                    <div class="font-bold">Menu</div>
                    <div class="w-38">
                        <router-link to="/cleanwalks">Carte des ramassages</router-link><br>
                        <a href="https://www.helloasso.com/associations/cleanwalk-org">l'association</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="h-px bg-white/20 my-8"></div>
        <div class="flex items-center justify-between text-xs text-[#E5E7EB]/80 pt-4">
            <div class="flex gap-4">
                <router-link to="/mentions-legales" class="underline">Mentions légales</router-link>
                <router-link to="/conditions-generales-utilisation" class="underline">Conditions générales d'utilisation</router-link>
            </div>
            <div class="flex gap-6">
                <span>Cleanwalk.org 2025 - Association de loi 1901</span>
                <span>Développé par nos bénévoles.</span>
                <span>
                    Cartographie :
                    <a href="https://leafletjs.com" target="_blank" rel="noopener noreferrer" class="underline">Leaflet</a>
                    &amp;
                    <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" class="underline">OpenStreetMap</a>
                </span>
            </div>
        </div>
    </footer>
</template>