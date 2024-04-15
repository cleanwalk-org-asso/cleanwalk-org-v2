import ky from 'ky';

const apiUrl = '/api'; // Proxi in vite.config

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
                'X-API-Key': (import.meta as any).VITE_API_KEY,
                'Authorization': 'Bearer ' + access_token,
            },
        }).json();

        return response;
    } catch (error) {
        console.error('Error sending data:', error);
        return undefined;
    }
};

const kyPostWithoutToken = async (route: string, data: any) => {
    try {
        const response = await ky.post(apiUrl + route, {
            json: data,
            headers: {
                'X-API-Key': (import.meta as any).VITE_API_KEY,
            },
        }).json();

        return response;
    } catch (error) {
        console.error('Error sending data:', error);
        return undefined;
    }
};

const kyPut = async (route: string, data: any, access_token:string) => {
    try {
        const response = await ky.put(apiUrl + route, {
            json: data,
            headers: {
                'X-API-Key': (import.meta as any).VITE_API_KEY,
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
                'X-API-Key': (import.meta as any).VITE_API_KEY,
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
