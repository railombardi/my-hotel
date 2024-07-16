import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
})

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

export const getHotels = async (city: any) => {
  try {
    const response = await apiClient.get(`/hotels?city=${city ? city : ''}`)
    return response.data
  } catch (error) {
    console.error('Erro ao obter os hotéis:', error)
    throw error
  }
}

export const getHotel = async (id: string) => {
  try {
    const response = await apiClient.get(`/hotels/${id}`)
    return response.data
  } catch (error) {
    console.error('Erro ao obter hotel', error)
    throw error
  }
}

export const addReservation = async (reservation: Reservation) => {
  try {
    const response = await apiClient.post(`/reservations`, reservation)
    return response.data
  } catch (error) {
    console.error('Erro ao obter os hotéis:', error)
    throw error
  }
}
