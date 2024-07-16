import fs from 'fs/promises'
import axios from 'axios'
import { cities } from './src/helpers/mockCities.js'

const hotelNames = [
  'Hotel Estrela',
  'Hotel Sol',
  'Hotel Lago',
  'Hotel Serra',
  'Hotel Praia',
  'Hotel Céu',
  'Hotel Terra',
  'Hotel Lua',
  'Hotel Mar',
  'Hotel Montanha'
]

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const generateHotels = async (num) => {
  const hotels = []
  for (let i = 1; i <= num; i++) {
    try {
      const response = await axios.get(`https://picsum.photos/200?random=${i}`)
      hotels.push({
        id: i,
        name: hotelNames[getRandomInt(0, hotelNames.length - 1)],
        rooms: getRandomInt(1, 4),
        guests: getRandomInt(1, 8),
        rate: getRandomInt(1, 5),
        price: getRandomInt(100, 300),
        city: i <= cities.length ? cities[i - 1] : cities[getRandomInt(0, cities.length - 1)],
        img: response.request.res.responseUrl
      })
    } catch (error) {
      console.error('Erro ao obter imagem para hotel:', error)
    }
  }
  return hotels
}

const generateAndSaveHotels = async (num) => {
  try {
    console.log('Gerando hotéis aleatórios...')
    const hotels = await generateHotels(num)
    const db = { hotels, reservations: [] }
    await fs.writeFile('db.json', JSON.stringify(db, null, 2))
    console.log('db.json criado com sucesso!')
  } catch (error) {
    console.error('Erro ao gerar e salvar hotéis:', error)
  }
}

generateAndSaveHotels(20)
