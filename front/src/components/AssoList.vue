<script setup lang="ts">
import { onMounted, ref, computed, type Ref } from 'vue'
import { useAccountStore } from '@/stores/AccountStore'
import { useUtilsStore } from '@/stores/UtilsStore'
import { type Association } from '@/interfaces/userInterface'
import defaultBanner from '../assets/default-banner.svg'
import SearchBar from './SearchBar.vue'
import { useDevice } from '@/composables/useDevice'

const { isMobile } = useDevice();


const showToast = useUtilsStore().showToast
const accountStore = useAccountStore()

const assoList: Ref<Association[]> = ref([])
const searchInput = ref('') // La valeur de recherche

// Récupération des associations lors du montage du composant
onMounted(async () => {
    assoList.value = await accountStore.getAssoList()
    if (!assoList.value) {
        showToast('Erreur lors de la récupération des associations', false)
    }
})

// Propriété calculée pour filtrer la liste des associations en fonction de la recherche
const filteredAssoList = computed(() => {
    if (!searchInput.value) {
        return assoList.value
    }
    return assoList.value.filter((asso) =>
        asso.name.toLowerCase().includes(searchInput.value.toLowerCase())
    )
})
</script>

<template>
  <SearchBar v-if="isMobile" :searchInput="searchInput" @updateSearch="searchInput = $event" />
  <section class="container">
    <router-link
      :to="{ name: 'association', params: { id: asso.id } }"
      v-for="asso in filteredAssoList"
      :key="asso.id || asso.name"
      class="asso-card"
    >
      <img :src="asso.banner_img || defaultBanner" alt="cover-img" class="cover" />
      <img :src="asso.profile_picture" alt="asso-img" class="img" />
      <h3>{{ asso.name }}</h3>
    </router-link>
    <p v-if="filteredAssoList.length === 0">Aucune association correspondante</p>
  </section>
</template>

<style scoped lang="scss">
.container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    width: 100vw;
    justify-content: center;
    padding: 150px 0 90px;

    .asso-card {
        width: 171px; // Inclut les marges et les bordures dans la largeur de la carte
        display: flex;
        flex-direction: column;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        border: 1px solid #cbd5e1;

        .cover {
            width: 100%;
            object-fit: cover;
            aspect-ratio: 9/3;
        }

        .img {
            width: 100%;
            object-fit: cover;
            aspect-ratio: 1/1;
            border-radius: 9999px;
            width: 55px;
            position: relative;
            margin-top: -30px;
            margin-left: 58px;
            border: 2px solid #fff;
        }

        h3 {
            font-size: 12px;
            font-weight: 700;
            color: #373646;
            text-align: center;
            margin: 5px 0 10px 0;
        }
    }
}
</style>
