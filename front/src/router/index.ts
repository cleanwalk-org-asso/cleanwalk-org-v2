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
            title: 'Cleanwalk.org - Plateforme des actions citoyennes de ramassage de déchets',
            description: 'La plateforme qui regroupe les actions citoyennes de ramassage de déchets.Trouvez les ramassages organisés près de chez vous et inscrivez ceux que vous organisez pour mobiliser plus de participants !',
            ogImage: '/default-banner.svg'
          }
        },
        {
          path: 'cleanwalks',
          name: 'map',
          component: () => import('@/views/MapView.vue'),
          meta: {
            title: 'Cleanwalks à venir',
            description: 'La plateforme qui regroupe les actions citoyennes de ramassage de déchets. Trouvez les ramassages organisés près de chez vous et inscrivez ceux que vous organisez pour mobiliser plus de participants !',
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
        {
          path: 'cleanwalk-guide',
          name: 'cleanwalkGuide',
          component: () => import('@/views/CleanwalkGuideView.vue'),
          meta: {
            title: 'Guide de la Cleanwalk | Cleanwalk.org',
            description: 'Découvrez comment organiser une cleanwalk étape par étape.',
            ogImage: '/default-banner.svg'
          }
        },
        {
          path: 'notre-histoire',
          name: 'cleanwalkHistory',
          component: () => import('@/views/CleanwalkHistoryView.vue'),
          meta: {
            title: 'Notre histoire | Cleanwalk.org',
            description: 'Découvrez l’histoire de Cleanwalk.org, de sa création à son renouveau.',
            ogImage: '/default-banner.svg'
          }
        },
        {
          path: 'mentions-legales',
          name: 'mentionsLegales',
          component: () => import('@/views/MentionsLegalesView.vue'),
          meta: {
            title: 'Mentions légales | Cleanwalk.org',
            description: 'Consultez les mentions légales de Cleanwalk.org.',
            ogImage: '/default-banner.svg'
          }
        },
        {
          path: 'conditions-generales-utilisation',
          name: 'conditionsGeneralesUtilisation',
          component: () => import('@/views/ConditionsGeneralesUtilisationView.vue'),
          meta: {
            title: 'Conditions générales d\'utilisation | Cleanwalk.org',
            description: 'Consultez les conditions générales d\'utilisation de Cleanwalk.org.',
            ogImage: '/default-banner.svg'
          }
        },
      ]
    },

    // Auth & divers
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: {
        title: 'Connexion | Cleanwalk.org',
        description: 'Connectez-vous à votre compte Cleanwalk.org.',
        ogImage: '/default-banner.svg'
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/SignupChoiceView.vue'),
      meta: {
        title: 'Inscription | Cleanwalk.org',
        description: 'Créez votre compte sur Cleanwalk.org.',
        ogImage: '/default-banner.svg'
      }
    },
    {
      path: '/signup/asso',
      name: 'signupAsso',
      component: () => import('@/views/SignupAssoView.vue'),
      meta: {
        title: 'Inscription Association | Cleanwalk.org',
        description: 'Inscrivez votre association sur Cleanwalk.org.',
        ogImage: '/default-banner.svg'
      }
    },
    {
      path: '/signup/perso',
      name: 'signupPerso',
      component: () => import('@/views/SignupView.vue'),
      meta: {
        title: 'Inscription Citoyen | Cleanwalk.org',
        description: 'Créez votre compte citoyen sur Cleanwalk.org.',
        ogImage: '/default-banner.svg'
      }
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import('@/views/SignupView.vue'),
      meta: {
        title: 'Déconnexion | Cleanwalk.org',
        description: 'Déconnexion de votre compte Cleanwalk.org.',
        ogImage: '/default-banner.svg'
      }
    },
    {
      path: '/cleanwalk/edit/:id',
      name: 'editCleanwalk',
      component: () => import('@/views/EditCleanwalkView.vue'),
      meta: {
        requiresAuth: true,
        title: 'Modifier un Événement | Cleanwalk.org',
        description: 'Modifiez les informations de votre cleanwalk.',
        ogImage: '/default-banner.svg'
      }
    },
    {
      path: '/reset-password/:token',
      name: 'resetPassword',
      component: () => import('@/views/ResetPasswordView.vue'),
      meta: {
        title: 'Réinitialiser le mot de passe | Cleanwalk.org',
        description: 'Créez un nouveau mot de passe pour votre compte.',
        ogImage: '/default-banner.svg'
      }
    },
    {
      path: '/forgot-password',
      name: 'forgotPassword',
      component: () => import('@/views/ForgotPasswordView.vue'),
      meta: {
        title: 'Mot de passe oublié | Cleanwalk.org',
        description: 'Demandez la réinitialisation de votre mot de passe.',
        ogImage: '/default-banner.svg'
      }
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
  const requiresAuth = to.meta.requiresAuth || false
  const isAuthenticated = await store.checkAuth()

  // if (to.name === 'home' && isMobile.value) {
  //   return next({ name: 'map' })
  // }

  // SEO dynamique
  const meta = to.meta
  const defaultTitle = 'Cleanwalk.org - Événements de Nettoyage Citoyen'
  const defaultDescription = 'Rejoignez Cleanwalk.org pour organiser et participer à des événements de nettoyage citoyen.'
  const pageTitle = (meta.title as string) || defaultTitle
  const pageDescription = (meta.description as string) || defaultDescription

  document.title = pageTitle

  const desc = document.querySelector('meta[name="description"]')
  if (desc) desc.setAttribute('content', pageDescription)

  const ogTitle = document.querySelector('meta[property="og:title"]')
  if (ogTitle) ogTitle.setAttribute('content', pageTitle)

  const ogDesc = document.querySelector('meta[property="og:description"]')
  if (ogDesc) ogDesc.setAttribute('content', pageDescription)

  const ogImage = document.querySelector('meta[property="og:image"]')
  if (ogImage && meta.ogImage) {
    ogImage.setAttribute('content', `${window.location.origin}${meta.ogImage}`)
  }

  if (requiresAuth && !isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else {
    next()
  }

})

export default router
