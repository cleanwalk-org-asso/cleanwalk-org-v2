<template>
  <div class="drop-area" @dragover.prevent="dragOver" @dragleave.prevent="dragLeave" @drop.prevent="onFileDrop"
    @click="fileInputClick" :class="{ 'dragover': isDragOver }">
    <input type="file" ref="fileInput" @change="onFileChange" accept="image/jpeg, image/png" style="display: none" />
    <icon-photo class="icon-photo" v-if="!imageSrc" />

    <img v-if="imageSrc" :src="imageSrc" alt="Preview" class="preview" />
    <button v-if="imageSrc" @click.stop="removeImage()" class="cross">X</button>
  </div>
  <!-- <button @click="handleUpload()">Upload1</button> -->

</template>

<script lang="ts" setup>
import { ref, type Ref } from 'vue';
import iconPhoto from './icons/icon-photo.vue';
import { useAccountStore } from '@/stores/AccountStore';
import apiHelper from '@/helpers/apiHelper';
import type { ApiResponse } from '@/interfaces/apiResponseInterface';

const props = defineProps({
  format: {
    validator: (value: string) => ['card', 'full', 'circle'].includes(value),
    default: 'card',
  },
  autoUpload: {
    type: Boolean,
    default: true,
  },
  fileName: String,

});

const accountStore = useAccountStore()
const fileInput: Ref<HTMLInputElement | null> = ref(null);
const imageSrc: Ref<string | null> = ref(null);
const isDragOver = ref(false);

const dragOver = () => {
  isDragOver.value = true;
};

const dragLeave = () => {
  isDragOver.value = false;
};

const onFileDrop = (event: DragEvent): void => {
  const files = event.dataTransfer?.files;
  if (files) {
    processFile(files[0]);
  }
};

const fileInputClick = () => {
  fileInput.value?.click();
};

const onFileChange = (): void => {
  if (fileInput.value?.files && fileInput.value.files.length > 0) {
    const file = fileInput.value.files[0];
    processFile(file);
    if (props.autoUpload) {
      handleUpload();
    }
  }
};

const processFile = (file: File): void => {
  if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target?.result) {
        imageSrc.value = e.target.result as string;
      }
    };
    reader.readAsDataURL(file);
  } else {
    alert("Seules les images de type JPEG ou PNG sont autorisées.");
  }
};

const handleUpload = async (): Promise<ApiResponse> => {
  if (fileInput.value?.files) {
    // Utilisez votre fonction d'aide pour uploader l'image
    const token = accountStore.getAccessToken();
    const Response: ApiResponse = await apiHelper.uploadFile(fileInput.value.files[0], token!);
    return Response;
  }
  return { success: false, data: { message: "No file selected" } };
};

const removeImage = () => {
  imageSrc.value = null;
  fileInput.value!.value = '';
};

defineExpose({ handleUpload });
</script>

<style scoped lang="scss">
.drop-area {
  text-align: center;
  margin: 20px;
  cursor: pointer;
  aspect-ratio: 16/9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #E1F4F8;
  border-radius: 8px;
  overflow: hidden;
}

.dragover {
  background-color: #E1F4F8;
}

.icon-photo {
  width: 50px;
  height: 50px;
  stroke: #000000;
}

.preview {
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
}

.cross {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #000000;
  color: #ffffff;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  padding: 0;
  margin: 0;
  z-index: 1;
}
</style>