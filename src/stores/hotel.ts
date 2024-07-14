import { defineStore } from 'pinia'
import { getHotels } from '@/services/api'

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

interface SearchState {
  city: string
  checkIn: Date | null
  checkOut: Date | null
  rooms: number
  guests: number
}

interface State {
  hotels: Hotel[]
  search: SearchState
}

export const useHotelStore = defineStore({
  id: 'hotel',
  state: (): State => ({
    hotels: [],
    search: {
      city: '',
      checkIn: null,
      checkOut: null,
      rooms: 1,
      guests: 1
    }
  }),
  actions: {
    async fetchHotels() {
      try {
        this.hotels = await getHotels(this.search.city)
      } catch (error) {
        console.error('Erro ao obter os hotéis:', error)
      }
    },
    async setSearch(search: SearchState) {
      this.search = search
      await this.fetchHotels()
    },
    resetSearch() {
      this.search = {
        city: '',
        checkIn: null,
        checkOut: null,
        rooms: 1,
        guests: 1
      }
    }
  },
  getters: {
    filteredHotels(state): Hotel[] {
      return state.hotels.filter((hotel) => {
        return (
          (state.search.rooms ? hotel.rooms >= state.search.rooms : true) &&
          (state.search.guests ? hotel.guests >= state.search.guests : true)
        )
      })
    }
  }
})
