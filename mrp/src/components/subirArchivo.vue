<template>
    <v-app>
        <v-dialog 
                transition="dialog-top-transition"  
                v-show="alerta === true"
                v-model="alerta" 
                width="30%"
                style="margin-left: auto; margin-right: auto"
            >
                <v-toolbar 
                dark 
                color="primary"
                style="margin-left: auto; margin-right: auto"
                >
                    <v-toolbar-title>{{mensaje}}</v-toolbar-title>
                    <v-btn color="red" rounded @click="alerta=false" max-width="40px" style="margin-left: auto">
                        <v-icon> mdi-window-close </v-icon>
                    </v-btn>
                </v-toolbar>
        </v-dialog>
        <v-card
            style="width: 30%; margin-top: 1%; margin-left: auto; margin-right: auto; margin-bottom: auto; margin-top:"
        >
            <v-card-title>
                <p style="margin-left: auto; margin-right: auto">Carga de archivos</p>
            </v-card-title>
            <v-card-subtitle>
                <p style="text-align: center">Pantalla para cargar los archivo.</p>
            </v-card-subtitle>
            <v-card-text>
                <v-file-input
                    v-model="formato"
                    show-size
                    label="Archivo"
                    style="width: 70%; margin-left: auto; margin-right: auto; margin-top: 2%"
                >
                    Archivo
                </v-file-input>
            </v-card-text>
            <v-card-actions>
                <v-btn color="blue" rounded @click="cargaArchivo" style="margin-top: 3%; margin-left: auto; margin-right: auto; width: 30%; margin-bottom: 3%">
                    Cargar archivo
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-app>
</template>

<script lang='ts'>
import { Component, Vue, Watch } from "vue-property-decorator";
    @Component({
    })
    export default class Archivo extends Vue {
        private alerta: any = false
        private mensaje: any = ""
        private formato: any = ""
        private instFormData = new FormData();

        async cargaArchivo() {
            let instFormData = new FormData();
            instFormData.append('archivo', this.formato, this.formato.name)
            let resultado = await this.$store.dispatch('cargaArchivo', instFormData)
            if(resultado.replyCode === 200) {
                console.log(resultado)
                this.mensaje = "El archivo se cargo con exito"
                this.alerta = true
                this.formato = ""
            } else {
                this.mensaje = "Error al cargar el archivo"
                this.alerta = true
            }
        }
    }
</script>