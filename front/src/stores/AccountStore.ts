import { defineStore } from 'pinia'
import { ref } from 'vue';
import type {Ref} from 'vue';
import type {User} from '@/interfaces/userInterface';
import databaseHelper from '@/helpers/databaseHelper';
import router from '@/router';
import { inject } from 'vue';
import type {VueCookies} from 'vue-cookies';


export const useAccountStore = defineStore('account', () => {
    const $cookies = inject<VueCookies>('$cookies'); 
    const tokenCookieName = 'access_token';
    const tokenCookieExpireTime = '30d'; // 3m => 3 months (d => days, m => months, y => years)
    let CurrentUser: Ref<User|undefined> = ref();
    let isLoggedIn = ref(false);
    let token: string|undefined = undefined;

    async function login(email: string, password: string): Promise<boolean> {
        const result = await databaseHelper.kyPostWithoutToken('/users/login', {"email":email,"password": password} );
        if(result != undefined && result as User != undefined) {
            CurrentUser.value = result as User;
            $cookies!.set(tokenCookieName, CurrentUser.value.access_token, tokenCookieExpireTime, '', '', true);
            // need to create a cookie token
            isLoggedIn.value = true;
        }
        return isLoggedIn.value;
    }

    function printToken() {
        console.log($cookies!.get(tokenCookieName));
    }
    function printUser() {
        console.log(CurrentUser.value);
    }

    async function logout() {
        isLoggedIn.value = false;
        $cookies!.remove(tokenCookieName);
        CurrentUser.value = undefined;
        router.push({name: 'login'});
    }

    async function tokenLogin(): Promise<boolean> {
        const token = $cookies!.get(tokenCookieName);
        if(token != undefined) {
            const result = await databaseHelper.kyPost('/users/token-login', {}, token);
            if(result != undefined && result as User != undefined) {
                CurrentUser.value = result as User;
                isLoggedIn.value = true;
            } else {
                isLoggedIn.value = false;
            }
        } else {
            isLoggedIn.value = false;
        }
        return isLoggedIn.value;
    }

    return {login, printToken, printUser, logout, isLoggedIn, tokenLogin}
})