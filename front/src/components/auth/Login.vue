<script setup lang="ts">
import { ref } from 'vue'
import api from '@/services/apiService'
import { useAccountStore } from '@/stores/AccountStore'
import type { User } from '@/interfaces/userInterface'
import { useUtilsStore } from '@/stores/UtilsStore'
import { GoogleLogin } from 'vue3-google-login'
import BaseInput from '@/components/base/BaseInput.vue'
import { type CallbackTypes } from 'vue3-google-login'
import { useRouter, useRoute } from 'vue-router'
import type { ApiResponse } from '@/interfaces/apiResponseInterface'

const router = useRouter()
const route = useRoute()
const accountStore = useAccountStore()
const showToast = useUtilsStore().showToast

const email = ref('')

const password = ref('')

const callbackGoogleLogin: CallbackTypes.CredentialCallback = async (response) => {
    const result = await accountStore.googleLoginSignup(response.credential)
    if (result) {
        // Rediriger l'utilisateur vers la page d'origine s'il y en a une, sinon vers la page d'accueil
        const redirectPath = route.query.redirect as string
        if (redirectPath) {
            router.push(redirectPath)
        } else {
            router.push({ name: 'home' })
        }
    }
}

const login = async () => {
    if (!email.value) {
        showToast('Veuillez renseigner votre email', false)
        return
    }
    if (!password.value) {
        showToast('Veuillez renseigner votre mot de passe', false)
        return
    }

    // Call the login API
    const response: ApiResponse = await api
        .post('/auth/login', {
            json: {
                email: email.value,
                password: password.value
            }
        })
        .json()
    if (response.success === false) {
        showToast('Email ou mot de passe incorrect', false)
        return
    }
    const user: User = {
        email: response.data.email as string,
        name: response.data.name as string,
        id: response.data.id as number,
        profile_picture: response.data.profile_picture as string,
        role: response.data.role as 'organization' | 'user'
    }
    accountStore.CurrentUser = user
    accountStore.setToken(response.data.access_token as string)

    // Rediriger l'utilisateur vers la page d'origine s'il y en a une, sinon vers la page d'accueil
    const redirectPath = route.query.redirect as string
    if (redirectPath) {
        router.push(redirectPath)
    } else {
        router.push({ name: 'home' })
    }
}
</script>

<template>
    <div class="login-container">
        <div class="login">
            <h1>Connectez-vous</h1>
            <GoogleLogin :callback="callbackGoogleLogin" />
            <div class="or">
                <div class="line"></div>
                <span>ou</span>
                <div class="line"></div>
            </div>
            <form @submit.prevent="login()">
                <BaseInput
                    v-model="email"
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="Votre mot de passe"
                />
                <BaseInput
                    v-model="password"
                    name="password"
                    type="password"
                    label="Mot de passe"
                    placeholder="Votre mot de passe"
                />
                <button class="action-button" type="submit">Se connecter</button>
            </form>
            <router-link :to="{ name: 'forgotPassword' }" class="forgot-password">
                Mot de passe oublié ?
            </router-link>
        </div>
        <router-link :to="{ name: 'signup' }" class="go-signup">
            Vous êtes nouveau chez cleanwalk.org : <span class="span">Inscrivez-vous</span>
        </router-link>
        <router-link :to="{ name: 'home' }" class="link"> Retour à la page d'accueil </router-link>
    </div>
</template>

<style scoped lang="scss">
.link {
    color: var(--text-color-secondary);
    width: 100%;
    text-align: left;
    margin-top: 2rem;

    text-decoration: underline;
}
.login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    width: 100%;
    height: 100vh;
    justify-content: space-evenly;
    padding: 0 2rem;

    .login {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        .forgot-password {
            width: 100%;
            padding-top: 1rem;
            text-align: right;
            font-size: 0.8rem;
            text-decoration: underline;
        }
    }

    h1 {
        font-size: 24px;
        font-weight: 500;
        margin-bottom: 1rem;
        width: 100%;
    }
}

.go-signup {
    color: var(--text-color-secondary);
    width: 100%;
    text-align: left;
    margin-top: 2rem;

    .span {
        color: var(--text-color-primary);
        font-weight: 500;
        cursor: pointer;
        text-decoration: underline;
    }
}

.or {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1rem 0;
    width: 100%;

    .line {
        width: 100%;
        height: 1px;
        background-color: #747474;
        margin: 0 2rem;
    }
}

form {
    display: flex;
    width: 100%;
    flex-direction: column;
    color: #94a3b8;

    .action-button {
        margin-top: 1.5rem;
    }
}

.danger-button {
    margin-top: 3.5rem;
}

@media (min-width: 1024px) {
    .login-container {
        padding-left: clamp(2rem, 10vw, 10rem);
        padding-right: clamp(2rem, 10vw, 10rem);
    }
}
</style>
