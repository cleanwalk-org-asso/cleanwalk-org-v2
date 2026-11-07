<script setup lang="ts">
const props = defineProps<{ role?: 'ASSOCIATION' | 'USER' }>()

const { apiUrl } = useRuntimeConfig().public

// L'API démarre elle-même la connexion Google : on y envoie l'utilisateur.
const loginWithGoogle = () => {
  window.location.href = props.role ? `${apiUrl}/auth/login/google/role/${props.role}` : `${apiUrl}/auth/google`
}
</script>

<template>
  <BaseButton variant="outline" block class="h-12" @click="loginWithGoogle">
    <span>Continuer avec Google</span>
    <img src="~/assets/google.svg" alt="">
  </BaseButton>
</template>
