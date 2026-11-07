<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
import type { Association } from '@/interfaces/userInterface'
import { getApiErrorMessage } from '@/services/apiError'

const SAVE_DELAY_MS = 2000

const accountStore = useAccountStore()
const { CurrentUser: user } = storeToRefs(accountStore)
const { showToast } = useUtilsStore()

const association = ref<Association>()
const name = ref(user.value?.name ?? '')
const description = ref('')
const picture = ref(user.value?.profilePicture)

const timers = new Map<string, ReturnType<typeof setTimeout>>()

const saveLater = (key: string, save: () => Promise<void>, errorMessage: string) => {
  clearTimeout(timers.get(key))
  timers.set(
    key,
    setTimeout(async () => {
      try {
        await save()
      } catch (error) {
        showToast(await getApiErrorMessage(error, errorMessage), false)
      }
    }, SAVE_DELAY_MS),
  )
}

onMounted(async () => {
  if (user.value?.role === 'ASSOCIATION') {
    association.value = await accountStore.getOrganizationById(user.value.id!)
    description.value = association.value?.description ?? ''
  }
})

onUnmounted(() => {
  timers.forEach((timer) => clearTimeout(timer))
})

watch(name, (value) => {
  clearTimeout(timers.get('name'))
  if (value === user.value?.name) return

  saveLater(
    'name',
    async () => {
      if (!value) {
        name.value = user.value?.name ?? ''
        showToast('Veuillez entrer un nom valide', false)
        return
      }
      await accountStore.modifyUser(user.value!.id!, value)
      user.value!.name = value
      showToast('Votre nom a été modifié', true)
    },
    'Erreur lors de la modification du nom',
  )
})

watch(description, (value) => {
  clearTimeout(timers.get('description'))
  if (!association.value || value === (association.value.description ?? '')) return

  saveLater(
    'description',
    async () => {
      await accountStore.modifyAssociation({ description: value })
      association.value!.description = value
      showToast('Votre description a été modifiée', true)
    },
    'Erreur lors de la modification de la description',
  )
})

const changePicture = () => {
  const url = `https://api.dicebear.com/8.x/fun-emoji/svg?seed=${uuidv4()}`
  picture.value = url

  saveLater(
    'picture',
    async () => {
      await accountStore.modifyUser(user.value!.id!, undefined, url)
      user.value!.profilePicture = url
      showToast('Votre photo de profil a été modifiée', true)
    },
    'Erreur lors de la modification de la photo',
  )
}
</script>

<template>
  <section class="flex flex-col items-center overflow-hidden pt-14.5 md:mx-auto md:w-160 lg:pt-8">
    <AccountAssoImages v-if="association" :association="association" />

    <div v-if="user?.role !== 'ASSOCIATION'" class="relative mt-10 flex flex-col items-center justify-center">
      <BaseAvatar :src="picture" alt="cover-img" class="size-24" />
      <button
        type="button"
        class="absolute right-0 bottom-0 flex size-6.5 items-center justify-center rounded-full bg-brand text-on-brand transition-transform duration-200 active:-rotate-180"
        aria-label="Changer de photo de profil"
        @click="changePicture"
      >
        <IconRefreshCcw :size="20" />
      </button>
    </div>

    <div class="w-full px-[2.45rem] pt-4 pb-8">
      <h3 class="mb-4">{{ user?.email }}</h3>
      <BaseInput v-model="name" name="name" label="Nom" placeholder="Votre nom" />
      <BaseTextarea v-if="association" v-model="description" name="description" label="Description" placeholder="Votre description" />
      <p class="mt-6 text-sm text-muted">
        Pour changer votre mot de passe,
        <NuxtLink :to="{ name: 'forgotPassword' }" class="font-medium text-base-content underline">demandez une réinitialisation par email</NuxtLink>.
      </p>
      <AccountLogoutButton />
    </div>
  </section>
</template>
