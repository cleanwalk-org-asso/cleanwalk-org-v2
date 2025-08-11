<script setup lang="ts">
import { ref } from 'vue';
import api from '@/services/apiService';
import { useUtilsStore } from '@/stores/UtilsStore';
import router from '@/router';
import BaseInput from '@/components/base/BaseInput.vue';
import GoogleButton from '../buttons/Button/GoogleButton.vue';

const showToast = useUtilsStore().showToast;

interface SignupResponse {
    id: string;
    email: string;
    name: string;
    message?: string;
}

const email = ref("");
const name = ref("");
const password = ref("");
const confirmPassword = ref("");

const signup = async () => {
    if (!name.value) {
        showToast("Veuillez renseigner le nom de l'association", false);
        return;
    }
    if (!email.value) {
        showToast("Veuillez renseigner votre email", false);
        return;
    }
    if (!password.value || !confirmPassword.value) {
        showToast("Veuillez renseigner votre mot de passe", false);
        return;
    }
    if (password.value !== confirmPassword.value) {
        showToast("Les mots de passe ne correspondent pas", false);
        return;
    }
    const response = await api.post("auth/register", {
        json: {
            email: email.value,
            password: password.value,
            name: name.value,
            profilePicture: 'https://api.dicebear.com/9.x/initials/svg?seed=' + name.value,
            role : 'ASSOCIATION',
        }
    });
    const json: SignupResponse = await response.json();
    if (response.ok === false) {
        showToast(json.message as string, false);
        return;
    } else {
        showToast("Votre compte a été créé avec succès", true);
        setTimeout(() => {
            router.push({name: 'login'}).then(() => router.go(0));
        }, 1000);

    }


}

</script>

<template>
    <section class="container">

        <h1>
            Bienvenue sur la plateforme Cleanwalk.org
        </h1>
        <GoogleButton role="ASSOCIATION" />
        <div class="or">
            <div class="line"></div>
            <span>ou</span>
            <div class="line"></div>
        </div>
        <form @submit.prevent="signup()">
            <BaseInput v-model="name" label="Nom de votre association/Organization ?" name="name" type="text"
                placeholder="Cleanwalk.org" />
            <BaseInput v-model="email" label="Email" name="email" type="email" placeholder="user@domain.fr" />
            <BaseInput v-model="password" label="Mot de passe" name="password" type="password"
                placeholder="Votre mot de passe" />
            <BaseInput v-model="confirmPassword" label="Confirmez le mot de passe" name="confirmPassword"
                type="password" placeholder="Votre mot de passe" />
            <button class="action-button" type="submit">S' inscrire</button>
            <router-link :to="{ name: 'login' }" class="go-login">
                Vous utilisez déjà cleanwalk.org : <span>Connectez-vous</span>
            </router-link>
        </form>
    </section>
</template>

<style scoped lang="scss">
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    padding: 0 2rem;

    h1 {
        font-size: 24px;
        font-weight: 500;
        margin-bottom: 1rem;
    }
}

.go-login {
    color: var(--text-color-secondary);
    font-size: 12px;
    width: 100%;
    text-align: left;
    margin-top: 2rem;

    span {
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

    span {
        margin: 0 1rem;
    }

    .line {
        width: 35vw;
        height: 1px;
        background-color: #747474;
    }
}

form {
    margin-top: 3rem;
    display: flex;
    width: 100%;
    flex-direction: column;
    color: #94A3B8;

    .action-button {
        margin-top: 1.5rem;
    }
}

.danger-button {
    margin-top: 3.5rem;
}
</style>