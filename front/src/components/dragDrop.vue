<script lang="ts" setup>
import { ref, type Ref } from 'vue';
import { Camera, X } from 'lucide-vue-next';

import { useAccountStore } from '@/stores/AccountStore';
import apiService from '@/services/apiService';
import type { ApiResponse } from '@/interfaces/apiResponseInterface';
import { useUtilsStore } from '@/stores/UtilsStore';
import { FolderType } from '@/interfaces/FolderUploadinterfaces';

const showToast = useUtilsStore().showToast;

const props = defineProps({
  format: {
    validator: (value: string) => ['card', 'circle'].includes(value),
    default: 'card',
  },
  autoUpload: {
    type: Boolean,
    default: false,
  },
  currentImg: {
    type: String,
    default: '',
  },

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

const handleUpload = async (): Promise<string | undefined> => {
  if (fileInput.value?.files?.length && fileInput.value) {
    // Utilisez votre fonction d'aide pour uploader l'image
    const token = accountStore.getAccessToken();
    const Response: ApiResponse = await apiService.uploadFile(fileInput.value.files[0], FolderType.CLEANWALKS, token!);
    if (Response.success) {
      // showToast("Image uploaded successfully", true);
      removeImage();
    } else {
      showToast(Response.data.message as string, false);
    }
    return Response.data.img_url as string; //img name is in Response.data.filename
  }
  showToast("No file selected", false);
  removeImage();
  return undefined;
};

const removeImage = () => {
  imageSrc.value = null;
  fileInput.value!.value = '';
};

defineExpose({ handleUpload });
</script>

<template>
  <div class="container-drag-drop ">
    <button v-if="imageSrc && !props.autoUpload" @click.stop="removeImage()" class="cross">
      <X />
    </button>
    <div  class="drop-area" @dragover.prevent="dragOver" @dragleave.prevent="dragLeave" @drop.prevent="onFileDrop"
      @click="fileInputClick" :class="{ 'dragover': isDragOver , [props.format]: true }"
      :style="{ backgroundImage: currentImg ? `url(${currentImg})` : 'none' }">
      <input type="file" ref="fileInput" @change="onFileChange" accept="image/jpeg, image/png" style="display: none" />
      <Camera :size="50" v-if="!imageSrc" />

      <img v-if="imageSrc" :src="imageSrc" alt="Preview" class="preview" />
    </div>
  </div>
</template>


<style scoped lang="scss">
.container-drag-drop {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: end;

  .cross {
    position: absolute;
    margin-right: -10px;
    margin-top: -10px;
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
    z-index: 1;
  }
}

.drop-area {
  width: 100%;
  text-align: center;
  cursor: pointer;
  aspect-ratio: 21/9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #E1F4F8;
  overflow: hidden;
  background-position: center;
  background-size: cover;

  &.card {
    border-radius: 8px;

  }
}

.dragover {
  background-color: #E1F4F8;
}

.preview {
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
}
</style>