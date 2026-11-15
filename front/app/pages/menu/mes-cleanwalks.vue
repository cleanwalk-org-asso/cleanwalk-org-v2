<script setup lang="ts">
import type { Cleanwalk } from '@/interfaces/cleanwalkInterface'
import { getCleanwalkRouteParams } from '@/services/cleanwalkSlug'

definePageMeta({ name: 'myCleanwalks', middleware: 'auth' })

usePageSeo({
  title: 'Mes Cleanwalks | Cleanwalk.org',
  description: 'Liste de vos cleanwalks créées.',
})

const cleanwalkStore = useCleanwalkStore()
const cleanwalks = ref<Cleanwalk[]>([])
const loading = ref(true)

onMounted(async () => {
  cleanwalks.value = await cleanwalkStore.getMyCleanwalks()
  loading.value = false
})
</script>

<template>
  <div>
    <TopBar page-name="Mes cleanwalks" back-url="/menu" />
    <div class="mx-auto flex max-w-160 flex-col gap-4 px-6.5 pt-20 pb-24 lg:pt-8">
      <div v-if="loading" class="py-12 text-center text-sm text-secondary-content">Chargement…</div>
      <div v-else-if="cleanwalks.length === 0" class="py-12 text-center text-sm text-secondary-content">
        Vous n'avez pas encore créé de cleanwalk.
      </div>
      <div v-else class="flex flex-col gap-4">
        <NuxtLink
          v-for="cleanwalk in cleanwalks"
          :key="cleanwalk.id"
          :to="{ name: 'cleanwalk', params: getCleanwalkRouteParams(cleanwalk) }"
        >
          <CardsCleanwalkListCard :cleanwalk="cleanwalk" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
