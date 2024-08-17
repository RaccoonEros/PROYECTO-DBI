<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const sala = ref(0)
const router = useRoute()

async function fetchProyeccion() {
  const res = await fetch(`/boletos/proyecciones/${router.params.idProyeccion}`)
  const data = await res.json()
  return data.data
}

const info = await fetchProyeccion()
sala.value = info.Numero_Sala

onMounted(async () => {
  await fetchProyeccion()
})

</script>


<template>
  <div>
    <h3>SALA {{ sala }}</h3>
    <div>
      <svg _ngcontent-pvs-c146="" id="screen" preserveAspectRatio="xMidYMin slice" viewBox="0 0 350 120"><path _ngcontent-pvs-c146="" d="m 20 5 a 310 30 0 0 1 310 0 l -17 10 a 276 25 0 0 0 -276 0" fill="#ebeced"></path></svg> 
    </div>
  </div>
</template>