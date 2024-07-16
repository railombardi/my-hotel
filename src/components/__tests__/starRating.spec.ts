import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import StarRating from '@/components/starRating/Index.vue'
import { mdiStar, mdiStarHalf, mdiStarOutline } from '@mdi/js'

// Testes unitários para o componente StarRating
describe('StarRating component', () => {
  // Teste para verificar se as estrelas são renderizadas corretamente com um rating específico
  it('renders stars correctly based on rating', async () => {
    const rating = 3.5 // Rating para teste

    const wrapper = mount(StarRating, {
      props: {
        rating
      }
    })

    // Verifica se o componente está renderizado corretamente
    expect(wrapper.find('.star-rating').exists()).toBe(true)

    // Verifica se a quantidade correta de estrelas é renderizada
    const starIcons = wrapper.findAll('.star-icon')
    expect(starIcons).toHaveLength(5) // Deve ter 5 estrelas no total

    // Verifica se as estrelas cheias estão sendo renderizadas corretamente
    const fullStars = starIcons.filter(
      (icon) =>
        icon.attributes('viewBox') === '0 0 24 24' && icon.find('path').attributes('d') === mdiStar
    )
    expect(fullStars).toHaveLength(3) // Espera-se 3 estrelas cheias

    // Verifica se a estrela meio preenchida está sendo renderizada corretamente
    const halfStar = starIcons.find(
      (icon) =>
        icon.attributes('viewBox') === '0 0 24 24' &&
        icon.find('path').attributes('d') === mdiStarHalf
    )
    expect(halfStar).not.toBeNull() // Deve haver uma estrela meio preenchida

    // Verifica se as estrelas vazias estão sendo renderizadas corretamente
    const emptyStars = starIcons.filter(
      (icon) =>
        icon.attributes('viewBox') === '0 0 24 24' &&
        icon.find('path').attributes('d') === mdiStarOutline
    )
    expect(emptyStars).toHaveLength(1) // Espera-se 1 estrela vazia

    // Verifica se o texto de rating está correto
    expect(wrapper.find('span').text()).toContain(`${rating}/5`)
  })
})
