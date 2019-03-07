import App from './Page/App.vue';
import { smartSchedulingRouter } from './Page/router';
import { smartSchedulingStore } from './Page/store/index';
export default {
	smartScheduling: {
		App: App,
		router: smartSchedulingRouter,
		store: smartSchedulingStore,
		socketAPI: [
			{
				name: 'schedule',
				host: location.hostname,
				// host: '173.100.1.52',
				// host: '192.168.1.50',
				port: '6070',
				channel: 'webpush/intelligent_scheduling',
				headers: {
					// userId: 'aoc',
				},
			},
		],
		ajaxAPI: {
			path: `http://${location.hostname}:6070/dispatchforpc/`,
			// path:`http://${location.hostname}:6070/webpush/`,
			// path:`http://${location.hostname}:6070/`,
			// path:'http://192.168.1.50/',
			// path:'http://192.168.0.145:80/',
			url: {
				taskList: 'web/scheduling/getTaskList',
				personList: 'web/scheduling/getAreaAndWorkerListAll',
				'home.taskDetail': 'web/scheduling/taskDetail', // 首页任务详情，post
				'home.taskSubmit': 'web/scheduling/taskSubmit', // 首页任务详情里的任务提交，post
				'home.taskRelease': 'web/scheduling/taskRelease', // 首页任务详情里的任务发布/不保障，post ，taskState:2未发布，8不保障
				'home.updateStaffState': 'attendance/updateStaffState', // 排班页面跟新人员状态，post
				'home.getPersonDetail': 'web/scheduling/staffOperationList', // 排班页面跟新人员状态，post
				relievingAlarm: 'alarm/web/scheduling/relievingAlarm', // 解除警告
				getViolationData: 'violationRecord/getViolationData', // 获取所有的违规记录数据,get
				getViolationByState: 'violationRecord/getViolationByState', // 获取待审核的违规记录数据,get
				getViolationDataForLike: 'violationRecord/getViolationDataForLike', // 过滤违规记录数据，即违规记录搜索, post
				exportExcel: 'violationRecord/exportExcel', // 违规记录数据导出接口, post,get
				getViolationCodeInfo: 'violationRecord/getViolationCodeInfo', // 获取违规记录码表接口
				updateViolation: 'violationRecord/updateViolation', // 违规记录编辑 post
				uploadImg: 'violationRecord/uploadImg', // 违规记录上传
				ordinances: 'ordinances/selectKey', // 违规条例数据获取接口,post
				'rollCall.getPersons': 'attendance/findStaffState', // 点到人员列表，post,,需要传token
				'rollCall.getModule': 'attendance/findScheduleDetails', // 获取模版，post,需要传token
				'rollCall.save': 'attendance/saveScheduling', // 提交点到，post,需要传token
				urgentReport: 'deviationReport/getDeviationReportData',
				updateState: 'violationRecord/updateState',
				messageCenter: 'message/getList',
				findByTimeAndCode: 'violationRecord/findByTimeAndCode',
				getFlightForTemporaryTask: 'web/scheduling/getFlightForTemporaryTask', // 航班搜索 post
				tempTaskModelList: 'web/scheduling/tempTaskModelList', // 临时任务获取接口 post
				taskSubmit: 'web/scheduling/createTempTaskSubmit', // 临时任务提交接口 post
				taskSubmitForCargo: 'web/scheduling/createTempTaskSubmitForCargo', // 货运临时任务提交接口 post
				login: 'web/login', // 登陆接口， post
				getAssociateReportList: 'associate/getAssociateReportList', // 任务交接，post
				getDataList: 'statement/getDataList', // 报表列表数据获取接口, post
				sheetExportExcel: 'statement/exportExcel', // 报表导出excel接口 post
				statistics: 'statistics/getData', // 统计接口 post
			},
		},
	},
};
