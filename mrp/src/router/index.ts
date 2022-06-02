// Importaciones del archivo
import Vue from 'vue'
import VueRouter, {RouteConfig} from "vue-router"
import Principal from '../components/Principal.vue';
import Examen from '../components/Examen.vue';
import Inicio from '../components/Inicio.vue';
import Login from '../components/Login.vue';
import Registro from '../components/RegistroProfesores.vue';
import { component } from 'vue/types/umd';

//Router para las rutas
Vue.use(VueRouter)

//Rutas
const routes: Array<RouteConfig> = 
    [
        {
            path: '/',
            name: 'login',
            component: Login,
        },
        {
            path: '/examen',
            name: 'examen',
            component: Examen,
        },
        {
            path: '/inicio',
            name: 'inicio',
            component: Inicio,
        },
        {
            path: '/registro',
            name: 'registro',
            component: Registro,
        }
    ]


const router = new VueRouter({
    mode: 'history',
    base: "/",
    routes
  })


export default router;
  


