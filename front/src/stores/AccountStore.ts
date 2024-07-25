import { defineStore } from 'pinia'
import { ref } from 'vue';
import type {Ref} from 'vue';
import type {User, Association} from '@/interfaces/userInterface';
import apiHelper from '@/helpers/apiHelper';
import router from '@/router';
import { inject } from 'vue';
import type {VueCookies} from 'vue-cookies';
import type { ApiResponse } from '@/interfaces/apiResponseInterface';

export const useAccountStore = defineStore('account', () => {
    const $cookies = inject<VueCookies>('$cookies'); 
    const tokenCookieName = 'access_token';
    const tokenCookieExpireTime = '30d'; // 3m => 3 months (d => days, m => months, y => years)
    let CurrentUser: Ref<User|undefined> = ref();
    let isLoggedIn = ref(false);

    const setToken = (token: string) => {
        $cookies!.remove(tokenCookieName);
        $cookies!.set(tokenCookieName, token, tokenCookieExpireTime);
    }

    const getOrganisationById = async (organisationId: number) => {
        const response:ApiResponse = await apiHelper.kyGet('/users/organisations/' + organisationId);
        return response.data as unknown as Association;
    }

    async function logout() {
        isLoggedIn.value = false;
        $cookies!.remove(tokenCookieName);
        CurrentUser.value = undefined;
        router.push({name: 'login'});
    }

    async function tokenLogin(): Promise<boolean> {
        const token:string = $cookies!.get(tokenCookieName);
        if(token != undefined) {
            const response:ApiResponse = await apiHelper.kyPost('/users/token-login', {}, token);
            if(response.success === true) {
                isLoggedIn.value = true;
                const user:User = {
                    email: response.data.email as string,
                    name: response.data.name as string,
                    id: response.data.id as number,
                    role: response.data.role as 'organisation' | 'user',
                    profile_picture: response.data.profile_picture as string,
                }
                CurrentUser.value = user;
            } else {
                isLoggedIn.value = false;
            }
        } else {
            
            isLoggedIn.value = false;
        }
        return isLoggedIn.value;
    }

    const changePassword = async (userId:number, token:string, oldPassword: string, newPassword: string) => {
        const response:ApiResponse = await apiHelper.kyPut('/users/password/' + userId, {
            old_password: oldPassword,
            new_password: newPassword
        }, token);
        return response.success;
    }

    const getAccessToken = ():string | undefined => {
        return $cookies!.get(tokenCookieName);
    }

    const modifyUser = (userId: number, token: string, name?: string, profile_picture?: string) => {
        apiHelper.kyPut('/users/' + userId, {
            name: name,
            profile_picture: profile_picture,
        }, token);
    }

    return { setToken, logout, isLoggedIn, tokenLogin, CurrentUser, getAccessToken, modifyUser, changePassword, getOrganisationById}
})