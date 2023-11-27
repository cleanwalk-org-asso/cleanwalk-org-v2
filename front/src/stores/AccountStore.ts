import { defineStore } from 'pinia'
import { ref } from 'vue';
import type {Ref} from 'vue';
import {v4 as uuidv4} from 'uuid';
import type {User} from '@/interfaces/userInterface';
import databaseHelper from '@/helpers/databaseHelper';
import router from '@/router';
import { inject } from 'vue';
import type {VueCookies} from 'vue-cookies';


export const useAccountStore = defineStore('account', () => {
    const $cookies = inject<VueCookies>('$cookies'); 
    const tokenCookieKey = 'user_token';
    const tokenCookieExpireTime = '3m'; // 3m => 3 months (d => days, m => months, y => years)
    const user: Ref<User|undefined> = ref();
    const isLoggedIn = ref(false);

    async function signup(userInformation: User) : Promise<Boolean> {
        userInformation.token = uuidv4();
        const result = await databaseHelper.createUser(userInformation);
        if(result) {
            user.value = userInformation;
            isLoggedIn.value = true;
            router.push('/');
        }

        return result;
    }

    async function login(email: string, password: string, rememberMe: Boolean): Promise<Boolean> {
        const result = await databaseHelper.loginWithEmailPassword(email, password);
        if(result != undefined) {
            user.value = result as User;

            if(rememberMe){
                // need to create a token and update the user data
                if(user.value.token == undefined) {
                    user.value.token = uuidv4();
                    databaseHelper.updateUser(user.value)
                }
                // insert token in cookies
                $cookies!.set(tokenCookieKey, user.value.token, tokenCookieExpireTime, '', '', true);
            }
            isLoggedIn.value = true;
            return true;
        }
        return false;
    }

    async function loginWithToken(): Promise<Boolean> {
        if(!$cookies!.isKey(tokenCookieKey)) return false;

        const token = $cookies!.get(tokenCookieKey);

        const result = await databaseHelper.loginWithToken(token);

        if(result != undefined) {
            user.value = result as User;
            isLoggedIn.value = true;
            return true;
        }

        return false;
    }

    function logout(){
        user.value = undefined;
        isLoggedIn.value = false;
    }

    async function deleteAccount() {
        if(isLoggedIn){
            if(await databaseHelper.deletUser(user!.value!.id.toString())){
                logout();
            }
        }
    }

    async function updateAccount(updatedUserInformation: User): Promise<Boolean> {
        if(isLoggedIn){
            return await databaseHelper.updateUser(updatedUserInformation);
        }
        return false;
    }

    return {user, isLoggedIn, signup, login, loginWithToken, logout, updateAccount, deleteAccount}
})