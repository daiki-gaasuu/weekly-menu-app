<template>
  <div class="menu-list mt-10">
    <template>
      <v-card elevation="2" outlined tile class="pb-2 mt-1" v-for="(date, dateIndex) in weeklyMenus" :key="dateIndex">
        <v-card-title class="text--secondary text-subtitle-2 pb-0">{{ date.date }}</v-card-title>
        <v-card-text class="d-flex flex-column justify-center flex-xs-wrap flex-sm-wrap">
          <ValidationObserver v-slot="{ handleSubmit }">
            <v-form
              class="edit-form d-flex align-center justify-space-between"
              @submit.prevent="handleSubmit(submit(dateIndex, date.name))"
            >
              <ValidationProvider class="form-field" name="料理名">
                <div class="text-center">
                  <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        autocomplete="off"
                        v-bind="attrs"
                        v-model="date.name"
                        id="menu"
                        label="料理名"
                        v-on="on"
                        @input="findMenu(date.name)"
                      />
                    </template>
                    <v-list v-if="filterMenus.length > 0">
                      <v-list-item v-for="(item, index) in filterMenus" :key="index">
                        <v-list-item-title @click="addSelectMenu(dateIndex, item)">{{ item.name }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </div>
              </ValidationProvider>
              <v-btn v-if="isEdit" class="success" :disabled="date.name === ''" id="submit" type="submit">保存</v-btn>
              <v-btn v-else class="success" id="submit" type="submit" :disabled="date.name === ''">追加</v-btn>
            </v-form>
          </ValidationObserver>
          <v-expansion-panels accordion>
            <v-expansion-panel v-for="(menu, menuIndex) in date.menus" :key="menuIndex">
              <v-expansion-panel-header>{{ menu.name }}</v-expansion-panel-header>
              <v-expansion-panel-content>
                <ValidationObserver v-slot="{ handleSubmit, invalid }">
                  <v-form
                    class="edit-form d-flex align-center justify-space-between"
                    @submit.prevent="handleSubmit(addIngredients(dateIndex, menuIndex))"
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
                    <v-btn class="error ml-auto" @click="deleteIngredients(dateIndex, menuIndex, ingredientsIndex)">
                      削除
                    </v-btn>
                  </li>
                </ul>
                <div class="mt-3 d-flex justify-space-between">
                  <v-btn class="success" @click="addPastMenu(dateIndex, menuIndex)">保存</v-btn>
                  <v-btn class="info" @click="changeMenuMode(dateIndex, menuIndex, menu.name)">変更</v-btn>
                  <v-btn class="error" @click="deleteMenu(dateIndex, menuIndex)">削除</v-btn>
                </div>
                <v-alert class="mt-2" type="success" :value="showLabel">献立を保存しました。</v-alert>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card-text>
      </v-card>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import MenuModule from "@/store/menu";
import { Menu } from "@/@types/menu";

@Component({})
export default class MenuList extends Vue {
  private get weeklyMenus() {
    return MenuModule.weeklyMenus;
  }

  private get pastMenus() {
    return MenuModule.pastMenus;
  }

  private filterMenus: Menu[] = [];

  private showLabel = false;

  private isEdit = false;

  private editMenuIndex: number | null = null;

  private form: Menu = {
    name: "",
    ingredients: [],
  };

  private findMenu(name: string) {
    if (name === "") {
      this.filterMenus = [];
    } else {
      this.filterMenus = this.pastMenus.filter((menu: Menu) => {
        return menu.name.indexOf(name) > -1;
      });
    }
  }
  private ingredientsName = "";

  private resetForm(index: number) {
    this.form = {
      name: "",
      ingredients: [],
    };
    this.ingredientsName = "";
    this.weeklyMenus[index].name = "";
  }

  @Watch("weeklyMenus", { deep: true })
  private updateWeekly() {
    MenuModule.changeWeeklyMenus(this.weeklyMenus);
  }

  private submit(index: number, name: string) {
    if (name === "") {
      return;
    }
    if (this.isEdit) {
      const weekly = this.weeklyMenus[index];
      if (weekly.menus?.length && this.editMenuIndex !== null) {
        weekly.menus[this.editMenuIndex].name = name;
      }
      this.isEdit = false;
    } else {
      this.form.name = name;
      this.weeklyMenus[index].menus?.push(this.form);
    }
    this.resetForm(index);
  }

  private deleteMenu(dateIndex: number, menuIndex: number) {
    this.weeklyMenus[dateIndex].menus?.splice(menuIndex, 1);
  }

  private changeMenuMode(dateIndex: number, menuIndex: number, name: string) {
    this.isEdit = true;
    this.editMenuIndex = menuIndex;
    this.weeklyMenus[dateIndex].name = name;
  }

  private changeMenuName(dateIndex: number, name: string) {
    const weekly = this.weeklyMenus[dateIndex];
    if (weekly.menus && this.editMenuIndex) {
      weekly.menus[this.editMenuIndex].name = name;
    }
    this.isEdit = false;
  }

  private addSelectMenu(index: number, item: Menu) {
    this.weeklyMenus[index].menus?.push(item);
  }

  private addIngredients(dateIndex: number, menuIndex: number) {
    if (this.ingredientsName === "") {
      return;
    }
    const weekly = this.weeklyMenus[dateIndex];
    if (weekly.menus) {
      weekly.menus[menuIndex].ingredients.push(this.ingredientsName);
    }
    this.resetForm(dateIndex);
  }

  private deleteIngredients(dateIndex: number, menuIndex: number, ingredientsIndex: number) {
    const weekly = this.weeklyMenus[dateIndex];
    if (weekly.menus) {
      weekly.menus[menuIndex].ingredients.splice(ingredientsIndex, 1);
    }
  }

  private addPastMenu(dateIndex: number, menuIndex: number) {
    const weekly = this.weeklyMenus[dateIndex];
    let addMenu: Menu | null = null;
    if (weekly.menus) {
      addMenu = weekly.menus[menuIndex];
      const getDuplicate = this.pastMenus.filter((menu: Menu) => {
        return menu.name === addMenu?.name;
      });
      if (getDuplicate.length) {
        return;
      }
      MenuModule.addPastMenus(addMenu);
      this.showLabel = true;
      setTimeout(() => {
        this.showLabel = false;
      }, 2000);
    }
  }
}
</script>
