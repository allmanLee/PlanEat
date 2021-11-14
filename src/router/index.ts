import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import Tabs from "../views/Tabs.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    component: () => import("@/views/LoginPage.vue")
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/RegisterPage.vue")
  },
  {
    path: "/tabs/",
    component: Tabs,
    children: [
      {
        path: "",
        redirect: "/tabs/tab1",
      },
      {
        path: "tab1",
        component: () => import("@/views/Tab1.vue"),
      },
      {
        path: "tab2",
        component: () => import("@/views/Tab2.vue"),
      },
      {
        path: "tab3/",
        component: () => import("@/views/Tab3/index.vue"),
        children: [
          {
            path: "",
            redirect: "/tabs/tab3/tab3Add",
          },
          {
            path: "tab3Add",
            component: () => import("@/views/Tab3/Tab3Add.vue"),
          },
          {
            path: "tab3Remove",
            component: () => import("@/views/Tab3/Tab3Remove.vue"),
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
