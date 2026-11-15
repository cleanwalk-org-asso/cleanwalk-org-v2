<script setup lang="ts">
definePageMeta({ name: 'signup', layout: 'bare' })

usePageSeo({
  title: 'Inscription | Cleanwalk.org',
  description: 'Créez votre compte sur Cleanwalk.org.',
})

const choiceClass =
  'flex items-center gap-2 rounded-lg border border-border px-8 py-4 text-2xl font-bold text-base-content transition-colors hover:bg-neutral lg:min-w-104'
</script>

<template>
  <AuthLayout>
    <section class="flex flex-col items-center overflow-hidden px-8 py-8">
      <h1 class="mb-4 text-2xl font-medium">Choisissez le type de compte qui vous correspond :</h1>
      <div class="mb-8 flex flex-col gap-4">
        <NuxtLink :to="{ name: 'signupPerso' }" :class="choiceClass">
          <IconUser :size="28" />
          <span>Compte personnel</span>
        </NuxtLink>
        <NuxtLink :to="{ name: 'signupAsso' }" :class="choiceClass">
          <IconUsers :size="28" />
          <span>Compte association</span>
        </NuxtLink>
      </div>
      <NuxtLink :to="{ name: 'login' }" class="mt-8 w-full text-left text-base-content">
        Vous utilisez déjà cleanwalk.org :
        <span class="font-medium text-base-content underline">Connectez-vous</span>
      </NuxtLink>
    </section>
  </AuthLayout>
</template>
