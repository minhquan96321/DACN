import { createRouter, createWebHistory } from "vue-router";
// import routerAdmin from "../router/admin.js";
import Home from "@/pages/home/Home.vue";
// import Category from "@/pages/categoris/Categori.vue";
import About from "@/pages/About/About.vue";
import Contact from "@/pages/contact/Contact.vue";
import SinglePost from "@/pages/singlepost/SinglePost.vue";
import Culture from "@/pages/categoris/pages/CultureCategori.vue";
import Business from "@/pages/categoris/pages/BusinessCategori.vue";
import Lifestyle from "@/pages/categoris/pages/LifestyleCategori.vue";
import LoginAut from "@/pages/Auth/loginPage.vue";
import HomeAdminPage from "@/pages/Auth/HomeAdmin.vue";
import AddArticlePage from "@/pages/Auth/AddArticles.vue";
import UpdatePage from "@/pages/Auth/UpdatePost.vue";
import maqr from "@/pages/contact/MaQR.vue";

const token = localStorage.getItem("Token");

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: Home,
  },
  {
    path: "/category",
    name: "CategoryPage",
    // component: Category,
    children: [
      {
        path: "culture",
        name: "CulturePage",
        component: Culture,
      },
      {
        path: "business",
        name: "BusinessPage",
        component: Business,
      },
      {
        path: "lifestyle",
        name: "LifestylePage",
        component: Lifestyle,
      },
    ],
  },

  {
    path: "/detail/:id",
    name: "DetailPage",
    component: SinglePost,
  },
  {
    path: "/about",
    name: "AboutPage",
    component: About,
  },

  {
    path: "/contact",
    name: "ContactPage",
    component: Contact,
  },

  {
    path: "/QR",
    name: "QRPage",
    component: maqr,
  },

  {
    path: "/admin",
    name: "AdminPage",
    children: [
      {
        path: "login",
        name: "LoginPage",
        component: LoginAut,
      },

      {
        path: "",
        name: "HomeAdminPage",
        component: HomeAdminPage,
      },

      {
        path: "addarticles",
        name: "AddArticlePage",
        component: AddArticlePage,
      },

      {
        path: "update/:id",
        name: "UpdatePage",
        component: UpdatePage,
      },
    ],
  },

  {
    path: "/notification/send",
    component: () => import("@/pages/notification/index.vue"),
  },

  {
    path: "/notification/segment",
    component: () => import("@/pages/notification/segmenAdd.vue"),
  }

  // {
  //   path: "update/:id",
  //   name: "UpdatePage",
  //   component: UpdatePage,
  // },

  {
    path: "/:pathMatch(.*)*",
    name: "NotFoundPage",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === "AdminPage") {
  } else {
    if (to.name === "HomeAdminPage" && !token) {
      next({ name: "LoginPage" });
    } else if (to.name === "AddArticlePage" && !token) {
      next({ name: "LoginPage" });
    } else if (to.name === "LoginPage" && token) {
      next({ name: "HomeAdminPage" });
    } else {
      next();
    }
  }
});

export default router;
