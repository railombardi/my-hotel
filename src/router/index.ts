import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: 'hotels',
          name: 'hotels',
          component: () => import('../components/hotelList/Index.vue')
        }
      ]
    },
    {
      path: '/hotel/:id',
      name: 'hotel',
      component: () => import('../views/HotelReservation.vue')
    }
  ]
})

export default router
