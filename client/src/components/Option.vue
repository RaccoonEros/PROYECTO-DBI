<script setup>
import { computed, defineProps } from 'vue';

const props = defineProps({
  optionValue: String,
  text: String,
  selectedValue: String 
})

const isSelected = computed(() => {
  return props.selectedValue == JSON.parse(props.optionValue).Nombre
})
</script>

<template>
  <option :value="optionValue" :selected="isSelected">{{ text }}</option>
</template>

