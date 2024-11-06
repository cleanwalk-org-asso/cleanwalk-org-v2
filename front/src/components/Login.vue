<script setup lang="ts">
import { ref } from 'vue';
import apiHelper from '@/helpers/apiHelper';
import { useAccountStore } from '@/stores/AccountStore';
import type { User } from '@/interfaces/userInterface';
import { useUtilsStore } from '@/stores/UtilsStore';
import { GoogleLogin } from 'vue3-google-login';

const router = useRouter();

const accountStore = useAccountStore();
const showToast = useUtilsStore().showToast;
import { type CallbackTypes } from 'vue3-google-login';
import { useRouter } from 'vue-router';

const email = ref("");

const password = ref("");

const callbackGoogleLogin: CallbackTypes.CredentialCallback = async (response) => {
    await accountStore.googleLoginSingup(response.credential);
};

const login = async () => {
    if (!email.value) {
        showToast("Veuillez renseigner votre email", false);
        return;
    }
    if (!password.value) {
        showToast("Veuillez renseigner votre mot de passe", false);
        return;
    }

    // Call the login API
    const response = await apiHelper.kyPostWithoutToken("/users/login", {
        email: email.value,
        password: password.value
    });
    if (response.success === false) {
        showToast('Email ou mot de passe incorrect', false);
        return;
    }
    const user: User = {
        email: response.data.email as string,
        name: response.data.name as string,
        id: response.data.id as number,
        profile_picture: response.data.profile_picture as string,
        role: response.data.role as "organisation" | "user",
    }
    accountStore.CurrentUser = user;
    router.push({ path: '/' });
    accountStore.setToken(response.data.access_token as string);

}


</script>

<template>
        <div class="login-container">
            <div class="login">
                <h1>
                    Connectez-vous
                </h1>
                <GoogleLogin :callback="callbackGoogleLogin"/>
                <div class="or">
                    <div class="line"></div>
                    <span>ou</span>
                    <div class="line"></div>
                </div>
                <form @submit.prevent="login()">
                    <label class="label" for="email">Email</label>
                    <input v-model="email" class="input" name="mdp" type="email" placeholder="user@domain.fr">
                    <label class="label" for="mdp">Mot de passe</label>
                    <input v-model="password" class="input" name="mdp" type="password" placeholder="Votre mot de passe">
                    <button class="action-button" type="submit">Se connecter</button>
                </form>
            </div>
            <router-link to="/signup" class="go-signup">
                Vous êtes nouveau chez cleanwalk.org : <span class="span">Inscrivez-vous</span>
            </router-link>
        </div>
</template>

<style scoped lang="scss">
.login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    padding: 0 2rem;
    width: 100%;
    height: 100vh;
    max-width: 30rem;
    justify-content: space-evenly;

    .login {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
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
    font-size: 12px;
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
    color: #94A3B8;


    .label {
        font-size: 12px;
        font-weight: 500;
        position: relative;
        margin-bottom: -18px;
        background-color: #fff;
        width: fit-content;
        margin-left: 13px;
        margin-top: 5px;

    }

    .input {
        border: 1px solid #94A3B8;
        border-radius: 8px;
        padding: 12px;
        margin-top: 0.5rem;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;

        &::placeholder {
            color: #94A3B8;
        }

        &:focus {
            outline: none;
        }
    }

    .action-button {
        margin-top: 1.5rem;
    }
}

.danger-button {
    margin-top: 3.5rem;
}

@media (min-width: 1024px) {
    .login-container {
        width: 50%;
        max-width: 100%;
        padding-left: clamp(2rem, 8%, 10rem);
        padding-right: clamp(2rem, 8%, 10rem);

    }
}
</style>