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
            style="width: 50%; margin-top: 1%; margin-left: auto; margin-right: auto"
            v-show="this.detalleCampo === true"
        >
            <v-btn color="red" rounded @click="detalleCampo=false" max-width="40px" style="margin-top: 3%; margin-left: 90%">
                <v-icon> mdi-window-close </v-icon>
            </v-btn>
            <v-card-title>
                <p style="margin-left: auto; margin-right: auto">Campo</p>
            </v-card-title>
            <v-card-subtitle>
                <p style="text-align: center">En esta pantalla podrás ver el detalle del campo y editarlos.</p>
            </v-card-subtitle>
            <v-card-text>
                <p style="text-align: center">User ID: {{this.userIdCard}}</p>
                <p style="text-align: center">User Name: {{this.userNameCard}}</p>
                <p style="text-align: center">Date: {{this.dateCard}}</p>
                <p style="text-align: center">Punch In: {{this.punchInCard}}</p>
                <p style="text-align: center">Punch Out: {{this.punchOutCard}}</p>
                <v-select
                v-model="itemSelected"
                :items="itemSelect"
                style="margin-top: 3%; margin-left: auto; margin-right: auto; width: 30%; margin-bottom: 3%"
                >
                </v-select>
               <v-text-field
               label="Escriba el valor del campo"
               style="margin-top: 3%; margin-left: auto; margin-right: auto; width: 30%; margin-bottom: 3%"
               v-model="valorMod"
               >
                Valor del campo
                </v-text-field> 
            </v-card-text>
            <v-card-actions>
                <v-btn color="red" rounded @click="eliminarCampo" style="margin-top: 3%; margin-left: auto; margin-right: auto; width: 30%; margin-bottom: 3%">
                    Eliminar registro
                </v-btn>
                <v-btn color="blue" rounded @click="actualizaDatosCampo" style="margin-top: 3%; margin-left: auto; margin-right: auto; width: 30%; margin-bottom: 3%">
                    Actualizar registro
                </v-btn>
            </v-card-actions>
        </v-card>
        <v-card
            v-show="this.detalleCampo === false"
            style="width: 80%; margin-top: 1%; margin-left: auto; margin-right: auto"
        >
            <v-card-title>
                <p style="margin-left: auto; margin-right: auto">Registros usuarios</p>
            </v-card-title>
            <v-card-subtitle>
                <p style="text-align: center">En esta pantalla podrás ver todos los registros cargados.</p>
            </v-card-subtitle>
            <v-card-text>
                <v-data-table
                    title="Archivos"
                    :headers="this.headers"
                    :items="this.usuarios"
                    item-key="id"
                    return-object
                    @click:row="actualizaCampo"
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
            { text: 'User ID', align: 'start', value: 'userId' },
            { text: 'User Name', value: 'userName' },
            { text: 'Date', value: 'date' },
            { text: 'Punch In', value: 'punchIn' },
            { text: 'Punch Out', value: 'punchOut' },
            { text: 'Registro ID', value: 'id'}
        ]
        private itemSelect = [
            { text: "User ID", value: 0 },
            { text: "User Name", value: 1 },
            { text: "Date", value: 2 },
            { text: "Punch In", value: 3 },
            { text: "Punch Out", value: 4 }
        ]
        private usuarios: any = []
        private detalleCampo: any = false
        private userIdCard : any = ""
        private userNameCard : any = ""
        private dateCard : any = ""
        private punchInCard : any = ""
        private punchOutCard : any = ""
        private idCard : any = ""
        private campoValorNuevo: any = ""
        private itemSelected: any = ""
        private valorMod: any = ""
        private alerta: any = false
        private mensaje: any = ""

        /* Cargas iniciales*/
        async mounted() {
            this.usuarios = await this.recuperaUsuarios()
        }

        async recuperaUsuarios() {
            let resultado = await this.$store.dispatch('recuperaUsuarios')
            this.usuarios = resultado.data[0].map((campo: any) => ({
                userId: campo.user["User ID"],
                userName: campo.user["User Name"],
                date: campo.user["Date"],
                punchIn: campo.user["Punch In"],
                punchOut: campo.user["Punch Out"],
                id: campo["_id"]
            }))
            this.usuarios.toArray()
        }

        async actualizaCampo(item: any) {
            this.detalleCampo = true
            this.userIdCard = item.userId
            this.userNameCard = item.userName
            this.dateCard = item.date
            this.punchInCard = item.punchIn
            this.punchOutCard = item.punchOut
            this.idCard = item.id
        }

        async actualizaDatosCampo() {
            let body = {
                id: this.idCard,
                rubro: this.itemSelected,
                valor: this.valorMod
            }

            let resultado = await this.$store.dispatch('actualizaUsuarios', body)
            if(resultado.replyCode === 200) {
                this.detalleCampo = false
                this.recuperaUsuarios()
                this.itemSelected = ""
                this.valorMod = ""
            } else {
                this.alerta = true
                this.mensaje = "Error al actualizar el registro"
                this.itemSelected = ""
                this.valorMod = ""
            }

        }

        async eliminarCampo() {
            let body = {
                id: this.idCard
            }

            let resultado = await this.$store.dispatch('eliminarUsuario', body)
            if(resultado.replyCode === 200) {
                this.detalleCampo = false
                this.itemSelected = ""
                this.valorMod = ""
                this.recuperaUsuarios()
            } else {
                this.alerta = true
                this.mensaje = "Error al eliminar el registro"
                this.itemSelected = ""
                this.valorMod = ""
            }
        }
    }
</script>