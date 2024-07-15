<template>
  <v-card class="hotel-card" @click="handleClick">
    <v-radio
      v-if="isComparisonMode"
      v-bind:model-value="selected"
      class="hotel-card__radio"
      color="#00bd7e"
      :ripple="false"
      @input="handleClick"
    />

    <v-img v-if="hotel.img" :src="hotel.img" height="200" aspect-ratio="16/9" cover>
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular indeterminate color="#00bd7e"></v-progress-circular>
        </v-row>
      </template>
    </v-img>

    <v-card-title>{{ hotel.name }}</v-card-title>
    <v-card-subtitle>{{ hotel.city }}</v-card-subtitle>
    <v-card-text class="d-flex flex-column ga-2">
      <StarRating :rating="hotel.rate" />
      <span> Quartos: {{ hotel.rooms }}</span>
      <span> Hóspedes: {{ hotel.guests }}</span>
      <strong>
        Valor:
        {{ hotel.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}/noite
      </strong>
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

import StarRating from '@/components/starRating/Index.vue'

interface Hotel {
  id: number
  name: string
  rooms: number
  guests: number
  rate: number
  price: number
  city: string
  img?: string
}

export default defineComponent({
  name: 'HotelCard',
  components: {
    StarRating
  },
  props: {
    hotel: {
      type: Object as PropType<Hotel>,
      required: true
    },
    isComparisonMode: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  emits: ['select', 'unselect'],
  setup(props, { emit }) {
    const handleClick = () => {
      if (props.isComparisonMode) {
        return props.selected ? emit('unselect') : emit('select')
      }
    }

    return {
      handleClick
    }
  }
})
</script>
<style lang="scss" scoped>
.hotel-card {
  position: relative;

  &__radio {
    position: absolute;
    top: 8px;
    left: 8px;
    z-index: 1;
  }
}
</style>
