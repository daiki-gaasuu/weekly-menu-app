import Vue from "vue";
import { ValidationProvider, ValidationObserver, extend, localize, configure } from "vee-validate";
import ja from "@/assets/ja.json";
import { required } from "vee-validate/dist/rules";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueMeta from "vue-meta";

Vue.config.productionTip = false;
const config = {
  bails: false,
  mode: "aggressive", // this is the default behavior and it validates whenever an input event is emitted.
};
configure(config);
extend("required", required);
localize("ja", ja);
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

Vue.use(VueMeta);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
