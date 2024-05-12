import { createRouter, createWebHistory, type NavigationGuardNext, type RouteLocationNormalized } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAccountStore } from '@/stores/AccountStore';

const router = createRouter({

  history: createWebHistory((import.meta as any).env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/test',
      name: 'test',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/TestView.vue')
    },
    {
      path: '/cleanwalk/:id',
      name: 'cleanwalk',
      component: () => import('../views/SingleCleanwalkView.vue')
    },
    {
      path: '/add',
      name: 'add',
      component: () => import('../views/AddView.vue')
    },{
      path: '/add/cleanwalk',
      name: 'addCleanwalk',
      component: () => import('../views/AddCleanwalkView.vue')
    },
    {
      path: '/articles',
      name: 'articles',
      component: () => import('../views/ArticlesView.vue')
    },
    {
      path: '/associations',
      name: 'associations',
      component: () => import('../views/AssoListView.vue')
    },
    {
      path: '/menu',
      name: 'menu',
      component: () => import('../views/MenuView.vue')
    },
    {
      path: '/menu/profile',
      name: 'menuProfile',
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignupView.vue')
    },
    {
      path: '/signup/organisation',
      name: 'signupOrganisation',
      component: () => import('../views/SignupOrganisationView.vue')
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import('../views/SignupView.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: () => import('../views/404.vue')
    }
  ]

  
})

const routesRequiringAuth = ['profile', 'anotherProtectedRoute'];

router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const isMobile = window.innerWidth <= 768;
  if(!useAccountStore().isLoggedIn) {
    await useAccountStore().tokenLogin();
  }
 console.log('isLogedIn', useAccountStore().isLoggedIn);

  if (routesRequiringAuth.includes(to.name as string) && !useAccountStore().isLoggedIn && isMobile) {
    next({ name: 'login' }); // Redirige vers la page de login
  } else {
    next(); // Continue vers la route demandée
  }
});

export default router
