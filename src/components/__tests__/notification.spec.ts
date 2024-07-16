import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NotificationBar from '@/components/notification/Index.vue'

// Testes unitários para o componente NotificationBar
describe('NotificationBar component', () => {
  // Teste para verificar se a notificação é renderizada corretamente
  it('renders NotificationBar component correctly', async () => {
    const message = 'Test notification message'
    const timeout = 6000
    const color = 'success'

    const wrapper = mount(NotificationBar, {
      props: {
        message,
        timeout,
        color
      }
    })

    // Verifica se o componente está renderizado corretamente
    expect(wrapper.find('v-snackbar').exists()).toBe(true)

    // Verifica se a mensagem da notificação está correta
    const snackbarContent = wrapper.find('v-snackbar')
    expect(snackbarContent.text()).toContain(message)

    // Verifica se a cor da notificação está correta
    expect(wrapper.find('v-snackbar').attributes('color')).toBe(color)

    // Verifica se a notificação está visível inicialmente
    expect(wrapper.vm.visible).toBe(true) // Acessando diretamente a propriedade reactive do Vue
  })
})
