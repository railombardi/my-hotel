<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <span> MeuHotel.com </span>
  </header>

  <RouterView />
</template>

<style lang="scss" scoped>
header {
  border-bottom: 1px solid $primaryGreen;

  span {
    font-size: 20px;
    color: $primaryGreen;
  }
}
</style>
