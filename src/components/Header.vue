<template>
  <div class="header">
    <template>
      <v-card class="mx-auto overflow-hidden" tile>
        <v-app-bar color="secondary" dark>
          <v-toolbar-title class="text--secondary text-h5">Weekly Menu App</v-toolbar-title>
        </v-app-bar>
      </v-card>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Header extends Vue {}
</script>

<style lang="sass">
.v-list-item
  margin-bottom: 0!important
</style>
