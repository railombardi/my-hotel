<template>
  <v-card class="hotels-list__card" :href="`/hotel/${hotel.id}`" :to="`/hotel/${hotel.id}`">
    <v-img v-if="hotel.img" :src="hotel.img" height="200" aspect-ratio="16/9" cover>
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular indeterminate color="#00bd7e"></v-progress-circular>
        </v-row>
      </template>
    </v-img>

    <v-card-title>{{ hotel.name }}</v-card-title>
    <v-card-subtitle>{{ hotel.city }}</v-card-subtitle>
    <v-card-text>
      <StarRating :rating="hotel.rate" />
      <br />
      <strong>
        Valor:
        {{ hotel.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}/noite
      </strong>
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'

import StarRating from '@/components/starRating/Index.vue'

interface Hotel {
  id: number
  name: string
  city: string
  price: number
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
    }
  }
})
</script>
