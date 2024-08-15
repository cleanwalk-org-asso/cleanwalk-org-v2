<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import iconPhoto from './icons/icon-photo.vue';
import { useAccountStore } from '@/stores/AccountStore';
import apiHelper from '@/helpers/apiHelper';
import type { ApiResponse } from '@/interfaces/apiResponseInterface';
import { useUtilsStore } from '@/stores/UtilsStore';
import type { Association } from '@/interfaces/userInterface';


const showToast = useUtilsStore().showToast;
const accountStore = useAccountStore();


const props = defineProps<{
  Asso: Association | undefined;
}>();

onMounted(() => {
  if (!props.Asso) {
    return;
  }
  console.log(props.Asso);
});


const fileInputPP: Ref<HTMLInputElement | null> = ref(null);
const fileInputBanner: Ref<HTMLInputElement | null> = ref(null);


const handleUpload = async (fileInput:HTMLInputElement): Promise<string | undefined> => {
  if (fileInput.files?.length && fileInput.value) {
    // Utilisez votre fonction d'aide pour uploader l'image
    const token = accountStore.getAccessToken();
    const Response: ApiResponse = await apiHelper.uploadFile(fileInput.files[0], token!);
    if (Response.success) {
    } else {
      showToast(Response.data.message as string, false);
    }
    return Response.data.img_url as string; //img name is in Response.data.filename
  }
  showToast("No file selected", false);
  return undefined;
};

const uploadProfilePicture = async () => {
  const img_url = await handleUpload(fileInputPP.value!);
  if (img_url) {
    accountStore.modifyUser(accountStore.CurrentUser!.id!, accountStore.getAccessToken()!, img_url);
    showToast("Votre photo de profil a été modifiée", true);
  }
};

const uploadBanner = async () => {
  const img_url = await handleUpload(fileInputBanner.value!);
  if (img_url) {
    showToast("Votre bannière a été modifiée", true);
  }
};
</script>

<template>
    <div class="asso-imgs">
        <input type="file" :current-img="Asso?.banner_img" 
        :style="{ backgroundImage: `url(${Asso?.banner_img})`}"/>
        <input type="file" class="pp" alt="pp" 
        :style="{ backgroundImage: `url(${Asso?.profile_picture})`}"/>
        <div class="icon-photo pp-icon">
            <iconPhoto />
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
</style>