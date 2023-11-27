<script setup lang="ts">
import { ref } from 'vue';
import router from '@/router/index';
import { useAccountStore } from '@/stores/AccountStore';
import passwordField from '@/components/GlobalPasswordField.vue';

const accountStore = useAccountStore();

const email = ref('');
const password = ref('');
const rememberMe = ref(false);

const login = async (event: Event) => {
    event.preventDefault();

    if(await accountStore.login(email.value, password.value, rememberMe.value)){
        router.push('/');
    }
};

</script>

<template>
    <section class="form-container">
        <h1 class="title">Bon retour parmis nous</h1>
        <div class="divider">
            Connnexion avec
        </div>
        <div class="row">
            <button class="primary-button">Google</button>
            <button class="primary-button">LinkedIn</button>
            <button class="primary-button">Facebook</button>
        </div>
        <div class="divider">
            ou
        </div>

        <form v-on:submit="login">
            <input class="text-field" required type="email" id="Email" name="Email" placeholder="Email" v-model="email"/>
            <passwordField v-model:password="password"></passwordField>

            <label class="checkbox-label margin-top">
                <input type="checkbox" id="TermsOfUse" name="TermsOfUse" v-model="rememberMe">
                Se souvenir de moi
            </label>

            <button class="primary-button">Se connecter</button>
        </form>
    </section>
</template>

<style lang="scss" scoped>

.row {
    display: flex;
    gap: 1rem;
}
.title {
    font-size: 2.1875rem;
    font-weight: 700;
}

.margin-top {
    margin-top: 1.2rem;
}


</style>