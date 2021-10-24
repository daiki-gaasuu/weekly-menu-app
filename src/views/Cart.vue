<template>
  <div class="cart">
    <v-container width="80%" class="mx-auto">
      <CartList></CartList>
    </v-container>
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CartList from "@/components/CartList.vue";
import Footer from "@/components/Footer.vue";

@Component({
  name: "Cart",
  components: {
    CartList,
    Footer,
  },
})
export default class Cart extends Vue {}
</script>
<style lang="sass" scoped>
.cart
  padding-bottom: 150px!important
  height: 100%
</style>
