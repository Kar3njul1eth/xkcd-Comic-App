import { describe, it, expect } from 'vitest';
import { createPinia } from 'pinia';
import { mount } from '@vue/test-utils';
import ComicViewer from '../ComicViewer.vue';

const pinia = createPinia();

describe('ComicViewer Component', () => {
  it('renders correctly', () => {
    const wrapper = mount(ComicViewer, {
      global: {
        plugins: [pinia],
      },
    });
    expect(wrapper.exists()).toBeTruthy();
  });

  it('does not render title if currentComic is not present', async () => {
    const wrapper = mount(ComicViewer);

    expect(wrapper.find('.comic-title').exists()).toBeFalsy();
  });
});
