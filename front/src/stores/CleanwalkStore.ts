import NominatimHelper from '@/helpers/nominatimHelper';
import apiHelper from '@/helpers/apiHelper';
import type { Cleanwalk } from '@/interfaces/cleanwalkInterface';
import router from '@/router';
import { defineStore } from 'pinia'
import {ref, computed} from 'vue';
import type {Ref} from 'vue';

export const useCleanwalkStore = defineStore('cleanwalk', () => {

    let cleanwalkIsSelect = ref(false);

    const route:string = 'cleanwalks';

    let cleanwalksTab: Ref<Cleanwalk[]|undefined> = ref([]);




    async function getAllCleanwalks(): Promise<Cleanwalk[]|undefined> {
        const result = await apiHelper.kyGet(route);
        if(result != undefined) {
            cleanwalksTab.value = result as Cleanwalk[];
        }
        return cleanwalksTab.value;
    }

    async function getCleanwalkById(id: number): Promise<Cleanwalk|undefined> {
        const result = await apiHelper.kyGet(route + '/' + id);
        if(result != undefined) {
            return result as Cleanwalk;
        }
        return undefined;
    }

    async function createCleanwalk(cleanwalk: Cleanwalk, token:string): Promise<Cleanwalk|undefined> {
        const result = await apiHelper.kyPost(route, cleanwalk, token);
        if(result != undefined) {
            return result as Cleanwalk;
        }
        return undefined;
    }

    async function updateCleanwalk(cleanwalk: Cleanwalk, token:string): Promise<Cleanwalk|undefined> {
        const result = await apiHelper.kyPut(route + '/' + cleanwalk.id, cleanwalk, token);
        if(result != undefined) {
            return result as Cleanwalk;
        }
        return undefined;
    }

    return {getAllCleanwalks, cleanwalksTab, cleanwalkIsSelect}
   
});