<!-- AutocompleteAddress.vue -->
<template>
    <div class="autocomplete-container">
      <input v-model="localQuery" @input="debouncedFetchSuggestions" type="text" placeholder="Saisissez l’adresse">
      <ul v-if="suggestions.length" class="suggestions-list">
        <li v-for="suggestion in suggestions" :key="suggestion.place_id" @click="selectSuggestion(suggestion)">
          {{ formatSuggestion(suggestion) }}
        </li>
      </ul>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch, defineEmits, defineProps } from 'vue';
  import ky from 'ky';
  
  // Interface pour les suggestions d'adresse
  interface Suggestion {
    place_id: string;
    display_name: string;
    lat: string;
    lon: string;
    address: {
      house_number?: string;
      road?: string;
      city?: string;
      town?: string;
      village?: string;
      postcode?: string;
      public_building?: string;
      [key: string]: string | undefined;
    };
  }
  
  // Définir les props
  const props = defineProps<{ query: string }>();
  const emit = defineEmits(['update:query', 'select-suggestion']);
  
  // État local du composant
  const localQuery = ref(props.query);
  const suggestions = ref<Suggestion[]>([]);
  const countryCodes = 'fr,be';
  
  // Fonction de fetch des suggestions
  const fetchSuggestions = async () => {
    if (localQuery.value.length < 3) {
      suggestions.value = [];
      return;
    }
    try {
      const response = await ky.get('https://nominatim.openstreetmap.org/search', {
        searchParams: {
          q: localQuery.value,
          format: 'json',
          addressdetails: 1,
          limit: 5,
          countrycodes: countryCodes
        }
      }).json<Suggestion[]>();
      suggestions.value = response;
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };
  
  // Fonction de debounce
  function debounce(func: Function, wait: number) {
    let timeout: ReturnType<typeof setTimeout>;
    return function (...args: any[]) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  // Débouncer la fonction de fetch des suggestions
  const debouncedFetchSuggestions = debounce(fetchSuggestions, 300);
  
  // Fonction de formatage des suggestions
  const formatSuggestion = (suggestion: Suggestion) => {
    const address = suggestion.address;
    const parts = [];
    if (address.house_number) parts.push(address.house_number);
    if (address.road) parts.push(address.road);
    if (address.public_building) parts.push(address.public_building);
    if (address.city || address.town || address.village) parts.push(address.city || address.town || address.village);
    if (address.postcode) parts.push(address.postcode);
    return parts.join(', ');
  };
  
  // Sélectionner une suggestion
  const selectSuggestion = (suggestion: Suggestion) => {
    const formattedAddress = formatSuggestion(suggestion);
    localQuery.value = formattedAddress;
    suggestions.value = [];
    emit('update:query', formattedAddress);
    emit('select-suggestion', {
      address: formattedAddress,
      lat: suggestion.lat,
      lon: suggestion.lon,
      city: suggestion.address.city || suggestion.address.town || suggestion.address.village || '',
    });
  };
  
  // Mettre à jour la requête locale lorsqu'elle change de l'extérieur
  watch(() => props.query, (newQuery) => {
    localQuery.value = newQuery;
  });
  
  // Émettre l'événement de mise à jour lorsque la requête locale change
  watch(localQuery, (newQuery) => {
    emit('update:query', newQuery);
  });
  </script>
  
  <style scoped>
  .autocomplete-container {
    position: relative;
  
    input {
      border: 1px solid #94A3B8;
      border-radius: 8px;
      padding: 12px;
      margin-top: 0.5rem;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      width: 100%;
  
      &::placeholder {
        color: #94A3B8;
      }
  
      &:focus {
        outline: none;
      }
    }
  }
  
  .suggestions-list {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid #ccc;
    z-index: 1000;
  }
  
  .suggestions-list li {
    padding: 0.5rem;
    cursor: pointer;
  }
  
  .suggestions-list li:hover {
    background: #f0f0f0;
  }
  </style>
  