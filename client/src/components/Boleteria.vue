<script setup>
import { ref, defineProps, defineEmits } from "vue";
const props = defineProps({
  tipo: String,
  precio: Number,
  // tickets: Number
});

const MAXTICKETSTOBUY = ref(10)
// const ticketsSelected = ref(props.tickets)

const emits = defineEmits(['handleFunction'])

function getValueSelected(e) {
  emits('handleFunction', e.target)
}

// watch(() => props.tickets, (newValue) => ticketsSelected.value = newValue)
</script>

<template>
  <div id="container">
    <div id="boletos-container">
      <div id="info-container">
        <span>{{ tipo }}</span>
        <span>L.{{ precio }}</span>
      </div>
      <div>
        <select @change="getValueSelected">
          <option v-for="i in MAXTICKETSTOBUY + 1" :key="i" :value="i - 1">{{ i - 1 }}</option>
        </select>
      </div>
    </div>
    <hr>
  </div>
</template>

<style scoped>
hr {
  width: 100%;
}
#boletos-container {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  text-align: center;
}

#info-container {
  display: flex;
  width: 51%;
  justify-content: space-between;
}

</style>
