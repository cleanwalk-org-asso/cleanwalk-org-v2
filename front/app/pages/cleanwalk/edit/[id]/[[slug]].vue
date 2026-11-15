<script setup lang="ts">
import type { SingleCleanwalk } from '@/interfaces/cleanwalkInterface'
import { getApiErrorMessage } from '@/services/apiError'
import { getCleanwalkRouteParams } from '@/services/cleanwalkSlug'
import dateService from '@/services/dateService'
import type { SelectedAddress } from '~/composables/useCleanwalkForm'

definePageMeta({ name: 'editCleanwalk', middleware: 'auth' })

usePageSeo({
  title: 'Modifier un Événement | Cleanwalk.org',
  description: 'Modifiez les informations de votre cleanwalk.',
})

const { $api: api } = useNuxtApp()
const route = useRoute()
const router = useRouter()
const cleanwalkStore = useCleanwalkStore()
const accountStore = useAccountStore()
const { showToast } = useUtilsStore()

const cleanwalk = ref<SingleCleanwalk>()
const dropzone = ref<{ handleUpload: () => Promise<string | undefined> } | null>(null)
const dateCleanwalk = ref({ dateDay: '', hourBegin: '', hourEnd: '' })
const showDeletePopup = ref(false)
const isDeleting = ref(false)
const isSaving = ref(false)

onMounted(async () => {
  const loaded = await cleanwalkStore.getCleanwalkById(Number(route.params.id)).catch(() => undefined)
  if (!loaded) {
    await router.push('/cleanwalks')
    return
  }

  const user = accountStore.CurrentUser
  if (loaded.host?.id !== user?.id && user?.role !== 'ADMIN') {
    showToast('Seul l’organisateur peut modifier cette cleanwalk', false)
    await router.replace({ name: 'cleanwalk', params: getCleanwalkRouteParams(loaded) })
    return
  }

  const params = getCleanwalkRouteParams(loaded)
  if (route.params.slug !== params.slug) {
    await router.replace({ name: 'editCleanwalk', params })
  }

  dateCleanwalk.value = dateService.getDayAndHourBegginEndByDate(loaded.date_begin, loaded.duration)
  cleanwalk.value = loaded
})

const handleSelectAddress = (address: SelectedAddress) => {
  if (!cleanwalk.value) return
  cleanwalk.value.address = address.address
  cleanwalk.value.pos_lat = parseFloat(address.lat)
  cleanwalk.value.pos_long = parseFloat(address.lon)
  cleanwalk.value.city = address.city
}

const save = async () => {
  const current = cleanwalk.value
  if (!current) return

  const { dateDay, hourBegin, hourEnd } = dateCleanwalk.value
  const date = dateService.getDateBegginAndDuration(dateDay, hourBegin, hourEnd)
  if (!date || date.duration <= 0) {
    showToast('Veuillez renseigner une date et des horaires valides', false)
    return
  }
  if (new Date(date.date_begin).getTime() < Date.now()) {
    showToast('La date de début ne peut pas être dans le passé', false)
    return
  }

  isSaving.value = true
  try {
    const imageUrl = await dropzone.value?.handleUpload()
    // L'API transmet ce corps tel quel à la base : les champs gardent leur nom en camelCase.
    await api.put(`cleanwalks/${current.id}`, {
      json: {
        name: current.name,
        posLat: current.pos_lat,
        posLong: current.pos_long,
        dateBegin: date.date_begin,
        duration: date.duration,
        description: current.description,
        imgUrl: imageUrl ?? current.img_url,
        address: current.address,
        participantCountPublic: current.participant_count_public,
      },
    })
    showToast('La cleanwalk a été modifiée avec succès', true)
    await router.push({ name: 'cleanwalk', params: getCleanwalkRouteParams(current) })
  } catch (error) {
    showToast(await getApiErrorMessage(error, 'Erreur lors de la modification de la cleanwalk'), false)
  } finally {
    isSaving.value = false
  }
}

const deleteCleanwalk = async () => {
  if (!cleanwalk.value) return

  isDeleting.value = true
  try {
    await api.delete(`cleanwalks/${cleanwalk.value.id}`)
    showToast('La cleanwalk a été supprimée avec succès', true)
    await router.push({ name: 'myCleanwalks' })
  } catch (error) {
    showToast(await getApiErrorMessage(error, 'Erreur lors de la suppression de la cleanwalk'), false)
  } finally {
    isDeleting.value = false
    showDeletePopup.value = false
  }
}
</script>

<template>
  <div class="pb-24">
    <TopBar back-url="/" page-name="Modifier une cleanwalk" />
    <BaseModal v-model:open="showDeletePopup" title="Supprimer la cleanwalk" title-class="text-error">
      <p class="mb-6 px-4 text-xs">Voulez-vous vraiment supprimer cette cleanwalk ?</p>
      <template #actions>
        <BaseButton variant="neutral" class="flex-1" @click="showDeletePopup = false">Annuler</BaseButton>
        <BaseButton variant="danger" class="flex-1" :loading="isDeleting" @click="deleteCleanwalk">Confirmer</BaseButton>
      </template>
    </BaseModal>

    <div class="flex flex-col items-center lg:pt-10">
      <div v-if="cleanwalk" class="flex w-full max-w-3xl flex-col gap-2 px-4 pt-18">
        <BaseImageDropzone ref="dropzone" :current-img="cleanwalk.img_url" />
        <BaseInput v-model="cleanwalk.name" class="mt-4" name="name" label="Nom de la cleanwalk" placeholder="Saisissez le nom de votre évènement" />
        <BaseAddressAutocomplete v-model:query="cleanwalk.address" class="mt-4" label="Adresse" @select="handleSelectAddress" />
        <BaseTextarea v-model="cleanwalk.description" class="mt-4" name="description" label="Description" :rows="4" />
        <label class="mt-4 flex items-center gap-2 text-strong">
          <input v-model="cleanwalk.participant_count_public" type="checkbox">
          Rendre public le nombre d'inscrits
        </label>
        <BaseInput v-model="dateCleanwalk.dateDay" class="mt-4" name="date" type="date" label="Date de l'évènement" />
        <BaseInput v-model="dateCleanwalk.hourBegin" class="mt-4" name="hourBegin" type="time" label="Heure de début" />
        <BaseInput v-model="dateCleanwalk.hourEnd" class="mt-4" name="hourEnd" type="time" label="Heure de fin" />
        <div class="mt-8 flex justify-center gap-4">
          <BaseButton size="sm" class="w-32" :loading="isSaving" @click="save">Valider</BaseButton>
          <BaseButton variant="outline" size="sm" class="border-2 border-error text-error" @click="showDeletePopup = true">
            Supprimer la cleanwalk
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>
