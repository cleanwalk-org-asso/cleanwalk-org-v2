<script setup lang="ts">
import personalAccountIcon from '~/assets/PersonalAccount.svg'
import assoAccountIcon from '~/assets/AssoAccount.svg'

const accounts = [
  {
    title: 'Compte personnel',
    icon: personalAccountIcon,
    route: 'signupPerso',
    cta: 'Créer son compte personnel',
    profile: 'Profil privé',
  },
  {
    title: 'Compte association',
    icon: assoAccountIcon,
    route: 'signupAsso',
    cta: 'Créer son compte association',
    profile: 'Profil public (A venir)',
  },
]
</script>

<template>
  <div class="px-8 pb-16">
    <h4 class="text-center text-2xl font-black">Choisissez votre profil Cleanwalk.org</h4>
    <div class="pt-4 pb-8 text-center">
      Inscrivez vous en quelques clics et accédez aux fonctionnalités adaptées à vos besoins.
    </div>
    <div class="flex flex-col items-center justify-center gap-16 md:flex-row">
      <div v-for="account in accounts" :key="account.route" class="rounded-lg border-2 border-border p-8 text-base-content">
        <div class="flex flex-col items-center gap-2 pb-4">
          <img :src="account.icon" :alt="`icône ${account.title}`">
          <h4 class="text-lg font-bold">{{ account.title }}</h4>
        </div>
        <ul class="list-disc pt-8 pb-24">
          <li>Organisez vos propres cleanwalks</li>
          <li>Rejoignez des initiatives près de chez vous</li>
          <li>Ressources organisateurs</li>
          <li>{{ account.profile }}</li>
        </ul>
        <BaseButton :to="{ name: account.route }" size="sm" block class="font-medium">{{ account.cta }}</BaseButton>
      </div>
    </div>
  </div>
</template>
