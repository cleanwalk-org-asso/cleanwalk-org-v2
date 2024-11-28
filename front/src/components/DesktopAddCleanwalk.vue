<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { useCleanwalkForm } from '@/composables/useAddCleanwalk'; // Import the composable
import AutocompleteAddress from './AutocompleteAddress.vue';
import iconMiniMap from './icons/icon-mini-map.vue';
import iconClock from './icons/icon-clock.vue';
import dragDrop from './dragDrop.vue';
import dateService from '@/services/dateService';
import BaseInput from './base/BaseInput.vue';
import router from '@/router';
import { useUtilsStore } from '@/stores/UtilsStore';


const showToast = useUtilsStore().showToast;
// Import the composable
const {
  dragDropRef,
  newCleanwalk,
  dateCleanwalk,
  handleSelectAddress,
  setDate,
  upload,
} = useCleanwalkForm(); // Destructure the composable to access the data and methods

const tiles = defineProps<{ titles: string[] }>();

const progress = ref(1);

// Advice messages for the user
const conseils = ref([
  'Choisissez un titre court pour votre ramassage, qui permettra de donner une idée globale de votre événement pour intéresser les potentiels participants. Ne vous perdez pas dans les détails (heure, matériel, etc.) que vous pourrez inscrire dans la suite de ce formulaire. Si une activité est associée à votre ramassage (running, randonnée, …), vous pouvez l’indiquer dans le titre pour que cela soit mis en avant.'
]);

const getConseil = () => {
  return conseils.value[progress.value - 1];
};

// Handling next and previous buttons
const next = () => {
  if (progress.value === 1 && (!newCleanwalk.value.name || !newCleanwalk.value.address)) {
    showToast('Please enter a name and address for your event', false);
    return;
  }
  if (progress.value === 2) {
    setDate();
    if (!newCleanwalk.value.date_begin || !newCleanwalk.value.duration || newCleanwalk.value.duration < 0) {
      showToast('Please enter a valid start and end time', false);
      return;
    }
  }
  if (progress.value === 3 && !newCleanwalk.value.description) {
    showToast('Please enter a description for your event', false);
    return;
  }
  if (progress.value === 5) {
    upload();
    return;
  }

  progress.value += 1;
};

const back = () => {
  if (progress.value === 1) {
    router.push('/add');
    return;
  }
  progress.value -= 1;
};

</script>

<template>
  <section class="section">
    <div class="container">
      <h1>Organiser un ramassage</h1>
      <h2>Informations générales</h2>
      <div class="form">
        <div v-if="progress === 1">
          <BaseInput v-model="newCleanwalk.name" name="text" type="text" label="cleanwalk-name"
            placeholder="Saisissez le nom de votre événement" />
          <AutocompleteAddress v-model:query="newCleanwalk.address" @select-suggestion="handleSelectAddress" />
        </div>

      </div>
      <div class="help">
        <h3>Aide</h3>
        <p>{{ getConseil() }}</p>
      </div>
    </div>
    <div class="btn-container">
      <button class="btn back" @click="back" v-if="progress !== 6">Précédent</button>
      <button class="btn next btn" @click="next">Suivant</button>
    </div>

    <div class="progress">
      <h3>Progression</h3>
      <ul class="progression-bar">
        <li :class="{ active: progress === 1 }">Informations générales</li>
        <li :class="{ active: progress === 2 }">Dates et horaires</li>
        <li :class="{ active: progress === 3 }">Description</li>
        <li :class="{ active: progress === 4 }">Photo et visuel</li>
        <li :class="{ active: progress === 5 }">Aperçu</li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.btn-container {
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 6.4rem;
  gap: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
  flex-grow: 1;
  width: 40rem;

  .btn {
    flex: 1;
    padding: 1.25rem;
    font-weight: 700;
    font-size: 1.125rem;
    border-radius: 8px;

    &.back {
      border: solid 1px #65707F;
      background-color: #F8FAFD;
    }

    &.next {
      background-color: var(--color-primary);
      color: #fff;
    }
  }
}

.section {
  padding-top: 10rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.container {
  width: clamp(20rem, 80%, 40rem);

  h1 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 3rem;
    width: 100%;
    text-align: center;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    width: 100%;
    text-align: left;
  }

  .form {
    display: flex;
    flex-direction: column;
    background-color: #F8FAFD;
    border-radius: 8px;
    border: 1px solid #CBD5E1;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .help {
    border: 1px solid #CBD5E1;
    border-radius: 8px;
    background-color: #E1F4F8;
    padding: 1.5rem;

  }

}

.progress {
  padding-top: 1.3rem;

  h3 {
    width: 100%;
    text-align: left;
    font-weight: 700;
    padding-bottom: 0.5rem;
  }

  .progression-bar {
    border: 1px solid #CBD5E1;
    border-radius: 8px;
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 0.5rem;

    li {
      width: 100%;
      padding: 0.75rem;
      border-radius: 4px;
      font-weight: 500;
      font-size: 1.125rem;

      &.active {
        background-color: #E1F4F8;
        border: 1px solid #CBD5E1;
      }
    }
  }



}

@media screen and (min-width: 1500px) {
  .progress {
    position: absolute;
    transform: translateX(250%);
  }
}
</style>
