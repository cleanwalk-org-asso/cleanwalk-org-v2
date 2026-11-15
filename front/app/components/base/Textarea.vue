<script setup lang="ts">
const model = defineModel<string>()

withDefaults(
  defineProps<{
    name: string
    label?: string
    placeholder?: string
    rows?: number
    resizable?: boolean
  }>(),
  { label: '', placeholder: '', rows: 4 },
)
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
    <textarea
      :id="name"
      v-model="model"
      :name="name"
      :placeholder="placeholder"
      :rows="rows"
      class="rounded-lg border border-secondary-content bg-base-100 p-3 text-sm font-medium text-strong placeholder:text-secondary-content focus:outline-none"
      :class="resizable ? 'resize-y' : 'resize-none'"
    />
  </div>
</template>
