<script setup>
import { defineProps } from "vue";

const props = defineProps({
  title: String,
});
</script>

<template>
  <header id="container">
    <div>
      <h2 id="title">{{ title }}</h2>
    </div>
    <div id="buttons-container">
      <slot></slot>
    </div>
  </header>
</template>

<style scoped>
#container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#buttons-container {
  display: flex;
  justify-content: space-evenly;
}

h2 {
  margin-left: 40px;
}
</style>
