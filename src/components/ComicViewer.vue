<template>
  <div class="comic-container">
    <h2 class="comic-title" v-if="currentComic">{{ currentComic.title }}</h2>
    <img class="comic-image" v-if="currentComic && currentComic.img" :src="currentComic.img" alt="Comic"/>
    <StarRating class="comic-rate" v-model:currentRating="userRating" :maxRating="5"/><span class="comic-rate__text">Rate this Comic</span>
    <a class="load-next-comic-button" @click="incrementNum">
      <span class="load-next-comic-button__text">Next Comic</span>
      <svg class="load-next-comic-button__icon" width="13px" height="10px" viewBox="0 0 13 10">
        <path d="M1,5 L11,5"></path>
        <polyline points="8 1 12 5 8 9"></polyline>
      </svg>
    </a>
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
    const num = ref(1);
    comicStore.fetchCurrentComic(100);

    const rateComic = () => {
      if (currentComic.value && userRating.value > 0) {
        comicStore.setRating(userRating.value);
      }
    };

    const incrementNum = () => {
      num.value++;
      comicStore.fetchCurrentComic(num.value);
      userRating.value = 0;
    };

    return { currentComic, userRating, rateComic, incrementNum };

  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@700&family=PT+Sans+Narrow&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Cormorant:wght@300&family=Libre+Baskerville:wght@700&family=PT+Sans+Narrow&display=swap');
.comic-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 200px;
  max-width: 300px;
  height: 150px;
}

.comic-title {
  font-family: 'Libre Baskerville', serif;
  margin: 40px 0;
  white-space: nowrap;
}

.comic-rate {
  display: flex;
  justify-content: center;
}
.comic-rate__text {
  font-family: 'Cormorant', serif;
  margin-bottom: 40px;
  white-space: nowrap;
}
.comic-image {
  max-width: 300px;
  height: 100%;
  object-fit: cover;
  box-shadow: inset 1px 2px 17px 2px rgba(63,135,205,0.64);
  margin-bottom: 30px;
}

a {
  text-decoration: none;
  color: inherit;
}
.load-next-comic-button {
  position: relative;
  padding: 19px 22px;
  transition: all 0.2s ease;
  cursor: pointer;
}
.load-next-comic-button:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  border-radius: 28px;
  background: rgba(144, 194, 243, 0.5);
  width: 100%;
  height: 56px;
  transition: all 0.3s ease;
  box-shadow: inset 1px 2px 17px 2px rgba(63,135,205,0.64);
}
.load-next-comic-button__text {
  position: relative;
  font-size: 16px;
  line-height: 18px;
  font-weight: 900;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  vertical-align: middle;
  white-space: nowrap;
}

.load-next-comic-button__icon {
  position: relative;
  top: 0;
  margin-left: 10px;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke: #111;
  stroke-width: 2;
  transform: translateX(-5px);
  transition: all 0.3s ease;
}

@media (max-width: 767px) {
  .load-next-comic-button__icon {
    display: none;
  }
}
.load-next-comic-button:hover:before {
  width: 100%;
  background: #90C2F3;
}
.load-next-comic-button:hover svg {
  transform: translateX(0);
}
.load-next-comic-button:active {
  transform: scale(0.96);
}
</style>