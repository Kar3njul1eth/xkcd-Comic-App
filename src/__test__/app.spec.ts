import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia } from 'pinia';
import App from '@/App.vue';
import ComicViewer from '@/components/ComicViewer.vue';

const pinia = createPinia();

describe('App Component - renders ComicViewer component', () => {
  const wrapper = mount(ComicViewer, {
    global: {
      plugins: [pinia],
    },
  });
  it('renders correctly App component', () => {
    const wrapper = mount(App);
    expect(wrapper.findComponent(App).exists()).toBe(true);
  });
  it('renders correctly ComicViewer', () => {
    const wrapper = mount(ComicViewer);

    expect(wrapper.findComponent(ComicViewer).exists()).toBe(true);
  });
});
