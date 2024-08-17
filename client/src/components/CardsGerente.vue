<script setup>
import { defineProps, defineEmits } from "vue";
import Button from "./Button.vue";

const props = defineProps({
  title: String,
  description: String,
  colorIndex: Number
});

const emits = defineEmits(["handleAction", "showSavedItems"]);

function redirectoToForms(e) {
  emits("handleAction", e);
}

function redirectToSaveItems(e) {
  emits('showSavedItems', e)
}

const colors = [
  "rgb(0, 0, 0)",
  "rgb(54, 69, 79)",
  "rgb(2, 48, 32)",
  "rgb(48, 25, 52)",
  "rgb(52, 52, 52)",
  "rgb(27, 18, 18)",
  "rgb(40, 40, 43)",
  "rgb(25, 25, 112)",
  "rgb(53, 57, 53)",
];
</script>

<template>
  <div id="container" :style="{ backgroundColor: colors[colorIndex] }">
    <div>
      <h3>{{ title }}</h3>
    </div>
    <div>
      <h5>{{ description }}</h5>
    </div>
    <div>
      <Button @click="redirectoToForms" id="btn-info" text="More info"></Button>
      <Button @click="redirectToSaveItems" id="btn-show" text="Ver guardados"></Button>
    </div>
  </div>
</template>

<style scoped>
#container {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 360px;
  height: 200px;
  border-radius: 8px;
  margin: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

#btn-show {
  margin-left: 4px;
}
</style>
