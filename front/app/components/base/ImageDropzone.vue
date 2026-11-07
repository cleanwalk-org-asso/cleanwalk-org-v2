<script setup lang="ts">
import { FolderType } from '@/interfaces/FolderUploadinterfaces'

withDefaults(defineProps<{ currentImg?: string }>(), { currentImg: '' })

const { showToast } = useUtilsStore()
const { uploadImage } = useImageUpload()

const input = useTemplateRef<HTMLInputElement>('input')
const file = ref<File>()
const preview = ref<string>()
const isDragOver = ref(false)

const selectFile = (selected?: File) => {
  if (!selected) return
  if (selected.type !== 'image/jpeg' && selected.type !== 'image/png') {
    showToast('Seules les images de type JPEG ou PNG sont autorisées.', false)
    return
  }
  file.value = selected
  const reader = new FileReader()
  reader.onload = () => {
    preview.value = reader.result as string
  }
  reader.readAsDataURL(selected)
}

const onDrop = (event: DragEvent) => {
  isDragOver.value = false
  selectFile(event.dataTransfer?.files[0])
}

const removeImage = () => {
  file.value = undefined
  preview.value = undefined
  if (input.value) input.value.value = ''
}

/** Envoie l'image choisie et renvoie son URL. Sans nouvelle image, renvoie `undefined`. */
const handleUpload = async () => {
  if (!file.value) return undefined
  const url = await uploadImage(file.value, FolderType.CLEANWALKS)
  if (url) removeImage()
  return url
}

defineExpose({ handleUpload })
</script>

<template>
  <div class="relative w-full">
    <button
      v-if="preview"
      type="button"
      class="absolute -top-2.5 -right-2.5 z-1 flex size-5 items-center justify-center rounded-full bg-strong text-base-100"
      aria-label="Retirer l'image"
      @click="removeImage"
    >
      <IconX :size="14" />
    </button>
    <button
      type="button"
      class="flex aspect-21/9 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg bg-secondary bg-cover bg-center"
      :class="{ 'ring-2 ring-primary': isDragOver }"
      :style="currentImg ? { backgroundImage: `url(${currentImg})` } : undefined"
      aria-label="Choisir une image"
      @click="input?.click()"
      @dragover.prevent="isDragOver = true"
      @dragleave.prevent="isDragOver = false"
      @drop.prevent="onDrop"
    >
      <img v-if="preview" :src="preview" alt="Aperçu" class="size-full object-cover">
      <IconCamera v-else :size="50" />
    </button>
    <input
      ref="input"
      type="file"
      accept="image/jpeg, image/png"
      class="hidden"
      @change="selectFile(input?.files?.[0])"
    >
  </div>
</template>
