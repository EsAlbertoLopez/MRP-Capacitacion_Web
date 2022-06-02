<template>
    <v-app>
        <v-alert
            v-show="alerta === true"
            dismissible 
            color="#4F95C6"
            border="left"
            elevation="2"
            colored-border
            icon="mdi-twitter"
            style="width: 30%; margin-left: auto; margin-right: auto"
        >
            {{this.mensaje}}
        </v-alert>
        <v-card
            v-show="tokenValidacion === true"
            style="width: 20%; margin-left: auto; margin-right: auto; margin-top: 5%; margin-bottom: auto"
        >
            <v-card-title
                style="margin-left: 35%"
            >
                Token de acceso
            </v-card-title>
            <v-card-text>
                <v-text-field
                    v-model="token"
                    label="Token"
                    hide-details="auto"
                    style="width: 50%; margin-left: auto; margin-right: auto"
                    prepend-inner-icon="mdi-account" 
                >
                </v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-btn
                    style="margin-left: 42%; margin-top: 1%; margin-bottom: 2%; background-color: #4F95C6"
                    @click="validaToken"
                >
                    Acceder
                </v-btn>
            </v-card-actions>
        </v-card>
        <v-card
            style="width: 50%; margin-top: 1%; margin-left: auto; margin-right: auto; margin-bottom: 5%; height: 70%"
            v-show="tokenValidacion === false"
        >
            <v-card-title>
                {{nombreExamen}}
            </v-card-title>
            <v-card-text>
                <p>
                    Llena los datos y registrate para poder ver tus estadisticas y subir examenes.
                </p>
            </v-card-text>
            <v-text-field
                v-model="nombre"
                label="Nombre"
                hide-details="auto"
                style="width: 70%; margin-left: auto; margin-right: auto; margin-top: 5%"
            ></v-text-field>
            <v-text-field
                v-model="correo"
                label="Correo"
                hide-details="auto"
                style="width: 70%; margin-left: auto; margin-right: auto; margin-top: 5%"
            ></v-text-field>
            <v-text-field
                v-model="usuario"
                label="Usuario"
                hide-details="auto"
                style="width: 70%; margin-left: auto; margin-right: auto; margin-top: 5%"
            ></v-text-field>
            <v-text-field
                v-model="password"
                label="Contraseña"
                type="password"
                hide-details="auto"
                style="width: 70%; margin-left: auto; margin-right: auto; margin-top: 5%"
            ></v-text-field>
            <v-card-actions>
                <v-btn
                    @click="registraUsuario"
                    style="background-color: #4F95C6; margin-left: auto; margin-right: auto; margin-bottom: 1%; margin-top: 5%"
                >
                    Registrarse
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
    // Variables
    private data: any = {}
    private nombre: any = ''
    private correo: any = ''
    private usuario: any = ''
    private password: any = ''
    private alerta: any = false
    private tokenValidacion: any = false
    private noProfesor: any = ''
    private token: any = 0
    private mensaje: any = ''

    // Métodos
    
    private goToPrincipal() {
      if (this.$route.name !== '/inicio') {
        this.$router.push('/inicio');
      }
    }

    private async registraUsuario() {
        this.data = {
            nombre: this.nombre,
            correo: this.correo,
            usuario: this.usuario,
            password: this.password
        }
        let response = await this.$store.dispatch('registraProfesor', this.data)
        .then((response) => {
            console.log(response)
            if(response.replyCode === 200) {
                this.noProfesor = response.data[0]
                console.log(this.noProfesor)
                this.tokenValidacion = true
                this.generaToken()
            } else {
                this.mensaje = 'Este correo ya está registrado'
                this.alerta = true
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    private async generaToken() {
        this.data = {
            noProfesor: this.noProfesor,
            correo: this.correo
        }
        let response = await this.$store.dispatch('generaToken', this.data)
        .then((response) => {
            console.log(response)
            if(response.data.replyCode === 200) {
                this.tokenValidacion = true
            } else {
                this.mensaje = 'El token no se ha podido generar, vuelva a intentarlo'
                this.alerta = true
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    private async validaToken() {
        this.data = {
            noProfesor: this.noProfesor,
            token: this.token
        }
        let response = await this.$store.dispatch('validaToken', this.data)
        .then((response) => {
            console.log(response)
            if(response.data.replyCode === 200) {
                this.goToPrincipal()
            } else {
                this.mensaje = 'Token no valido'
                this.alerta = true
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

};
</script>