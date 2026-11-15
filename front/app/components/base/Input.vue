<script setup lang="ts">
const model = defineModel<string | number>()

const props = withDefaults(
  defineProps<{
    name: string
    label?: string
    type?: string
    placeholder?: string
    required?: boolean
    autocomplete?: string
    min?: string
  }>(),
  { label: '', type: 'text', placeholder: '', autocomplete: undefined, min: undefined },
)

const showPassword = ref(false)
const computedType = computed(() => (props.type === 'password' && showPassword.value ? 'text' : props.type))
</script>

<template>
  <div class="relative mt-2 flex w-full flex-col">
    <label
      v-if="label"
      :for="name"
      class="absolute -top-2.5 left-2.5 z-1 bg-base-100 px-1 text-xs font-medium text-secondary-content"
    >
      {{ label }}
    </label>
    <input
      :id="name"
      v-model="model"
      :type="computedType"
      :name="name"
      :placeholder="placeholder"
      :required="required"
      :autocomplete="autocomplete"
      :min="min"
      class="w-full rounded-lg border border-secondary-content bg-base-100 p-3 font-medium text-strong placeholder:text-secondary-content focus:outline-none"
      :class="{ 'pr-11': type === 'password' }"
    >
    <button
      v-if="type === 'password'"
      type="button"
      class="absolute top-1/2 right-3 -translate-y-1/2 text-muted hover:text-base-content"
      :aria-label="showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'"
      @click="showPassword = !showPassword"
    >
      <IconEye v-if="showPassword" />
      <IconEyeOff v-else />
    </button>
  </div>
</template>
