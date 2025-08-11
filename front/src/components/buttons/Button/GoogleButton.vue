<script setup lang="ts">

const props = defineProps<{
    role?: 'ASSOCIATION' | 'USER';
}>();

const loginWithGoogle = () => {
  // Redirige l'utilisateur vers le backend (déclenche le flow OAuth)
  if (props.role) {
      window.location.href = `${import.meta.env.VITE_API_URL}/auth/login/google/role/${props.role}`;
  } else {
      window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  }
}
</script>

<template>
    <button @click="loginWithGoogle" class="btn-google">
        <span>Continuer avec Google</span>
        <img src="@/assets/google.svg" alt="Google Icon" />
    </button>
</template>

<style scoped lang="scss">
button {
    width: 100%;
    height: 3rem;
    background-color: transparent;
    font-size: 1rem;
    border: 1px solid var(--text-color-tertiary);
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
}

</style>