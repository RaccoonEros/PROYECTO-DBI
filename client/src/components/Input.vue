<script setup>
import { defineProps, ref, defineEmits } from "vue";


const props = defineProps({
  inputType: String,
  placeholder: String,
  maxLength: String,
  minLength: String,
  inputValue: String,
  fileType: String
});

const emits = defineEmits(['currentValue'])

function getCurrentValue(e) {
  emits("currentValue", e.target.value)
}

</script>

<template>
  <input
    @change="getCurrentValue"
    :type="inputType"
    :minlength="minLength"
    :maxlength="maxLength"
    :placeholder="placeholder"
    :value="inputValue"
    :accept="fileType"
  />
</template>

<style scoped>
input {
  background-color: #1d1d1f; /* Dark background color */
  color: #ffffff; /* White text color */
  border: 2px solid #e1f387; /* Light green border */
  padding: 10px;
  margin-bottom: 8px;
  font-size: 16px;
  border-radius: 5px;
  outline: none; /* Remove default outline */
  width: 100%; /* Full width */
  box-sizing: border-box; /* Ensure padding and border are included in the width and height */
  transition: border-color 0.3s; /* Smooth transition for border color */
}

/* Change border color and background on focus */
input:focus {
  border-color: #ffffff; /* White border color on focus */
  background-color: #e1f387; /* Light green background color on focus */
  color: #1d1d1f; /* Dark text color on focus */
}

/* Placeholder text styles */
input::placeholder {
  color: #e1f387; /* Light green placeholder text */
  opacity: 0.7; /* Slightly transparent placeholder text */
}
</style>
