<script setup lang="ts">
definePageMeta({ name: 'signupPerso', layout: 'bare' })

usePageSeo({
  title: 'Inscription Citoyen | Cleanwalk.org',
  description: 'Créez votre compte citoyen sur Cleanwalk.org.',
})
</script>

<template>
  <AuthSignupForm
    role="USER"
    title="Créer votre compte personnel"
    name-label="Comment voulez vous qu'on vous appelle ?"
    name-placeholder="nom, prenom, pseudo ... ."
    name-required-message="Veuillez renseigner votre prénom"
  />
</template>
