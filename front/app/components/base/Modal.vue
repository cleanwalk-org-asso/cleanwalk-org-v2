<script setup lang="ts">

const open = defineModel<boolean>('open', { default: false })

withDefaults(
  defineProps<{
    title?: string
    titleClass?: string
    panelClass?: string
    hideClose?: boolean
  }>(),
  { title: '', titleClass: '', panelClass: 'max-w-md' },
)

const emit = defineEmits<{ close: [] }>()

const panel = useTemplateRef<HTMLElement>('panel')
let previousFocus: HTMLElement | null = null

const close = () => {
  open.value = false
  emit('close')
}

const focusable = () =>
  Array.from(
    panel.value?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ) ?? [],
  )

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    close()
    return
  }
  if (event.key !== 'Tab') return

  const items = focusable()
  const first = items[0]
  const last = items[items.length - 1]
  if (!first || !last) return

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

watch(open, async (isOpen) => {
  if (isOpen) {
    previousFocus = document.activeElement as HTMLElement | null
    await nextTick()
    panel.value?.focus()
  } else {
    previousFocus?.focus()
    previousFocus = null
  }
})
</script>

<template>
  <ClientOnly>
    <Teleport to="body">
      <div
        v-if="open"
        class="fixed inset-0 z-[1000] flex items-center justify-center bg-overlay p-6"
        @click.self="close"
        @keydown="onKeydown"
      >
        <div
          ref="panel"
          role="dialog"
          aria-modal="true"
          :aria-label="title || undefined"
          tabindex="-1"
          class="relative max-h-full w-full overflow-y-auto rounded-lg bg-base-100 p-4 text-base-content shadow-lg focus:outline-none"
          :class="panelClass"
        >
          <div v-if="!hideClose" class="mb-4 flex justify-end">
            <button type="button" aria-label="Fermer" class="text-strong" @click="close">
              <IconX />
            </button>
          </div>
          <h2 v-if="title" class="mb-4 pb-4 text-center text-lg font-bold" :class="titleClass">{{ title }}</h2>
          <slot />
          <div v-if="$slots.actions" class="mt-6 flex justify-between gap-4">
            <slot name="actions" />
          </div>
        </div>
      </div>
    </Teleport>
  </ClientOnly>
</template>
