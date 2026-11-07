<script setup lang="ts">
import { FolderType } from '@/interfaces/FolderUploadinterfaces'
import type { Association, modifyAssociation } from '@/interfaces/userInterface'
import { getApiErrorMessage } from '@/services/apiError'

const props = defineProps<{ association: Association }>()

const accountStore = useAccountStore()
const { showToast } = useUtilsStore()
const { uploadImage } = useImageUpload()

const banner = ref(props.association.bannerImg)
const picture = ref(props.association.profilePicture)

const upload = async (event: Event, folder: FolderType, field: keyof modifyAssociation, successMessage: string) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  const url = await uploadImage(file, folder)
  input.value = ''
  if (!url) return

  try {
    await accountStore.modifyAssociation({ [field]: url })
    if (field === 'bannerImg') {
      banner.value = url
    } else {
      picture.value = url
      if (accountStore.CurrentUser) accountStore.CurrentUser.profilePicture = url
    }
    showToast(successMessage, true)
  } catch (error) {
    showToast(await getApiErrorMessage(error, "Erreur lors de l'enregistrement de l'image"), false)
  }
}
</script>

<template>
  <div class="flex w-full flex-col items-center">
    <label
      class="flex h-37.5 w-full cursor-pointer items-center justify-center bg-cover bg-center bg-no-repeat"
      :style="{ backgroundImage: `url(${banner || '/default-banner.svg'})` }"
    >
      <span class="sr-only">Modifier la bannière</span>
      <input
        type="file"
        accept="image/jpeg, image/png"
        class="hidden"
        @change="upload($event, FolderType.ASSO_BANNER, 'bannerImg', 'Votre bannière a été modifiée')"
      >
      <IconCamera class="mb-8 size-12.5 text-on-brand" />
    </label>

    <label
      class="relative -mt-12.5 flex size-24 cursor-pointer items-center justify-center rounded-full bg-warning bg-cover bg-center bg-no-repeat"
      :style="{ backgroundImage: `url(${picture})` }"
    >
      <span class="sr-only">Modifier la photo de profil</span>
      <input
        type="file"
        accept="image/jpeg, image/png"
        class="hidden"
        @change="upload($event, FolderType.ASSO_PP, 'profilePicture', 'Votre photo de profil a été modifiée')"
      >
      <IconCamera class="absolute right-0 bottom-0 size-6 rounded-full bg-brand p-0.75 text-on-brand" />
    </label>
  </div>
</template>
