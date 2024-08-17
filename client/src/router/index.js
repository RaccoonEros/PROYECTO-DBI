import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import BoleteriaView from '../views/BoleteriaView.vue';
import HomeView from '../views/HomeView.vue'
import GerenteHomeView from '../views/GerenteHomeView.vue'
import GerenteFormsView from '../views/GerenteFormsView.vue'
import AsientosView from '../views/AsientosView.vue'
import Prueba from '../views/Prueba.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView 
   // redirect: '/login'
  },
  {
    path: '/:sucursal',
    name: 'HomeSucursal',
    component: HomeView
  },
  {
    path: '/gerente/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/gerente/form/:feature',
    name: 'GerenteFeatures',
    component: GerenteFormsView 
  },
  {
    path: '/:sucursal/proyecciones/:name/:id',
    name: 'Proyeccion',
    component: Prueba
  },
  {
    path: '/:sucursal/proyecciones/:name/:id/:idProyeccion',
    name: 'Boleteria',
    component: BoleteriaView
  },
  {
    path: '/:sucursal/proyecciones/:name/:id/:idProyeccion/asientos',
    name: 'Asientos',
    component: AsientosView
  },
  {
    path: '/gerente',
    name: 'GerenteHome',
    component: GerenteHomeView,
    meta: { requiresAuth: true, }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
