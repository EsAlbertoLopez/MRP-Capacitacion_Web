// Importaciones del archivo
import Vue from 'vue'
import VueRouter, {RouteConfig} from "vue-router"
import Examen from '../components/Examen.vue';
import Inicio from '../components/Inicio.vue';
import Login from '../components/Login.vue';
import Registro from '../components/RegistroProfesores.vue';
import { component } from 'vue/types/umd';
import store from '../store/';

//Router para las rutas
Vue.use(VueRouter)

//Funciones
function isDefined(param: any) {
    return param !== null && param !== undefined && param !== '';
}

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
            beforeEnter: (to, from, next) => {
                if (isDefined(store.state.idUsuario)) {
                  next();
                } else {
                  next('/');
                }
            },
        },
        {
            path: '/inicio',
            name: 'inicio',
            component: Inicio,
            beforeEnter: (to, from, next) => {
                if (isDefined(store.state.idUsuario)) {
                  next();
                } else {
                  next('/');
                }
            },
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
  


