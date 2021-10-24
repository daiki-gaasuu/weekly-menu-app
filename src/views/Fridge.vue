<template>
  <div class="fridge">
    <v-container width="80%" class="mx-auto">
      <FridgeList></FridgeList>
    </v-container>
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import FridgeList from "@/components/FridgeList.vue";
import Footer from "@/components/Footer.vue";

@Component({
  name: "Fridge",
  components: {
    FridgeList,
    Footer,
  },
})
export default class Fridge extends Vue {}
</script>

<style lang="sass" scoped>
.fridge
  padding-bottom: 150px!important
  height: 100%
</style>
