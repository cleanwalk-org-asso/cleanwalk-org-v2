<script setup lang="ts">
import navigationBar from '@/components/MobileNavigationBar.vue';
import mobileHeader from '@/components/MobileHeader.vue';
import progressbar from '@/components/GlobalStepProgressBar.vue';
import step1 from '@/components/MobileCleanwalkCreationName.vue';
import step2 from '@/components/MobileCleanwalkCreationDate.vue';
import step3 from '@/components/MobileCleanwalkCreationDescription.vue';
import step4 from '@/components/MobileCleanwalkCreationOverview.vue';
import { useCleanwalkCreationStore } from '@/stores/CleanwalkCreationStore';

const CleanwalkCreationStore = useCleanwalkCreationStore();

</script>

<template>
    <mobileHeader></mobileHeader>
    <div class="flex-container">
        <h1 class="title">Organiser une Cleanwalk</h1>

        <progressbar :steps="['Nom', 'Date et Location', 'Description', 'Aperçu',]" 
                    :current-step="CleanwalkCreationStore.currentStep"
                    @goToStep="step => CleanwalkCreationStore.goToStep(step)"
                    :validated-step="CleanwalkCreationStore.validatedStep">
        </progressbar>

        <step1 v-if="CleanwalkCreationStore.currentStep == 1"></step1>
        <step2 v-if="CleanwalkCreationStore.currentStep == 2"></step2>
        <step3 v-if="CleanwalkCreationStore.currentStep == 3"></step3>
        <step4 v-if="CleanwalkCreationStore.currentStep == 4"></step4>
        
        <div>
            <button class="primary-button-variant button"
                    v-if="CleanwalkCreationStore.currentStep != 1"
                    @click="CleanwalkCreationStore.previousStep">
                    Précédant
            </button>
            <button class="primary-button button"
                    v-if="CleanwalkCreationStore.currentStep < 4"
                    :disabled="!CleanwalkCreationStore.isCurrentStepValid"
                    @click="CleanwalkCreationStore.nextStep">
                    Suivant
            </button>
            <button class="secondary-button button"
                    v-if="CleanwalkCreationStore.currentStep == 4"
                    @click="CleanwalkCreationStore.createCleanwalk">
                    Valider
            </button>
        </div>
    </div>

    <navigationBar selected-menu="create"></navigationBar>
</template>


<style lang="scss" scoped>
    .flex-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: start;
        padding-top: 4rem;
        padding-bottom: 6rem;
        overflow: visible;
    }
    
    .button {
        width: 7rem;
        margin: 0 1rem;
    }

    .title {
        font-size: 1.5rem;
        font-weight: 500;
        margin: 2rem 0;
    }
</style>@/stores/CleanwalkStore