<script setup lang="ts">
import { useCleanwalkCreationStore } from '@/stores/CleanwalkCreationStore';
import {useTextareaAutosize} from '@vueuse/core';

const { textarea, input } = useTextareaAutosize()

const CleanwalkCreationStore = useCleanwalkCreationStore();

const onInput = () => {
    CleanwalkCreationStore.cleanwalkDescription;
    input.value = CleanwalkCreationStore.cleanwalkDescription;
    
    CleanwalkCreationStore.checkCurrentStep();
}

</script>

<template>
    <div class="container">
        <label class="label">Description du ramassage</label>
        <textarea class="text-area resize-none" placeholder="Description..."
            ref="textarea"
            v-model="CleanwalkCreationStore.cleanwalkDescription"
            @input="onInput">
        </textarea>
    </div>

    <div class="tip-container">
        <p class="tip">
            Utilisez cet espace pour donner toute information complémentaire aux potentiels participants : matériel à apporter, 
            parcours prévu, état des lieux, précisions sur le point de rendez-vous, etc.
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
        margin: 0.6rem;
        font-size: 0.75rem;
    }

</style>