import { defineStore } from 'pinia'
import { getHotel, addReservation } from '@/services/api'

interface PaymentDetails {
  cardNumber: string
  cardName: string
  cardCVV: string
}

interface Reservation {
  firstName: string
  lastName: string
  email: string
  country: string
  phoneNumber: string
  receiveConfirmation: boolean
  paymentDetails: PaymentDetails
  hotelId: number
}

interface Hotel {
  id: number
  name: string
  price: number
  city: string
  img?: string
}

interface State {
  selectedHotel: Hotel | null
  reservations: Reservation[]
}

export const useReservationStore = defineStore({
  id: 'reservation',
  state: (): State => ({
    selectedHotel: null,
    reservations: []
  }),
  actions: {
    async getHotel(hotelId: string) {
      try {
        const { id, name, city, price, img } = await getHotel(hotelId)
        this.selectedHotel = { id, name, city, price, img }
      } catch (error) {
        console.error('Erro ao buscar hotel:', error)
      }
    },
    async addReservation(reservation: Reservation) {
      try {
        const response = await addReservation(reservation)
        this.reservations.push(response)
      } catch (error) {
        console.error('Erro ao adicionar reserva:', error)
      }
    }
  }
})
