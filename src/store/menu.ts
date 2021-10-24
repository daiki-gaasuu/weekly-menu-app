import { getModule, Module, Mutation, VuexModule } from "vuex-module-decorators";
import store from "@/store";
import { Menu, PastMenu, WeeklyMenu } from "@/@types/menu";

interface IMenuModule {
  _weeklyMenus: WeeklyMenu[];
  _pastMenus: PastMenu[];
}

@Module({
  dynamic: true,
  store,
  name: "menu",
  namespaced: true,
  preserveState: localStorage.getItem("vuex") && JSON.parse(localStorage.getItem("vuex") as string).menu,
})
class MenuModule extends VuexModule implements IMenuModule {
  public _weeklyMenus: WeeklyMenu[] = [];

  public _pastMenus: PastMenu[] = [];

  @Mutation
  public changeWeeklyMenus(menus: WeeklyMenu[]) {
    this._weeklyMenus = menus;
  }

  @Mutation
  public addPastMenus(menu: Menu) {
    this._pastMenus.push(menu);
  }

  @Mutation
  public changePastMenus(menus: Menu[]) {
    this._pastMenus = menus;
  }

  public get weeklyMenus() {
    return this._weeklyMenus;
  }
  public get pastMenus() {
    return this._pastMenus;
  }
}
export default getModule(MenuModule);
