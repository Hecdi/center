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
                'getViolationData':'violationRecord/getViolationData',
				'rollCall.getPersons':'attendance/findStaffState',//点到人员列表，post
				'rollCall.getModule':'attendance/findScheduleDetails',//获取模版，post,需要传token
				'urgentReport':'deviationReport/getDeviationReportData',
                'updateState':'violationRecord/updateState',
                'findByTimeAndCode':'violationRecord/findByTimeAndCode',
            }
        }
    },
}
