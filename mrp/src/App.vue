<template>
  <v-app>
    <v-app-bar
        v-show="this.$route.name === 'inicio' || this.$route.name === 'examen'"
        app
        id="headerWeb"
        dark
        shrink-on-scroll
        src="./assets/FONDO.jpg"   
    >
      <template v-slot:img="{ props }">
          <v-img
              v-bind="props"
              gradient="to top right, rgba(79,149,198,.7), rgba(25,32,72,.7)"
          ></v-img>
      </template>

      <v-app-bar-title>MRP CAPACITACIÓN Y CERTIFICACIÓN</v-app-bar-title>

      <template v-slot:extension>
          <v-tabs align-with-title>
              <v-tab @click="goToPrincipal">Exámenes</v-tab>
              <v-tab @click="goToExamen">Cargar Examen</v-tab>
          </v-tabs>
          <v-btn
            @click="goToSalida"
            style="margin-left: 19%; background-color: #4F95C6; width: 5%; font-size: 0.8vw"
          >
            Salir
          </v-btn>
      </template>
    </v-app-bar>
    <v-main style="height: auto">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Watch} from 'vue-property-decorator';
import router from './router';
@Component({
})
export default class App extends Vue {
    private ruta = this.$route.name;

    //Metodos de rutas
    private goToPrincipal() {
      if (this.$route.name !== '/inicio') {
        this.$router.push('/inicio');
      }
    }

    private goToExamen() {
      if (this.$route.name !== '/examen') {
        this.$router.push('/examen');
      }
    }

    private goToSalida(){
      if (this.$route.name !== '/') {
        this.$store.commit('setIdUsuario', "")
        this.$store.commit('setNombreUsuario', "")
        this.$router.push('/');
      }
    }
};
</script>

<style lang="css">

html, body{
  height:100%;
  margin:0;
  display: flex;
  flex-direction: column;
}

</style>

