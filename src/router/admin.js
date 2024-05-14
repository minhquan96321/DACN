// import { createRouter, createWebHistory } from "vue-router";
// import LoginAut from "@/pages/Auth/loginPage.vue";
// import HomeAdminPage from "@/pages/Auth/HomeAdmin.vue";

// const token = localStorage.getItem("Token");

// const routess = [
//   {
//     path: "/admin",
//     name: "AdminPage",
//     children: [
//       {
//         path: "login",
//         name: "LoginPage",
//         component: LoginAut,
//       },

//       {
//         path: "",
//         name: "HomeAdminPage",
//         component: HomeAdminPage,
//       },
//     ],
//   },
// ];

// const routerAdmin = createRouter({
//   history: createWebHistory(),
//   routes,
// });

// routess.forEach((to, from) => {
//   if (to.name !== "LoginPage" && !token) {
//     next({ name: "LoginPage" });
//   } else if (to.name === "LoginPage" && token) {
//     next({ name: "HomeAdminPage" });
//   } else {
//     next();
//   }
// });

// export default routess;
