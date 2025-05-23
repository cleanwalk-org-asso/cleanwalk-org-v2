import { createRouter, createWebHistory } from 'vue-router'
import { useAccountStore } from '@/stores/AccountStore'
import { useDevice } from '@/composables/useDevice'

import NavBarLayout from '@/layouts/NavBarLayout.vue'

const { isMobile } = useDevice()

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Routes avec layout principal
    {
      path: '/',
      component: NavBarLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/HomeView.vue'),
          meta: {
            title: 'Cleanwalk.org - Événements de Nettoyage Citoyen',
            description: 'Rejoignez Cleanwalk.org pour organiser et participer à des événements de nettoyage citoyen.',
            ogImage: '/default-banner.svg'
          }
        },
        {
          path: 'carte',
          name: 'map',
          component: () => import('@/views/MapView.vue'),
          meta: {
            title: 'Carte des Cleanwalk | Cleanwalk.org',
            description: 'Trouvez et rejoignez des événements de nettoyage près de chez vous.',
            ogImage: '/default-banner.svg'
          }
        },
        {
          path: 'cleanwalk/:id',
          name: 'cleanwalk',
          component: () => import('@/views/SingleCleanwalkView.vue'),
          meta: {
            title: 'Détails de l\'Événement | Cleanwalk.org',
            description: 'Détails d’un événement de nettoyage citoyen.',
            ogImage: '/default-banner.svg'
          }
        },
        {
          path: 'associations',
          name: 'associations',
          component: () => import('@/views/AssoListView.vue'),
          meta: {
            title: 'Associations Environnementales | Cleanwalk.org',
            description: 'Découvrez des organisations actives pour l’environnement.',
            ogImage: '/default-banner.svg'
          }
        },
        {
          path: 'associations/:id',
          name: 'association',
          component: () => import('@/views/PublicProfileAssoView.vue'),
          meta: {
            title: 'Profil Association | Cleanwalk.org',
            description: 'Profil public d’une organisation environnementale.',
            ogImage: '/default-banner.svg'
          }
        },
        {
          path: 'ajouter/cleanwalk',
          name: 'addCleanwalk',
          component: () => import('@/views/AddCleanwalkView.vue'),
          meta: {
            requiresAuth: true,
            title: 'Créer un Événement | Cleanwalk.org',
            description: 'Organisez une cleanwalk dans votre région.',
            ogImage: '/default-banner.svg'
          }
        },
        {
          path: 'menu',
          name: 'menu',
          component: () => import('@/views/MenuView.vue'),
          meta: {
            title: 'Menu | Cleanwalk.org',
            description: 'Accédez aux options de navigation.',
            ogImage: '/default-banner.svg'
          }
        },
        {
          path: 'menu/profile',
          name: 'menuProfile',
          component: () => import('@/views/ProfileView.vue'),
          meta: {
            requiresAuth: true,
            title: 'Votre Profil | Cleanwalk.org',
            description: 'Gérez votre compte et préférences.',
            ogImage: '/default-banner.svg'
          }
        },
        // {
        //   path: 'privacy-policy',
        //   name: 'privacyPolicy',
        //   component: () => import('@/views/PrivacyPolicyView.vue')
        // },
        // {
        //   path: 'terms-of-use',
        //   name: 'termsOfUse',
        //   component: () => import('@/views/TermsOfUseView.vue')
        // },
      ]
    },

    // Auth & divers
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/SignupChoiceView.vue'),
    },
    {
      path: '/signup/asso',
      name: 'signupAsso',
      component: () => import('@/views/SignupAssoView.vue'),
    },
    {
      path: '/signup/perso',
      name: 'signupPerso',
      component: () => import('@/views/SignupView.vue'),
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import('@/views/SignupView.vue'),
    },
    {
      path: '/cleanwalk/edit/:id',
      name: 'editCleanwalk',
      component: () => import('@/views/EditCleanwalkView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/reset-password/:token',
      name: 'resetPassword',
      component: () => import('@/views/ResetPasswordView.vue'),
    },
    {
      path: '/forgot-password',
      name: 'forgotPassword',
      component: () => import('@/views/ForgotPasswordView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/404.vue'),
      meta: {
        title: 'Page Non Trouvée | Cleanwalk.org',
        description: 'Cette page n’existe pas.',
        ogImage: '/default-banner.svg'
      }
    },
  ]
})

// Navigation Guard
router.beforeEach(async (to, from, next) => {
  const store = useAccountStore()

  if (!store.isLoggedIn) {
    await store.tokenLogin()
  }

  if (to.name === 'home' && isMobile.value) {
    return next({ name: 'map' })
  }

  if (to.meta.requiresAuth && !store.isLoggedIn) {
    return next({ name: 'login', query: { redirect: to.fullPath } })
  }

  // SEO dynamique
  const meta = to.meta
  if (meta.title) document.title = meta.title as string

  const desc = document.querySelector('meta[name="description"]')
  if (desc && meta.description) desc.setAttribute('content', meta.description as string)

  const ogTitle = document.querySelector('meta[property="og:title"]')
  if (ogTitle && meta.title) ogTitle.setAttribute('content', meta.title as string)

  const ogDesc = document.querySelector('meta[property="og:description"]')
  if (ogDesc && meta.description) ogDesc.setAttribute('content', meta.description as string)

  const ogImage = document.querySelector('meta[property="og:image"]')
  if (ogImage && meta.ogImage) {
    ogImage.setAttribute('content', `${window.location.origin}${meta.ogImage}`)
  }

  next()
})

export default router
