import Vue from "vue";
import Router from "vue-router";
import Home from "./views/home/Home.vue";
// import Toolbar from "./views/sheet/toolbar.vue";

Vue.use(Router);

export const smartSchedulingRouter = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/checkIn",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/report",
      name: "about",
      component: () =>import("./views/sheet/Sheet.vue")
    },
    {
      path: "/violations",
      name: "about",
      component: () =>import("./views/violation/ViolationRecord.vue")
    },
  ]
});
export const smartSchedulingRouter2 = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: Home,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () =>
      //   import( webpackChunkName: "about"  "./views/About.vue")
    }
  ]
});
