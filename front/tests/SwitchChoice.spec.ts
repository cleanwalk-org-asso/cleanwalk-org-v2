import { mount } from '@vue/test-utils';
import { describe, test, expect, vi } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router';
import SwitchChoice from '../src/components/SwithChoice.vue'; // Assurez-vous que le chemin est correct

// Définir des routes fictives pour les tests
const routes = [
  {
    path: '/route1',
    component: { template: '<div>Route1</div>' }
  },
  {
    path: '/route2',
    component: { template: '<div>Route2</div>' }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

describe('SwitchChoice.vue', () => {
  test('renders correctly', () => {
    const wrapper = mount(SwitchChoice, {
      props: {
        categorie1: 'Cat1',
        categorie2: 'Cat2',
        route1: 'route1',
        route2: 'route2',
        activeCategory: true
      },
      global: {
        plugins: [router]
      }
    });
    expect(wrapper.exists()).toBe(true);
  });

  test('navigates to correct routes', () => {
    const wrapper = mount(SwitchChoice, {
      props: {
        categorie1: 'Cat1',
        categorie2: 'Cat2',
        route1: 'route1',
        route2: 'route2',
        activeCategory: true
      },
      global: {
        plugins: [router]
      }
    });

    const links = wrapper.findAll('.router-link');
    expect(links[0].attributes('href')).toBe('/route1');
    expect(links[1].attributes('href')).toBe('/route2');
  });

  test('calls scrollToTop on link click', async () => {
    const scrollToTop = vi.fn();
    window.scrollTo = scrollToTop; // Mock the scrollTo function

    const wrapper = mount(SwitchChoice, {
      props: {
        categorie1: 'Cat1',
        categorie2: 'Cat2',
        route1: 'route1',
        route2: 'route2',
        activeCategory: true
      },
      global: {
        plugins: [router]
      }
    });

    const links = wrapper.findAll('.router-link');
    await links[0].trigger('click');
    expect(scrollToTop).toHaveBeenCalledWith(0, 0);

    await links[1].trigger('click');
    expect(scrollToTop).toHaveBeenCalledWith(0, 0);
  });
});
