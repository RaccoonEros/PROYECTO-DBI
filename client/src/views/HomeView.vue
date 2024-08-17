<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Header from '../components/Header.vue'
import Button from '../components/Button.vue';
import MovieCard from '../components/MovieCard.vue';
import Select from '../components/Select.vue'
import Option from '../components/Option.vue'

import { BACKEND_URL } from '../config/data';

const data = ref([])
const sucursales = ref([])
const router = useRouter()
const sucursal = ref({})

async function fetchMoviesByBranch(branchID) {
  try {
    const res = await fetch(BACKEND_URL + `/peliculas/emision/${branchID}`)
    const movies = await res.json()
    return movies.data
  } catch(err) {
    console.log(err)
  }
} 

async function fetchSucursales() { 
  try {
    const res = await fetch(BACKEND_URL + "/peliculas/sucursales")
    const data = await res.json() 
    sucursal.value = data.data[0]
    router.push({ path: '/' })
    return data.data
  } catch(err) {
    console.log(err)
  }
}

function redirectToLogin() {
  router.push({ path: '/gerente/login' })
}

async function getSucursal(e) {
  sucursal.value = JSON.parse(e.target.value)
  const URL = `/${(sucursal.value).Nombre}`
  router.push({ path: URL })
  data.value = await fetchMoviesByBranch((sucursal.value).ID)
}

data.value = await fetchMoviesByBranch(1)
sucursales.value = await fetchSucursales()

onMounted(async () => {
  await fetchMoviesByBranch((sucursal.value).ID)
  await fetchSucursales()
})

</script>


<template>
  <div id="home-main-container">
    <header>
      <Header title="CineFilia">
        <Button text="Login Gerente" @click="redirectToLogin"></Button>
        <Select @handle-event="getSucursal">
          <Option v-for="branch in sucursales" :key="branch.ID" :option-value="JSON.stringify(branch)" :text="branch.Nombre" :selected-value="sucursal.Nombre"></Option>
        </Select>
      </Header>
    </header>
    <main>
      <!-- peliculas van aqui -->
      <h4>Escoge una película</h4>
      <div id="movies-container">
        <MovieCard v-for="movie in data" :sucursal="sucursal.Nombre" :id=movie.ID :duration=movie.Duracion_en_minutos :key="movie.ID" :poster="movie.Poster" :rated="movie.TIPO" :movie-title="movie.Titulo"></MovieCard>
      </div>
    </main>
  </div>
</template>


<style scoped>
header {
  background-color: #1D1D1F;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  color: #E1F387;
}
#home-main-container {
  height: 100vh;
  /*width: 85vw; */
  margin: 0 auto;
  margin-top: 15px;
}
</style>