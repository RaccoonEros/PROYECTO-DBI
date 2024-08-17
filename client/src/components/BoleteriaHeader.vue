<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  title: String
})
</script>

<template>
  <div>
    <div id="title">
      <h3>Asientos {{ title }}</h3>
    </div>
    <div id="header-container">
      <span>TIPO</span>
      <span>PRECIO</span>
      <span>CANTIDAD</span>
  </div>
  </div>
</template>

<style scoped>

#title {
  display: flex;
  justify-content: start;
}

#header-container {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  width: 100%;
}
</style>
