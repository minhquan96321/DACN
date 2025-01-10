import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router/index";
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";
// import routerAdmin from "./router/admin";
// import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { hideAddressBar } from "./helper/hideAddressBar";

import App from "./App.vue";

const pinia = createPinia();
const app = createApp(App);
hideAddressBar();
app.use(router);
// app.use(routerAdmin).use(router);
app.use(VueAwesomePaginate);
// app.use(VueSweetalert2);
app.use(pinia);
app.mount("#app");
