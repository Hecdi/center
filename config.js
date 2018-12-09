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
			//path:'http://192.168.0.145:9099/',
            url:{
                'taskList':'web/scheduling/getTaskList',
				'personList':'web/scheduling/getAreaAndWorkerListAll',
                'home.taskDetail':'web/scheduling/taskDetail',//首页任务详情，post
                'home.taskSubmit':'web/scheduling/taskSubmit',//首页任务详情里的任务提交，post
                'home.taskRelease':'web/scheduling/taskRelease',//首页任务详情里的任务发布/不保障，post ，taskState:2未发布，8不保障
                'getViolationData':'violationRecord/getViolationData',
				'rollCall.getPersons':'attendance/findStaffState',//点到人员列表，post,,需要传token
				'rollCall.getModule':'attendance/findScheduleDetails',//获取模版，post,需要传token
				'rollCall.save':'attendance/saveScheduling',//提交点到，post,需要传token
				'urgentReport':'deviationReport/getDeviationReportData',
                'updateState':'violationRecord/updateState',
                'findByTimeAndCode':'violationRecord/findByTimeAndCode',
                'getFlightForTemporaryTask':'web/scheduling/getFlightForTemporaryTask', //航班搜索 post
                'tempTaskModelList':'web/scheduling/tempTaskModelList', //临时任务获取接口 post
                'taskSubmit':'web/scheduling/createTempTaskSubmit',//临时任务提交接口 post
            }
        }
    },
}
