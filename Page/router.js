import Vue from "vue";
import Router from "vue-router";
import Home from "./views/home/Home.vue";
import Sheet from "./views/sheet/Sheet.vue";
import Violation from "./views/violation/ViolationRecord.vue";
Vue.use(Router);

export const smartSchedulingRouter = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/report",
      name: "sheet",
      component: Sheet,
  },
  {
    path: "/violations",
    name: "about",
    component: Violation,
  },
  ]
});
// export const smartSchedulingRouter2 = new Router({
//   mode: "history",
//   routes: [
//     {
//       path: "/",
//       name: "home",
//       component: Home
//     },
//     {
//       path: "/about",
//       name: "about",
//       component: Home,
//     }
//   ]
// });
