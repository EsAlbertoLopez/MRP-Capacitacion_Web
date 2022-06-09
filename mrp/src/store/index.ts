// Importaciones del archivo
import Vue from 'vue'
import Vuex, { mapActions } from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import axios from 'axios';
import Cookies from 'js-cookie';
const crypto = require('crypto');

//Uso de Vuex
Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [
        createPersistedState({
            key: 'Windows',
            storage: window.sessionStorage,
        })
      
    ],
    state: {

    },
    getters: {

    },
    mutations: {

    },
    actions: {
        cargaArchivo({commit, state}, data){
            return new Promise((resolve, reject) => {
                axios.post('http://35.199.30.118:3000/keyence/createArchivo', data,{
                    headers: {
            
                    }
                })
                .then((response: any) => {
                    resolve(response.data);
                })
                .catch((error: any) => {
                    resolve({replyCode: 400, replyText: error.message, data: []});
                });
            })
        },

        recuperaArchivos({commit, state}, data){
            return new Promise((resolve, reject) => {
                axios.get('http://35.199.30.118:3000/keyence/recuperaArchivos', {
                    headers: {
            
                    }
                })
                .then((response: any) => {
                    resolve(response.data);
                })
                .catch((error: any) => {
                    resolve({replyCode: 400, replyText: error.message, data: []});
                });
            })
        },

        recuperaArchivoDetalle({commit, state}, data){
            return new Promise((resolve, reject) => {
                axios.get(`http://35.199.30.118:3000/keyence/recuperaArchivoDetalle/`+data, {
                    headers: {
            
                    }
                })
                .then((response: any) => {
                    resolve(response.data);
                })
                .catch((error: any) => {
                    resolve({replyCode: 400, replyText: error.message, data: []});
                });
            })
        },

        recuperaUsuarios({commit, state}, data){
            return new Promise((resolve, reject) => {
                axios.get('http://35.199.30.118:3000/keyence/recuperaUsuarios', {
                    headers: {
            
                    }
                })
                .then((response: any) => {
                    resolve(response.data);
                })
                .catch((error: any) => {
                    resolve({replyCode: 400, replyText: error.message, data: []});
                });
            })
        },

        actualizaUsuarios({commit, state}, data){
            return new Promise((resolve, reject) => {
                axios.post(`http://35.199.30.118:3000/keyence/actualizaUsuarios`, data, {
                    headers: {
            
                    }
                })
                .then((response: any) => {
                    resolve(response.data);
                })
                .catch((error: any) => {
                    resolve({replyCode: 400, replyText: error.message, data: []});
                });
            })
        },

        eliminarArchivo({commit, state}, data){
            return new Promise((resolve, reject) => {
                axios.post(`http://35.199.30.118:3000/keyence/deleteArchivo`, data, {
                    headers: {
            
                    }
                })
                .then((response: any) => {
                    resolve(response.data);
                })
                .catch((error: any) => {
                    resolve({replyCode: 400, replyText: error.message, data: []});
                });
            })
        }, 

        eliminarUsuario({commit, state}, data){
            return new Promise((resolve, reject) => {
                axios.post(`http://35.199.30.118:3000/keyence/eliminaUsuario`, data, {
                    headers: {
            
                    }
                })
                .then((response: any) => {
                    resolve(response.data);
                })
                .catch((error: any) => {
                    resolve({replyCode: 400, replyText: error.message, data: []});
                });
            })
        }
    },

    modules: {
    }
})

