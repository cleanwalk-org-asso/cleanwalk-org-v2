<script setup lang="ts">
import { formatSuggestion, getSuggestionCity, type AddressSuggestion } from '~/composables/useAddressSearch'
import type { SelectedAddress } from '~/composables/useCleanwalkForm'

const query = defineModel<string>('query', { default: '' })

withDefaults(
  defineProps<{
    label?: string
    placeholder?: string
  }>(),
  { label: '', placeholder: "Saisissez l'adresse" },
)

const emit = defineEmits<{ select: [address: SelectedAddress] }>()

const id = useId()
const wrapper = useTemplateRef<HTMLElement>('wrapper')
const isOpen = ref(false)
const selectedId = ref<number>()
const { suggestions, loading, searchedText, search } = useAddressSearch()

const onInput = () => {
  isOpen.value = true
  search(query.value)
}

const selectSuggestion = (suggestion: AddressSuggestion) => {
  const address = formatSuggestion(suggestion)
  selectedId.value = suggestion.place_id
  query.value = address
  isOpen.value = false
  emit('select', { address, lat: suggestion.lat, lon: suggestion.lon, city: getSuggestionCity(suggestion) })
}

const onClickOutside = (event: MouseEvent) => {
  if (!wrapper.value?.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', onClickOutside, true))
onUnmounted(() => document.removeEventListener('click', onClickOutside, true))
</script>

<template>
  <div ref="wrapper" class="relative mt-2 flex w-full flex-col">
    <label v-if="label" :for="id" class="absolute -top-2.5 left-2.5 z-1 bg-base-100 px-1 text-xs font-medium text-secondary-content">
      {{ label }}
    </label>
    <div class="flex overflow-hidden rounded-lg border border-secondary-content bg-base-100">
      <input
        :id="id"
        v-model="query"
        type="text"
        autocomplete="off"
        :placeholder="placeholder"
        class="min-w-0 flex-1 bg-transparent p-3 text-sm font-medium text-strong outline-none placeholder:text-secondary-content"
        @input="onInput"
        @focus="isOpen = true"
        @keydown.enter.prevent="search(query)"
        @keyup.esc="isOpen = false"
      >
      <span class="my-1.5 w-px bg-border" />
      <button type="button" class="flex items-center justify-center px-3 text-muted" aria-label="Rechercher l'adresse" @click="search(query); isOpen = true">
        <IconSearch :size="20" />
      </button>
    </div>

    <ul v-if="isOpen" class="absolute top-full right-0 left-0 z-1000 mt-1 max-h-62.5 overflow-y-auto rounded-lg bg-base-100 shadow-md">
      <li v-if="loading" class="px-3 py-2.5 text-secondary-content italic">Chargement...</li>
      <template v-else>
        <li v-for="suggestion in suggestions" :key="suggestion.place_id">
          <button
            type="button"
            class="w-full px-3 py-2.5 text-left transition-colors hover:bg-base-200"
            :class="{ 'bg-base-200': selectedId === suggestion.place_id }"
            @click="selectSuggestion(suggestion)"
          >
            {{ formatSuggestion(suggestion) }}
          </button>
        </li>
        <li v-if="suggestions.length === 0 && searchedText" class="px-3 py-2.5 text-secondary-content italic">
          Aucune adresse trouvée
        </li>
      </template>
    </ul>
  </div>
</template>
