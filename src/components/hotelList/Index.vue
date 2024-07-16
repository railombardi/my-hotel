<template>
  <v-container class="hotels-list">
    <v-row class="hotels-list__title">
      <h2>Esses são os hotéis compatíveis com sua busca:</h2>
      <SortSelector />
    </v-row>
    <v-row class="hotels-list__compare">
      <h3>
        {{ comparisonTitle }}
      </h3>
      <v-btn v-if="!confirmedComparison" color="#00bd7e" @click="handleCompare">
        {{ compareText }}
      </v-btn>
      <span v-if="isComparisonMode && comparisonBlock && !confirmedComparison">
        Selecione ao menos 2 hotéis para comparar
      </span>
      <v-btn
        v-if="isComparisonMode && !confirmedComparison"
        color="#00bd7e"
        variant="outlined"
        @click="handleSelectAll"
      >
        {{ selectAll ? 'Limpar seleção' : 'Selecionar todos' }}
      </v-btn>
      <v-btn v-if="isComparisonMode" color="red" variant="outlined" @click="handleCancelCompare">
        Cancelar comparação
      </v-btn>
    </v-row>
    <v-row v-if="!isComparisonMode || (isComparisonMode && !confirmedComparison)">
      <v-col v-for="hotel in hotels" :key="hotel.id" cols="12" sm="6" md="4" lg="3">
        <HotelCard
          :hotel="hotel"
          :is-comparison-mode="isComparisonMode"
          :selected="hotelWasSelected(hotel)"
          @select="selectHotel(hotel)"
          @unselect="unselectHotel(hotel)"
          @redirect-to-reservation="handleRedirect(hotel.id)"
        />
      </v-col>
    </v-row>
    <HotelComparisonTable v-else :hotels="selectedForComparison" />
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import type { PropType } from 'vue'
import { useHotelStore } from '@/stores/hotel'

import HotelCard from '@/components/hotelCard/Index.vue'
import SortSelector from '@/components/sortSelector/Index.vue'
import HotelComparisonTable from '@/components/hotelComparisonTable/Index.vue'

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
  name: 'HotelList',
  components: {
    HotelCard,
    SortSelector,
    HotelComparisonTable
  },
  props: {
    hotels: {
      type: Array as PropType<Hotel[]>,
      required: true
    }
  },
  setup(props) {
    const hotelStore = useHotelStore()

    const isComparisonMode = ref(false)
    const confirmedComparison = ref(false)
    const selectedForComparison = ref<Hotel[]>([])
    const selectAll = ref(false)
    const comparisonBlock = ref(false)

    const comparisonTitle = computed(() => {
      if (confirmedComparison.value) {
        return 'Aqui estão os hotéis selecionados para comparação:'
      }

      if (isComparisonMode.value) {
        return 'Selecione hotéis para comparar clicando nos cards'
      }

      return 'Deseja comparar as opções?'
    })

    const compareText = computed(() =>
      isComparisonMode.value
        ? `Comparar selecionados (${selectedForComparison.value.length})`
        : 'Comparar'
    )

    const handleCompare = () => {
      if (!isComparisonMode.value) {
        isComparisonMode.value = true
      } else {
        if (selectedForComparison.value.length <= 1) {
          comparisonBlock.value = true
          return
        }
        confirmedComparison.value = true
      }
    }

    const handleCancelCompare = () => {
      isComparisonMode.value = false
      confirmedComparison.value = false
      selectAll.value = false
      selectedForComparison.value = []
      comparisonBlock.value = false
    }

    const handleSelectAll = () => {
      selectAll.value = !selectAll.value

      if (selectAll.value) {
        selectedForComparison.value = [...props.hotels]
      } else {
        selectedForComparison.value = []
      }
    }

    const hotelWasSelected = (hotel: Hotel) => {
      return !!(
        isComparisonMode.value &&
        selectedForComparison.value.some((selected) => selected.id === hotel.id)
      )
    }

    const selectHotel = (hotel: Hotel) => {
      selectedForComparison.value.push(hotel)
    }

    const unselectHotel = (hotel: Hotel) => {
      const index = selectedForComparison.value.findIndex((selected) => selected.id === hotel.id)
      selectedForComparison.value.splice(index, 1)
    }

    const handleRedirect = (id: number) => {
      const checkIn = hotelStore.search.checkIn
      const checkOut = hotelStore.search.checkOut

      if (checkIn && checkOut) {
        window.location.href = `/hotel/${id}?checkIn=${checkIn.toLocaleDateString()}&checkOut=${checkOut.toLocaleDateString()}`
      }
    }

    return {
      isComparisonMode,
      confirmedComparison,
      selectedForComparison,
      selectAll,
      comparisonBlock,
      comparisonTitle,
      compareText,
      handleCompare,
      handleCancelCompare,
      handleSelectAll,
      hotelWasSelected,
      selectHotel,
      unselectHotel,
      handleRedirect
    }
  }
})
</script>

<style scoped lang="scss">
.hotels-list {
  &__title {
    display: flex;
    justify-content: space-between;
    font-weight: 600;
    border-bottom: 1px solid $primaryGreen;
    padding-bottom: 8px;
  }

  &__compare {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 12px;
    padding: 20px 0;
  }

  &__card {
    margin: 10px;
  }
}
</style>
