<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import api from '@/services/apiService'
import { useAccountStore } from '@/stores/AccountStore'
import type { User } from '@/interfaces/userInterface'
import { useUtilsStore } from '@/stores/UtilsStore'
import { useRouter, useRoute } from 'vue-router'
import BaseInput from '@/components/base/BaseInput.vue'
import GoogleButton from '../buttons/Button/GoogleButton.vue'

const router = useRouter()
const route = useRoute()
const accountStore = useAccountStore()
const showToast = useUtilsStore().showToast

const email = ref('')
const password = ref('')

interface LoginResponse {
  user: User
  access_token?: string
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

  const response = await api.post('auth/login', {
    json: {
      email: email.value,
      password: password.value,
    },
  })

  if (!response.ok) {
    showToast('Email ou mot de passe incorrect', false)
    return
  }

  const json: LoginResponse = await response.json()
  accountStore.CurrentUser = json.user

  if (json.access_token) {
    localStorage.setItem('access_token', json.access_token)
  }

  const redirectPath = route.query.redirect as string
  router.push(redirectPath || { name: 'home' })
}
</script>

<template>
  <div class="login-container">
    <div class="login">
      <h1>Connectez-vous</h1>
      <GoogleButton />
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
          placeholder="Votre email"
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
    <router-link :to="{ name: 'home' }" class="link">
      Retour à la page d'accueil
    </router-link>
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

@media (min-width: 1024px) {
  .login-container {
    padding-left: clamp(2rem, 10vw, 10rem);
    padding-right: clamp(2rem, 10vw, 10rem);
  }
}
</style>
