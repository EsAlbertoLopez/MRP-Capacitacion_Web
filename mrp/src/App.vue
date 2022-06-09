<template>
  <v-app>
    <v-app-bar
      absolute
      color="#6A76AB"
      dark
      dense
      prominent
      scroll-target="#scrolling-techniques-3"
      height=""
    >
      <v-app-bar-title>Keyence</v-app-bar-title>

      <template v-slot:extension>
        <v-tabs align-with-title>
          <v-tab @click="goToArchivos">Archivos</v-tab>
          <v-tab @click="goToUsuarios">Usuarios</v-tab>
          <v-tab @click="goToCarga">Subir archivo</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-main style="height: auto; margin-top: 10%">
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
    private goToUsuarios() {
      if (this.$route.name !== '/ver') {
        this.$router.push('/ver');
      }
    }
    private goToArchivos() {
      if (this.$route.name !== '/') {
        this.$router.push('/');
      }
    }
    private goToCarga(){
      if (this.$route.name !== '/subir') {
        this.$router.push('/subir');
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

