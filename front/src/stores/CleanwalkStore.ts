import nominatimService from '@/services/nominatimService';
import api from '@/services/apiService';
import type { Cleanwalk, CleanwalkCreation, SingleCleanwalk } from '@/interfaces/cleanwalkInterface';
import router from '@/router';
import { defineStore } from 'pinia'
import { ref, computed } from 'vue';
import type { Ref } from 'vue';


export const useCleanwalkStore = defineStore('cleanwalk', () => {

    const route: string = 'cleanwalks';

    const cleanwalksTab: Ref<Cleanwalk[]> = ref([]);

    async function getAllCleanwalks() {
        const route = 'cleanwalks'; // Assure-toi que cette route est correcte et complète
        try {
            const response = await api.get(route);
            if (response.ok) {
                cleanwalksTab.value = await response.json() as unknown as Cleanwalk[];
            } else {
                console.error('Failed to fetch cleanwalks:');
            }
        } catch (error) {
            console.error('Request failed:', error);
        }
        return cleanwalksTab.value;
    }

    async function getCleanwalkById(id: number, userId?: number): Promise<SingleCleanwalk | undefined> {
        let url = route + '/' + id;
        if (userId) {
            url += '?user_id=' + userId;
        }
        const response = await api.get(url);
        if (response.ok) {
            return await response.json() as unknown as SingleCleanwalk;
        }
        return undefined;
    }

    async function createCleanwalk(cleanwalk: CleanwalkCreation): Promise<CleanwalkCreation | undefined> {
        const response = await api.post(route, {
            json: cleanwalk
        });

        console.log('Create cleanwalk request:', cleanwalk);
        console.log('Create cleanwalk response:', response);
        if (response.ok) {
            return await response.json() as unknown as CleanwalkCreation;
        }
        router.push({ name: 'cleanwalks' });
        return undefined;
    }

    async function updateCleanwalk(cleanwalk: Cleanwalk, token: string): Promise<Cleanwalk | undefined> {
        const response = await api.put(route + '/' + cleanwalk.id, cleanwalk as unknown as Record<string, unknown>);
        if (response.ok) {
            return await response.json() as unknown as Cleanwalk;
        }
        return undefined;
    }

    async function joinCleanwalk(cleanwalkId: number, token: string, nb_participants: number, user_id: number): Promise<boolean> {
        const response = await api.post(route + '/join',
            {
                json: {
                    cleanwalk_id: cleanwalkId,
                    user_id: user_id,
                    nb_person: nb_participants
                }
            });
        return response.ok;
    }

    async function leaveCleanwalk(cleanwalkId: number, token: string, user_id: number): Promise<boolean> {
        const response = await api.delete(route + '/leave', 
            {
                json: {
                    cleanwalk_id: cleanwalkId,
                    user_id: user_id
                }
        });
        return response.ok;
    }

    async function checkUserParticipation(cleanwalkId: number, userId: number): Promise<{ is_host: boolean, is_participant: boolean, nb_person?: number } | null> {
        const response = await api.get(route + '/check_user_participation?user_id=' + userId + '&cleanwalk_id=' + cleanwalkId);
        if (response.ok) {
            return response.json() as unknown as { is_host: boolean, is_participant: boolean, nb_person?: number };
        }
        return null;
    }

    return { getAllCleanwalks, cleanwalksTab, getCleanwalkById, createCleanwalk, joinCleanwalk, leaveCleanwalk, checkUserParticipation }

});