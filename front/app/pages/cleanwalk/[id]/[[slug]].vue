<script setup lang="ts">
import { buildCleanwalkSlug, getCleanwalkRouteParams } from '@/services/cleanwalkSlug'

definePageMeta({
  name: 'cleanwalk',
  key: (route) => String(route.params.id),
})

const route = useRoute()
const origin = useSiteOrigin()
const cleanwalkStore = useCleanwalkStore()

const id = Number(route.params.id)
if (!Number.isInteger(id)) {
  throw createError({ statusCode: 404, statusMessage: 'Cleanwalk introuvable', fatal: true })
}

const { data, error } = await useAsyncData(`cleanwalk-${id}`, async () => (await cleanwalkStore.getCleanwalkById(id)) ?? null)
if (error.value) {
  throw createError({ statusCode: 503, statusMessage: 'Service indisponible', fatal: true })
}
if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Cleanwalk introuvable', fatal: true })
}

const cleanwalk = computed(() => data.value!)

const routeParams = getCleanwalkRouteParams(cleanwalk.value)
if (route.params.slug !== routeParams.slug) {
  await navigateTo(
    { name: 'cleanwalk', params: routeParams, query: route.query },
    { replace: true, redirectCode: 301 },
  )
}

usePageSeo({
  title: () => `${cleanwalk.value.name} | Cleanwalk.org`,
  description: () => {
    const { description, address, host } = cleanwalk.value
    if (!description) {
      return `Participez à cette cleanwalk à ${address}, organisée par ${host?.name}`
    }
    return description.length > 150 ? `${description.substring(0, 150)}...` : description
  },
  ogImage: () => cleanwalk.value.img_url,
})

useHead({
  link: [
    {
      rel: 'canonical',
      href: () => `${origin}/cleanwalk/${id}/${buildCleanwalkSlug(cleanwalk.value.name, cleanwalk.value.host?.name)}`,
    },
  ],
})

useJsonLd(() => {
  const { name, description, date_begin, duration, address, pos_lat, pos_long, img_url, host } = cleanwalk.value
  const startDate = new Date(date_begin)

  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name,
    description,
    startDate: startDate.toISOString(),
    endDate: new Date(startDate.getTime() + duration * 60000).toISOString(),
    location: {
      '@type': 'Place',
      name: address,
      address,
      geo: { '@type': 'GeoCoordinates', latitude: pos_lat, longitude: pos_long },
    },
    image: img_url,
    organizer: { '@type': 'Organization', name: host?.name, image: host?.profilePicture },
  }
})
</script>

<template>
  <div>
    <TopBar back-url="/cleanwalks" page-name="Cleanwalk" />
    <div class="pt-14.5 pb-8 text-xs lg:pt-0">
      <div class="md:mx-auto md:flex md:w-[90%] md:max-w-300 md:gap-8">
        <CleanwalkDetails class="md:flex-1" :cleanwalk="cleanwalk" />

        <div class="mt-6 px-6.5 md:mt-8 md:flex-1 md:px-0">
          <div class="hidden md:block">
            <h3 class="mb-4 text-xl font-semibold text-base-content">Localisation</h3>
            <div class="h-100 overflow-hidden rounded-lg border border-border">
              <ClientOnly>
                <MapSoloMap :cleanwalk="cleanwalk" />
              </ClientOnly>
            </div>
          </div>
          <CleanwalkChat :cleanwalk-id="String(cleanwalk.id)" />
        </div>
      </div>
    </div>
  </div>
</template>
