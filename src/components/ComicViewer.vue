<template>
  <div class="comic-container">
    <h2 class="comic-title" v-if="currentComic">{{ currentComic.title }}</h2>
    <img class="comic-image" v-if="currentComic && currentComic.img" :src="currentComic.img" alt="Comic"/>
    <StarRating class="comic-rate" v-model:currentRating="userRating" :maxRating="5"/><span class="comic-rate__text">Rate this Comic</span>
    <div class="comic-container-button">
      <a class="load-comic-button" @click="PreviousComic">
        <svg class="load-comic-button__icon" width="13px" height="10px" viewBox="0 0 13 10" style="margin-right: 5px;">
          <path d="M12,5 L2,5 M2,5 L6,1 M2,5 L6,9"></path>
        </svg>
        <span class="load-comic-button__text">Prev</span>
      </a>
      <a class="load-comic-button" @click="NextComic">
        <span class="load-comic-button__text">Next</span>
        <svg class="load-comic-button__icon" width="13px" height="10px" viewBox="0 0 13 10">
          <path d="M1,5 L11,5"></path>
          <polyline points="8 1 12 5 8 9"></polyline>
        </svg>
      </a>
  </div>
  </div>
</template>

<script lang="ts">
import { computed, ref } from 'vue';
import { useComicStore } from '../stores/comiStore';
import StarRating from './StarRating.vue';

export default {
  components: {
    StarRating,
  },
  setup() {
    const comicStore = useComicStore();
    const currentComic = computed(() => comicStore.getCurrentComic);
    const userRating = ref(0);
    const num = ref(10);
    comicStore.fetchCurrentComic(100);

    const rateComic = () => {
      if (currentComic.value && userRating.value > 0) {
        comicStore.setRating(userRating.value);
      }
    };

    const NextComic = () => {
      num.value++;
      comicStore.fetchCurrentComic(num.value);
      userRating.value = 0;
    };

    const PreviousComic = () => {
      num.value--;
      comicStore.fetchCurrentComic(num.value);
      userRating.value = 0;
    };

    return { currentComic, userRating, rateComic, NextComic, PreviousComic };

  }
};
</script>

<style scoped>
.comic-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: var(--comic-container-margin);
  max-width: var(--comic-container-max-width);
  height: var(--comic-container-height);
}

.comic-title {
  font-family: 'Libre Baskerville', serif;
  margin: var(--comic-title-margin);
  white-space: nowrap;
}

.comic-rate {
  display: flex;
  justify-content: center;
}
.comic-rate__text {
  font-family: 'Cormorant', serif;
  margin-bottom: var(--comic-rate-text-margin);
  white-space: nowrap;
}
.comic-image {
  max-width: var(--comic-image-max-width);
  height: 100%;
  object-fit: cover;
  box-shadow: var(--comic-image-shadow);
  margin-bottom: var(--comic-image-margin-bottom);
}

.comic-container-button {
  display: flex;
  gap: var(--comic-button-gap);
}

@media (max-width: 600px) {
  .comic-container-button {
    gap: var(--comic-button-mobile-gap);
  }
}
a {
  text-decoration: none;
  color: inherit;
}
.load-comic-button {
  position: relative;
  padding: var(--load-comic-padding);
  transition: var(--load-comic-button-transition);
  cursor: pointer;
}
.load-comic-button:before {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  border-radius: var(--load-comic-button-border-radius);
  background: var(--load-comic-button-background);
  width: 100%;
  height: var(--load-comic-button-height);
  transition: var(--load-comic-button-transition);
  box-shadow: var(--comic-shadow);
}
.load-comic-button__text {
  position: relative;
  font-size: var(--load-comic-button-font-size);
  line-height: var(--load-comic-button-line-height);
  font-weight: var(--load-comic-button-font-weight);
  letter-spacing: var(--load-comic-button-letter-spacing);
  text-transform: var(--load-comic-button-text-transform);
  vertical-align: var(--load-comic-button-vertical-align);
  white-space: nowrap;
}

.load-comic-button__icon {
  position: relative;
  top: 0;
  margin-left: 10px;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke: #111;
  stroke-width: 2;
  transform: translateX(-5px);
  transition: var(--load-comic-button-transition);
}

@media (max-width: 767px) {
  .load-comic-button__icon {
    display: none;
  }
}
.load-comic-button:hover:before {
  width: 100%;
  background: #90C2F3;
}

.load-comic-button:active {
  transform: scale(0.96);
}
</style>