<script setup lang="ts">
definePageMeta({ name: 'association' })

const route = useRoute()
const origin = useSiteOrigin()
const accountStore = useAccountStore()

const id = Number(route.params.id)
if (!Number.isInteger(id)) {
  throw createError({ statusCode: 404, statusMessage: 'Association introuvable', fatal: true })
}

const { data, error } = await useAsyncData(`association-${id}`, async () => (await accountStore.getOrganizationById(id)) ?? null)
if (error.value) {
  throw createError({ statusCode: 503, statusMessage: 'Service indisponible', fatal: true })
}
if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Association introuvable', fatal: true })
}

const association = computed(() => data.value!)
const url = `${origin}/associations/${id}`

usePageSeo({
  title: () => `${association.value.name} | Cleanwalk.org`,
  description: () => {
    const { name, description } = association.value
    if (!description) {
      return `Découvrez ${name} et leurs initiatives de nettoyage environnemental sur Cleanwalk.org`
    }
    return description.length > 150 ? `${description.substring(0, 150)}...` : description
  },
  ogImage: () => association.value.profilePicture,
})

useHead({ link: [{ rel: 'canonical', href: url }] })

useJsonLd(() => {
  const { name, description, profilePicture, bannerImg } = association.value
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    description,
    url,
    logo: profilePicture,
    image: bannerImg || profilePicture,
    '@id': `${url}#organization`,
  }
})
</script>

<template>
  <div>
    <TopBar back-url="/associations" page-name="Association" />
    <div class="flex flex-col items-center pt-14.5 lg:pt-0">
      <img :src="association.bannerImg || '/default-banner.svg'" alt="" class="h-37.5 w-full object-cover">
      <BaseAvatar :src="association.profilePicture" alt="" class="relative -mt-15 size-24 bg-warning" />
    </div>
    <div class="px-8 pb-8">
      <h1>{{ association.name }}</h1>
      <p>{{ association.description }}</p>
    </div>
  </div>
</template>
