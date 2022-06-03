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
            v-show="detalleExamen === true"
            style="width: 80%; margin-top: 1%; margin-left: auto; margin-right: auto"
        >
            <v-btn color="red" rounded @click="detalleExamen=false" max-width="40px" style="margin-left: 94%; margin-top: 1%">
            <v-icon> mdi-window-close </v-icon>
            </v-btn>
            <v-card-title>
                <p style="margin-left: auto; margin-right: auto">{{this.nombreExamenCard}}</p>
            </v-card-title>
            <v-card-subtitle>
                <p style="text-align: center">Hola {{this.nombreProfeCard}}, aquí puedes ver el detalle de tu examen {{this.nombreExamenCard}}, donde podrás eliminar el examen o actualizar algunos datos.</p>
            </v-card-subtitle>
            <v-card-text>
                <p>Materia: {{this.materiaCard}}</p>
                <p>Dificultad: {{this.dificultadCard}}</p>
                <p>Número de preguntas: {{this.noPreguntasCard}}</p>
                <v-data-table
                    title="Preguntas del examen"
                    :headers="this.headersExamen"
                    :items="this.PreguntasCard"
                    item-key="Numero"
                >
                </v-data-table>
            </v-card-text>
            <v-card-actions>
                <v-btn
                    @click="eliminarExamen"
                    style="margin-left: auto; margin-right: auto; margin-bottom: 1%; background-color: Red; width: 30%; font-size: 0.8vw"
                >
                    Eliminar examen
                </v-btn>
            </v-card-actions>
        </v-card>
        <v-card
            v-show="detalleExamen === false"
            style="width: 80%; margin-top: 1%; margin-left: auto; margin-right: auto"
        >
            <v-card-title>
                <p style="margin-left: auto; margin-right: auto">Tus exámenes</p>
            </v-card-title>
            <v-card-subtitle>
                <p style="text-align: center">En esta pantalla podrás ver todos los examenes que has subido y en caso de ser necesario darlos de baja, para ver el detalle de un examen da click en su linea.</p>
            </v-card-subtitle>
            <v-card-text>
                <v-data-table
                    title="Tus exámenes cargados"
                    :headers="this.headers"
                    :items="this.examenes"
                    item-key="id"
                    return-object
                    @click:row="verExamen"
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
    export default class Examen extends Vue {
        /* Variables */
        private headers = [
            { text: 'id', align: 'start', value: 'id' },
            { text: 'Nombre', value: 'nombreExamen' },
            { text: 'Materia', value: 'materia' },
            { text: 'Cobro', value: 'cobro' },
            { text: 'Dificultad', value: 'dificultad' },
            { text: 'Preguntas', value: 'noPreguntas' }
        ]
        private headersExamen = [
            { text: 'Numero', align: 'start', value: 'NUMERO' },   
            { text: 'Pregunta', value: 'PREGUNTA' },
            { text: 'Opciones', value: 'OPCIONES' },
            { text: 'Respuesta', value: 'RESPUESTALETRA' },
            { text: 'Retro', value: 'RETRO' }
        ]
        private examenes: any = []
        private idProfe: any = ""
        private detalleExamen: any = false
        private nombreExamenCard: any = ""
        private materiaCard: any = ""
        private dificultadCard: any = ""
        private noPreguntasCard: any = ""
        private PreguntasCard: any = []
        private nombreProfeCard: any = ""
        private mensaje: any = ""
        private alerta: any = false
        private examenIdCard: any = ""

        /* Cargas iniciales*/
        async mounted() {
            //Examenes
            this.idProfe = this.$store.getters.getIdUsuario
            this.examenes = await this.recuperaExamenes()
        }

        /* Métodos */
        async recuperaExamenes() {
            let resultado = await this.$store.dispatch('recuperaExamenProfe', this.idProfe)
            this.examenes = resultado.data.data[0].map((examen: any) => ({
                id: examen.examen.id,
                nombreExamen: examen.examen.nombreExamen,
                materia: examen.examen.materia,
                cobro: examen.examen.cobro,
                dificultad: examen.examen.dificultad,
                noPreguntas: examen.examen.noPreguntas
            }))
            this.examenes.toArray()
        }

        async verExamen(item: any) {
            this.detalleExamen = true
            let resultadoExamen = await this.$store.dispatch('recuperaExamenId', item.id)
            this.examenIdCard = resultadoExamen.data.data[0].examen.id
            this.nombreExamenCard = resultadoExamen.data.data[0].examen.nombreExamen
            this.materiaCard = resultadoExamen.data.data[0].examen.materia
            this.dificultadCard = resultadoExamen.data.data[0].examen.dificultad
            this.noPreguntasCard = resultadoExamen.data.data[0].examen.noPreguntas
            this.PreguntasCard = resultadoExamen.data.data[0].examen.preguntas
            this.nombreProfeCard = resultadoExamen.data.data[0].examen.profe
            this.PreguntasCard = this.PreguntasCard.map((p: any) => ({
                NUMERO: p.NUMERO,
                PREGUNTA: p.PREGUNTA,
                OPCIONES: p.OPCIONES,
                RESPUESTALETRA: p.RESPUESTALETRA,
                RETRO: p.RETRO
            }))
            this.PreguntasCard.toArray()
        }

        async eliminarExamen() {
            let body = {
                idProfesor: this.idProfe,
                idExamen: this.examenIdCard
            }

            let resultadoBorrado = await this.$store.dispatch('eliminaExamenId', body)
            console.log(resultadoBorrado)

            if(resultadoBorrado.replyCode === 200) {
                this.mensaje = "Borrado con exito"
                this.alerta = true
                this.detalleExamen = false
                this.recuperaExamenes()
            } else {
                this.mensaje = "Error al borrar el examen"
                this.alerta = true
            }
        }
    }
</script>
