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
                    <v-toolbar-title>{{this.mensajeAlerta}}</v-toolbar-title>
                    <v-btn color="red" rounded @click="alerta=false" max-width="40px" style="margin-left: auto">
                        <v-icon> mdi-window-close </v-icon>
                    </v-btn>
                </v-toolbar>
        </v-dialog>
        <v-card
            style="width: 50%; margin-top: 1%; margin-left: auto; margin-right: auto"
        >
            <v-card-title>
                <p style="margin-left: auto; margin-right: auto">Formato del examen</p>
            </v-card-title>
            <v-card-text>
                <p>
                    En esta página es donde llenaras los datos y subiras tu archivo Excel para crear tu examen, simplemente descarga el formato desde el siguiente enlace, una vez descargado
                    llena el archivo como se indica en el formato y subelo en esta misma página, se procesará y una vez finalizado podrás consultar el examen en tus examenes
                    creados.
                </p>
            </v-card-text>
            <v-card-actions>
                <a style="margin-left: auto; margin-right: auto" href="C:/Users/guill/Desktop/Formato.xlsxs" download="Formato">Descargar Formato</a>
            </v-card-actions>
        </v-card>
        <v-card
            style="width: 50%; margin-top: 1%; margin-left: auto; margin-right: auto; margin-bottom: 5%; margin-top: 3%"
        >
            <v-card-title>
                <p style="margin-left: auto; margin-right: auto">Formulario</p>
            </v-card-title>
            <v-card-text>
                <p style="text-align: center">Llena los datos y carga el archivo completo.</p>
            </v-card-text>
            <v-text-field
                v-model="nombreExamen"
                label="Nombre examen"
                hide-details="auto"
                style="width: 70%; margin-left: auto; margin-right: auto"
            ></v-text-field>
            <v-text-field
                v-model="descripcion"
                label="Descripción"
                hide-details="auto"
                style="width: 70%; margin-left: auto; margin-right: auto; margin-top: 4%"
            ></v-text-field>
            <v-select
                label="Dificultad"
                outlined
                :items = dificultades
                v-model = "dificultadSelected"
                style="width: 70%; margin-left: auto; margin-right: auto; margin-top: 7%"
            >
            </v-select>  
            <v-select
                label="Materia"
                outlined
                :items = materias
                v-model = "materiaSelected"
                style="width: 70%; margin-left: auto; margin-right: auto; margin-top: 3%"
            ></v-select>
            <v-file-input
                v-model="formato"
                show-size
                label="Excel"
                style="width: 70%; margin-left: auto; margin-right: auto; margin-top: 2%"
            ></v-file-input>
            <v-checkbox
                v-model="cobro"
                label="Premium"
                style="margin-left: 15%; margin-right: auto"
            ></v-checkbox>
            <v-card-actions>
                <v-btn
                    style="background-color: #4F95C6; margin-left: auto; margin-right: auto; margin-bottom: 1%"
                    @click="cargaExamen"
                >
                    Subir examen
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-app>
</template>

<script lang='ts'>
import { Component, Vue, Watch } from "vue-property-decorator";
    @Component({
    })
    export default class Examen extends Vue {
        /* Variables */
        private materias: any = this.$store.getters.getMaterias;
        private materiaSelected: any = ''
        private dificultadSelected: any = ''
        private formato: any = ''
        private nombreExamen: any = ''
        private descripcion: any = ''
        private profe: any = ''
        private dificultad: any = ''
        private cobro: any = 0
        private instFormData = new FormData();
        private alerta = false
        private mensajeCheck = 'Gratis'
        private mensajeAlerta: any = ""
        private dificultades: any = [
            { id: 1, text: 'Fácil' },
            { id: 2, text: 'Medio' },
            { id: 3, text: 'Dificil' }
        ]
        /* Cargas iniciales*/
        async mounted() {
            //Carga de materias
            this.materias = await this.$store.dispatch('getMaterias')
            this.materias = this.materias.data[0].map((materia: any) => ({
                text: materia.NOMBRE_MATERIA,
                value: materia.ID_MATERIA
            }))
        }
        /* Métodos */
        async cargaExamen() {
            let instFormData = new FormData();
            this.cobro = this.cobro === false ? 0 : 1
            instFormData.append('nombreExamen', this.nombreExamen)
            instFormData.append('descripcion', this.descripcion)
            instFormData.append('dificultad', this.dificultadSelected)
            instFormData.append('idMateria', this.materias[this.materiaSelected].value)
            instFormData.append('materia', this.materias[this.materiaSelected].text)
            instFormData.append('idProfe', this.$store.getters.getIdUsuario)
            instFormData.append('profe', this.$store.getters.getNombreUsuario)
            instFormData.append('cobro', this.cobro)
            instFormData.append('formatoExamen', this.formato, this.formato.name)
            let resultado = await this.$store.dispatch('cargaExamen', instFormData)
            if(resultado.replyCode === 200) {
                console.log(resultado)
                this.nombreExamen = ''
                this.materiaSelected = ''
                this.descripcion = ''
                this.dificultadSelected = ''
                this.formato = ''
                this.cobro = 0
                this.mensajeAlerta = "Examen cargado con exito"
                this.alerta = true
            } else {
                this.mensajeAlerta = "Error al cargar el examen"
                this.alerta = true
            }
        }
    }
</script>