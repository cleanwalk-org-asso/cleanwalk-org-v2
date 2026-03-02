<template>
  <div class="accordion">
    <div class="accordion-header" @click="isOpen = !isOpen">
      <div class="accordion-title-section">
        <span class="accordion-icon" :class="{ open: isOpen }">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 8L10 11L13 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </span>
        <h3 class="accordion-title">{{ title }}</h3>
      </div>
    </div>
    <div class="accordion-content" v-show="isOpen">
      <p class="accordion-description">{{ description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  title: string
  description: string
  isOpenInitially?: boolean
}

withDefaults(defineProps<Props>(), {
  isOpenInitially: false
})

const isOpen = ref(false)
</script>

<style scoped>
.accordion {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 12px;
  background-color: #ffffff;
  overflow: hidden;
}

.accordion-header {
  padding: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f8f9fa;
  transition: background-color 0.3s ease;
  user-select: none;
}

.accordion-header:hover {
  background-color: #f0f1f3;
}

.accordion-title-section {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
}

.accordion-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

.accordion-icon.open {
  transform: rotate(180deg);
}

.accordion-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.accordion-content {
  padding: 16px;
  background-color: #ffffff;
  border-top: 1px solid #e0e0e0;
}

.accordion-description {
  margin: 0;
  font-size: 14px;
  color: #666;
  line-height: 1.6;
}
</style>
