import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#78909C",
        secondary: "#B3E5FC",
        accent: "#5B9279",
        background: "#212623",
      },
    },
  },
});
