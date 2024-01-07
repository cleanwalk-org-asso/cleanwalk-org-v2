import NominatimHelper from '@/helpers/NominatimHelper';
import databaseHelper from '@/helpers/databaseHelper';
import type { Cleanwalk } from '@/interfaces/cleanwalkInterface';
import router from '@/router';
import { defineStore } from 'pinia'
import {ref, computed} from 'vue';
import type {Ref} from 'vue';

export const useCleanwalkCreationStore = defineStore('cleanwalk', () => {

    const route:string = 'cleanwalks';

    // async function createCleanwalk(cleanwalk: Cleanwalk): Promise<boolean> {
    //     const result = await databaseHelper.kyPost(route, cleanwalk, cleanwalk.access_token);
    //     if(result != undefined) {
    //         return true;
    //     }
    //     return false;
    // }

    async function getCleanwalks(): Promise<Cleanwalk[]|undefined> {
        const result = await databaseHelper.kyGet(route);
        console.log(result);
        if(result != undefined) {
            return result as Cleanwalk[];
        }
        return undefined;
    }
   
});