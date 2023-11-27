import type { Cleanwalk } from '@/interfaces/cleanwalkInterface';
import type { User } from '@/interfaces/userInterface';
import axios from 'axios';

const apiUrl = '/api';

const usersBaseRoute = '/users';
const cleanwalkBaseRoute = '/cleanwalks';
const loginRoute = '/users/login';
const articleRoute = '/articles';

const buildUserRoute = (userId: string) : string => usersBaseRoute + '/' + userId;
const buildCleanwalkRoute = (cleanwalkId: string) : string => cleanwalkBaseRoute + '/' + cleanwalkId;
const buildArticleRoute = (articleId: string) : string => articleRoute + '/' + articleId;


/** 
 * Get queries
 * @param route The route to send a request to the api
 * @returns the data in the response, or undefined if error
 */
const get = async (route: string): Promise<any|undefined> => {
    try {
        const response = await axios.get(apiUrl + route);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return undefined;
    }
}

const getUser = async (userId: string): Promise<User | undefined> => get(buildUserRoute(userId));

const getAllCleanwalks = async (): Promise<Array<Cleanwalk> | undefined> => get(cleanwalkBaseRoute);

const getCleanwalk = async (cleanwalkId: string): Promise<Cleanwalk | undefined> => get(buildCleanwalkRoute(cleanwalkId));

const getArticle = async (article: any): Promise<any | undefined> => get(buildArticleRoute(article));


/**
 * Send data to json object to api, used to insert data in the database
 * @param route The route to send a request to the api
 * @param data The data to insert
 */
const post = async (route: string, data: any) => {
    try {
        await axios.post(apiUrl + route, data);
        return true;
    } catch (error) {
        console.error('Error sending data:', error);
        return false;
    }
}

const postWithResponse = async (route: string, data: any) => {
    try {
        const response = await axios.post(apiUrl + route, data);
        return response.data;
    } catch (error) {
        console.error('Error sending data:', error);
        return undefined;
    }
}

const createUser = async (user: User) => post(usersBaseRoute, user);

const createCleanwalk = async (cleanwalk: Cleanwalk) => post(cleanwalkBaseRoute, cleanwalk);

const loginWithEmailPassword = async (email: string, password: string) => postWithResponse(loginRoute, {'email': email, 'password': password});

const loginWithToken = async (token: string) => postWithResponse(loginRoute, {'token': token});


/**
 * Update an object in the database
 * @param route The route to send the request to the api, it must contains the id of the object
 * @param data The updated data
 */
const put = async (route: string, data: any) => {
    try {
        await axios.put(apiUrl + route, data);
        return true;
    } catch (error) {
        console.error('Error updating data:', error);
        return false;
    }
}

const updateUser = async (user: User) => put(buildUserRoute(user.id.toString()), user);

const updateCleanwalk = async (cleanwalk: Cleanwalk) => put(buildCleanwalkRoute(cleanwalk.id!.toString()), cleanwalk);

// the word 'delete' is already used by javascript
/**
 * Delete an object in the database
 * @param route The route to send the request to the api, it must contains the id of the object
 */
const deleteData = async (route: string) => {
    try {
        await axios.delete(apiUrl + route);
        return true;
    } catch (error) {
        console.error('Error deleting data:', error);
        return false;
    }
}

const deletUser = async (userId: string) => deleteData(buildUserRoute(userId));

const deleteCleanwalk = async (cleanwalkId: string) => deleteData(buildCleanwalkRoute(cleanwalkId));


export default {
    getUser,
    getAllCleanwalks,
    getCleanwalk,
    getArticle,
    createUser,
    createCleanwalk,
    updateUser,
    updateCleanwalk,
    deletUser,
    deleteCleanwalk,
    loginWithEmailPassword,
    loginWithToken,
}