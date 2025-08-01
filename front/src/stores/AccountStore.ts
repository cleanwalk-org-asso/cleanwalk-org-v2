import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { User, Association, modifyAssociation } from '@/interfaces/userInterface'
import api from '@/services/apiService'
import router from '@/router'

export const useAccountStore = defineStore('account', () => {
    const CurrentUser: Ref<User | undefined> = ref()
    const isLoggedIn = ref(false)

    const getOrganizationById = async (organizationId: number) => {
        const response = await api.get('/users/association/' + organizationId);

        if (!response.ok) {
            return undefined
        }
        const data = await response.json()
        return data as unknown as Association
    }

    async function logout() {
        isLoggedIn.value = false
        //TODO request api to remove cookie
        CurrentUser.value = undefined
        router.push({ name: 'login' })
    }

    const checkAuth = async () => {

        console.log('Checking authentication...')

        // Check if the user is already logged in
        if (isLoggedIn.value === true && CurrentUser.value) {
            console.log('User is already logged in:', CurrentUser.value)
            return true
        }
        try {
            const res = await api.get('auth/me')
            console.log('Authentication check response:', res.status)
            if (res.ok) {
                const userData = await res.json() as User
                CurrentUser.value = userData
                isLoggedIn.value = true
                return true
            }
        } catch (error) {
            isLoggedIn.value = false
            CurrentUser.value = undefined
        }
        return false
    }

    const changePassword = async (
        userId: number,
        token: string,
        oldPassword: string,
        newPassword: string
    ) => {
        const response = await api.put(
            '/users/password/' + userId,
            {
                json: {
                    old_password: oldPassword,
                    new_password: newPassword
                }
            });
        return response.ok
    }

    const modifyUser = (userId: number, token: string, name?: string, profile_picture?: string) => {
        api.put(
            '/users/' + userId,
            {
                json: {
                    name: name,
                    profile_picture: profile_picture
                }
            });
    }

    const modifyAssociation = (asso: modifyAssociation) => {
        api.put(
            '/users/association/' + CurrentUser.value!.id,
            asso as Record<string, unknown>,
        );
    }

    const getAssoList = async () => {
        const response = await api.get('/users/associations');
        return await response.json() as unknown as Association[]
    }

    const googleLoginSignup = async (credential: string, redirectPath?: string) => {
        const response = await api.post('/users/google-login', {
            json: {
                token: credential
            }
        });
        if (response.ok === false) {
            return false
        }
        isLoggedIn.value = true
        return true
    }

    return {
        logout,
        isLoggedIn,
        CurrentUser,
        modifyUser,
        changePassword,
        getOrganizationById,
        modifyAssociation,
        getAssoList,
        googleLoginSignup,
        checkAuth
    }
})
