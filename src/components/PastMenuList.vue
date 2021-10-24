<template>
  <div class="menu-list mt-3">
    <h2 class="mt-3">献立一覧</h2>
    <p v-if="!pastMenus.length">献立が登録されていません</p>
    <template>
      <v-expansion-panels class="mt-2" accordion v-for="(menu, menuIndex) in pastMenus" :key="menuIndex">
        <v-expansion-panel>
          <v-expansion-panel-header>{{ menu.name }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <ValidationObserver v-slot="{ handleSubmit }" v-if="isEdit">
              <v-form
                class="edit-form d-flex align-center justify-space-between"
                @submit.prevent="handleSubmit(submit(menuIndex, menu.name))"
              >
                <ValidationProvider class="form-field" name="料理名">
                  <v-text-field autocomplete="off" v-model="menu.name" id="menu" label="料理名" />
                </ValidationProvider>
                <v-btn v-if="isEdit" class="success" :disabled="menu.name === ''" id="submit" type="submit">保存</v-btn>
              </v-form>
            </ValidationObserver>
            <ValidationObserver v-slot="{ handleSubmit, invalid }">
              <v-form
                class="edit-form d-flex align-center justify-space-between"
                @submit.prevent="handleSubmit(addIngredients(menuIndex))"
              >
                <ValidationProvider class="form-field" name="材料名" rules="required" v-slot="{ valid }">
                  <v-text-field v-model="ingredientsName" id="menu" label="材料名" required :success="valid" />
                </ValidationProvider>
                <v-btn class="success" id="submit" type="submit" :disabled="invalid">追加</v-btn>
              </v-form>
            </ValidationObserver>
            <ul>
              <li
                v-for="(item, ingredientsIndex) in menu.ingredients"
                :key="ingredientsIndex"
                class="d-flex justify-lg-space-between align-center mt-1"
              >
                <p class="mb-0">{{ item }}</p>
                <v-btn class="error ml-auto" @click="deleteIngredients(menuIndex, ingredientsIndex)">削除</v-btn>
              </li>
            </ul>
            <div class="mt-3 d-flex justify-space-between">
              <v-btn class="info" @click="changeMenuMode(menuIndex)">変更</v-btn>
              <v-btn class="error" @click="deleteMenu(menuIndex)">削除</v-btn>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import MenuModule from "@/store/menu";
import { Menu } from "@/@types/menu";

@Component({})
export default class MenuList extends Vue {
  private get pastMenus() {
    return MenuModule.pastMenus;
  }

  private isEdit = false;

  private editMenuIndex: number | null = null;

  private form: Menu = {
    name: "",
    ingredients: [],
  };
  private ingredientsName = "";

  private resetForm() {
    this.ingredientsName = "";
  }

  private submit(index: number, name: string) {
    if (name === "") {
      return;
    }
    if (this.isEdit) {
      const menu = this.pastMenus[index];
      menu.name = name;
      this.isEdit = false;
    }
  }

  private deleteMenu(index: number) {
    this.pastMenus.splice(index, 1);
  }

  private changeMenuMode(menuIndex: number) {
    this.isEdit = true;
    this.editMenuIndex = menuIndex;
  }

  private changeMenuName(index: number, name: string) {
    const menu = this.pastMenus[index];
    menu.name = name;
    this.isEdit = false;
  }

  private addIngredients(index: number) {
    if (this.ingredientsName === "") {
      return;
    }
    const menu = this.pastMenus[index];
    menu.ingredients.push(this.ingredientsName);
    this.resetForm();
  }

  private deleteIngredients(menuIndex: number, ingredientsIndex: number) {
    const menu = this.pastMenus[menuIndex];
    menu.ingredients.splice(ingredientsIndex, 1);
  }

  @Watch("pastMenus", { deep: true })
  private changePastMenus() {
    MenuModule.changePastMenus(this.pastMenus);
  }
}
</script>
