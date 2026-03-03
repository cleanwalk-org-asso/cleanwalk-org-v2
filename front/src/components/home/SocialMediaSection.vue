<script setup lang="ts">
import Discord from '../icons/Discord.vue';
import Facebook from '../icons/Facebook.vue';
import Insta from '../icons/Insta.vue';
import LinkedIn from '../icons/LinkedIn.vue';

</script>

<template>
    <div class=" bg-[linear-gradient(180deg,#132778_0%,#2348DE_100%)] text-white flex flex-col items-center gap-4 py-12">
        <div class="bg-[#E1F4F8] text-text md:text-xl px-4 py-1 rounded-full">
            #cleanwalk.org
        </div>

        <div>
            <h3 class="font-black text-xl md:text-[2.5rem]">
                Retrouvez nous sur les réseaux sociaux
            </h3>
            <div class="flex gap-4 pt-4 flex-wrap justify-center">
                <a href="https://www.facebook.com/cleanwalk.org" target="_blank">
                    <Facebook />
                </a>
                <a href="https://www.instagram.com/cleanwalk_org/" target="_blank">
                    <Insta />
                </a>
                <a href="https://www.linkedin.com/company/cleanwalkorg/" target="_blank">
                    <LinkedIn />
                </a>
                <a href="https://discord.gg/gPQn9YcrTZ" target="_blank">
                    <Discord />
                </a>
            </div>
        </div>
    </div>
</template>