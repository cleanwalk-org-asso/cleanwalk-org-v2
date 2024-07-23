<script setup lang="ts">
import { ref } from 'vue';
import Toast from './Toast.vue';
import apiHelper from '@/helpers/apiHelper';
import type { ApiResponse } from '@/interfaces/apiResponseInterface';
import { v4 as uuidv4 } from 'uuid';
import { useUtilsStore } from '@/stores/UtilsStore';
import router from '@/router';

const showToast = useUtilsStore().showToast;

const email = ref("");
const name = ref("");
const password = ref("");
const confirmPassword = ref("");

const signup = async ( ) => {
    if(!name.value) {
        showToast("Veuillez renseigner votre prénom", false);
        return;
    }
    if(!email.value) {
        showToast("Veuillez renseigner votre email", false);
        return;
    }
    if(!password.value || !confirmPassword.value) {
        showToast("Veuillez renseigner votre mot de passe", false);
        return;
    }
    if(password.value !== confirmPassword.value) {
        showToast("Les mots de passe ne correspondent pas", false);
        return;
    }
    const response:ApiResponse = await apiHelper.kyPostWithoutToken( "/users", {
        email: email.value,
        password: password.value,
        name: name.value,
        profile_picture: 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=' + uuidv4(),
        role_id: 2,
    });
    if(response.success === false) {
        showToast(response.data.message as string, false);
        return;
    } else {
        showToast("Votre compte a été créé avec succès", true);
        setTimeout(() => {
            router.push('/login').then(() => router.go(0));
        }, 1000);

    }
    
    
}

</script>

<template>
    <Toast />
    <section class="container">

        <h1>
            Bienvenue sur la plateforme Cleanwalk.org
        </h1>
        <!-- <GoogleLogin :callback="callback" />
        <div class="or">
            <div class="line"></div>
            <span>ou</span>
            <div class="line"></div>
        </div> -->
        <form @submit.prevent="signup()">
            <label class="label" for="email">Nom de votre association/Organisation ?</label>
            <input v-model="name" class="input" name="name" type="text" placeholder="Cleanwalk.org">
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