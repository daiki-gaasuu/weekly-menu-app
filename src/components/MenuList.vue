<template>
  <div class="menu-list mt-10">
    <template>
      <v-card elevation="2" outlined tile class="pb-2 mt-1" v-for="(date, dateIndex) in weeklyMenus" :key="dateIndex">
        <v-card-title class="text--secondary text-subtitle-2 pb-0">{{ date.date }}</v-card-title>
        <v-card-text class="d-flex flex-column justify-center flex-xs-wrap flex-sm-wrap">
          <ValidationObserver v-slot="{ handleSubmit, invalid }">
            <v-form
              class="edit-form d-flex align-center justify-space-between"
              @submit.prevent="handleSubmit(submit(dateIndex, date.name))"
            >
              <ValidationProvider class="form-field" name="料理名" rules="required" v-slot="{ valid }">
                <div class="text-center">
                  <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        autocomplete="off"
                        v-bind="attrs"
                        v-model="date.name"
                        id="menu"
                        label="料理名"
                        required
                        :success="valid"
                        v-on="on"
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
              <v-btn class="info" id="submit" type="submit" :disabled="invalid">追加</v-btn>
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
                    <v-btn class="info" id="submit" type="submit" :disabled="invalid">追加</v-btn>
                  </v-form>
                </ValidationObserver>
                <ul>
                  <li v-for="(item, index) in menu.ingredients" :key="index">
                    {{ item }}
                  </li>
                </ul>
                <v-btn class="info" @click="addPastMenu(dateIndex, menuIndex)">献立を保存する</v-btn>
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

  private form: Menu = {
    name: "",
    ingredients: [],
  };

  @Watch("form.name")
  private findMenu() {
    if (this.form.name === "") {
      this.filterMenus = [];
    } else {
      this.filterMenus = this.pastMenus.filter((menu: Menu) => {
        return menu.name.indexOf(this.form.name) > -1;
      });
    }
  }
  private ingredientsName = "";

  private resetForm() {
    this.form = {
      name: "",
      ingredients: [],
    };
    this.ingredientsName = "";
  }

  @Watch("weeklyMenus", { deep: true })
  private updateWeekly() {
    MenuModule.changeWeeklyMenus(this.weeklyMenus);
  }

  private submit(index: number, name: string) {
    this.form.name = name;
    this.weeklyMenus[index].menus?.push(this.form);
    this.resetForm();
  }

  private addSelectMenu(index: number, item: Menu) {
    this.weeklyMenus[index].menus?.push(item);
  }

  private addIngredients(dateIndex: number, menuIndex: number) {
    const weekly = this.weeklyMenus[dateIndex];
    if (weekly.menus) {
      weekly.menus[menuIndex].ingredients.push(this.ingredientsName);
    }
    this.resetForm();
  }

  private addPastMenu(dateIndex: number, menuIndex: number) {
    const weekly = this.weeklyMenus[dateIndex];
    if (weekly.menus) {
      MenuModule.addPastMenus(weekly.menus[menuIndex]);
    }
  }
}
</script>
