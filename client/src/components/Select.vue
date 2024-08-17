<script setup>
import { defineEmits } from 'vue';

const emits = defineEmits(['handleEvent'])

function getItemValue(e) {
  emits('handleEvent', e)
}
</script>


<template>
  <select class="custom-select" @change="getItemValue">
    <slot></slot>
  </select>
</template>


<style scoped>
.custom-select {
  width: 100%;
  background-color: #1D1D1F; /* Dark background */
  color: #e1f387; /* White text */
  border: 2px solid #E1F387; /* Light green border */
  border-radius: 5px; /* Slightly rounded corners */
  padding: 10px; /* Padding for better spacing */
  font-size: 16px; /* Font size */
  appearance: none; /* Remove default arrow for better styling */
  cursor: pointer; /* Pointer cursor on hover */
  margin-bottom: 8px;
}

/* Optional: Add styles for hover and focus states */
.custom-select:hover {
  border-color: #FFFFFF; /* Change border color on hover */
}

.custom-select:focus {
  outline: none; /* Remove outline */
  border-color: #E1F387; /* Keep border color on focus */
}
</style>
