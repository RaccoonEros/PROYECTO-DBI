<script setup>
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps({
  total: Number
})
</script>

<template>
  <div>
    <h3>Total: L.<span>{{ total }}</span></h3>
  </div>
</template>
