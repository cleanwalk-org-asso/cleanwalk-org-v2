<script setup lang="ts">
import { useCleanwalkCreationStore } from '@/stores/CleanwalkCreationStore';

const CleanwalkCreationStore = useCleanwalkCreationStore();

</script>

<template>
    <div class="container">
        <label class="label">Nom du ramassage</label>
        <input type="text" class="text-field input" placeholder="Ma super cleanwalk" 
            v-model="CleanwalkCreationStore.cleanwalkName"
            @input="CleanwalkCreationStore.checkCurrentStep"/>
    </div>

    <div class="tip-container">
        <p class="tip">Avant de lancer votre ramassage, pensez à consulter le <a href="https://cleanwalk-api.s3.eu-west-3.amazonaws.com/Guide_de_la_cleanwalk.pdf" target="_blank" class="inline-link">guide du ramasseur</a> pour connaître les règles d’or d’une bonne organisation. 
            Choisissez un titre court pour votre ramassage, qui permettra de donner une idée globale de votre événement pour intéresser les potentiels participants. 
            Ne vous perdez pas dans les détails (heure, matériel, etc.) que vous pourrez inscrire dans la suite de ce formulaire. 
            Si une activité est associée à votre ramassage (running, randonnée, …), vous pouvez l’indiquer dans le titre pour que cela soit mis en avant.
        </p>
    </div>
</template>

<style lang="scss" scoped>
    @import '../assets/main.scss';
    .container {
        width: 85%;
        margin: 1rem 0;
    }

    .label {
        margin: 1rem;
        font-size: 0.75rem;
    }

    .input {
        margin: 0;
    }

</style>