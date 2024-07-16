import { shallowMount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import HotelCard from '@/components/hotelCard/Index.vue'
import StarRating from '@/components/starRating/Index.vue'

describe('HotelCard.vue', () => {
  const hotel = {
    id: 1,
    name: 'Hotel Teste',
    rooms: 10,
    guests: 20,
    rate: 4,
    price: 500,
    city: 'Cidade Teste',
    img: 'https://via.placeholder.com/150'
  }

  const factory = (props = {}) => {
    return shallowMount(HotelCard, {
      props: { hotel, ...props }
    })
  }

  it('renders hotel details correctly', () => {
    const wrapper = factory()

    expect(wrapper.find('v-card-title').text()).toBe(hotel.name)
    expect(wrapper.find('v-card-subtitle').text()).toBe(hotel.city)
    expect(wrapper.find('.d-flex.flex-column').findAll('span')[0].text()).toBe(
      `Quartos: ${hotel.rooms}`
    )
    expect(wrapper.find('.d-flex.flex-column').findAll('span')[1].text()).toBe(
      `Hóspedes: ${hotel.guests}`
    )
    expect(wrapper.find('.d-flex.flex-column').find('strong').text()).toBe(
      `Valor: ${hotel.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}/noite`
    )
  })

  it('emits correct event when clicked in comparison mode and selected is false', async () => {
    const wrapper = factory({ isComparisonMode: true, selected: false })

    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('select')
  })

  it('emits correct event when clicked in comparison mode and selected is true', async () => {
    const wrapper = factory({ isComparisonMode: true, selected: true })

    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('unselect')
  })

  it('emits correct event when clicked outside of comparison mode', async () => {
    const wrapper = factory({ isComparisonMode: false })

    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('redirectToReservation')
  })

  it('displays the image correctly', () => {
    const wrapper = factory()

    const img = wrapper.find('v-img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe(hotel.img)
  })

  it('renders the StarRating component', () => {
    const wrapper = factory()

    expect(wrapper.findComponent(StarRating).exists()).toBe(true)
  })
})
