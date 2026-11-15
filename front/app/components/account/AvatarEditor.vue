<script setup lang="ts">
import {
  AVATAR_COLORS,
  AVATAR_EYES,
  AVATAR_MOUTHS,
  avatarFromUrl,
  avatarToUrl,
  randomAvatar,
  renderAvatar,
} from '@/services/funEmojiAvatar'
import type { AvatarEyes, AvatarMouth, FunEmojiAvatar } from '@/services/funEmojiAvatar'
import { getApiErrorMessage } from '@/services/apiError'

const open = defineModel<boolean>('open', { default: false })

const accountStore = useAccountStore()
const { CurrentUser: user } = storeToRefs(accountStore)
const { showToast } = useUtilsStore()

const tabs = [
  { id: 'color', label: 'Couleur' },
  { id: 'eyes', label: 'Yeux' },
  { id: 'mouth', label: 'Bouche' },
] as const

const tab = ref<(typeof tabs)[number]['id']>('color')
const draft = ref<FunEmojiAvatar>(avatarFromUrl(user.value?.profilePicture))
const saving = ref(false)

// Repart de l'avatar enregistré à chaque ouverture : « Annuler » ne garde rien.
watch(open, (isOpen) => {
  if (!isOpen) return
  draft.value = avatarFromUrl(user.value?.profilePicture)
  tab.value = 'color'
})

const preview = computed(() => renderAvatar(draft.value))

const eyesChoices = computed(() =>
  (Object.entries(AVATAR_EYES) as [AvatarEyes, string][]).map(([value, label]) => ({
    value,
    label,
    src: renderAvatar({ ...draft.value, eyes: value }),
  })),
)

const mouthChoices = computed(() =>
  (Object.entries(AVATAR_MOUTHS) as [AvatarMouth, string][]).map(([value, label]) => ({
    value,
    label,
    src: renderAvatar({ ...draft.value, mouth: value }),
  })),
)

const isCustomColor = computed(() => !AVATAR_COLORS.includes(draft.value.color))

const pickCustomColor = (event: Event) => {
  draft.value.color = (event.target as HTMLInputElement).value.replace('#', '').toLowerCase()
}

const shuffle = () => {
  draft.value = randomAvatar()
}

const save = async () => {
  if (!user.value?.id) return
  const url = avatarToUrl(draft.value)
  saving.value = true
  try {
    await accountStore.modifyUser(user.value.id, undefined, url)
    user.value.profilePicture = url
    showToast('Votre photo de profil a été modifiée', true)
    open.value = false
  } catch (error) {
    showToast(await getApiErrorMessage(error, 'Erreur lors de la modification de la photo'), false)
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <BaseModal v-model:open="open" title="Personnaliser mon avatar" panel-class="max-w-md">
    <div class="flex flex-col items-center gap-3">
      <img :src="preview" alt="Aperçu de l'avatar" class="size-28 rounded-full">
      <button type="button" class="flex items-center gap-1.5 text-sm font-medium text-muted hover:text-base-content" @click="shuffle">
        <IconShuffle :size="16" />
        Au hasard
      </button>
    </div>

    <div role="tablist" aria-label="Partie de l'avatar" class="mt-5 grid grid-cols-3 gap-1 rounded-lg bg-base-200 p-1">
      <button
        v-for="item in tabs"
        :key="item.id"
        type="button"
        role="tab"
        :aria-selected="tab === item.id"
        class="rounded-md py-2 text-sm font-medium transition"
        :class="tab === item.id ? 'bg-base-100 text-strong shadow-sm' : 'text-muted hover:text-base-content'"
        @click="tab = item.id"
      >
        {{ item.label }}
      </button>
    </div>

    <div class="mt-4 min-h-56">
      <div v-if="tab === 'color'" role="tabpanel" class="grid grid-cols-6 justify-items-center gap-3">
        <button
          v-for="color in AVATAR_COLORS"
          :key="color"
          type="button"
          :aria-label="`Couleur #${color}`"
          :aria-pressed="draft.color === color"
          class="size-11 rounded-full ring-offset-2 ring-offset-base-100 transition"
          :class="draft.color === color ? 'ring-2 ring-primary' : 'hover:scale-105'"
          :style="{ backgroundColor: `#${color}` }"
          @click="draft.color = color"
        />
        <label
          class="relative flex size-11 cursor-pointer items-center justify-center rounded-full border border-border text-muted ring-offset-2 ring-offset-base-100 transition hover:scale-105"
          :class="isCustomColor && 'ring-2 ring-primary'"
          :style="isCustomColor ? { backgroundColor: `#${draft.color}` } : undefined"
          title="Autre couleur"
        >
          <IconPipette v-if="!isCustomColor" :size="18" />
          <input type="color" :value="`#${draft.color}`" aria-label="Autre couleur" class="absolute inset-0 cursor-pointer opacity-0" @input="pickCustomColor">
        </label>
      </div>

      <div v-else role="tabpanel" class="grid grid-cols-5 gap-2">
        <button
          v-for="choice in tab === 'eyes' ? eyesChoices : mouthChoices"
          :key="choice.value"
          type="button"
          :title="choice.label"
          :aria-label="choice.label"
          :aria-pressed="draft[tab] === choice.value"
          class="rounded-full p-0.5 ring-offset-2 ring-offset-base-100 transition"
          :class="draft[tab] === choice.value ? 'ring-2 ring-primary' : 'hover:scale-105'"
          @click="tab === 'eyes' ? (draft.eyes = choice.value as AvatarEyes) : (draft.mouth = choice.value as AvatarMouth)"
        >
          <img :src="choice.src" alt="" class="aspect-square w-full rounded-full">
        </button>
      </div>
    </div>

    <template #actions>
      <BaseButton variant="outline" block @click="open = false">Annuler</BaseButton>
      <BaseButton block :loading="saving" @click="save">Enregistrer</BaseButton>
    </template>
  </BaseModal>
</template>
