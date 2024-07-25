import { mount } from '@vue/test-utils';
import { describe, test, expect, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useUtilsStore } from '../src/stores/UtilsStore';
import Toast from '../src/components/Toast.vue';

describe('Toast.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test('renders correctly', () => {
    const wrapper = mount(Toast);
    expect(wrapper.exists()).toBe(true);
  });

  test('applies the correct classes based on toast state', () => {
    const utilsStore = useUtilsStore();
    utilsStore.toast.isSuccess = true;
    utilsStore.toast.isVisible = true;
    const wrapper = mount(Toast);

    expect(wrapper.classes()).toContain('is-visible');
    expect(wrapper.classes()).toContain('toast-success');
    expect(wrapper.classes()).not.toContain('toast-error');

    utilsStore.toast.isSuccess = false;
    const wrapper2 = mount(Toast);
    expect(wrapper2.classes()).toContain('toast-error');
  });

  test('displays the correct message', () => {
    const utilsStore = useUtilsStore();
    const message = 'Test message';
    utilsStore.toast.message = message;
    const wrapper = mount(Toast);
    
    expect(wrapper.text()).toContain(message);
  });
});
