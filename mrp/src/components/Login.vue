<template>
        <v-app>
            <v-app-bar
            app
            id="headerWeb"
            dark
            shrink-on-scroll
            src="../assets/FONDO.jpg"
            >
            <template v-slot:img="{ props }">
                <v-img
                    v-bind="props"
                    gradient="to top right, rgba(79,149,198,.7), rgba(25,32,72,.7)"
                ></v-img>
            </template>

            <v-app-bar-title>MRP CAPACITACIÓN Y CERTIFICACIÓN</v-app-bar-title>
            </v-app-bar>
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
                style="width: 30%; height: 50%; margin-left: auto; margin-right: auto; margin-top: -7%"
                >
                <v-card-title>
                    <p style="margin-left: auto; margin-right: auto">Inicio de sesión</p>
                </v-card-title>
                <v-card-subtitle>
                    <p style="text-align: center">Introduce los datos para iniciar sesión, en caso de no tener usuario registrado selecciona el botón de registrar.</p>
                </v-card-subtitle>
                <v-card-text>
                    <v-text-field
                        required
                        :rules="[rules.required]"
                        v-model="mail"
                        label="Correo del usuario"
                        hide-details="auto"
                        style="width: 50%; margin-left: auto; margin-right: auto"
                        prepend-inner-icon="mdi-account" 
                    >
                    </v-text-field>
                    <v-text-field
                        required
                        :rules="[rules.required]"
                        v-model="pass"
                        hide
                        label="Contraseña"
                        type="password"
                        style="width: 50%; margin-left: auto; margin-right: auto; margin-top: 5%"
                        prepend-inner-icon="mdi-key" 
                    >
                    </v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-btn
                        @click="goToRegistro"
                        style="margin-left: 19%; background-color: #4F95C6; width: 30%; font-size: 0.8vw"
                    >
                        Registrarse
                    </v-btn>
                    <v-btn
                        @click="validaUsuario"
                        style="margin-left: 8%; background-color: #4F95C6; width: 30%; font-size: 0.8vw"
                    >
                        Iniciar sesión
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-app>
</template>

<script lang="ts">
import { Component, Vue, Watch} from 'vue-property-decorator';
@Component({
})
export default class App extends Vue {
    //Variables
    private pass = ''
    private mail = ''
    private alerta = false
    private data: any = {}
    private validForm = false
    private mensaje = ""

    //Reglas de validación
    private rules: object = {
      required: (v: string) => !!v || 'Este campo es requerido',
    };

    //Metodos de rutas
    private goToPrincipal() {
      if (this.$route.name !== '/inicio') {
        this.$router.push('/inicio');
      }
    }

    private goToRegistro() {
      if (this.$route.name !== '/registro') {
        this.$router.push('/registro');
      }
    }

    //Metodos 
    private async validaUsuario() {
        if(this.mail === "" || this.pass === "") {
            this.alerta = true;
            this.mensaje = 'Completa los datos obligatorios';
        } else {
            this.data = {
                correo: this.mail,
                password: this.pass
            }
            let response = await this.$store.dispatch('validaUsuario', this.data)
            .then((response) => {
                console.log(response)
                if(response.data.replyCode === 200) {
                    this.goToPrincipal()
                } else {
                    this.mensaje = 'Error al iniciar sesión';
                    this.alerta = true
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }
};
</script>