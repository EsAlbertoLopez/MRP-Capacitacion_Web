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
            El correo registrado ya está en uso o no tiene el formato correcto.
        </v-alert>
        <v-card
            style="width: 50%; margin-top: 1%; margin-left: auto; margin-right: auto; margin-bottom: 5%; height: 70%"
        >
            <v-card-title>
                Formulario de registro
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