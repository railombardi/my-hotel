<template>
  <div class="star-rating">
    <svg v-for="(star, index) in stars" :key="index" :viewBox="star.viewBox" class="star-icon">
      <path :d="star.path" />
    </svg>
    <span>{{ rating }}/5</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { mdiStar, mdiStarHalf, mdiStarOutline } from '@mdi/js'

export default defineComponent({
  name: 'StarRating',
  props: {
    rating: {
      type: Number,
      required: true,
      validator: (value: number) => value >= 0 && value <= 5
    }
  },
  setup(props) {
    const stars = computed(() => {
      const fullStars = Math.floor(props.rating)
      const halfStar = props.rating - fullStars >= 0.5 ? 1 : 0
      const emptyStars = 5 - fullStars - halfStar

      return [
        ...Array(fullStars).fill({ path: mdiStar, viewBox: '0 0 24 24' }),
        ...Array(halfStar).fill({ path: mdiStarHalf, viewBox: '0 0 24 24' }),
        ...Array(emptyStars).fill({ path: mdiStarOutline, viewBox: '0 0 24 24' })
      ]
    })

    return {
      stars
    }
  }
})
</script>

<style scoped>
.star-rating {
  display: flex;
  align-items: center;
}
.star-icon {
  width: 24px;
  height: 24px;
  fill: #00bd7e;
  margin-right: 4px;
}
</style>
