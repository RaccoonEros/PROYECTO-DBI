<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  id: Number,
  poster: String,
  movieTitle: String,
  duration: Number,
  rated: String,
  sucursal: String
})

const router = useRouter()

function redirectToMovie() {
  const URL = `/${props.sucursal}/proyecciones/${props.movieTitle}/${props.id}`
  router.push({ path: URL })
}

</script>

<template>
  <div id="movie-container">
    <div id="movie-img-container" @click="redirectToMovie">
      <img :src="poster" :alt="movieTitle" class="movie-poster">
    </div> 
    <div id="movie-title-container">
      <h3>{{ movieTitle }}</h3>
    </div> 
    <div id="movie-info-container">
      <h6>{{ rated }}|{{ duration }} Minutos</h6>
    </div> 
    </div>
</template>

<style scoped>
#movie-container {
  height: auto;
  display: flex;
  flex-direction: column;
  background-color: #1D1D1F; /* Dark background color */
  color: #FFFFFF; /* White text color */
  padding: 16px;
  border-radius: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-bottom: 15px;
}

#movie-container:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3); /* Enhanced shadow on hover */
}

#movie-img-container {
  width: 100%;
  margin-bottom: 16px;
}

.movie-poster {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Subtle shadow for depth */
  transition: transform 0.3s ease;
}

.movie-poster:hover {
  transform: scale(1.05); /* Slight zoom on hover */
}

#movie-title-container h3 {
  margin: 0;
  font-size: 24px;
  color: #E1F387; /* Highlighted title color */
  transition: color 0.3s ease;
}

#movie-title-container h3:hover {
  color: #FFFFFF; /* Change title color on hover */
}

#movie-info-container h6 {
  margin: 0;
  font-size: 14px;
  color: #FFFFFF; /* White text color for movie info */
  opacity: 0.8;
}
</style>
