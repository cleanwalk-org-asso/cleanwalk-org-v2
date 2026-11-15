<script setup lang="ts">
type Step = 'info' | 'name' | 'address' | 'date' | 'description' | 'image' | 'preview'

const DESKTOP_STEPS: Step[] = ['info', 'date', 'description', 'image', 'preview']
const MOBILE_STEPS: Step[] = ['name', 'address', 'date', 'description', 'image', 'preview']

const TITLES: Record<Step, string> = {
  info: "Nom et lieu de l'évènement",
  name: 'Nom de votre évènement',
  address: 'Lieu de votre évènement',
  date: 'Date et horaire',
  description: 'Description de votre évènement',
  image: 'Ajouter une image',
  preview: 'Aperçu de votre cleanwalk',
}

const DESKTOP_HELP: Partial<Record<Step, string>> = {
  info: 'Choisissez un titre court pour votre ramassage, qui permettra de donner une idée globale de votre événement pour intéresser les potentiels participants. Ne vous perdez pas dans les détails (heure, matériel, etc.) que vous pourrez inscrire dans la suite de ce formulaire. Si une activité est associée à votre ramassage (running, randonnée, …), vous pouvez l’indiquer dans le titre pour que cela soit mis en avant.',
  date: 'Choisissez ici la date, la durée de votre ramassage (activités annexes comprises - goûter, pique-nique, …)',
  description: 'Utilisez cet espace pour donner toute information complémentaire aux potentiels participants : matériel à apporter, parcours prévu, état des lieux, précisions sur le point de rendez-vous, etc.',
  image: 'Vous avez la possibilité d’ajouter une image ou un visuel pour illustrer votre événement. Si vous ne choisissez pas d’image, une image par défaut sera appliquée automatiquement.',
}

const MOBILE_ADVICE = 'Avant de lancer votre ramassage, pensez à consulter le guide du ramasseur pour connaître les règles d’or d’une bonne Organization.'

const PROGRESS_LABELS = ['Informations générales', 'Dates et horaires', 'Description', 'Photo et visuel', 'Aperçu']

const { isMobile } = useDevice()
const { showToast } = useUtilsStore()
const { dropzone, newCleanwalk, dateCleanwalk, handleSelectAddress, setDate, publish, reset } = useCleanwalkForm()

const stepIndex = ref(0)
const publishing = ref(false)
const steps = computed(() => (isMobile.value ? MOBILE_STEPS : DESKTOP_STEPS))
const step = computed(() => steps.value[stepIndex.value] ?? steps.value[0]!)
const isPreview = computed(() => step.value === 'preview')
const help = computed(() => (isMobile.value ? MOBILE_ADVICE : DESKTOP_HELP[step.value]))

// Les étapes ne sont pas les mêmes selon la taille de l'écran.
watch(isMobile, () => {
  stepIndex.value = 0
})

const validateName = () => {
  if (newCleanwalk.value.name) return true
  showToast('Please enter a name for your event', false)
  return false
}

const validateAddress = () => {
  if (!newCleanwalk.value.address) {
    showToast('Please enter an address for your event', false)
    return false
  }
  // L'API a besoin des coordonnées et de la ville, qui viennent de la suggestion choisie.
  if (!newCleanwalk.value.pos_lat || !newCleanwalk.value.city) {
    showToast('Veuillez choisir une adresse dans la liste', false)
    return false
  }
  return true
}

const validateDate = () => {
  const result = setDate()
  if (!result.ok) {
    if (result.reason !== 'past') showToast('Please enter a valid start and end time', false)
    return false
  }
  if (newCleanwalk.value.duration <= 0) {
    showToast('Please enter a valid start and end time', false)
    return false
  }
  return true
}

const validators: Partial<Record<Step, () => boolean>> = {
  info: () => validateName() && validateAddress(),
  name: validateName,
  address: validateAddress,
  date: validateDate,
  description: () => {
    if (newCleanwalk.value.description) return true
    showToast('Please enter a description for your event', false)
    return false
  },
}

const next = async () => {
  if (validators[step.value]?.() === false) return

  if (isPreview.value) {
    publishing.value = true
    await publish()
    publishing.value = false
    return
  }
  stepIndex.value += 1
}

const clearForm = () => {
  reset()
  stepIndex.value = 0
  showToast('Formulaire réinitialisé', true)
}
</script>

<template>
  <section class="flex min-h-dvh flex-col pt-14.5 pb-20 lg:min-h-0 lg:flex-row lg:justify-evenly lg:pt-0 lg:pb-8">
    <div class="w-full bg-border lg:hidden">
      <div class="h-3.25 bg-accent transition-[width] duration-500" :style="{ width: `${((stepIndex + 1) * 100) / steps.length}%` }" />
    </div>

    <div class="flex w-full grow flex-col justify-between p-4 lg:block lg:w-[clamp(20rem,80%,40rem)] lg:grow-0 lg:p-0">
      <div class="px-4 lg:px-0">
        <div class="mb-8 hidden pt-4 lg:block">
          <h1 class="mb-[1vh] w-full text-left text-[2rem] font-bold">Organiser un ramassage</h1>
          <h2 class="text-2xl font-bold">{{ TITLES[step] }}</h2>
        </div>
        <h1 class="w-full text-center text-xl font-bold lg:hidden">{{ TITLES[step] }}</h1>

        <div class="flex flex-col lg:mb-6 lg:rounded-lg lg:border lg:border-border lg:bg-neutral lg:p-6">
          <BaseInput
            v-if="step === 'info' || step === 'name'"
            v-model="newCleanwalk.name"
            name="name"
            label="Nom de la cleanwalk"
            placeholder="Saisissez le nom de votre évènement"
          />
          <BaseAddressAutocomplete
            v-if="step === 'info' || step === 'address'"
            v-model:query="newCleanwalk.address"
            label="Adresse"
            class="mt-4"
            @select="handleSelectAddress"
          />
          <template v-if="step === 'date'">
            <BaseInput v-model="dateCleanwalk.dateDay" class="mt-4" name="date" type="date" label="Date de l'évènement" />
            <BaseInput v-model="dateCleanwalk.hourBegin" class="mt-4" name="hourBegin" type="time" label="Heure de début" />
            <BaseInput v-model="dateCleanwalk.hourEnd" class="mt-4" name="hourEnd" type="time" label="Heure de fin" />
          </template>
          <BaseTextarea v-if="step === 'description'" v-model="newCleanwalk.description" name="description" label="Description" :rows="4" />

          <!-- Reste monté jusqu'à la publication pour conserver l'image choisie. -->
          <BaseImageDropzone v-show="step === 'image' || isPreview" ref="dropzone" class="mt-4" />

          <div v-if="isPreview" class="flex flex-col gap-4 pt-4">
            <h3 class="text-xl font-bold">{{ newCleanwalk.name }}</h3>
            <CleanwalkWhenWhere :date="newCleanwalk.date_begin" :duration="newCleanwalk.duration" :address="newCleanwalk.address" />
            <p class="text-sm wrap-break-word">{{ newCleanwalk.description }}</p>
            <label class="mt-4 flex items-center gap-2 text-[0.95rem] text-strong">
              <input v-model="newCleanwalk.participant_count_public" type="checkbox">
              Rendre public le nombre d'inscrits
            </label>
          </div>
        </div>
      </div>

      <div class="mt-6 px-0 lg:mt-0">
        <div v-if="!isPreview" class="rounded-lg bg-secondary p-2 lg:border lg:border-border lg:p-6">
          <h3 class="font-bold">{{ isMobile ? 'Notre conseil' : 'Aide' }}</h3>
          <p class="text-sm font-medium text-muted lg:text-base lg:text-base-content">{{ help }}</p>
        </div>
        <div class="flex gap-4 pt-6 lg:gap-10">
          <BaseButton v-if="stepIndex > 0" variant="outline" size="lg" class="flex-1" @click="stepIndex -= 1">
            {{ isPreview ? 'Modifier' : 'Précédent' }}
          </BaseButton>
          <div v-else class="flex-1" />
          <BaseButton size="lg" class="flex-1" :loading="publishing" @click="next">
            {{ isPreview ? 'Publier' : 'Suivant' }}
          </BaseButton>
        </div>
      </div>
    </div>

    <div class="hidden pt-[3.9rem] lg:block">
      <h3 class="w-full pb-2 text-left font-bold">Progression</h3>
      <ul class="flex flex-col items-center justify-center gap-2 rounded-lg border border-border p-2">
        <li
          v-for="(label, index) in PROGRESS_LABELS"
          :key="label"
          class="w-full rounded-sm border p-3 text-lg font-medium"
          :class="index === stepIndex ? 'border-border bg-secondary' : 'border-transparent'"
        >
          {{ label }}
        </li>
      </ul>
      <button
        type="button"
        class="mt-4 flex items-center gap-2 rounded-md border border-border bg-neutral px-4 py-2 text-sm leading-4 text-muted hover:bg-base-200"
        title="Réinitialiser le formulaire"
        @click="clearForm"
      >
        <IconTrash :size="16" />
        <div>Vider le cache</div>
      </button>
    </div>
  </section>
</template>
