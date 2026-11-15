<script setup lang="ts">

const search = defineModel<string>({ default: '' })
const active = defineModel<boolean>('active', { default: false })

const { CurrentUser: user } = storeToRefs(useAccountStore())
const input = useTemplateRef<HTMLInputElement>('input')

const open = async () => {
  active.value = true
  await nextTick()
  input.value?.focus()
}

const close = () => {
  active.value = false
  search.value = ''
}
</script>

<template>
  <div class="fixed top-0 left-0 z-[9998] flex w-screen justify-end gap-2 bg-brand px-4.75 py-2.5">
    <img v-if="!active" class="absolute left-7.75 mt-2.5 w-26" src="~/assets/logo.svg" alt="logo cleanwalk.org">

    <div v-if="active" class="flex grow items-center justify-between rounded-lg border border-border bg-base-100">
      <button type="button" class="py-0 pr-1.25 pl-2.5 text-secondary-content" aria-label="Fermer la recherche" @click="close">
        <IconChevronLeft />
      </button>
      <input
        ref="input"
        v-model="search"
        class="w-full bg-transparent py-1.5 text-sm font-medium text-base-content outline-none"
        name="search"
        type="text"
        autocomplete="off"
        placeholder="Rechercher une cleanwalk"
      >
      <IconSearch class="mr-2.5 shrink-0 text-secondary-content" :size="20" />
    </div>
    <button
      v-else
      type="button"
      class="flex size-9.5 items-center justify-center rounded-lg border border-border bg-base-100 text-secondary-content"
      aria-label="Rechercher"
      @click="open"
    >
      <IconSearch :size="20" />
    </button>

    <NuxtLink v-if="user" :to="{ name: 'menuProfile' }" aria-label="Mon profil">
      <BaseAvatar :src="user.profilePicture" class="size-9.5" />
    </NuxtLink>
    <NuxtLink
      v-else
      :to="{ name: 'login' }"
      class="flex size-9.5 items-center justify-center rounded-lg border border-border bg-base-100 text-secondary-content"
      aria-label="Se connecter"
    >
      <IconLogIn />
    </NuxtLink>
    <slot name="actions" />
  </div>
</template>
