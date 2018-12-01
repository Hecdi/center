import App from "./Page/App.vue";
import {smartSchedulingRouter } from "./Page/router";
import {smartSchedulingStore } from "./Page/store/index";
export default {
    smartScheduling:{
        App:App,
        router:smartSchedulingRouter,
        store:smartSchedulingStore,
        socketAPI:[{
			name: 'schedule',
			host: '173.100.1.52',
			port: '9099',
			channel: 'intelligent_scheduling',
			headers: {
				//userId: 'aoc',
			},
		}],
        ajaxAPI:{
            path:'http://173.100.1.52:9099/',
            url:{
                'taskList':'web/scheduling/getTaskList',
                'personList':'web/scheduling/getAreaAndWorkerListAll',
                'taskDetail':'web/scheduling/taskDetail',
            }
        }
    },
}
