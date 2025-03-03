<script setup lang="ts">
import PublicProfileAsso from '@/components/PublicProfileAsso.vue';
import TopBar from '@/components/TopBar.vue';
import JsonLdOrganization from '@/components/SEO/JsonLdOrganization.vue';
import { onMounted, watch, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useAccountStore } from '@/stores/AccountStore';
import type { Association } from '@/interfaces/userInterface';

const route = useRoute();
const accountStore = useAccountStore();
const association = ref<Association | undefined>(undefined);

// Update meta tags with organization information
const updateMetaTags = (asso: Association) => {
  if (!asso) return;
  
  // Create descriptive title and description
  const title = `${asso.name} | Environmental Organization | Cleanwalk.org`;
  const description = asso.description ? 
    `${asso.description.substring(0, 150)}${asso.description.length > 150 ? '...' : ''}` : 
    `Learn about ${asso.name} and their environmental cleanup initiatives on Cleanwalk.org`;
  
  // Update document title
  document.title = title;
  
  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', description);
  }
  
  // Update Open Graph meta tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute('content', title);
  }
  
  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) {
    ogDescription.setAttribute('content', description);
  }
  
  // Update image if available
  if (asso.profile_picture) {
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) {
      ogImage.setAttribute('content', asso.profile_picture);
    }
  }

  // Update canonical URL
  let canonicalUrl = document.querySelector('link[rel="canonical"]');
  if (!canonicalUrl) {
    canonicalUrl = document.createElement('link');
    canonicalUrl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalUrl);
  }
  canonicalUrl.setAttribute('href', `${window.location.origin}/associations/${asso.id}`);
}

onMounted(async () => {
  const id = +route.params.id;
  if (isNaN(id)) return;
  
  try {
    association.value = await accountStore.getOrganisationById(id);
    if (association.value) {
      updateMetaTags(association.value);
    }
  } catch (error) {
    console.error("Failed to load association data for SEO:", error);
  }
});

// Watch for route changes to update meta tags
watch(() => route.params.id, async (newId) => {
  const id = +newId;
  if (isNaN(id)) return;
  
  try {
    association.value = await accountStore.getOrganisationById(id);
    if (association.value) {
      updateMetaTags(association.value);
    }
  } catch (error) {
    console.error("Failed to load association data for SEO:", error);
  }
});
</script>

<template>
    <TopBar back-url="/associations" pageName="Association"/>
    <PublicProfileAsso />
    <!-- Add structured data JSON-LD for organizations -->
    <JsonLdOrganization v-if="association" :organization="association" />
</template>