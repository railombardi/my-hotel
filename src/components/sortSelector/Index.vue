<template>
  <div class="sort-selector">
    <v-menu v-model="menu" :close-on-content-click="false" transition="scale-transition">
      <template #activator="{ props }">
        <v-btn v-bind="props" variant="outlined" class="sort-button" @click="menu = true">
          <v-icon left>mdi-sort</v-icon>
          Ordenar por: {{ selectedSort }}
          <v-icon right>mdi-chevron-down</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="option in sortOptions" :key="option.value" @click="selectSort(option)">
          <v-list-item-title>{{ option.label }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useHotelStore } from '@/stores/hotel'

export default defineComponent({
  name: 'SortSelector',
  setup() {
    const hotelStore = useHotelStore()

    const menu = ref(false)

    const sortOptions = ref([
      { value: 'rating', label: 'Classificação' },
      { value: 'price-low-high', label: 'Preço: menor para maior' },
      { value: 'price-high-low', label: 'Preço: maior para menor' },
      { value: 'ascending-alphabetical', label: 'Nome: A-Z' },
      { value: 'descending-alphabetical', label: 'Nome: Z-A' }
    ])

    const selectedSort = computed(
      () => sortOptions.value.find((option) => option.value === hotelStore.sortList)?.label || ''
    )

    const selectSort = (option: { value: string; label: string }) => {
      menu.value = false
      hotelStore.setSortList(option.value)
    }

    return {
      menu,
      selectedSort,
      sortOptions,
      selectSort
    }
  }
})
</script>

<style scoped lang="scss">
.sort-selector {
  position: relative;

  .sort-button {
    border-radius: 30px;
  }
}
</style>
