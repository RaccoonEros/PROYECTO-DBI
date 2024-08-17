<script setup>
import { onMounted, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import Boleteria from "../components/Boleteria.vue";
import BoleteriaHeader from "../components/BoleteriaHeader.vue";
import Button from "../components/Button.vue";
import { BACKEND_URL } from "../config/data";

const router = useRoute();
const route = useRouter();

const proyeccion = ref(router.params.idProyeccion);
const data = ref([]);
const pricesPerChair = ref({});
const tickets = ref({});
const totalTicketsSelected = ref(0);

async function fetchData() {
  try {
    const res = await fetch(
      BACKEND_URL + `/boletos/precios/${proyeccion.value}`
    );
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.log(err);
  }
}

data.value = await fetchData();

data.value.forEach((el) => {
  if (!pricesPerChair.value[el.Nombre]) pricesPerChair.value[el.Nombre] = [];

  pricesPerChair.value[el.Nombre].push(el);
});

function calculatePrice(price, pricePerChair) {
  return price + pricePerChair;
}

function updateTotalTickets(e, tipo, precio, tipoAsiento) {
  const value = parseInt(e.value);
  tickets.value[tipo + tipoAsiento] = [value, precio];

  totalTicketsSelected.value = 0;
  Object.keys(tickets.value).forEach((key) => {
    totalTicketsSelected.value += tickets.value[key][0];
  });
}

const total = computed(() => {
  let sum = 0;
  Object.keys(tickets.value).forEach((key) => {
    sum += tickets.value[key][0] * tickets.value[key][1];
  });
  return sum;
});

onMounted(async () => {
  await fetchData();
});

function rediretToGetChairs() {
  if (totalTicketsSelected.value <= 0 || totalTicketsSelected.value > 10) {
    alert("Tienes que elegir una cantidad de boletos entre 1 y 10");
    return;
  }
  const sucursal = router.params.sucursal;
  const name = router.params.name;
  const id = router.params.id;
  const idProyeccion = router.params.idProyeccion;

  const CHAIR_URL = `/${sucursal}/proyecciones/${name}/${id}/${idProyeccion}/asientos`;
  route.push({ path: CHAIR_URL });
}
</script>

<template>
  <div id="main-tickets-container">
    <template v-for="(value, key) in pricesPerChair" :key="key">
      <BoleteriaHeader :title="value[0].Nombre"></BoleteriaHeader>
      <div v-for="(el, idx) in value" :key="idx">
        <Boleteria
          :precio="calculatePrice(el.Precio, el.Valor_Agregado)"
          :tipo="el.Tipo"
          :key="el.id || idx"
          @handle-function="
            (e) =>
              updateTotalTickets(
                e,
                el.Tipo,
                el.Precio + el.Valor_Agregado,
                el.Nombre
              )
          "
        ></Boleteria>
      </div>
    </template>
    <div id="footer-container-info">
      <div id="footer-container-info-tickets">
        <h4>TOTAL: L.{{ total }}</h4>
        <div>
          <i class="fa-solid fa-ticket"></i>
          <span>x{{ totalTicketsSelected }}</span>
        </div>
      </div>
      <Button text="Siguiente" @handle-click="rediretToGetChairs"></Button>
    </div>
  </div>
</template>

<style scoped>
#main-tickets-container {
  width: 100%;
}

#footer-container-info {
  display: flex;
  flex-direction: column;
}

#footer-container-info-tickets {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

i {
  font-size: 30px;
  margin-right: 10px;
}

span {
  font-size: 20px
}
</style>
