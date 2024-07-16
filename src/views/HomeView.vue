<template>
  <main>
    <HotelSearchForm @submit="handleSubmit" :search="search" />
    <RouterView v-if="filteredHotels.length > 0" :hotels="filteredHotels" />
  </main>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import type { ComputedRef } from 'vue'
import { useHotelStore } from '@/stores/hotel'
import HotelSearchForm from '../components/hotelSearchForm/Index.vue'
import { useRoute, useRouter } from 'vue-router'

interface SearchForm {
  city?: string
  checkIn: Date | null
  checkOut: Date | null
  rooms: number
  guests: number
}

export default defineComponent({
  name: 'HomeView',
  components: {
    HotelSearchForm
  },
  setup() {
    const hotelStore = useHotelStore()
    const route = useRoute()
    const router = useRouter()

    const search: ComputedRef<SearchForm | null> = computed(() => {
      if (route.query.checkIn) {
        const city = route.query.city as string
        const checkIn = route.query.checkIn as string
        const checkOut = route.query.checkOut as string
        const rooms =
          typeof route.query.rooms === 'string'
            ? parseInt(route.query.rooms, 10)
            : typeof route.query.rooms === 'number'
              ? route.query.rooms
              : 0
        const guests =
          typeof route.query.guests === 'string'
            ? parseInt(route.query.guests, 10)
            : typeof route.query.guests === 'number'
              ? route.query.guests
              : 0

        return {
          city: city || '',
          checkIn: stringToDate(checkIn),
          checkOut: stringToDate(checkOut),
          rooms,
          guests
        }
      } else {
        return null
      }
    })

    onMounted(async () => {
      if (search.value) {
        await hotelStore.setSearch(search.value)
      }
    })

    const handleSubmit = async (form: SearchForm) => {
      await hotelStore.setSearch(form)
      const checkIn = form.checkIn?.toLocaleDateString()
      const checkOut = form.checkOut?.toLocaleDateString()
      await router.push({
        path: '/hotels',
        query: {
          city: form.city,
          checkIn,
          checkOut,
          rooms: form.rooms,
          guests: form.guests
        }
      })
    }

    const stringToDate = (dateString: string) => {
      const [day, month, year] = dateString.split('/').map(Number)

      const date = new Date(year, month - 1, day)

      return isValidDate(date) ? date : null
    }

    const isValidDate = (date: Date) => {
      return !isNaN(date.getTime())
    }

    return {
      handleSubmit,
      filteredHotels: computed(() => hotelStore.filteredHotels),
      search
    }
  }
})
</script>

<style scoped lang="scss">
main {
  margin-top: 80px;
}
</style>
