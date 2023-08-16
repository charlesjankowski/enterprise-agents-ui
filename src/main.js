import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import POC from "./POC.vue";

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);

new Vue({
  render: (h) => h(POC)
}).$mount("#app");
