import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/DesktopHomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/signup',
      name: 'signup',

      component: () => import('@/views/GlobalSignupView.vue')
    },
    {
      path:'/login',
      name:'login',

      component: () => import('@/views/GlobalLoginView.vue')
    },

    // mobile routes
    {
      path: '/mobile/',
      name: 'mobile-home',

      component: () => import('@/views/MobileHomeView.vue')
    },
    {
      path: '/mobile/create-cleanwalk',
      name: 'mobile-create-cleanwalk',

      component: () => import('@/views/MobileCreateCleanwalk.vue')
    },
    {
      path: '/faq',
      name: 'faq',

      component: () => import('@/views/GlobalFAQView.vue')
    },
  ]
})


// this catchs every route before navigating to them
// return false => cancel
// return '/route'
// return { name: 'route-name' }
// https://router.vuejs.org/guide/advanced/navigation-guards.html
router.beforeEach((to, from) => {

  if(window.screen.availWidth <= 640 && !to.path.startsWith('/mobile/')){
      switch(to.name){
        case 'home':
          return {name: 'mobile-home'};
      }
  }

  return true
})

export default router
