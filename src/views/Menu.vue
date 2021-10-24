<template>
  <div class="menu pa-2">
    <v-container width="80%" class="mx-auto">
      <Calender></Calender>
      <MenuList></MenuList>
    </v-container>
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Calender from "@/components/Calender.vue";
import MenuList from "@/components/MenuList.vue";
import Footer from "@/components/Footer.vue";

@Component({
  name: "Menu",
  components: {
    Calender,
    MenuList,
    Footer,
  },
})
export default class Menu extends Vue {}
</script>

<style lang="sass" scoped>
.menu
  padding-bottom: 150px!important
  height: 100%
</style>
