<template>
  <div class="menu pa-2">
    <v-container width="80%" class="mx-auto">
      <PastMenuList></PastMenuList>
    </v-container>
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PastMenuList from "@/components/PastMenuList.vue";
import Footer from "@/components/Footer.vue";

@Component({
  name: "PastMenu",
  components: {
    PastMenuList,
    Footer,
  },
})
export default class PastMenu extends Vue {}
</script>

<style lang="sass" scoped>
.menu
  padding-bottom: 150px!important
  height: 100%
</style>
