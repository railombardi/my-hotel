<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <strong> MeuHotel.com </strong>
  </header>

  <RouterView />
</template>

<style lang="scss" scoped>
header {
  border-bottom: 1px solid $primaryGreen;

  strong {
    font-size: 20px;
    color: $primaryGreen;
  }
}
</style>
