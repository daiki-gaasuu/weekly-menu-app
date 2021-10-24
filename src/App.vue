<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <v-main>
      <v-card height="100%">
        <Header></Header>
        <router-view />
      </v-card>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/Header.vue";

@Component({
  name: "App",
  components: {
    Header,
  },
})
export default class App extends Vue {}
</script>
