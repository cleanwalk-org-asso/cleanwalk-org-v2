import NominatimHelper from '@/helpers/NominatimHelper';
import databaseHelper from '@/helpers/databaseHelper';
import type { Cleanwalk } from '@/interfaces/cleanwalkInterface';
import router from '@/router';
import { defineStore } from 'pinia'
import {ref, computed} from 'vue';
import type {Ref} from 'vue';

export const useCleanwalkCreationStore = defineStore('cleanwalkCreation', () => {
    const currentStep = ref(1);
    const isCurrentStepValid = ref(false);
    const validatedStep = ref(0);

    const cleanwalkName = ref('');
    const cleanwalkDescription = ref('');

    const cleanwalkLocation = ref('');

    const cleanWalkDate = <Ref<Date|undefined>>ref();
    const cleanwalkStartTime = <Ref<any>>ref();
    const cleanwalkEndTime = <Ref<any>>ref();

    const position = <Ref<Array<number> | undefined>>ref();

    const getPosition = computed(async (): Promise<Array<number>> => {
        const result = await NominatimHelper.nominatimSearch(cleanwalkLocation.value);
        console.log(result);
        return [result[0].lat, result[0].lon];
    });

    const getDuration = computed(() => {
        return Math.abs(timeToTimeStamp(cleanwalkStartTime.value) - timeToTimeStamp(cleanwalkEndTime.value));
    });

    function timeToTimeStamp(time: any){
        return time.hours * 60 + time.minutes
    }

    function tranformDateToString(): string {
        cleanWalkDate.value!.setHours(cleanwalkStartTime.value.hours);
        cleanWalkDate.value!.setMinutes(cleanwalkStartTime.value.minutes);
    
        return cleanWalkDate.value!.toLocaleString();
    }

    function nextStep() {
        currentStep.value++;
        if(currentStep.value - 1 > validatedStep.value){
            validatedStep.value =  currentStep.value - 1;
        }
        checkCurrentStep();
    }

    function previousStep() {
        currentStep.value--;
        checkCurrentStep();
    }

    function goToStep(step: number) {
        currentStep.value = step;
        checkCurrentStep();
    }

    function checkCurrentStep() {
        switch(currentStep.value){
            case 1:
                checkStep1();
                break;
            case 2:
                checkStep2();
                break;
            case 3:
                checkStep3();
                break;
        }
    }

    function checkStep1(){
        isCurrentStepValid.value = cleanwalkName.value.length > 0;
    }

    function checkStep2() {
        
        isCurrentStepValid.value = cleanwalkLocation.value.length > 0
        && cleanWalkDate.value != null
        && cleanwalkStartTime.value != null
        && cleanwalkEndTime.value != null
    }
    
    function checkStep3() {
        if(position.value === undefined){
            getPosition.value.then(result => {
                console.log(result);
                position.value = result;
            });
        }
        isCurrentStepValid.value = cleanwalkDescription.value.length > 0;
    }

    function createCleanwalk() {
        databaseHelper.createCleanwalk({
            id: -1,
            name: cleanwalkName.value,
            description: cleanwalkDescription.value,
            date_begin: cleanWalkDate.value,
            duration: getDuration.value,
            pos_lat: position.value![0],
            pos_long: position.value![1],
        } as Cleanwalk)

        // reset all properties so that the user can create a new cleanwalk from scratch
        $reset();
        router.push('/');
    }
    
    function $reset() {
        currentStep.value = 1;
        validatedStep.value = 0;
        isCurrentStepValid.value = false;
        cleanwalkName.value = '';
        cleanwalkDescription.value = '';
        cleanwalkLocation.value = '';
        cleanWalkDate.value = undefined;
        cleanwalkStartTime.value = undefined;
        cleanwalkEndTime.value = undefined;
    }


    return {
        currentStep, isCurrentStepValid, validatedStep, cleanwalkName, cleanwalkDescription, cleanwalkLocation, cleanWalkDate, cleanwalkStartTime, cleanwalkEndTime, position,
        getPosition, getDuration,
        nextStep, previousStep, goToStep, checkCurrentStep, createCleanwalk, tranformDateToString
    }
});