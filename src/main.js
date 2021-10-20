import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from 'axios'

Vue.config.productionTip = false;
axios.defaults.baseURL = 'http://www.omdbapi.com/?apikey=c965c562c&page=1&type=movie&Content-Type=application/json'

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
