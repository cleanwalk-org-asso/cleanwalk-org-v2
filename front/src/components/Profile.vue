<script setup lang="ts">
import { defineProps, ref, onMounted } from 'vue';
import VueFilePond from 'vue-filepond';
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
const FilePond = VueFilePond();
const backgroundImageUrl = ref('https://cdn2.thecatapi.com/images/1nk.jpg');
import iconPhoto from '@/components/icons/icon-photo.vue';

const currentMdp = ref('');
const newMdp = ref('');
const confirmNewMdp = ref('');

const changePassword = () => {
    console.log('change password', currentMdp.value, newMdp.value, confirmNewMdp.value);
    currentMdp.value = '';
    newMdp.value = '';
    confirmNewMdp.value = '';

}


onMounted(() => {
    console.log('mounted');
});

</script>
<template>
    <section class="container">
        <img class="cover-img" src="https://cdn2.thecatapi.com/images/66l.jpg" alt="cover-img">
        <div class="icon-photo cover">
            <iconPhoto />
        </div>
        <img class="pp" src="https://cdn2.thecatapi.com/images/uk0SrrBbQ.jpg" alt="pp">
        <div class="icon-photo pp-icon">
            <iconPhoto />
        </div>
        <div class="content">
            <h1>
                Qui netoie si ce n'est toi ?
            </h1>
            <form @submit.prevent="changePassword()">
                <label class="label" for="mdp">Mot de passe actuel</label>
                <input v-model="currentMdp" class="input" name="mdp" type="text" placeholder="Votre mot de passe">
                <label class="label" for="mdp">Nouveau mot de passe</label>
                <input v-model="newMdp"  class="input" name="mdp" type="text" placeholder="Votre mot de passe">
                <label class="label" for="mdp">Confirmation du nouveau mot de passe</label>
                <input v-model="confirmNewMdp" class="input" name="mdp" type="text" placeholder="Votre mot de passe">
                <button class="action-button" type="submit">Changer votre mot de passe</button>
            </form>
            <button class="danger-button">Cloturer mon compte</button>
        </div>
    </section>

</template>
<style scoped lang="scss">
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;

    .icon-photo {
        background-color: var(--color-primary);
        stroke: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px;
        border-radius: 9999px;
        width: 26px;
        height: 26px;

        &.cover {
            position: absolute;
            top: 85px;
            right: 10px;
            z-index: 999;
        }

        &.pp-icon {
            position: relative;
            margin-top: -25px;
            z-index: 999;
            margin-right: -60px;
        }
    }

    .cover-img {
        width: 100%;
        aspect-ratio: 16/5;
        object-fit: cover;
        margin-top: 78px;
    }

    .pp {
        width: 96px;
        aspect-ratio: 1;
        object-fit: cover;
        border-radius: 9999px;
        position: relative;
        margin-top: -48px;
    }
    .content {
        width: 100%;
        padding: 1rem 2.45rem 0;

        h1 {
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            padding-top: 1rem;
        }
    
        form {
            display: flex;
            width: 100%;
            flex-direction: column;
            color: #94A3B8;
    
    
            .label {
                font-size: 12px;
                font-weight: 500;
                position: relative;
                margin-bottom: -18px;
                background-color: #fff;
                width: fit-content;
                margin-left: 13px;
                margin-top: 5px;           
    
            }
    
            .input {
                border: 1px solid #94A3B8;
                border-radius: 8px;
                padding: 12px;
                margin-top: 0.5rem;
                font-size: 14px;
                font-style: normal;
                font-weight: 500;
    
                &::placeholder {
                    color: #94A3B8;
                }
                &:focus {
                    outline: none;
                }
            }
    
            .action-button {
                margin-top: 1.5rem;
            }
        }
        .danger-button {
            margin-top: 3.5rem;
        }
    }

    
}
</style>