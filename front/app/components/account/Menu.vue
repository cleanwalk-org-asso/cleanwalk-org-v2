<script setup lang="ts">
const { CurrentUser: user } = storeToRefs(useAccountStore())

const rowClass = 'flex w-full items-center rounded-lg border border-border p-3'
const unloggedClass = 'flex w-full items-center rounded-lg border border-border p-4 text-primary'
</script>

<template>
  <section class="flex min-h-dvh flex-col items-center justify-between gap-8 overflow-hidden px-6.5 py-25 text-sm font-bold text-secondary-content md:mx-auto md:w-160 md:pt-32">
    <NuxtLink v-if="user" :to="{ name: 'menuProfile' }" class="flex w-full items-center rounded-lg border border-border p-4">
      <BaseAvatar :src="user.profilePicture" class="size-11" />
      <h3 class="mx-4 grow">{{ user.name }}</h3>
      <IconChevronRight />
    </NuxtLink>
    <div v-else class="flex w-full flex-col gap-4">
      <NuxtLink :to="{ name: 'login' }" :class="unloggedClass">
        <h3 class="mx-4 grow">Se connecter</h3>
        <IconChevronRight />
      </NuxtLink>
      <NuxtLink :to="{ name: 'signup' }" :class="unloggedClass">
        <h3 class="mx-4 grow">S'inscrire</h3>
        <IconChevronRight />
      </NuxtLink>
    </div>

    <ul class="flex w-full flex-col gap-4">
      <li v-if="user">
        <NuxtLink :to="{ name: 'myCleanwalks' }" :class="rowClass">
          <IconCalendarDays />
          <h3 class="mx-4 grow">Mes cleanwalks</h3>
          <IconChevronRight :size="22" />
        </NuxtLink>
      </li>
      <li>
        <NuxtLink :to="{ name: 'cleanwalkHistory' }" :class="rowClass">
          <IconHistory />
          <h3 class="mx-4 grow">L'histoire de Cleanwalk.org</h3>
          <IconChevronRight :size="22" />
        </NuxtLink>
      </li>
      <li>
        <NuxtLink :to="{ name: 'cleanwalkGuide' }" :class="rowClass">
          <IconFile />
          <h3 class="mx-4 grow">Guide de la cleanwalk</h3>
          <IconChevronRight :size="22" />
        </NuxtLink>
      </li>
      <li>
        <a href="mailto:contact@cleanwalk.org" :class="rowClass">
          <IconSend />
          <h3 class="mx-4 grow">Nous contacter</h3>
          <IconChevronRight :size="22" />
        </a>
      </li>
    </ul>

    <div v-if="user" class="flex w-full flex-col">
      <AccountLogoutButton />
      <AccountDeleteButton />
    </div>
  </section>
</template>
