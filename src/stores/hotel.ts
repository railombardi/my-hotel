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
  sortList: string
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
    },
    sortList: 'rating'
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
      this.search = { ...search }
      await this.fetchHotels()
    },
    setSortList(sortBy: string) {
      this.sortList = sortBy
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
      const filtered = state.hotels.filter((hotel) => {
        return (
          (state.search.rooms ? hotel.rooms >= state.search.rooms : true) &&
          (state.search.guests ? hotel.guests >= state.search.guests : true)
        )
      })

      if (state.sortList === 'rating') {
        filtered.sort((a, b) => b.rate - a.rate)
      } else if (state.sortList === 'price-low-high') {
        filtered.sort((a, b) => a.price - b.price)
      } else if (state.sortList === 'price-high-low') {
        filtered.sort((a, b) => b.price - a.price)
      } else if (state.sortList === 'ascending-alphabetical') {
        filtered.sort((a, b) => a.name.localeCompare(b.name))
      } else if (state.sortList === 'descending-alphabetical') {
        filtered.sort((a, b) => b.name.localeCompare(a.name))
      }

      return filtered
    }
  }
})
