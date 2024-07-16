<template>
  <v-snackbar
    v-model="visible"
    :timeout="timeout"
    :color="color"
    position="absolute"
    location="top"
  >
    {{ message }}
    <template #actions>
      <v-btn @click="visible = false">Close</v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'NotificationBar',
  props: {
    message: {
      type: String,
      required: true
    },
    timeout: {
      type: Number,
      default: 6000
    },
    color: {
      type: String,
      default: 'success'
    }
  },
  setup(props) {
    const visible = ref(true)

    return {
      visible,
      props
    }
  }
})
</script>
