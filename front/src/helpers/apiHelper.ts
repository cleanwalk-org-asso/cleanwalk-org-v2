
import ky from 'ky';
import { HTTPError } from 'ky';

const apiUrl = '/api'; // Proxi in vite.config

import type { ApiResponse } from '@/interfaces/apiResponseInterface';

const kyGet = async (route: string) => {
    try {
        const response = await ky.get(apiUrl + route, {
            headers: {
                'X-API-Key': (import.meta as any).env.VITE_API_KEY,
            },
        }).json();

        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
        return undefined;
    }
};

const kyPost = async (route: string, data: any, access_token: string) => {
    try {
        const response = await ky.post(apiUrl + route, {
            json: data,
            headers: {
                'X-API-Key': import.meta.env.VITE_API_KEY,
                'Authorization': 'Bearer ' + access_token,
            },
        }).json();

        return response;
    } catch (error) {
        console.error('Error sending data:', error);
        return undefined;
    }
};

const kyPostWithoutToken = async (route: string, data: Record<string, unknown>): Promise<ApiResponse> => {
    try {
        const response: Record<string, unknown> = await ky.post(apiUrl + route, {
            json: data,
            headers: {
                'X-API-Key': import.meta.env.VITE_API_KEY,
            },
        }).json();

        return { success: true, data: response };
    } catch (error: unknown) {
        console.error('Error sending data:', error);
        if (error instanceof HTTPError) {
            // You can get the error response body as JSON
            const errorData: Record<string, unknown> = await error.response.json();
            return { success: false, data: errorData };
        }
        return { success: false, data: { message: 'An unknown error occurred' } };
    }
};

const kyPut = async (route: string, data: any, access_token:string) => {
    try {
        const response = await ky.put(apiUrl + route, {
            json: data,
            headers: {
                'X-API-Key': import.meta.env.VITE_API_KEY,
                'Authorization': 'Bearer ' + access_token,
            },
        }).json();
        return response;
    } catch (error) {
        console.error('Error updating data:', error);
        return undefined;
    }
};

const kyDelete = async (route: string, access_token: string) => {
    try {
        const response = await ky.delete(apiUrl + route, {
            headers: {
                'X-API-Key': import.meta.env.VITE_API_KEY,
                'Authorization': 'Bearer ' + access_token,
            },
        }).json();

        return response;
    } catch (error) {
        console.error('Error deleting data:', error);
        return undefined;
    }
};

export default {
    kyGet,
    kyPost,
    kyPut,
    kyDelete,
    kyPostWithoutToken,
};
