<template>
  <div class="calender">
    <v-row>
      <v-col cols="12">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="dates"
          transition="scale-transition"
          offset-y
          min-width="auto"
          v-if="!weeklyMenus.length"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-combobox
              v-model="dates"
              multiple
              chips
              small-chips
              label="日付を選択してください(複数可)"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-combobox>
          </template>
          <v-date-picker v-model="dates" multiple no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn text color="primary" @click="datesSave">OK</v-btn>
          </v-date-picker>
        </v-menu>
        <v-btn v-else @click="weeklyReset" color="error">献立をリセットする</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MenuModule from "@/store/menu";
import { WeeklyMenu } from "@/@types/menu";

@Component
export default class Calender extends Vue {
  private menu = false;

  private dates = [];

  private get weeklyMenus() {
    return MenuModule.weeklyMenus;
  }

  private sortDates(dates: string[]) {
    dates.sort(function (a, b) {
      return a > b ? 1 : -1;
    });
  }

  private datesSave() {
    this.sortDates(this.dates);
    const addObjectDates: WeeklyMenu[] = this.dates.map((date: string) => {
      return { date: date, menus: [], name: "" };
    });
    MenuModule.changeWeeklyMenus(addObjectDates);
    console.log(this.weeklyMenus);
  }

  private weeklyReset() {
    MenuModule.changeWeeklyMenus([]);
  }
}
</script>

<style lang="sass">
.v-list-item
  margin-bottom: 0!important
</style>
