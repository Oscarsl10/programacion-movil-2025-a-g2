import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Cliente from '../views/Cliente.vue';
import Empleado from '../views/Empleado.vue';
import Proveedor from '../views/Proveedor.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/cliente'
  },
  {
    path: '/cliente',
    name: 'Cliente',
    component: Cliente
  },
  {
    path: '/empleado',
    name: 'Empleado',
    component: Empleado
  },
  {
    path: '/proveedor',
    name: 'Proveedor',
    component: Proveedor
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
