<template>
  <div class="cart-list mt-10">
    <v-card elevation="2" outlined tile class="pb-2">
      <v-card-title class="text--secondary text-subtitle-1 pb-0">買い物リスト</v-card-title>
      <v-card-text class="d-flex flex-column justify-center flex-xs-wrap flex-sm-wrap">
        <ValidationObserver v-slot="{ handleSubmit, invalid }">
          <v-form class="edit-form d-flex align-center justify-space-between" @submit.prevent="handleSubmit(submit)">
            <ValidationProvider class="form-field" name="名前" rules="required" v-slot="{ valid }">
              <v-text-field autocomplete="off" v-model="name" label="名前" required :success="valid" />
            </ValidationProvider>
            <v-btn class="success" id="submit" type="submit" :disabled="invalid">追加</v-btn>
          </v-form>
        </ValidationObserver>

        <ul>
          <li v-for="(item, index) in cartItems" :key="index" class="d-flex align-center mt-3">
            <v-checkbox :value="item" v-model="checkedItems" :label="`${item}`"></v-checkbox>
            <v-btn class="error ml-auto" @click="deleteFridge(index)">削除</v-btn>
          </li>
        </ul>
        <v-btn @click="addCheckedItemsToFridge" class="success" v-if="checkedItems.length">冷蔵庫在庫に追加</v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Menu, WeeklyMenu } from "@/@types/menu";
import FridgeModule from "@/store/fridge";
import MenuModule from "@/store/menu";
import { Component, Vue, Watch } from "vue-property-decorator";

@Component({})
export default class CartList extends Vue {
  private get fridgeItems() {
    return FridgeModule.fridgeItems;
  }

  private get weeklyMenus() {
    return MenuModule.weeklyMenus;
  }

  private cartItems: string[] = [];

  private checkedItems: string[] = [];

  @Watch("fridgeItems")
  private getCartItems() {
    const allIngredients: string[] = [];
    this.weeklyMenus.forEach((date: WeeklyMenu) => {
      date.menus?.forEach((menu: Menu) => {
        allIngredients.push(...menu.ingredients);
      });
    });
    this.cartItems = [...new Set(allIngredients)];
    this.cartItems = this.cartItems.filter((item: string) => {
      return !this.fridgeItems.includes(item);
    });
  }

  private mounted() {
    this.getCartItems();
  }

  private name = "";

  private resetForm() {
    this.name = "";
  }

  private deleteFridge(index: number) {
    this.cartItems.splice(index, 1);
  }

  private addFridge(item: string) {
    FridgeModule.addFridge(item);
  }
  private submit() {
    this.cartItems.push(this.name);
    this.resetForm();
  }

  private addCheckedItemsToFridge() {
    this.checkedItems.forEach((item: string) => {
      this.addFridge(item);
    });
    this.checkedItems = [];
  }
}
</script>
