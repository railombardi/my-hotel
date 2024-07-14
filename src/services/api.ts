import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const getHotels = async (city: any) => {
  try {
    const response = await apiClient.get(`/hotels?city=${city ? city : ''}`)
    return response.data
  } catch (error) {
    console.error('Erro ao obter os hotéis:', error)
    throw error
  }
}
