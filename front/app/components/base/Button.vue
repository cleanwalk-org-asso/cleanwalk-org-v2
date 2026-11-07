<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'danger' | 'neutral' | 'outline'
    size?: 'sm' | 'md' | 'lg'
    block?: boolean
    to?: RouteLocationRaw
    type?: 'button' | 'submit'
    disabled?: boolean
    loading?: boolean
  }>(),
  { variant: 'primary', size: 'md', type: 'button', to: undefined },
)

const variants = {
  primary: 'bg-primary text-primary-content hover:opacity-90',
  secondary: 'bg-accent text-strong hover:bg-accent-hover',
  danger: 'bg-error text-error-content hover:opacity-90',
  neutral: 'bg-neutral-content text-base-content hover:opacity-90',
  outline: 'border border-border bg-transparent text-base-content hover:bg-neutral',
}

const sizes = {
  sm: 'px-4 py-2.5 text-sm',
  md: 'px-4 py-3.5 text-base',
  lg: 'px-4 py-4 text-lg font-bold',
}

const classes = computed(() => [
  'inline-flex items-center justify-center gap-2 rounded-lg text-center transition disabled:opacity-60',
  variants[props.variant],
  sizes[props.size],
  props.block && 'w-full',
])
</script>

<template>
  <NuxtLink v-if="to" :to="to" :class="classes"><slot /></NuxtLink>
  <button v-else :type="type" :disabled="disabled || loading" :aria-busy="loading" :class="classes">
    <slot />
  </button>
</template>
