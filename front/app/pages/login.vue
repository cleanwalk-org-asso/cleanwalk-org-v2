<script setup lang="ts">
definePageMeta({ name: 'login', layout: 'bare' })

usePageSeo({
  title: 'Connexion | Cleanwalk.org',
  description: 'Connectez-vous à votre compte Cleanwalk.org.',
})

const { $api: api } = useNuxtApp()
const route = useRoute()
const router = useRouter()
const accountStore = useAccountStore()
const { showToast } = useUtilsStore()

const email = ref('')
const password = ref('')

const login = async () => {
  if (!email.value) {
    showToast('Veuillez renseigner votre email', false)
    return
  }
  if (!password.value) {
    showToast('Veuillez renseigner votre mot de passe', false)
    return
  }

  try {
    await api.post('auth/login', { json: { email: email.value, password: password.value } })
  } catch {
    showToast('Email ou mot de passe incorrect', false)
    return
  }

  await accountStore.checkAuth(true)
  const redirect = route.query.redirect
  await router.push(typeof redirect === 'string' && redirect ? redirect : { name: 'home' })
}
</script>

<template>
  <AuthLayout>
    <div class="flex h-screen w-full flex-col items-center justify-evenly overflow-hidden px-8 lg:px-[clamp(2rem,10vw,10rem)]">
      <div class="flex w-full flex-col items-center">
        <h1 class="mb-4 w-full text-2xl font-medium">Connectez-vous</h1>
        <AuthGoogleButton />
        <AuthDivider />
        <form class="flex w-full flex-col gap-3" @submit.prevent="login">
          <BaseInput v-model="email" name="email" type="email" label="Email" placeholder="Votre email" autocomplete="email" />
          <BaseInput v-model="password" name="password" type="password" label="Mot de passe" placeholder="Votre mot de passe" autocomplete="current-password" />
          <BaseButton type="submit" size="lg" block class="mt-3">Se connecter</BaseButton>
        </form>
        <NuxtLink :to="{ name: 'forgotPassword' }" class="w-full pt-4 text-right text-[0.8rem] underline">
          Mot de passe oublié ?
        </NuxtLink>
      </div>
      <div class="w-full">
        <NuxtLink :to="{ name: 'signup' }" class="block text-left text-base-content">
          Vous êtes nouveau chez cleanwalk.org :
          <span class="font-medium text-base-content underline">Inscrivez-vous</span>
        </NuxtLink>
        <NuxtLink :to="{ name: 'home' }" class="mt-16 block text-left text-base-content underline">
          Retour à la page d'accueil
        </NuxtLink>
      </div>
    </div>
  </AuthLayout>
</template>
