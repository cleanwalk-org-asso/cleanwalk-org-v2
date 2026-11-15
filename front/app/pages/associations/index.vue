<script setup lang="ts">
definePageMeta({ name: 'associations' })

usePageSeo({
  title: 'Associations Environnementales | Cleanwalk.org',
  description: 'Découvrez des organisations actives pour l’environnement.',
})

const accountStore = useAccountStore()
const search = ref('')

const { data: associations, error } = await useAsyncData('associations', () => accountStore.getAssoList(), {
  default: () => [],
})

const filteredAssociations = computed(() => {
  const text = search.value.toLowerCase()
  return associations.value.filter((association) => association.name.toLowerCase().includes(text))
})
</script>

<template>
  <div>
    <SearchBar v-model="search" class="lg:hidden" />
    <section class="flex w-full flex-wrap justify-center gap-4 pt-37.5 pb-7.5 lg:pt-15.5 lg:pb-22.5">
      <NuxtLink
        v-for="association in filteredAssociations"
        :key="association.id"
        :to="{ name: 'association', params: { id: association.id } }"
        class="flex w-43 flex-col overflow-hidden rounded-lg border border-border shadow-[0_0_10px_rgba(0,0,0,0.1)]"
      >
        <img :src="association.bannerImg || '/default-banner.svg'" alt="" class="aspect-3/1 w-full object-cover">
        <BaseAvatar :src="association.profilePicture" alt="" class="relative -mt-7.5 ml-14.5 size-13.75 border-2 border-base-100" />
        <h3 class="mt-1.25 mb-2.5 text-center text-xs font-bold text-base-content">{{ association.name }}</h3>
      </NuxtLink>
      <p v-if="error">Erreur lors de la récupération des associations</p>
      <p v-else-if="filteredAssociations.length === 0">Aucune association correspondante</p>
    </section>
  </div>
</template>
