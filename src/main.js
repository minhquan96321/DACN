import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router/index";
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";
// import routerAdmin from "./router/admin";
import App from "./App.vue";

const pinia = createPinia();
const app = createApp(App);
app.use(router);
// app.use(routerAdmin).use(router);
app.use(VueAwesomePaginate);
app.use(pinia);
app.mount("#app");
