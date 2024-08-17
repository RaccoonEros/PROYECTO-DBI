<script setup>
import { useRouter } from "vue-router";
import Header from "../components/Header.vue";
import Button from "../components/Button.vue";
import CardsGerente from "../components/CardsGerente.vue";
import { onMounted } from "vue";

const router = useRouter();

function logOut() {}

function redirectoToForms(e, feature) {
  const redirectPath = `/gerente/form/${feature}`;
  router.push({ path: redirectPath })
  //window.location = redirectPath;
}
</script>

<template>
  <div id="gerente-container">
    <header id="gerente-header-container">
      <Header title="GERENTE">
        <Button text="Log out" @handle-click="logOut"></Button>
      </Header>
    </header>
    <main id="gerente-main-container">
      <CardsGerente
        @handle-action="(e) => redirectoToForms(e, 'proyecciones')"
        title="Proyecciones"
        description="Llenado información de proyecciones"
        :color-index="1"
      ></CardsGerente>
      <CardsGerente
        @handle-action="(e) => redirectoToForms(e, 'precios')"
        title="Precios"
        description="Llenado información de precios"
        :color-index="2"
      ></CardsGerente>
      <CardsGerente
        @handle-action="(e) => redirectoToForms(e, 'salas')"
        title="Salas"
        description="Llenado información de nueva sala"
        :color-index="3"
      ></CardsGerente>
      <CardsGerente
        @handle-action="(e) => redirectoToForms(e, 'peliculas')"
        title="Películas"
        description="Llenado información de nueva película"
        :color-index="4"
      ></CardsGerente>
      <CardsGerente
        @handle-action="(e) => redirectoToForms(e, 'sucursales')"
        title="Sucursales"
        description="Llenado información de nueva sucursal"
        :color-index="5"
      ></CardsGerente>
      <CardsGerente
        @handle-action="(e) => redirectoToForms(e, 'productos')"
        title="Productos"
        description="Llenado información de nuevo productos"
        :color-index="6"
      ></CardsGerente>
      <CardsGerente
        @handle-action="(e) => redirectoToForms(e, 'combos')"
        title="Combos"
        description="Llenado información de nueva combos"
        :color-index="7"
      ></CardsGerente>
      <CardsGerente
        @handle-action="(e) => redirectoToForms(e, 'clasificaciones')"
        title="Clasificaciones"
        description="Llenado información de clasificaciones"
        :color-index="8"
      ></CardsGerente>
      <CardsGerente
        @handle-action="(e) => redirectoToForms(e, 'empleados')"
        title="Empleados"
        description="Llenado información de empleados"
        :color-index="0"
      ></CardsGerente>
    </main>
    <div></div>
  </div>
</template>

<style scoped>
#gerente-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 85vw;
  margin-bottom: 80px;
}

#gerente-header-container {
  margin-bottom: 40px;
}

#gerente-main-container {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}
</style>
