import { createApp } from "vue";
import store from "./stores/blog";
import moment from "moment";
import App from "./App.vue";
import router from "./router";
import Flutterwave from "vue-flutterwave";
const API_KEY = import.meta.env.VITE_API_KEY;
const app = createApp(App);

app.use(Flutterwave, {
  publicKey: API_KEY,
});
app.use(moment);
app.use(store);
app.use(router);

app.mount("#app");
