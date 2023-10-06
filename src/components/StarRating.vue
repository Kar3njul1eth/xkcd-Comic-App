<template>
  <div class="star-rating-container">
    <span
      v-for="star in maxRating"
      :key="star"
      @click="setRating(star)"
      @mouseover="hoverRating(star)"
      @mouseleave="resetHoverRating"
      :class="{ active: star <= currentRating || star <= hoveredRating }"
    >
      ★
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    currentRating: {
      type: Number,
      required: true,
    },
    maxRating: {
      type: Number,
      default: 5,
    },
  },
  emits: ['update:currentRating'],
  data() {
    return {
      hoveredRating: 0,
    };
  },
  methods: {
    setRating(rating) {
      this.$emit('update:currentRating', rating);
    },
    hoverRating(rating) {
      this.hoveredRating = rating;
    },
    resetHoverRating() {
      this.hoveredRating = 0;
    },
  },
});
</script>

<style scoped>
.star-rating-container {
  font-size: 40px;
  color: #f2f0f0;
  cursor: pointer;
}

.star-rating-container span {
  display: inline-block;
  width: 1em;
  overflow: hidden;
}

.star-rating-container .active {
  color: #E2E832;
}
</style>
