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
            style="width: 80%; margin-top: 1%; margin-left: auto; margin-right: auto"
            v-show="this.detalleArchivo === true"
        >
            <v-btn color="red" rounded @click="detalleArchivo=false" style="margin-top: 3%; margin-left: 90%">
                <v-icon> mdi-window-close </v-icon>
            </v-btn>
            <v-card-title>
                <p style="margin-left: auto; margin-right: auto">Archivo {{this.idCard}}</p>
            </v-card-title>
            <v-card-subtitle>
                <p style="text-align: center">En esta pantalla podrás ver el detalle del archivo.</p>
            </v-card-subtitle>
            <v-card-text>
                <p>Fecha creación: {{this.fechaCreacionCard}}</p>
                <v-data-table
                    title="Archivo"
                    :headers="this.headersArchivo"
                    :items="this.datosCard"
                    item-key="id"
                    return-object
                >
                </v-data-table> -->
            </v-card-text>
            <v-card-actions>
                <v-btn color="red" rounded @click="eliminarArchivo" max-width="100px" style="margin-top: 3%; margin-left: 90%">
                    Eliminar Archivo
                </v-btn>
            </v-card-actions>
        </v-card>
        <v-card
            v-show="this.detalleArchivo === false"
            style="width: 80%; margin-top: 1%; margin-left: auto; margin-right: auto"
        >
            <v-card-title>
                <p style="margin-left: auto; margin-right: auto">Archivos</p>
            </v-card-title>
            <v-card-subtitle>
                <p style="text-align: center">En esta pantalla podrás ver todos los archivos cargados.</p>
            </v-card-subtitle>
            <v-card-text>
                <v-data-table
                    title="Archivos"
                    :headers="this.headers"
                    :items="this.archivos"
                    item-key="id"
                    return-object
                    @click:row="verArchivo"
                >
                </v-data-table> -->
            </v-card-text>
        </v-card>
    </v-app>
</template>

<script lang='ts'>
import { Component, Vue, Watch } from "vue-property-decorator";
    @Component({
    })
    export default class Examen extends Vue {
        /* Variables */
        

        /* Cargas iniciales*/
        async mounted() {

        }

        
    }
</script>
