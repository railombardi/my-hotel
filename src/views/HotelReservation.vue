<template>
  <main>
    <HotelReservationForm v-if="hotel" :hotel="hotel" />
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useReservationStore } from '@/stores/reservation'
import { useRoute } from 'vue-router'

import HotelReservationForm from '@/components/hotelReservationForm/Index.vue'

interface Hotel {
  id: number
  name: string
  price: number
  city: string
}

export default defineComponent({
  name: 'HomeView',
  components: {
    HotelReservationForm
  },
  setup() {
    const reservationStore = useReservationStore()
    const route = useRoute()
    const hotelId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
    const hotel = ref<Hotel | null>(null)

    onMounted(async () => {
      if (hotelId) {
        await reservationStore.getHotel(hotelId)
        hotel.value = reservationStore.selectedHotel
      }
    })

    return { hotel }
  }
})
</script>
