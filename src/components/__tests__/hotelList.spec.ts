import { describe, it, expect, beforeEach } from 'vitest'
import { nextTick } from 'vue'
import { createPinia, setActivePinia } from 'pinia'
import { mount } from '@vue/test-utils'
import HotelList from '@/components/hotelList/Index.vue'

// Crie uma instância do Pinia e configure-o globalmente
const pinia = createPinia()
setActivePinia(pinia)

// Mock de dados de hotéis para o teste
const hotels = [
  {
    id: 1,
    name: 'Hotel A',
    rooms: 10,
    guests: 20,
    rate: 4.5,
    price: 100,
    city: 'City A',
    img: 'hotelA.jpg'
  },
  {
    id: 2,
    name: 'Hotel B',
    rooms: 15,
    guests: 30,
    rate: 4.0,
    price: 120,
    city: 'City B',
    img: 'hotelB.jpg'
  }
]

// Testes unitários para o componente HotelList
describe('HotelList component', () => {
  // Antes de cada teste, monte o componente com o Pinia configurado
  beforeEach(() => {
    setActivePinia(pinia)
  })

  // Teste básico para verificar se o componente HotelList é renderizado corretamente
  it('renders HotelList component correctly', async () => {
    const wrapper = mount(HotelList, {
      props: {
        hotels
      }
    })

    // Verifica se o título dos hotéis está presente
    expect(wrapper.find('.hotels-list__title h2').text()).toBe(
      'Esses são os hotéis compatíveis com sua busca:'
    )

    // Verifica se os botões de comparação estão renderizados corretamente
    expect(wrapper.find('.hotels-list__compare > h3').text()).toBe('Deseja comparar as opções?')
    expect(wrapper.find('.hotels-list__compare > v-btn').text()).toBe('Comparar')

    // Simula a interação do usuário para iniciar a comparação
    await wrapper.find('.hotels-list__compare > v-btn').trigger('click')
    await nextTick()

    // Verifica se o estado de comparação mudou corretamente
    expect(wrapper.vm.isComparisonMode).toBe(true)

    // Simula a seleção de hotéis para comparação
    wrapper.vm.selectHotel(hotels[0])
    wrapper.vm.selectHotel(hotels[1])
    await nextTick()

    // Verifica se os hotéis foram selecionados para comparação
    expect(wrapper.vm.selectedForComparison).toHaveLength(2)
  })

  // Teste para cancelar a comparação de hotéis
  it('cancels hotel comparison correctly', async () => {
    const wrapper = mount(HotelList, {
      props: {
        hotels
      }
    })

    // Inicia a comparação
    await wrapper.find('.hotels-list__compare > v-btn').trigger('click')
    await nextTick()

    // Simula o cancelamento da comparação
    await wrapper.find('.hotels-list__compare > v-btn[color="red"]').trigger('click')
    await nextTick()

    // Verifica se a comparação foi cancelada corretamente
    expect(wrapper.vm.isComparisonMode).toBe(false)
    expect(wrapper.vm.confirmedComparison).toBe(false)
    expect(wrapper.vm.selectedForComparison).toHaveLength(0)
  })
})
