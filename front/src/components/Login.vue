<script setup lang="ts">
import { ref } from 'vue';

const callback = (response:any) => {
    // This callback will be triggered when the user selects or login to
    // his Google account from the popup
    console.log("Handle the response", response)
}

const login = ( ) => {
    console.log("Login");
}

const email = ref("");
const password = ref("");
</script>

<template>
    <section class="container">

        <h1>
            Se connecter
        </h1>
        <GoogleLogin :callback="callback" />
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
        <router-link to="/signup" class="go-signup">
            Vous êtes nouveau chez cleanwalk.org : <span>Inscrivez-vous</span>
        </router-link>
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

    .go-signup {
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