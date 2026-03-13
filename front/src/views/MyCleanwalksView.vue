<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useCleanwalkStore } from '@/stores/CleanwalkStore';
import type { Cleanwalk } from '@/interfaces/cleanwalkInterface';
import CleanwalkListCard from '@/components/cards/CleanwalkListCard.vue';
import TopBar from '@/components/TopBar.vue';
import { getCleanwalkRouteParams } from '@/services/cleanwalkSlug';

const cleanwalkStore = useCleanwalkStore();
const cleanwalks = ref<Cleanwalk[]>([]);
const loading = ref(true);

onMounted(async () => {
    cleanwalks.value = await cleanwalkStore.getMyCleanwalks();
    loading.value = false;
});
</script>

<template>
    <TopBar page-name="Mes cleanwalks" back-url="/menu" />
    <main>
        <div v-if="loading" class="empty">Chargement…</div>
        <div v-else-if="cleanwalks.length === 0" class="empty">
            Vous n'avez pas encore créé de cleanwalk.
        </div>
        <div v-else class="list">
            <router-link
                v-for="cw in cleanwalks"
                :key="cw.id"
                :to="{ name: 'cleanwalk', params: getCleanwalkRouteParams(cw) }"
                class="link"
            >
                <CleanwalkListCard :cleanwalk="cw" />
            </router-link>
        </div>
    </main>
</template>

<style scoped lang="scss">
main {
    padding: 80px 1.6rem 6rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 40rem;
    margin: 0 auto;

    .list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .link {
        text-decoration: none;
        color: inherit;
    }

    .empty {
        text-align: center;
        color: #94A3B8;
        padding: 3rem 0;
        font-size: 14px;
    }
}
</style>
