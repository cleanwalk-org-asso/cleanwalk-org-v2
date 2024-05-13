<script setup lang="ts">
import { watch, ref, onMounted } from 'vue';
const backgroundImageUrl = ref('https://cdn2.thecatapi.com/images/1nk.jpg');
import iconPhoto from '@/components/icons/icon-photo.vue';
import { useAccountStore } from '@/stores/AccountStore';
import router from '@/router';
import iconShuffleArrow from './icons/icon-shuffle-arrow.vue';
import { v4 as uuidv4 } from 'uuid';
import { useUtilsStore } from '@/stores/UtilsStore';

const getToken = useAccountStore().getAccessToken;

const showToast = useUtilsStore().showToast;

const currentMdp = ref('');
const newMdp = ref('');
const confirmNewMdp = ref('');


const currentUser = ref(useAccountStore().CurrentUser);
const userName = ref(currentUser.value?.name);

let debounceTimeout: string | number | NodeJS.Timeout | null | undefined = null;

watch(() => userName.value, () => {
    if (debounceTimeout) {
        clearTimeout(debounceTimeout);
    }

    if (userName.value === useAccountStore().CurrentUser?.name) {
        return;
    }

    debounceTimeout = setTimeout(() => {
        if (!userName.value || userName.value === '') {
            debounceTimeout = null;
            userName.value = currentUser.value?.name;
            showToast('Veuillez entrer un nom valide', false);
            return;
        }
        useAccountStore().modifyUser(currentUser.value!.id!, getToken()!, userName.value);
        showToast('Votre nom a été modifié', true);
        useAccountStore().CurrentUser!.name = userName.value;
        debounceTimeout = null;
    }, 2000);
});



const changePassword = async() => {
    if (!currentMdp.value || !newMdp.value || !confirmNewMdp.value) {
        showToast('Veuillez remplir tous les champs', false);
        return;
    }

    if (newMdp.value !== confirmNewMdp.value) {
        showToast('Les mots de passe ne correspondent pas', false);
        return;
    }

    const response = await useAccountStore().changePassword(currentUser.value!.id!, getToken()!, currentMdp.value, newMdp.value);
    if (response) {
        showToast('Votre mot de passe a été modifié', true);
    } else {
        showToast('Mot de passe actuel incorrect', false);
    }
    currentMdp.value = '';
    newMdp.value = '';
    confirmNewMdp.value = '';
}


onMounted(() => {
    console.log('mounted');
    if (!currentUser.value) {
        router.push('/login');
        return;
    }
});

const changeUserPP = () => {
    currentUser.value!.profile_picture = 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=' + uuidv4();

    // Clear the previous timeout if it exists
    if (debounceTimeout) {
        clearTimeout(debounceTimeout);
    }

    // Set a new timeout
    debounceTimeout = setTimeout(() => {
        useAccountStore().modifyUser(currentUser.value!.id!, getToken()!, undefined, currentUser.value!.profile_picture);
        showToast('Votre photo de profil a été modifiée', true);
        useAccountStore().CurrentUser!.profile_picture = currentUser.value!.profile_picture;
        debounceTimeout = null; // Reset the timeout variable
    }, 2000);
}

</script>
<template>
    <section class="container">
        <div v-if="currentUser?.role === 'organisation'" class="asso-imgs">
            <img class="cover-img" src="https://cdn2.thecatapi.com/images/66l.jpg" alt="cover-img">
            <div class="icon-photo cover">
                <iconPhoto />
            </div>
            <img class="pp" src="https://cdn2.thecatapi.com/images/uk0SrrBbQ.jpg" alt="pp">
            <div class="icon-photo pp-icon">
                <iconPhoto />
            </div>
        </div>
        <div class="img-user" v-if="currentUser?.role !== 'organisation'">
            <img class="pp" :src="currentUser?.profile_picture" alt="cover-img">
            <div @click="changeUserPP()" class="icon-shuffle-arrow">
                <iconShuffleArrow />
            </div>

        </div>
        <div class="content">
            <h3>{{ currentUser?.email }}</h3>
            <input class="input name" type="text" v-model="userName">
            <form @submit.prevent="changePassword()">
                <label class="label" for="mdp">Mot de passe actuel</label>
                <input v-model="currentMdp" class="input" name="mdp" type="password" placeholder="Votre mot de passe">
                <label class="label" for="mdp">Nouveau mot de passe</label>
                <input v-model="newMdp" class="input" name="mdp" type="password" placeholder="Votre mot de passe">
                <label class="label" for="mdp">Confirmation du nouveau mot de passe</label>
                <input v-model="confirmNewMdp" class="input" name="mdp" type="password" placeholder="Votre mot de passe">
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

    .asso-imgs {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .img-user {
        margin-top: 9rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .icon-shuffle-arrow {
            width: 26px;
            height: 26px;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 9999px;
            padding-right: 1px;
            padding-bottom: 1px;
            margin-top: -25px;
            z-index: 999;
            margin-right: -60px;
            stroke: #fff;
            background-color: var(--color-primary);
            transition: transform 0.3s ease-in-out;

            &:active {
                transform: rotate(-180deg);
                transition: transform 0.2s ease-in-out;
            }
        }
    }


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

            &.name {

                font-size: 18px;
                font-style: normal;
                font-weight: 500;
                padding: 12px 0 8px 12px;
                width: 100%;
            }
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