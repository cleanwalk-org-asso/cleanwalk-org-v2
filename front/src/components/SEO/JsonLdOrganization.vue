<script setup lang="ts">
import type { Association } from '@/interfaces/userInterface';
import { computed } from 'vue';

const props = defineProps<{
  organization: Association;
}>();

// Create structured data for the organization
const structuredData = computed(() => {
  if (!props.organization) return {};
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': props.organization.name,
    'description': props.organization.description,
    'url': `${window.location.origin}/associations/${props.organization.id}`,
    'logo': props.organization.profile_picture,
    'image': props.organization.banner_img || props.organization.profile_picture,
    '@id': `${window.location.origin}/associations/${props.organization.id}#organization`
  };
});
</script>

<template>
  <script type="application/ld+json">
    {{ JSON.stringify(structuredData) }}
  </script>
</template>