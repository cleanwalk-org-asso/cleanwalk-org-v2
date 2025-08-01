<script setup lang="ts">
import { ref } from 'vue';
import { User, Users } from 'lucide-vue-next';


</script>

<template>
    <section class="container">

        <h1>
            Choisissez le type de compte qui vous correspond :
        </h1>

        <!-- <GoogleLogin :callback="callback" />
        <div class="or">
            <div class="line"></div>
            <span>ou</span>
            <div class="line"></div> -->
        <div class="choice-container">
            <router-link :to="{ name: 'signupPerso' }" class="choice">
                <User :size="28" />
                <span>Compte personnel</span>
            </router-link>
            <router-link :to="{ name: 'signupAsso'}" class="choice">
                <Users :size="28" />
                <span>Compte association</span>
            </router-link>
        </div>
        <router-link :to="{name: 'login'}" class="go-login">
            Vous utilisez déjà cleanwalk.org : <span>Connectez-vous</span>
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

    .choice-container {
        display: flex;
        gap: 1rem;
        margin-bottom: 2rem;
        flex-direction: column;

        .choice {
            padding: 1rem 2rem;
            border-radius: 5px;
            border-radius: 8px;
            border: 1px solid #CBD5E1;
            background-color: var(--primary-color);
            color: #373646;
            font-weight: 700;
            text-decoration: none;
            font-size: 24px;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            min-width: 26rem;

            &:hover {
                background-color: var(--primary-color-dark);
            }

            .choice-icon {
                width: 48px;
                height: 48px;
            }
        }
    }
}
</style>