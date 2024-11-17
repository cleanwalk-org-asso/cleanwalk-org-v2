<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { useCleanwalkForm } from '@/composables/useAddCleanwalk'; // Import the composable
import AutocompleteAddress from './AutocompleteAddress.vue';
import iconMiniMap from './icons/icon-mini-map.vue';
import iconClock from './icons/icon-clock.vue';
import dragDrop from './dragDrop.vue';
import dateService from '@/services/dateService';
import BaseInput from './base/BaseInput.vue';

// Import the composable
const {
  progress,
  dragDropRef,
  newCleanwalk,
  dateCleanwalk,
  handleSelectAddress,
  setDate,
  upload,
  next,
  back
} = useCleanwalkForm(); // Destructure the composable to access the data and methods

const tiles = defineProps<{ titles: string[] }>();

// Advice messages for the user
const conseils = ref([
  'Avant de lancer votre ramassage, pensez à consulter le guide du ramasseur pour connaître les règles d’or d’une bonne organisation.',
  'L’ajout d’une photo est optionnel'
]);

// Function to get the appropriate advice based on the progress
const getConseil = () => {
  if (progress.value < 6) {
    return conseils.value[0];
  } else {
    return conseils.value[1];
  }
};

const email = ref('');

const test = () => {
  console.log(email.value);
}
</script>

<template>
  <button @click="test">test</button>
  <BaseInput v-model="email" name="email" type="email" label="Email" placeholder="user@domain.com" />
</template>

<style lang="scss" scoped>
button {
  margin-top: 6rem;
}
</style>
