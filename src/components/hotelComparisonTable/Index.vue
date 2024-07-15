<template>
  <v-data-table :headers="headers as any" :items="hotels" item-value="id" class="elevation-1">
    <template v-slot:item="{ item }">
      <tr>
        <td>{{ item.name }}</td>
        <td>{{ item.city }}</td>
        <td>{{ item.rooms }}</td>
        <td>{{ item.guests }}</td>
        <td>${{ item.price }}</td>
        <td>{{ item.rate }}/5</td>
        <td>
          <v-btn color="#00bd7e"> Reservar </v-btn>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

interface Hotel {
  id: number
  name: string
  rooms: number
  guests: number
  rate: number
  price: number
  city: string
  img?: string
}

export default defineComponent({
  name: 'HotelComparisonTable',
  props: {
    hotels: {
      type: Array as PropType<Hotel[]>,
      required: true
    }
  },
  setup() {
    const headers = [
      { title: 'Nome do Hotel', align: 'start', key: 'name' },
      { title: 'Cidade', key: 'city' },
      { title: 'Quartos', key: 'rooms' },
      { title: 'Hóspedes', key: 'guests' },
      { title: 'Preço', key: 'price' },
      { title: 'Avaliação', key: 'rate' },
      { title: 'Ação' }
    ]

    return {
      headers
    }
  }
})
</script>
