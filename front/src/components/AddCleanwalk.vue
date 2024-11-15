<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { useCleanwalkForm } from '@/composables/useAddCleanwalk'; // Import the composable
import AutocompleteAddress from './AutocompleteAddress.vue';
import iconMiniMap from './icons/icon-mini-map.vue';
import iconClock from './icons/icon-clock.vue';
import dragDrop from './dragDrop.vue';
import dateService from '@/services/dateService';

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
</script>

<template>
    <section class="section">
      <div class="progression-bar">
        <div class="progression-bar-inner" :style="{ width: progress * 100 / 6 + '%' }"></div>
      </div>
      <div class="container">
        <div class="top">
          <h1>{{ tiles.titles[progress - 1] }}</h1>
          <input v-model="newCleanwalk.name" v-if="progress === 1" type="text" placeholder="Saisissez le nom de votre évènement">
          
          <div v-if="progress === 2" class="autocomplete-container">
            <AutocompleteAddress v-model:query="newCleanwalk.address" @select-suggestion="handleSelectAddress" />
          </div>
  
          <label v-if="progress === 3" class="label" for="date">Date de l'évènement</label>
          <input id="date" v-model="dateCleanwalk.dateDay" v-if="progress === 3" type="date">
  
          <label v-if="progress === 3" class="label" for="hourBegin">Heure de début</label>
          <input id="hourBegin" v-model="dateCleanwalk.hourBegin" v-if="progress === 3" type="time">
  
          <label v-if="progress === 3" class="label" for="hourEnd">Heure de fin</label>
          <input id="hourEnd" v-model="dateCleanwalk.hourEnd" v-if="progress === 3" type="time">
  
          <textarea v-if="progress === 4" v-model="newCleanwalk.description" name="description" id="description" cols="30" rows="10" placeholder="Saisissez une description précise de votre évènement"></textarea>
  
          <dragDrop ref="dragDropRef" v-if="progress >= 5" :auto-upload="false" format="card" />
  
          <div v-if="progress === 6" class="preview">
            <h3>{{ newCleanwalk.name }}</h3>
            <div class="date-locate">
              <div class="divtop">
                <iconClock />
                <div>{{ dateService.getCleanwalkWrittenDate(new Date(newCleanwalk.date_begin), newCleanwalk.duration) }}</div>
              </div>
              <div class="bot">
                <iconMiniMap />
                <div>{{ newCleanwalk.address }}</div>
              </div>
            </div>
            <p>{{ newCleanwalk.description }}</p>
          </div>
        </div>
        <div class="bottom">
          <div v-if="progress < 6" class="conseil">
            <h3>Notre conseil</h3>
            <p>{{ getConseil() }}</p>
          </div>
          <div class="button-container">
            <button @click="back()" class="secondary-button">{{ progress === 6 ? 'Modifier' : 'Précédent' }}</button>
            <button @click="next()" class="button-primary">{{ progress === 6 ? 'Publier' : 'Suivant' }}</button>
          </div>
        </div>
      </div>
    </section>
  </template>
  


<style scoped lang="scss">
.section {
    padding: 58px 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    height: 100dvh;
}

.progression-bar {
    width: 100%;
    background-color: #CBD5E1;

    .progression-bar-inner {
        height: 13px;
        background-color: #72BDA3;
        transition: width 0.5s ease-in-out;
    }
}

.container {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;

    .top {
        display: flex;
        align-items: left;
        flex-direction: column;
        padding: 0 1rem;
    }

    h1 {
        color: var(#373646);
        text-align: center;
        font-size: 20px;
        font-weight: 700;
        width: 100%;
    }

    input,
    textarea {
        border: 1px solid #94A3B8;
        border-radius: 8px;
        padding: 12px;
        margin-top: 0.5rem;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        width: 100%;

        &::placeholder {
            color: #94A3B8;
        }

        &:focus {
            outline: none;
        }
    }

    .label {
        font-size: 12px;
        font-weight: 500;
        position: relative;
        margin-bottom: -18px;
        background-color: #fff;
        width: fit-content;
        margin-left: 13px;
        margin-top: 5px;
    }

    .preview {
        h3 {
            font-size: 20px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            padding-top: 1rem;
        }

        img {
            width: 100%;
            object-fit: cover;
            aspect-ratio: 16/9;
            border-radius: 8px;
            margin-top: 1rem;
        }

        .date-locate {
            padding-top: 2rem;
            display: flex;
            stroke: black;
            flex-direction: column;

            .divtop {
                display: flex;
                align-items: center;
                gap: 10px;
            }

            .bot {
                margin-top: 10px;
                display: flex;
                align-items: center;
                gap: 10px;
            }
        }

        p {
            padding-top: 2rem;
            font-size: 14px;
            word-wrap: break-word;
        }
    }

    .bottom {
        display: flex;
        align-items: center;
        flex-direction: column;

        .conseil {
            display: flex;
            flex-direction: column;
            align-items: start;
            gap: 0.5rem;
            background-color: var(--color-secondary);
            padding: 0.5rem;
            border-radius: 8px;
            width: 100%;

            h3 {
                color: #373646;
                font-size: 16px;
                font-weight: 700;
            }

            p {
                color: #94A3B8;
                font-size: 14px;
                font-weight: 500;
            }
        }

        .button-container {
            display: flex;
            width: 100%;
            gap: 1rem;
            padding-top: 1.5rem;

            button {
                flex: 1;
            }

            .button-primary {
                padding: 0.5rem 0;
                flex-grow: 0.5;
            }

            .secondary-button {
                color: #132778;
                font-size: 16px;
                font-style: normal;
                font-weight: 500;
                padding: 0.5rem 0;
                border: 1px solid #132778;
                border-radius: 8px;
                flex-grow: 0.5;
            }
        }
    }
}

@media (min-width: 1024px) {

    .container {
        padding-left: clamp(2rem, 20vw, 10rem);
        padding-right: clamp(2rem, 20vw, 10rem);
    }

}
</style>