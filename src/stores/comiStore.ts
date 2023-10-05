import { defineStore } from 'pinia';
import { fetchRandomComic } from '../utils/api';

export interface Comic {
  title: string;
  img: string;
}

export const useComicStore = defineStore('comics', {
  state: () => ({
    currentComic: null as null | Comic,
    rating: 0,
  }),

  actions: {
    async setCurrentComic(comic: Comic) {
      this.currentComic = comic;
    },

    async fetchCurrentComic(num: number) {
      try {
        const comic = await fetchRandomComic(num);
        await this.setCurrentComic(comic);
      } catch (error) {
        console.error('Error fetching comic:', error);
      }
    },

    setRating(rating: number) {
      this.rating = rating;
    },
  },

  getters: {
    getCurrentComic(): null | Comic {
      return this.currentComic;
    },
    getRating(): number {
      return this.rating;
    },
  },
});
