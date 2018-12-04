import Vue from "vue";
import Router from "vue-router";
import Home from "./views/home/Home.vue";
import RollCall from "./views/rollCall/RollCall.vue";
import Sheet from "./views/sheet/Sheet.vue";
import Violation from "./views/violation/ViolationRecord.vue";
import UrgentReport from "./views/urgentReport/UrgentReport.vue";
import Statistics from "./views/statistics/Statistics.vue";
Vue.use(Router);

export const smartSchedulingRouter = new Router({
  //mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/rollCall",
      name: "rollCall",
      component: RollCall
    },
    {
      path: "/report",
      name: "about",
      component: Sheet,
  },
  {
    path: "/violations",
    name: "about",
    component: Violation,
  },
  {
    path: "/statistics",
    name: "statistics",
    component: Statistics,
  },
  {
    path: "/urgentReport",
    name: "urgentReport",
    component:UrgentReport,
  },
  ]
});
