<template>
    <v-app>
        <v-alert
            v-show="alerta === true"
            v-model="alerta"
            dismissible 
            color="#4F95C6"
            border="left"
            elevation="2"
            colored-border
            icon="mdi-twitter"
            style="width: 30%; margin-left: auto; margin-right: auto"
        >
            Usuario incorrecto por favor intente otra vez con los datos correctos.
        </v-alert>
        <v-card
            style="width: 30%; height: 50%; margin-left: auto; margin-right: auto"
        >
            <v-card-title>
                Inicio de sesión
            </v-card-title>
            <v-card-subtitle>
                Introduce los datos para iniciar sesión, en caso de no tener usuario registrado selecciona el botón de registrar.
            </v-card-subtitle>
            <v-card-text>
                <v-text-field
                    v-model="user"
                    label="Nombre usuario"
                    hide-details="auto"
                    style="width: 50%; margin-left: auto; margin-right: auto"
                    prepend-inner-icon="mdi-account" 
                >
                </v-text-field>
                <v-text-field
                    v-model="pass"
                    label="Contraseña"
                    hide-details="auto"
                    style="width: 50%; margin-left: auto; margin-right: auto; margin-top: 5%"
                    prepend-inner-icon="mdi-key" 
                >
                </v-text-field>
                <v-btn
                    @click="goToRegistro"
                    style="margin-left: 20%; margin-top: 10%; background-color: #4F95C6"
                >
                    Registrarse
                </v-btn>
                <v-btn
                    @click="validaUsuario"
                    style="margin-left: 15%; margin-top: 10%; background-color: #4F95C6"
                >
                    Iniciar sesión
                </v-btn>
            </v-card-text>
        </v-card>
    </v-app>
</template>

<script lang="ts">
import { Component, Vue, Watch} from 'vue-property-decorator';
@Component({
})
export default class App extends Vue {
    private pass = ''
    private user = ''
    private alerta = false
    private data: any = {}

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
        this.data = {
            USUARIO: this.user,
            PASSWORD: this.pass
        }
        let response = await this.$store.dispatch('validaUsuario', this.data)
        .then((response) => {
            console.log(response)
            if(response.data.replyCode === 200) {
                this.data = []
                this.goToPrincipal()
            } else {
                this.alerta = true
                this.data = []
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }
};
</script>