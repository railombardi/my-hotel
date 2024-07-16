<template>
  <v-container class="reservation-form">
    <v-row>
      <v-col cols="12" md="4">
        <v-card>
          <v-img v-if="hotel.img" :src="hotel.img" height="200" aspect-ratio="16/9" cover>
            <template v-slot:placeholder>
              <v-row class="fill-height" align="center" justify="center">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
              </v-row>
            </template>
          </v-img>
          <v-card-title>{{ hotel.name }}</v-card-title>
          <v-card-subtitle>{{ hotel.city }}</v-card-subtitle>
          <v-card-text>
            <div>Valor: ${{ hotel.price }}/noite</div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="8">
        <v-form ref="reservationForm" @submit.prevent="submitForm">
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field v-model="formData.firstName" label="Nome" required></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="formData.lastName" label="Sobrenome" required></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="formData.email"
                label="Endereço de e-mail"
                type="email"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                v-model="formData.country"
                :items="countries"
                label="País/região"
                required
              ></v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="formData.phoneNumber"
                label="Telefone (número do telemóvel se possível)"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-checkbox
                v-model="formData.receiveConfirmation"
                label="Sim, gostaria de receber uma confirmação digital gratuita (recomendado)"
              ></v-checkbox>
            </v-col>
          </v-row>

          <v-card-title>Detalhes de Pagamento</v-card-title>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="formData.paymentDetails.cardNumber"
                label="Número do Cartão"
                required
                maxlength="16"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="formData.paymentDetails.cardName"
                label="Nome no Cartão"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="formData.paymentDetails.cardCVV"
                label="CVV"
                required
                maxlength="3"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-btn size="large" type="submit" color="#00bd7e" :disabled="!isValidForm">
              Reservar
            </v-btn>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import type { PropType } from 'vue'
import { useReservationStore } from '@/stores/reservation'
import { useNotificationStore } from '@/stores/notification'
import { useRouter } from 'vue-router'

interface PaymentDetails {
  cardNumber: string
  cardName: string
  cardCVV: string
}

interface FormData {
  firstName: string
  lastName: string
  email: string
  country: string
  phoneNumber: string
  receiveConfirmation: boolean
  paymentDetails: PaymentDetails
}

interface Hotel {
  id: number
  name: string
  city: string
  price: number
  img?: string
}

export default defineComponent({
  name: 'HotelReservationForm',
  props: {
    hotel: {
      type: Object as PropType<Hotel>,
      required: true
    }
  },
  setup(props) {
    const reservationStore = useReservationStore()
    const notificationStore = useNotificationStore()
    const router = useRouter()

    const formData = ref<FormData>({
      firstName: '',
      lastName: '',
      email: '',
      country: 'Brasil',
      phoneNumber: '',
      receiveConfirmation: false,
      paymentDetails: {
        cardNumber: '',
        cardName: '',
        cardCVV: ''
      }
    })

    const countries = ['Brasil', 'Argentina', 'Chile', 'Uruguai', 'Paraguai']
    const reservationForm = ref(null)

    const isValidForm = computed(() => {
      const { firstName, lastName, email, country, phoneNumber, paymentDetails } = formData.value
      return (
        firstName &&
        lastName &&
        email &&
        country &&
        phoneNumber &&
        paymentDetails.cardNumber &&
        paymentDetails.cardName &&
        paymentDetails.cardCVV
      )
    })

    const submitForm = () => {
      const reservation = {
        ...formData.value,
        hotelId: props.hotel.id
      }
      reservationStore
        .addReservation(reservation)
        .then(async () => {
          notificationStore.setNotificationMessage('Reserva realizada com sucesso!')
          notificationStore.setNotificationColor('success')
          await router.push({
            path: '/hotels'
          })
        })
        .catch(() => {
          notificationStore.setNotificationMessage('Falha ao realizar a reserva. Tente novamente.')
          notificationStore.setNotificationColor('error')
        })
    }

    return {
      formData,
      reservationForm,
      isValidForm,
      submitForm,
      countries
    }
  }
})
</script>
<style lang="scss" scoped>
.reservation-form {
  position: relative;
}
</style>
