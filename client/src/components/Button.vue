<script setup>
  import { defineProps, defineEmits } from 'vue';

  const props = defineProps({
    text: String,
    type: String
  })

  const emits = defineEmits(['handleClick'])

  function buttonAction() {
    emits("handleClick")
  }
</script>

<template>
  <button @click="buttonAction">{{ text }}</button>
</template>

