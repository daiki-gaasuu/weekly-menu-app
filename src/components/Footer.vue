<template>
  <v-footer fixed class="pa-0">
    <v-card flat tile width="100%" class="secondary text-center">
      <v-card-text>
        <v-btn class="mx-4" icon :to="{ name: 'Menu' }">
          <v-icon size="24px">mdi-home</v-icon>
        </v-btn>
        <v-btn class="mx-4" icon :to="{ name: 'Fridge' }">
          <v-icon size="24px">mdi-fridge-outline</v-icon>
        </v-btn>
        <v-btn class="mx-4" icon :to="{ name: 'Cart' }">
          <v-icon size="24px">mdi-cart</v-icon>
        </v-btn>
        <v-btn class="mx-4" icon :to="{ name: 'PastMenu' }">
          <v-icon size="24px">mdi-notebook-outline</v-icon>
        </v-btn>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Footer extends Vue {}
</script>
