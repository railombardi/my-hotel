<template>
  <v-container class="hotels-list">
    <v-row class="hotels-list__title">
      <h2>Esses são os hotéis compatíveis com sua busca:</h2>
    </v-row>
    <v-row>
      <v-col v-for="hotel in hotels" :key="hotel.id" cols="12" sm="6" md="4" lg="3">
        <HotelCard :hotel="hotel" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { getHotels } from '@/services/api'

import HotelCard from '@/components/hotelCard/Index.vue'

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
  name: 'HotelList',
  components: {
    HotelCard
  },
  setup() {
    const hotels = ref<Hotel[]>([])

    const fetchHotels = async () => {
      try {
        hotels.value = await getHotels()
      } catch (error) {
        console.error('Erro ao obter os hotéis:', error)
      }
    }

    onMounted(() => {
      fetchHotels()
    })

    return {
      hotels
    }
  }
})
</script>

<style scoped lang="scss">
.hotels-list {
  &__title {
    font-weight: 600;
    border-bottom: 1px solid $primaryGreen;
  }

  &__card {
    margin: 10px;
  }
}
</style>
