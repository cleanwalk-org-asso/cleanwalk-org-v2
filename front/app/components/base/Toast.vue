<script setup lang="ts">
const { toast } = storeToRefs(useUtilsStore())
</script>

<template>
  <div
    role="status"
    aria-live="polite"
    class="pointer-events-none fixed top-0 right-0 z-[9999] rounded-bl-lg px-5 py-1 font-bold transition duration-300 ease-in-out"
    :class="[
      toast.isSuccess ? 'bg-success text-success-content' : 'bg-error text-error-content',
      toast.isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0',
    ]"
  >
    <p>{{ toast.message }}</p>
  </div>
</template>
