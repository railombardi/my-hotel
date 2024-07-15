<template>
  <main>
    <HotelSearchForm @submit="handleSubmit" />
    <HotelList v-if="filteredHotels.length > 0" :hotels="filteredHotels" />
  </main>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useHotelStore } from '@/stores/hotel'
import HotelSearchForm from '../components/hotelSearchForm/Index.vue'
import HotelList from '../components/hotelList/Index.vue'

interface SearchForm {
  city: string
  checkIn: Date | null
  checkOut: Date | null
  rooms: number
  guests: number
}

export default defineComponent({
  name: 'HomeView',
  components: {
    HotelSearchForm,
    HotelList
  },
  setup() {
    const hotelStore = useHotelStore()

    const handleSubmit = async (form: SearchForm) => {
      await hotelStore.setSearch(form)
    }

    return {
      handleSubmit,
      filteredHotels: computed(() => hotelStore.filteredHotels)
    }
  }
})
</script>

<style scoped lang="scss">
main {
  margin-top: 80px;
}
</style>
