import { mount } from '@vue/test-utils';
import { describe, test, expect } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';
import App from '../src/App.vue'; // Assurez-vous que le chemin est correct
import Toast from '../src/components/Toast.vue'; // Assurez-vous que le chemin est correct

// Définir des routes fictives pour les tests
const routes = [
  {
    path: '/',
    component: { template: '<div>Home</div>' }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const pinia = createPinia();

describe('App.vue', () => {
  test('renders Toast and RouterView correctly', async () => {
    router.push('/');
    await router.isReady();
    const wrapper = mount(App, {
      global: {
        plugins: [router, pinia],
      },
    });
    expect(wrapper.findComponent(Toast).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'RouterView' }).exists()).toBe(true);
  });
});
