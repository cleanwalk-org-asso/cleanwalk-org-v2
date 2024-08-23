<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import { useAccountStore } from '@/stores/AccountStore';
import type { Association } from '@/interfaces/userInterface';
import { useRoute, useRouter } from 'vue-router';
import defaultBanner from '../assets/default-banner.svg';
import { useUtilsStore } from '@/stores/UtilsStore';

const showToast = useUtilsStore().showToast;
const getAssoById = useAccountStore().getOrganisationById;
const route = useRoute();
const router = useRouter();

const asso: Ref<Association | undefined> = ref(undefined);

const errorRedirectToAssoList = () => {
    showToast('Association introuvable', false);
    router.push('/associations');
    console.error('Association not found');
};

onMounted(async () => {
    const id = +route.params.id; // +id is equivalent to parseInt(id)

    if (!id || isNaN(id)) {
        errorRedirectToAssoList();
        return;
    }
    asso.value = await getAssoById(id);
    if (!asso.value) {
        errorRedirectToAssoList();
        return;
    }
});

</script>
<template>
    <div v-if="asso" class="container">
        <img :src="asso.banner_img ? asso.banner_img : defaultBanner" alt="banner asso" class="banner">
        <img :src="asso.profile_picture" alt="logo asso" class="pp">
    </div>
    <div class="text-container">
        <h1>{{ asso?.name }}</h1>
        <p>{{ asso?.description }}</p>
    </div>

</template>
<style scoped lang="scss">
.container {
    display: flex;
    flex-direction: column;
    align-items: center;

    .banner {
        width: 100%;
        height: 150px;
        aspect-ratio: 21;
        object-fit: cover;
        margin-top: 58px;
    }

    .pp {
        position: relative;
        width: 96px;
        margin-top: -60px;
        object-fit: cover;
        height: 96px;
        border-radius: 9999px;
        background-color: #ffc107;
    }

}

.text-container {
    padding: 0 2rem;
}
</style>