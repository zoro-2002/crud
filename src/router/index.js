import Vue from "vue";
import VueRouter from "vue-router";
import Crud from "../views/Crud.vue"
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Crud",
    component: Crud,
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
];

const router = new VueRouter({
  routes,
});

export default router;
