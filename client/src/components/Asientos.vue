<script setup>
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps({
  isAble: Number 
})

const emits = defineEmits(['handle-click'])

function selectSeat(e) {
  emits('handle-click', e.target)
}

const seatState = computed(() => {
  return props.isAble === 1 ? 'available' : 'unavailable'
})
</script>

<template>
  <div :class="seatState" @click="selectSeat">
    <i class="fa-solid fa-box-tissue"></i>
  </div>
</template>


<style scoped>
.available {
  color: #E1F387; 
  height: 50px;
}
.unavailable {
  color: #E1F387; 
  height: 50px;
}
</style>