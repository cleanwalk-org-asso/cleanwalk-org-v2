<script setup lang="ts">

const props = defineProps<{
  title: string
  description?: string
  isOpenInitially?: boolean
}>()

const isOpen = ref(props.isOpenInitially)
</script>

<template>
  <div class="mb-3 overflow-hidden rounded-lg border border-border bg-base-100">
    <button
      type="button"
      class="flex w-full items-center gap-3 bg-neutral p-4 text-left transition-colors select-none hover:bg-neutral-content"
      :aria-expanded="isOpen"
      @click="isOpen = !isOpen"
    >
      <IconChevronDown :size="20" class="shrink-0 text-muted transition-transform duration-300" :class="{ 'rotate-180': isOpen }" />
      <h3 class="text-base font-semibold text-strong">{{ title }}</h3>
    </button>
    <div v-show="isOpen" class="border-t border-border bg-base-100 p-4">
      <slot>
        <p class="text-sm leading-relaxed text-muted">{{ description }}</p>
      </slot>
    </div>
  </div>
</template>
