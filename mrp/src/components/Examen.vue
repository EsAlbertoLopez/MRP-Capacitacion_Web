<template>
    <v-app>
        <v-card
            style="width: 50%; margin-top: 1%; margin-left: auto; margin-right: auto"
        >
            <v-card-title>
                Formato del examen
            </v-card-title>
            <v-card-text>
                <p>
                    En esta página es donde llenaras los datos y subiras tu archivo Excel para crear tu examen, simplemente descarga el formato desde el siguiente enlace, una vez descargado
                    llena el archivo como se indica en el formato y subelo en esta misma página, se procesará y una vez finalizado podrás consultar el examen en tus examenes
                    creados.
                </p>
            </v-card-text>
            <v-card-actions>
                <!-- <v-btn -->
                    <!-- style="background-color: #4F95C6; margin-left: auto; margin-right: auto" -->
                <!-- > --> 
                    <a href="http://localhost:8080/mrp/src/assets/Formato.xlsx" download="Formato.xlsx">Descargar Formato</a>
                <!-- </v-btn> -->
            </v-card-actions>
        </v-card>
        <v-card
            style="width: 50%; margin-top: 1%; margin-left: auto; margin-right: auto; margin-bottom: 5%; margin-top: 3%"
        >
            <v-card-title>
                Formulario
            </v-card-title>
            <v-card-text>
                <p>
                    Llena los datos y carga el archivo completo.
                </p>
            </v-card-text>
            <v-text-field
                v-model="nombreExamen"
                label="Nombre examen"
                hide-details="auto"
                style="width: 70%; margin-left: auto; margin-right: auto"
            ></v-text-field>
            <v-select
                label="Dificultad"
                outlined
                :items = dificultades
                v-model = "dificultadSelected"
                style="width: 70%; ; margin-left: auto; margin-right: auto; margin-top: 7%"
            >

            </v-select>  
            <v-select
                label="Materia"
                outlined
                :items = materias
                v-model = "materiaSelected"
                style="width: 70%; ; margin-left: auto; margin-right: auto; margin-top: 7%"
            ></v-select>
            <v-file-input
                v-model="formato"
                show-size
                label="Excel"
                style="width: 70%; ; margin-left: auto; margin-right: auto; margin-top: 2%"
            ></v-file-input>
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
        private profe: any = ''
        private dificultad: any = ''
        private cuerpo: any = {}
        private instFormData = new FormData();
        private alerta = false
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
            instFormData.append('nombreExamen', this.nombreExamen)
            instFormData.append('profe', '10000001')
            instFormData.append('idMateria', this.materiaSelected)
            instFormData.append('dificultad', this.dificultadSelected)
            instFormData.append('formatoExamen', this.formato, this.formato.name)

            let resultado = await this.$store.dispatch('cargaExamen', instFormData)
            if(resultado.replyCode === 200) {
                this.nombreExamen = ''
                this.materiaSelected = ''
                this.dificultadSelected = ''
                this.formato = ''
            } else {
                this.alerta = true
            }
        }
    }
</script>
