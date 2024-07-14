<script lang="ts">
import { defineComponent } from 'vue'

import HotelSearchForm from '../components/hotelSearchForm/Index.vue'
import HotelList from '../components/hotelList/Index.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    HotelSearchForm,
    HotelList
  }
})
</script>

<template>
  <main>
    <HotelSearchForm />
    <HotelList />
  </main>
</template>

<style scoped lang="scss">
main {
  margin-top: 80px;
}
</style>
