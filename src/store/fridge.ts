import { getModule, Module, Mutation, VuexModule } from "vuex-module-decorators";
import store from "@/store";

interface IFridgeModule {
  _fridgeItems: string[];
}

@Module({
  dynamic: true,
  store,
  name: "fridge",
  namespaced: true,
  preserveState: localStorage.getItem("vuex") && JSON.parse(localStorage.getItem("vuex") as string).fridge,
})
class FridgeModule extends VuexModule implements IFridgeModule {
  public _fridgeItems: string[] = [];

  @Mutation
  public addFridge(item: string) {
    this._fridgeItems.push(item);
    this._fridgeItems = [...new Set(this._fridgeItems)];
  }

  @Mutation
  public deleteFridge(index: number) {
    this._fridgeItems.splice(index, 1);
  }

  public get fridgeItems() {
    return this._fridgeItems;
  }
}
export default getModule(FridgeModule);
