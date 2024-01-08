import NominatimHelper from '@/helpers/NominatimHelper';
import databaseHelper from '@/helpers/databaseHelper';
import type { Cleanwalk } from '@/interfaces/cleanwalkInterface';
import router from '@/router';
import { defineStore } from 'pinia'
import {ref, computed} from 'vue';
import type {Ref} from 'vue';

export const useCleanwalkStore = defineStore('cleanwalk', () => {

    const route:string = 'cleanwalks';

    const cleanwalks: Ref<Cleanwalk[]|undefined> = ref();


    async function getAllCleanwalks(): Promise<Cleanwalk[]|undefined> {
        const result = await databaseHelper.kyGet(route);
        if(result != undefined) {
            cleanwalks.value = result as Cleanwalk[];
        }
        return cleanwalks.value;
    }


    return {getAllCleanwalks, cleanwalks}
   
});