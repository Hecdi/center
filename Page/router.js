import Vue from "vue";
import Router from "vue-router";
import Home from "./views/home/Home.vue";
import RollCall from "./views/rollCall/RollCall.vue";
import Sheet from "./views/sheet/Sheet.vue";
import Violation from "./views/violation/ViolationRecord.vue";
import UrgentReport from "./views/urgentReport/UrgentReport.vue";
import MessageCenter from "./views/messageCenter/MessageCenter.vue";
import Statistics from "./views/statistics/Statistics1.vue";
import Manual from "./views/manual/Manual.vue";
import Login from "./views/login/Login.vue";
Vue.use(Router);

export const smartSchedulingRouter = new Router({
	//mode: "history",
	routes: [
		{
			path: "/",
			redirect: {
				name: 'login',
			}
		},
		{
			path: "/home",
			name: "home",
			component: Home,
			meta: {
				title: '',
				requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
			},
		},
		{
			path: "/rollCall",
			name: "rollCall",
			component: RollCall,
			meta: {
				title: '',
				requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
			}
		},
		{
			path: "/report",
			name: "report",
			component: Sheet,
			meta: {
				title: '',
				requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
			}
		},
		{
			path: "/violations",
			name: "violations",
			component: Violation,
			meta: {
				title: '',
				requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
			}
		},
		{
			path: "/statistics",
			name: "statistics",
			component: Statistics,
			meta: {
				title: '',
				requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
			}
		},
		{
			path: "/urgentReport",
			name: "urgentReport",
			component:UrgentReport,
			meta: {
				title: '',
				requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
			}
		},
		{
			path: "/messageCenter",
			name: "messageCenter",
			component:MessageCenter,
			meta: {
				title: '',
				requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
			}
		},
		{
			path: "/operationManual",
			name: "operationManual",
			component:Manual,
			meta: {
				title: '',
				requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
			}
		},
		{
			path: "/login",
			name: "login",
			component:Login,
		},
	]
});
