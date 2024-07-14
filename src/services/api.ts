import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const getHotels = async () => {
  try {
    const response = await apiClient.get('/hotels')
    return response.data
  } catch (error) {
    console.error('Erro ao obter os hotéis:', error)
    throw error
  }
}
