<script setup lang="ts">
import { ref } from 'vue';
import Toast from './Toast.vue';
import apiHelper from '@/helpers/apiHelper';
import type { ApiResponse } from '@/interfaces/apiResponseInterface';


const callback = (response: any) => {
    // This callback will be triggered when the user selects or login to
    // his Google account from the popup
    console.log("Handle the response", response)
}


const isToastVisible = ref(false);
const ToastIsSuccess = ref(false);
const errorMsg = ref(""); 


const showToast = (error: string, isSuccess: boolean, ) => {
    isToastVisible.value = true;
    ToastIsSuccess.value = isSuccess;
    errorMsg.value = error;
    setTimeout(() => {
        isToastVisible.value = false;
    }, 3000);
}

const email = ref("");
const name = ref("");
const surname = ref("");
const password = ref("");
const confirmPassword = ref("");

const signup = async ( ) => {
    console.log("Signup");
    if(!name.value) {
        showToast("Veuillez renseigner votre prénom", false);
        return;
    }
    if(!surname.value) {
        showToast("Veuillez renseigner votre nom", false);
        return;
    }
    if(!email.value) {
        showToast("Veuillez renseigner votre email", false);
        return;
    }
    if(!password.value || !confirmPassword.value || password.value !== confirmPassword.value) {
        showToast("Veuillez renseigner votre mot de passe", false);
        return;
    }
    const response:ApiResponse = await apiHelper.kyPostWithoutToken( "/users", {
        email: email.value,
        password: password.value,
        firstname: name.value,
        lastname: surname.value,
        role_id: 1
    });
    if(response.success === false) {
        showToast(response.data.message as string, false);
        return;
    } else {
        showToast("Votre compte a été créé avec succès", true);
    }
    
    
}
</script>

<template>
    <Toast :is-success="ToastIsSuccess" :is-visible="isToastVisible" :message="errorMsg" />
    <section class="container">

        <h1>
            Bienvenue sur la plateforme Cleanwalk.org
        </h1>
        <GoogleLogin :callback="callback" />
        <div class="or">
            <div class="line"></div>
            <span>ou</span>
            <div class="line"></div>
        </div>
        <form @submit.prevent="signup()">
            <label class="label" for="email">Prénom</label>
            <input v-model="name" class="input" name="name" type="text" placeholder="votre prénom ...">
            <label class="label" for="surname">Nom</label>
            <input v-model="surname" class="input" name="mdp" type="text" placeholder="Votre nom de famille ...">
            <label class="label" for="email">Email</label>
            <input v-model="email" class="input" name="mdp" type="email" placeholder="user@domain.fr">
            <label class="label" for="password">Mot de passe</label>
            <input v-model="password" class="input" name="mdp" type="password" placeholder="Votre mot de passe">
            <label class="label" for="password2">Mot de passe</label>
            <input v-model="confirmPassword" class="input" name="mdp" type="password" placeholder="Votre mot de passe">
            <button class="action-button" type="submit">S' inscrire</button>
            <router-link to="/login" class="go-login">
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
        padding-top: 2rem;

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
</style>