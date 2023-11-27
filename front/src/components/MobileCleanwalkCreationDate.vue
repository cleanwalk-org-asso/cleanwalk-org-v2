<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { useCleanwalkCreationStore } from '@/stores/CleanwalkCreationStore';

const CleanwalkCreationStore = useCleanwalkCreationStore();
const datePlaceholder = new Date(new Date().setMonth(new Date().getMonth() + 2)).toLocaleDateString();

</script>

<template>
    <div class="container">
        <label class="label">Lieu du ramassage</label>
        <input type="text" class="text-field input" 
                placeholder="132 rue des cacahuets, Paris"
                v-model="CleanwalkCreationStore.cleanwalkLocation"
                @input="CleanwalkCreationStore.checkCurrentStep"/>

        <div class="date-picker">
            <label class="label">Date</label>
            <VueDatePicker v-model="CleanwalkCreationStore.cleanWalkDate" 
                :placeholder="datePlaceholder" :enable-time-picker="false"
                :min-date="new Date()"
                input-class-name="input-date-time-picker"
                menu-class-name="date-time-picker"
                calendar-cell-class-name="date-time-picker-cell"
                @update:model-value="CleanwalkCreationStore.checkCurrentStep">
            </VueDatePicker>
        </div>

        <div class="row">
            <div>
                <label class="label">Heure début</label>
                <VueDatePicker v-model="CleanwalkCreationStore.cleanwalkStartTime" 
                    placeholder="14:30" time-picker
                    input-class-name="input-date-time-picker"
                    menu-class-name="date-time-picker"
                    calendar-cell-class-name="date-time-picker-cell"
                    @update:model-value="CleanwalkCreationStore.checkCurrentStep">
                </VueDatePicker>
            </div>
            <div>
                <label class="label">Heure fin</label>
                <VueDatePicker v-model="CleanwalkCreationStore.cleanwalkEndTime" 
                    placeholder="17:00" time-picker
                    input-class-name="input-date-time-picker"
                    menu-class-name="date-time-picker"
                    calendar-cell-class-name="date-time-picker-cell"
                    @update:model-value="CleanwalkCreationStore.checkCurrentStep">
                </VueDatePicker>
            </div>
        </div>
    </div>

    <div class="tip-container">
        <p class="tip">
            Choisissez ici le lieu, la date, la durée de votre ramassage (activités annexes comprises - goûter, pique-nique, …) ainsi que le nombre de participants souhaité. 
            Ce nombre n’est pas limitatif, les personnes pourront toujours s’inscrire même si le nombre de participants est supérieur à l’objectif fixé.
        </p>
    </div>
</template>

<style lang="scss">
    @import '../assets/main.scss';
    @import '../assets/date-picker.scss';

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

    .row {
        width: 100%;
        display: flex;
        margin: 1rem auto;
        align-items: center;
        gap: 0.5rem;
        justify-content: space-around;
    }

    .date-picker {
        margin-top: 1rem;
    }

</style>