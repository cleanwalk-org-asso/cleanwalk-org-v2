
import ky from 'ky';
import { HTTPError } from 'ky';

const apiUrl = '/api'; // Proxi in vite.config

import type { ApiResponse } from '@/interfaces/apiResponseInterface';

const kyGet = async (route: string):Promise<ApiResponse> => {
    try {
        const response:Record<string, unknown> = await ky.get(apiUrl + route, {
            headers: {
                'X-API-Key': import.meta.env.VITE_API_KEY,
            },
        }).json();

        return { success: true, data: response };
    } catch (error) {
        console.error('Error fetching data:', error);
        return { success: false, data: { message: 'An unknown error occurred' } };
    }
};

const kyPost = async (route: string, data:  Record<string, unknown>, access_token: string) => {
    try {
        const response:Record<string, unknown> = await ky.post(apiUrl + route, {
            json: data,
            headers: {
                'X-API-Key': import.meta.env.VITE_API_KEY,
                'Authorization': 'Bearer ' + access_token,
            },
        }).json();

        return { success: true, data: response };
    } catch (error) {
        console.error('Error sending data:', error);
        if (error instanceof HTTPError) {
            // You can get the error response body as JSON
            const errorData: Record<string, unknown> = await error.response.json();
            return { success: false, data: errorData };
        }
        return { success: false, data: { message: 'An unknown error occurred' } };
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
    } catch (error) {
        console.error('Error sending data:', error);
        if (error instanceof HTTPError) {
            // You can get the error response body as JSON
            const errorData: Record<string, unknown> = await error.response.json();
            return { success: false, data: errorData };
        }
        return { success: false, data: { message: 'An unknown error occurred' } };
    }
};

const kyPut = async (route: string, data:Record<string, unknown>, access_token:string):Promise<ApiResponse> => {
    try {
        const response:Record<string, unknown> = await ky.put(apiUrl + route, {
            json: data,
            headers: {
                'X-API-Key': import.meta.env.VITE_API_KEY,
                'Authorization': 'Bearer ' + access_token,
            },
        }).json();
        return { success: true, data: response };
    } catch (error) {
        console.error('Error updating data:', error);
        return { success: false, data: { message: 'An unknown error occurred' } };
    }
};

const kyDelete = async (route: string, access_token: string):Promise<ApiResponse> => {
    try {
        const response:Record<string, unknown> = await ky.delete(apiUrl + route, {
            headers: {
                'X-API-Key': import.meta.env.VITE_API_KEY,
                'Authorization': 'Bearer ' + access_token,
            },
        }).json();

        return { success: true, data: response };
    } catch (error) {
        console.error('Error deleting data:', error);
        return { success: false, data: { message: 'An unknown error occurred' } };
    }
};

async function uploadFile(file: File, token: string): Promise<ApiResponse> {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response:Record<string, unknown> = await ky.post(apiUrl + '/upload', {
            body: formData,
            headers: {
                'X-API-Key': import.meta.env.VITE_API_KEY,
                'Authorization': 'Bearer ' + token,
            },
        }).json();

        return { success: true, data: response };
    } catch (error) {
        console.error('Error uploading file:', error);
        return { success: false, data: { message: 'An unknown error occurred' } };
    }
}
export default {
    kyGet,
    kyPost,
    kyPut,
    kyDelete,
    kyPostWithoutToken,
    uploadFile
};
