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
            <v-btn color="red" rounded @click="detalleArchivo=false" max-width="40px" style="margin-top: 3%; margin-left: 90%">
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
                </v-data-table> 
            </v-card-text>
            <v-card-actions>
                <v-btn color="red" rounded @click="eliminarArchivo" max-width="100px" style="margin-top: 3%; margin-left: auto; margin-right: auto; width: 30%; margin-bottom: 3%">
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
                </v-data-table> 
            </v-card-text>
        </v-card>
    </v-app>
</template>

<script lang='ts'>
import { Component, Vue, Watch } from "vue-property-decorator";
    @Component({
    })
    export default class Archivo extends Vue {
        /* Variables */
        private headers = [
            { text: 'Id Archivo', align: 'start', value: 'id' },
            { text: 'Fecha Creación', value: 'fechaCreacion' }
        ]
        private headersArchivo = [
            { text: 'User ID', align: 'start', value: 'userId' },
            { text: 'User Name', value: 'userName' },
            { text: 'Date', value: 'date' },
            { text: 'Punch In', value: 'punchIn' },
            { text: 'Punch Out', value: 'punchOut' }
        ]
        private archivos: any = []
        private detalleArchivo: any = false
        private modificarArchivo: any = false
        private idCard: any = 0
        private fechaCreacionCard: any = ""
        private datosCard: any = []
        private alerta: any = false
        private mensaje: any = ""
        private userIdCampo: any = ""
        private userNameCampo: any = ""
        private dateCampo: any = ""
        private punchInCampo: any = ""
        private punchOutCampo: any = ""
        private userIdCampoMod: any = ""
        private userNameCampoMod: any = ""
        private dateCampoMod: any = ""
        private punchInCampoMod: any = ""
        private punchOutCampoMod: any = ""

        /* Cargas iniciales*/
        async mounted() {
            this.archivos = await this.recuperaArchivos()
        }

        async recuperaArchivos() {
            let resultado = await this.$store.dispatch('recuperaArchivos')
            this.archivos = resultado.data[0].map((archivo: any) => ({
                id: archivo.body.id,
                fechaCreacion: archivo.body.fechaCreacion
            }))
            this.archivos.toArray()
        }

        async verArchivo(item: any) {
            this.detalleArchivo = true
            let resultadoArchivo = await this.$store.dispatch('recuperaArchivoDetalle', item.id)
            this.fechaCreacionCard = resultadoArchivo.data[0][0].body.fechaCreacion
            this.idCard = resultadoArchivo.data[0][0].body.id
            this.datosCard = resultadoArchivo.data[0][0].body.archivo
            this.datosCard = this.datosCard.map((p: any) => ({
                userId: p["User ID"],
                userName: p["User Name"],
                date: p["Date"],
                punchIn: p["Punch In"],
                punchOut: p["Punch Out"]
            }))
            this.datosCard.toArray()
        }

        async eliminarArchivo() {
            let body = {
                id: this.idCard
            }

            let resultadoBorrado = await this.$store.dispatch('eliminarArchivo', body)
            if(resultadoBorrado.replyCode === 200) {
                this.recuperaArchivos()
                this.detalleArchivo = false   
            } else {
                this.mensaje = "Error al borrar el archivo"
                this.alerta = true
            }
        }
    }
</script>