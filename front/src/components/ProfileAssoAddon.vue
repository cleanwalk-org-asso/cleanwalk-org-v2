<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import { useAccountStore } from '@/stores/AccountStore';
import api from '@/services/apiService';
import { useUtilsStore } from '@/stores/UtilsStore';
import type { Association } from '@/interfaces/userInterface';
import { FolderType } from '@/interfaces/FolderUploadinterfaces';
import { Camera } from 'lucide-vue-next';


const showToast = useUtilsStore().showToast;
const accountStore = useAccountStore();

const props = defineProps<{
    Asso: Association | undefined;
}>();

const currentBanner = ref(props.Asso?.banner_img);
const currentPP = ref(props.Asso?.profilePicture);

onMounted(() => {
    if (!props.Asso) {
        return;
    }
});

interface Response {
  message: string;
  url: string;
}



const fileInputPP: Ref<HTMLInputElement | null> = ref(null);
const fileInputBanner: Ref<HTMLInputElement | null> = ref(null);


const handleUpload = async (fileInput: HTMLInputElement, folderType: FolderType): Promise<string | undefined> => {
    if (!fileInput.files?.length || !fileInput.value) {
        showToast("No file selected", false);
        return undefined;
    }

    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
    formData.append('folderType', folderType);

    const response = await api.post('upload/image', {
      body: formData
    })
    const data:Response = await response.json();
    if (response.ok) {
         return data.url;; //img name is in Response.data.filename
    } else {
        showToast(data.message, false);
        return undefined;
    }
};

const uploadProfilePicture = async () => {
    const img_url = await handleUpload(fileInputPP.value!, FolderType.ASSO_PP);
    if(!img_url) return;
    currentPP.value = img_url;
    accountStore.modifyAssociation({profilePicture: img_url});
    showToast("Votre photo de profil a été modifiée", true);
};

const uploadBanner = async () => {
    const img_url = await handleUpload(fileInputBanner.value!, FolderType.ASSO_BANNER);
    if (!img_url) return;
    currentBanner.value = img_url;
    accountStore.modifyAssociation({ banner_img: img_url });
    showToast("Votre bannière a été modifiée", true);
};

</script>

<template>
    <div class="asso-imgs">
        <!-- Banner Image Area -->
        <div class="input-area banner" :style="currentBanner ? { backgroundImage: `url(${currentBanner})` } : {}"
            @click="fileInputBanner?.click()">
            <input type="file" ref="fileInputBanner" @change="uploadBanner" style="display: none;" />
            <Camera class="iconPhoto" />
        </div>

        <!-- Profile Picture Area -->
        <div class="input-area pp" :style="{ backgroundImage: `url(${currentPP})` }"
            @click="fileInputPP?.click()">
            <input type="file" ref="fileInputPP" @change="uploadProfilePicture" style="display: none;" />
            <Camera class="iconPhoto pp" />
        </div>
    </div>
</template>


<style scoped lang="scss">
.asso-imgs {
    display: flex;
    flex-direction: column;
    gap: 20px;

    .input-area {
        position: relative;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;

        &.banner {
            width: 100%;
            height: 150px;
            /* Default background img */
            background-image: url('../assets/default-banner.svg');
        }

        &.pp {
            position: relative;
            width: 96px;
            margin-top: -70px;
            height: 96px;
            aspect-ratio: 1;
            border-radius: 50%;
            background-color: #ffc107;
            /* Default background color */
        }

        .iconPhoto {
            width: 50px;
            height: 50px;
            stroke: #ffffff;
            margin-bottom: 2rem;

            &.pp {
                width: 24px;
                height: 24px;
                transform: translate(35px, 43px);
                background-color: var(--color-primary);
                border-radius: 9999px;
                padding: 3px;

            }
        }
    }
}


</style>