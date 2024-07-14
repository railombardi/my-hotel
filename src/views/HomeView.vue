<template>
  <main>
    <HotelSearchForm @submit="handleSubmit" />
    <HotelList v-if="filteredHotels.length > 0" :hotels="filteredHotels" />
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useHotelStore } from '@/stores/hotel'
import HotelSearchForm from '../components/hotelSearchForm/Index.vue'
import HotelList from '../components/hotelList/Index.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    HotelSearchForm,
    HotelList
  },
  setup() {
    const hotelStore = useHotelStore()

    const handleSubmit = async (form) => {
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
