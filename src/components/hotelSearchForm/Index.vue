<template>
  <v-container class="search-form">
    <v-form @submit.prevent="submitForm">
      <v-row>
        <v-col cols="12" md="6">
          <v-select v-model="form.city" label="Destino" :items="cities" clearable></v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-menu v-model="checkInMenu" transition="scale-transition" offset-y min-width="290px">
            <template #activator="{ on, attrs }">
              <v-text-field
                v-model="formattedCheckIn"
                label="Data de Check-in"
                :rules="[rules.required]"
                readonly
                v-bind="attrs"
                v-on="{ ...on }"
                @click="checkInMenu = true"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="form.checkIn"
              @input="updateCheckInDate"
              :min="new Date()"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="6">
          <v-menu v-model="checkOutMenu" transition="scale-transition" offset-y min-width="290px">
            <template #activator="{ on, attrs }">
              <v-text-field
                v-model="formattedCheckOut"
                label="Data de Check-out"
                :rules="[rules.required]"
                readonly
                v-bind="attrs"
                v-on="{ ...on }"
                @click="checkOutMenu = true"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="form.checkOut"
              @input="updateCheckOutDate"
              :min="form.checkIn || new Date()"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.rooms"
            label="Número de Quartos"
            type="number"
            min="1"
            readonly
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.guests"
            label="Número de Hóspedes"
            type="number"
            min="1"
            required
          ></v-text-field>
        </v-col>
        <v-col class="d-flex justify-center" cols="12" md="6" align-self="start">
          <v-btn size="large" type="submit" color="#00bd7e">Pesquisar</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { cities } from '@/helpers/cities.ts'

export default defineComponent({
  name: 'HotelSearchForm',
  emits: ['submit'],
  setup(props, { emit }) {
    const form = ref({
      city: '',
      checkIn: null as Date | null,
      checkOut: null as Date | null,
      rooms: 1,
      guests: 1
    })
    const checkInMenu = ref(false)
    const checkOutMenu = ref(false)
    const validatedForm = ref(true)
    const rules = ref({
      required: (value) => !!value || 'Campo obrigatório*'
    })

    const formattedCheckIn = computed({
      get() {
        return form.value.checkIn ? form.value.checkIn.toLocaleDateString() : ''
      },
      set(value) {
        form.value.checkIn = parse(value, 'dd/MM/yyyy', new Date())
      }
    })

    const formattedCheckOut = computed({
      get() {
        return form.value.checkOut ? form.value.checkOut.toLocaleDateString() : ''
      },
      set(value) {
        form.value.checkOut = parse(value, 'dd/MM/yyyy', new Date())
      }
    })

    const validateForm = computed(() => {
      return form.value.checkIn && form.value.checkOut
    })

    const updateCheckInDate = (date: Date) => {
      form.value.checkIn = date
      checkInMenu.value = false
    }

    const updateCheckOutDate = (date: Date) => {
      form.value.checkOut = date
      checkOutMenu.value = false
    }

    const submitForm = () => {
      validatedForm.value = validateForm.value
      if (validatedForm.value) {
        emit('submit', form.value)
      }
    }

    return {
      form,
      checkInMenu,
      checkOutMenu,
      formattedCheckIn,
      formattedCheckOut,
      validateForm,
      rules,
      updateCheckInDate,
      updateCheckOutDate,
      submitForm,
      cities
    }
  }
})
</script>
