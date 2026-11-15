<script setup lang="ts">

const model = defineModel<string>()

withDefaults(
  defineProps<{
    name: string
    type?: string
    placeholder?: string
  }>(),
  { type: 'text', placeholder: '' },
)
</script>

<template>
  <div class="relative flex w-full items-center">
    <input
      :id="name"
      v-model="model"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      class="mt-2 w-full rounded-lg border border-border bg-base-100 p-3 pr-10 text-sm font-medium text-strong placeholder:text-secondary-content focus:outline-none"
    >
    <IconSearch class="pointer-events-none absolute right-3 bottom-3 text-muted" />
  </div>
</template>
