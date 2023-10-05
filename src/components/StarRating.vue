<template>
  <div class="star-rating-container">
    <span
      v-for="star in maxRating"
      :key="star"
      @click="setRating(star)"
      :class="{ active: star <= currentRating }"
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
  methods: {
    setRating(rating) {
      this.$emit('update:currentRating', rating);
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
  color: #90C2F3;
}
</style>
