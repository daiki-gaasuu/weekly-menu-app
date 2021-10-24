<template>
  <div class="fridge-list mt-10">
    <v-card elevation="2" outlined tile class="pb-2">
      <v-card-title class="text--secondary text-subtitle-1 pb-0">冷蔵庫在庫</v-card-title>
      <v-card-text class="d-flex flex-column justify-center flex-xs-wrap flex-sm-wrap">
        <ValidationObserver v-slot="{ handleSubmit, invalid }">
          <v-form class="edit-form d-flex align-center justify-space-between" @submit.prevent="handleSubmit(submit)">
            <ValidationProvider class="form-field" name="食材名" rules="required" v-slot="{ valid }">
              <v-text-field autocomplete="off" v-model="name" label="食材名" required :success="valid" />
            </ValidationProvider>
            <v-btn class="info" id="submit" type="submit" :disabled="invalid">追加</v-btn>
          </v-form>
        </ValidationObserver>

        <ul>
          <li v-for="(item, index) in fridgeItems" :key="index" class="d-flex align-center mt-3">
            <p class="mb-0">{{ item }}</p>
            <v-btn class="error ml-auto" @click="deleteFridge(index)">削除</v-btn>
          </li>
        </ul>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import FridgeModule from "@/store/fridge";
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class MenuList extends Vue {
  private get fridgeItems() {
    return FridgeModule.fridgeItems;
  }

  private name = "";

  private resetForm() {
    this.name = "";
  }

  private deleteFridge(index: number) {
    FridgeModule.deleteFridge(index);
  }

  private submit() {
    FridgeModule.addFridge(this.name);
    this.resetForm();
  }
}
</script>
