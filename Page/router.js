import Vue from "vue";
import Router from 'vue-router';
import Home from "./views/home/Home.vue";
import RollCall from "./views/rollCall/RollCall.vue";
import Sheet from "./views/sheet/Sheet.vue";
import Violation from "./views/violation/ViolationRecord.vue";
import UrgentReport from "./views/urgentReport/UrgentReport.vue";
import MessageCenter from "./views/messageCenter/MessageCenter.vue";
import ViolationNotice from "./views/violation/ViolationNotice.vue";
import Statistics from "./views/statistics/Statistics.vue";
import Manual from "./views/manual/Manual.vue";
import Login from './views/login/Login.vue';

// 货运
import FreightTaskList from './views/home/freight/taskList.vue';
import FreightPeopleList from './views/home/freight/peopleList.vue';
import FreightAddTask from 'FreightAddTask.vue';
import FreightPersonList from 'FreightPersonList.vue';

// 机坪运行
import JPMainList from './views/home/apron/MainList.vue';
import JPPeopleList from './views/home/apron/PeopleList.vue';
import JPAddTask from 'DialogAddTask.vue';
import PersonList from 'PersonList.vue';
import ModuleList from './views/rollCall/ModuleList.vue';

//配置中心
import Tree from './views/tree/Tree.vue';
import Hanger from './views/tree/Hanger.vue';
import Contact from './views/contact/Contact.vue';

Vue.use(Router);

export const smartSchedulingRouter = new Router({
	// mode: "history",
	routes: [
		{
			path: '/',
			redirect: {
				name: 'login',
			},
		},
		{
			path: '/home',
			name: 'home',
			component: Home,
			meta: {
				title: '',
				requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
			},
			children: [
				{
					path: '/',
					components: {
						freightTaskList: FreightTaskList,
						freightPeopleList: FreightPeopleList,
						freightAddTask: FreightAddTask,
						jpMainList: JPMainList,
						jpPeopleList: JPPeopleList,
						jpAddTask: JPAddTask,
					},
				},
			],
		},
		{
			path: '/rollCall',
			name: 'rollCall',
			component: RollCall,
			meta: {
				title: '',
				requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
			},
			children: [
				{
					path: '/',
					components: {
						jpPeopleList: PersonList,
						jpModuleList: ModuleList,
						freightPeopleList: FreightPersonList,
					},
				},
			],
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
			path: "/violationNotice",
			name: "violationNotice",
			component:ViolationNotice,
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
		//配置中心
		{
			path:"/tree",
			name:'tree',
			component:Tree,
		},
		{
			path:"/hanger",
			name:'hanger',
			component:Hanger,
		},
		{
			path:"/contact",
			name:'contact',
			component:Contact,
		}

	]
});
