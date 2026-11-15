<script setup lang="ts">
import dateService from '@/services/dateService'

const props = withDefaults(
  defineProps<{
    date: string | Date
    duration: number
    address?: string
    iconSize?: number
    iconClass?: string
  }>(),
  { address: '', iconSize: 16, iconClass: '' },
)

const writtenDate = computed(() => dateService.getCleanwalkWrittenDate(new Date(props.date), props.duration))
</script>

<template>
  <div class="flex flex-col gap-1">
    <div class="flex items-center gap-2">
      <IconClock :size="iconSize" class="shrink-0" :class="iconClass" />
      <div>{{ writtenDate }}</div>
    </div>
    <div class="flex items-center gap-2">
      <IconMapPin :size="iconSize" class="shrink-0" :class="iconClass" />
      <div>{{ address }}</div>
    </div>
  </div>
</template>
