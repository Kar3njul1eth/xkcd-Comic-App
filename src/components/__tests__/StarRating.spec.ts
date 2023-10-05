import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils'
import StarRating from '../StarRating.vue';

describe('StarRating Component', () => {
  it('emits update event when a star is clicked', async () => {
    const wrapper = mount(StarRating, { props: { maxRating: 5, currentRating: 3 }});

    await wrapper.find('span:nth-child(4)').trigger('click');

    expect(wrapper.emitted('update:currentRating')).toBeTruthy();

    expect(wrapper.emitted('update:currentRating')![0]).toEqual([4]);
  });
});
