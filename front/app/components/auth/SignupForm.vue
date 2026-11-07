<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
import { getApiErrorMessage } from '@/services/apiError'

const props = defineProps<{
  role: 'USER' | 'ASSOCIATION'
  title: string
  nameLabel: string
  namePlaceholder: string
  nameRequiredMessage: string
}>()

const { $api: api } = useNuxtApp()
const router = useRouter()
const { showToast } = useUtilsStore()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const profilePicture = () =>
  props.role === 'ASSOCIATION'
    ? `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(name.value)}`
    : `https://api.dicebear.com/8.x/fun-emoji/svg?seed=${uuidv4()}`

const signup = async () => {
  if (!name.value) {
    showToast(props.nameRequiredMessage, false)
    return
  }
  if (!email.value) {
    showToast('Veuillez renseigner votre email', false)
    return
  }
  if (!password.value || !confirmPassword.value) {
    showToast('Veuillez renseigner votre mot de passe', false)
    return
  }
  if (password.value !== confirmPassword.value) {
    showToast('Les mots de passe ne correspondent pas', false)
    return
  }

  try {
    await api.post('auth/register', {
      json: {
        email: email.value,
        password: password.value,
        name: name.value,
        profilePicture: profilePicture(),
        role: props.role,
      },
    })
    showToast('Votre compte a été créé avec succès', true)
    await router.push({ name: 'login' })
  } catch (error) {
    showToast(await getApiErrorMessage(error, 'Erreur lors de la création du compte'), false)
  }
}
</script>

<template>
  <AuthLayout>
    <section class="flex flex-col items-center overflow-hidden px-8 py-8">
      <h1 class="mb-4 text-2xl font-medium">{{ title }}</h1>
      <AuthGoogleButton :role="role" />
      <AuthDivider />
      <form class="mt-12 flex w-full flex-col gap-3" @submit.prevent="signup">
        <BaseInput v-model="name" :label="nameLabel" name="name" :placeholder="namePlaceholder" autocomplete="name" />
        <BaseInput v-model="email" label="Email" name="email" type="email" placeholder="user@domain.fr" autocomplete="email" />
        <BaseInput v-model="password" label="Mot de passe" name="password" type="password" placeholder="Votre mot de passe" autocomplete="new-password" />
        <BaseInput
          v-model="confirmPassword"
          label="Confirmez le mot de passe"
          name="confirmPassword"
          type="password"
          placeholder="Votre mot de passe"
          autocomplete="new-password"
        />
        <BaseButton type="submit" size="lg" block class="mt-3">S'inscrire</BaseButton>
        <NuxtLink :to="{ name: 'login' }" class="mt-8 w-full text-left text-xs text-base-content">
          Vous utilisez déjà cleanwalk.org :
          <span class="font-medium text-base-content underline">Connectez-vous</span>
        </NuxtLink>
      </form>
    </section>
  </AuthLayout>
</template>
