import { defineStore } from 'pinia'

interface State {
  notificationMessage: string | null
  notificationColor: string
}

export const useNotificationStore = defineStore({
  id: 'notification',
  state: (): State => ({
    notificationMessage: null,
    notificationColor: 'success'
  }),
  actions: {
    setNotificationMessage(value: string) {
      this.notificationMessage = value
    },
    setNotificationColor(value: string) {
      this.notificationColor = value
    }
  }
})
