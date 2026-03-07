<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { X } from 'lucide-vue-next';

const STORAGE_KEY = 'cleanwalk_v2_notice_seen';
const isVisible = ref(false);

onMounted(() => {
  isVisible.value = localStorage.getItem(STORAGE_KEY) !== 'true';
});

const closeModal = () => {
  localStorage.setItem(STORAGE_KEY, 'true');
  isVisible.value = false;
};
</script>

<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 z-[20000] flex items-center justify-center bg-black/55 p-4"
    role="dialog"
    aria-modal="true"
    aria-labelledby="v2-notice-title"
  >
    <div class="relative flex w-full max-w-2xl flex-col gap-3 rounded-xl bg-white p-6 text-primary shadow-lg">
      <button
        class="absolute right-3 top-3 cursor-pointer bg-transparent p-1 text-gray hover:opacity-80"
        type="button"
        aria-label="Fermer"
        @click="closeModal"
      >
        <X :size="20" />
      </button>

      <h2 id="v2-notice-title" class="mr-8 text-2xl font-bold">Bienvenue sur Cleanwalk V2</h2>

      <p>
        Cette version est en cours de reconstruction : toutes les fonctionnalités ne sont pas encore disponibles.
      </p>
      <p>
        Le projet est porté par une équipe bénévole, donc les évolutions arrivent progressivement.
      </p>
      <p>
        Les données ont été réinitialisées afin de respecter les obligations RGPD.
      </p>

      <RouterLink class="mt-3 w-fit rounded-md bg-primary px-4 py-2 font-semibold text-white!" :to="{ name: 'signup' }" @click="closeModal">
        Créer un compte
      </RouterLink>
    </div>
  </div>
</template>
