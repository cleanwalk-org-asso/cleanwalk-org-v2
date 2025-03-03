<script setup lang="ts">
import type { SingleCleanwalk } from '@/interfaces/cleanwalkInterface';
import { computed } from 'vue';

const props = defineProps<{
  cleanwalk: SingleCleanwalk;
}>();

// Calculate end date based on start date and duration
const endDate = computed(() => {
  if (!props.cleanwalk || !props.cleanwalk.date_begin || !props.cleanwalk.duration) {
    return '';
  }
  
  const startDate = new Date(props.cleanwalk.date_begin);
  const endDate = new Date(startDate.getTime() + props.cleanwalk.duration * 60000);
  return endDate.toISOString();
});

// Format start date as ISO string
const startDate = computed(() => {
  if (!props.cleanwalk || !props.cleanwalk.date_begin) {
    return '';
  }
  return new Date(props.cleanwalk.date_begin).toISOString();
});

// Create structured data for the event
const structuredData = computed(() => {
  if (!props.cleanwalk) return {};
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    'name': props.cleanwalk.name,
    'description': props.cleanwalk.description,
    'startDate': startDate.value,
    'endDate': endDate.value,
    'location': {
      '@type': 'Place',
      'name': props.cleanwalk.address,
      'address': props.cleanwalk.address,
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': props.cleanwalk.pos_lat,
        'longitude': props.cleanwalk.pos_long
      }
    },
    'image': props.cleanwalk.img_url,
    'organizer': {
      '@type': 'Organization',
      'name': props.cleanwalk.host.name,
      'image': props.cleanwalk.host.profile_picture
    }
  };
});
</script>

<template>
  <script type="application/ld+json">
    {{ JSON.stringify(structuredData) }}
  </script>
</template>