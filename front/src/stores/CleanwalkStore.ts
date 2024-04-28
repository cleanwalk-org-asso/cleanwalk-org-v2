import NominatimHelper from '@/helpers/nominatimHelper';
import apiHelper from '@/helpers/apiHelper';
import type { Cleanwalk } from '@/interfaces/cleanwalkInterface';
import router from '@/router';
import { defineStore } from 'pinia'
import {ref, computed} from 'vue';
import type {Ref} from 'vue';

export const useCleanwalkStore = defineStore('cleanwalk', () => {

    let cleanwalkIsSelect = ref(false);

    const route:string = '/cleanwalks';

    let cleanwalksTab: Ref<Cleanwalk[]> = ref([]);




    async function getAllCleanwalks() {
        const route = '/cleanwalks'; // Assure-toi que cette route est correcte et complète
        try {
            const result = await apiHelper.kyGet(route);
            if (result.success && result.data) {
                // Convertit les données seulement si elles existent et la requête a réussi
                cleanwalksTab.value = result.data as unknown as Cleanwalk[];
            } else {
                // Log une erreur si la requête a échoué
                console.error('Failed to fetch cleanwalks:', result.data);
            }
        } catch (error) {
            // Gestion des erreurs de la requête elle-même
            console.error('Request failed:', error);
        }
        return cleanwalksTab.value;
    }

    async function getCleanwalkById(id: number): Promise<Cleanwalk|undefined> {
        const result = await apiHelper.kyGet(route + '/' + id);
        if(result.data != undefined) {
            return result.data as unknown as Cleanwalk;
        }
        return undefined;
    }

    async function createCleanwalk(cleanwalk: Cleanwalk, token:string): Promise<Cleanwalk|undefined> {
        const result = await apiHelper.kyPost(route, cleanwalk as unknown as Record<string, unknown>, token);
        if(result != undefined) {
            return result.data as unknown as Cleanwalk;
        }
        return undefined;
    }

    async function updateCleanwalk(cleanwalk: Cleanwalk, token:string): Promise<Cleanwalk|undefined> {
        const result = await apiHelper.kyPut(route + '/' + cleanwalk.id, cleanwalk as unknown as Record<string, unknown>, token);
        if(result != undefined) {
            return result.data as unknown as Cleanwalk;
        }
        return undefined;
    }

    return {getAllCleanwalks, cleanwalksTab, cleanwalkIsSelect}
   
});