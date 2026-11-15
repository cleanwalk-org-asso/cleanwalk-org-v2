// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

const clientOnly = { ssr: false }

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Même hôte que l'API (127.0.0.1:8080) : sinon les cookies de session en sameSite strict ne sont pas envoyés.
  devServer: {
    host: '127.0.0.1',
    port: 3000,
  },
  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [
      // eslint-disable-next-line
      tailwindcss() as any,
    ],
  },

  modules: ['nuxt-lucide-icons', '@nuxt/eslint', '@nuxt/fonts', '@pinia/nuxt', '@nuxtjs/color-mode'],

  lucide: {
    namePrefix: 'Icon',
  },

  fonts: {
    families: [
      {
        name: 'Catamaran',
        provider: 'google',
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      },
      {
        name: 'Roboto',
        provider: 'google',
        weights: [400, 500, 700],
      },
    ],
  },

  // Mode sombre désactivé pour l'instant : le site reste en clair, quel que soit le réglage du système.
  // Pour le réactiver : preference 'system', storageKey 'cleanwalk-color-mode',
  // et remettre <BaseColorModeToggle /> dans Navbar.vue et account/Menu.vue.
  colorMode: {
    classSuffix: '',
    preference: 'light',
    fallback: 'light',
    // Clé différente de celle du bouton de thème, pour ignorer un ancien choix « sombre » enregistré.
    storageKey: 'cleanwalk-theme',
  },

  runtimeConfig: {
    // Adresse utilisée par le serveur Nuxt pour joindre l'API. Vide : même adresse que le navigateur.
    apiInternalUrl: '',
    // NUXT_NO_INDEX=true (staging) : robots.txt en Disallow et en-tête X-Robots-Tag noindex.
    noIndex: false,
    public: {
      // En déploiement, NUXT_PUBLIC_API_URL est lue au lancement du serveur (compose du serveur) :
      // la même image sert le staging et la prod. La valeur ci-dessous n'est que celle par défaut.
      apiUrl: process.env.NUXT_PUBLIC_API_URL || 'http://127.0.0.1:8080',
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'fr' },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'robots', content: 'index, follow' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://cleanwalk.org' },
      ],
      link: [
        { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
        // Serveur des tuiles de la carte : la connexion est prête avant que MapLibre en ait besoin.
        { rel: 'preconnect', href: 'https://tiles.openfreemap.org', crossorigin: '' },
      ],
    },
  },

  routeRules: {
    // Pages liées au compte, à la carte ou à un formulaire : rendues dans le navigateur.
    '/cleanwalks': clientOnly,
    '/ajouter/**': clientOnly,
    '/menu/**': clientOnly,
    '/menu': clientOnly,
    '/cleanwalk/edit/**': clientOnly,
    '/login': clientOnly,
    '/signup/**': clientOnly,
    '/signup': clientOnly,
    '/logout': clientOnly,
    '/forgot-password': clientOnly,
    '/reset-password/**': clientOnly,
    // Liens de la première version de la barre de navigation ; les URL du site restent celles de l'ancien front.
    '/carte': { redirect: '/cleanwalks' },
    '/ajouter': { redirect: '/ajouter/cleanwalk' },
    '/decouvrir': { redirect: '/associations' },
    // Remplace le proxy qui était assuré par nginx.
    '/nominatim/**': {
      proxy: 'https://nominatim.openstreetmap.org/**',
    },
  },
})
