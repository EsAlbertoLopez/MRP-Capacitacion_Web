// Importaciones del archivo
import Vue from 'vue'
import VueRouter, {RouteConfig} from "vue-router"
import { component } from 'vue/types/umd';
import store from '../store/';
import verArchivos from '../components/verArchivo.vue';
import subirArchivo from '../components/subirArchivo.vue';
import verUsuarios from '../components/verUsuarios.vue';

//Router para las rutas
Vue.use(VueRouter)

//Rutas
const routes: Array<RouteConfig> = 
    [
        {
            path: '/',
            name: 'verArchivo',
            component: verArchivos,    
        },
        {
            path: '/ver',
            name: 'verUsuarios',
            component: verUsuarios,    
        },
        {
          path: '/subir',
          name: 'subir',
          component: subirArchivo,    
        }
    ]


const router = new VueRouter({
    mode: 'history',
    base: "/keyence",
    routes
  })


export default router;
  


