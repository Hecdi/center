import loki from 'lokijs';
import Promise from 'bluebird';
import { has, extend, get, groupBy, map, each, omit, flatMap, flow, filter, pick, cloneDeep, pickBy } from 'lodash';
import { process, freightProcess } from 'helper/task';

var DB = new loki('ctu.db', { adapter: 'memory' });

export var personDB = DB.addCollection('area', {
	unique: ['areaId'],
	// indices: ['staffName', 'workerName', 'movement', 'naturalDate', 'operationDate', 'groundHandler', 'monitorId', 'status', 'markD', 'markV'],
});
export var taskDB = DB.addCollection('task', {
	unique: ['taskId'],
	indices: ['areaName', 'airRoute', 'aircraftType', 'flightStatus', 'scheduleTime', 'eta', 'etd', 'ata', 'atd', 'sta', 'std', 'flightId', 'flightIndicator', 'taskStatus', 'movement', 'taskBindingShiftNames', 'aircraftNumber', 'airRoute', 'flightNo', 'correlationFlightNo', 'seat', 'gate', 'taskBindingShiftName'],
});
export var homeTableDB = DB.addCollection('taskTable', {
	unique: ['taskId'],
	indices: ['areaName', 'airRoute', 'aircraftType', 'flightStatus', 'scheduleTime', 'eta', 'etd', 'ata', 'atd', 'sta', 'std', 'flightId', 'flightIndicator', 'taskStatus', 'movement', 'taskBindingShiftNames', 'aircraftNumber', 'airRoute', 'flightNo', 'correlationFlightNo', 'seat', 'gate', 'taskBindingShiftName'],
});

// flightDB.ensureUniqueIndex('flightId');

// export var personalDB = DB.addCollection('personal', {
// 	indices: ['type', 'pageKey'],
// });
const mergeDB = (taskList) => {
	let result = taskList;
	let area = personDB.find();
	let areas = {};
	each(area, (item) => {
		areas[item.areaId] = {};
		areas[item.areaId]['areaName'] = item.areaName;
		areas[item.areaId]['workerList'] = item.workerList;
	});
	each(result, (item, index) => {
		if (!areas[item.areaId]) {
			if (!areas['jpyxzh_O']) {
				areas['jpyxzh_O'] = {};
			}
			if (!areas['jpyxzh_O']['taskList']) {
				areas['jpyxzh_O']['taskList'] = [];
			}
			areas['jpyxzh_O']['taskList'].push(item);
		} else {
			if (!areas[item.areaId]['taskList']) {
				areas[item.areaId]['taskList'] = [];
			}
			areas[item.areaId]['taskList'].push(item);
		}
		// if(!areas[item.areaId]['taskList']){
		// areas[item.areaId]['taskList'] = [];
		// }
	});
	let data = map(areas, (v, k) => {
		return { areaId: k, ...v };
	});
	data = filter(data, (item) => {
		return item.taskList && item.taskList.length;
	});
	return Promise.resolve(data);
};

const mergeFreightDB = (taskList) => {
	let areas = {};
	each(taskList, (item, index) => {
		if (!areas[item.mainTaskId]) {
			areas[item.mainTaskId] = {};
			areas[item.mainTaskId]['taskList'] = [];
			// areas[item.mainTaskId]['taskList1'] = [];
			// areas[item.mainTaskId]['taskList2'] = [];
			areas[item.mainTaskId]['mainStaffId'] = item.mainStaffId;
			areas[item.mainTaskId]['mainStaffName'] = item.mainStaffName;
			areas[item.mainTaskId]['mainTaskStatus'] = item.mainTaskStatus;
			areas[item.mainTaskId]['transfortType'] = item.transfortType;
			areas[item.mainTaskId]['projectCode'] = item.projectCode;
			areas[item.mainTaskId]['taskNumber'] = item.taskNumber;
		}
		if (!areas[item.mainTaskId]['taskList']) {
			areas[item.mainTaskId]['taskList'] = [];
		}
		areas[item.mainTaskId]['taskList'].push(item);
	});
	let data = map(areas, (v, k) => {
		return { mainTaskId: k, ...v };
	});
	let tmp = groupBy(data, 'mainStaffId');
	let result = map(tmp, (v, k) => {
		let taskList = [[],[],[]];
		each(v, (item, index) =>{
		  	taskList[index % 3].push(item);
		});
		return {
			mainStaffId: k,
			mainStaffName: get(v, '[0].mainStaffName'),
      taskList0:taskList[0],
			taskList1:taskList[1],
			taskList2:taskList[2],
		};
	});
	// each(data, (item, index) => {
	// 	if(!result[item.mainStaffId]){
	// 		result[item.mainStaffId] = {};
	// 		result[item.mainStaffId]['mainStaffName'] = item.mainStaffName;
	// 		// result[item.mainStaffId]['taskList0'] = [];
	// 		// result[item.mainStaffId]['taskList1'] = [];
	// 		// result[item.mainStaffId]['taskList2'] = [];
	// 		// result[item.mainStaffId]['mainTaskStatus'] = item.mainTaskStatus;
	// 	}
	// 	if(!result[item.mainStaffId]['taskList']) {
	// 		result[item.mainStaffId]['taskList'] = [];
	// 	}
	// 	console.log(index%3);
	// 	result[item.mainStaffId]['taskList'].push(item);
	// });
	// result = map(result, (v, k) => {
	// 	return { staffId: k, ...v };
	// });
	return Promise.resolve(result);
};

const taskListFilter = (filterOpt) => {
	let opt = cloneDeep(filterOpt);
	if (opt.searchPersonKey) {
		let key = opt.searchPersonKey;
		let result = taskDB.find({ taskBindingShiftNames: { $regex: key } });
		return result;
	} else if (opt.logTaskId) {
		let key = opt.logTaskId;
		let result = taskDB.find({ taskId: key });
		return result;
	} else if (opt.searchKey) {
		let key = opt.searchKey;
		let result = new Set();
		each(['flightNo', 'gate', 'seat', 'aircraftNumber', 'aircraftType', 'correlationFlightNo', 'areaName', 'taskBindingShiftName'], (item) => {
			result = new Set([...result, ...new Set(taskDB.find({ [item]: { $regex: key } }))]);
		});
		console.log([...result]);
		return [...result];
	} else {
		opt = pick(opt, ['taskStatus', 'movement', 'flightIndicator', 'flightStatus']);
		opt.taskStatus && (opt.taskStatus = parseInt(opt.taskStatus));
		if (opt.taskStatus == 1) {
			// 查询条件 $lte <=
			opt.taskStatus = {
				$between: [1, 5],
			};
		}
		opt = pickBy(opt, (v, k) => {
			if (v) {
				return true;
			} else {
				return false;
			}
		});
		if (opt.movement == 0) {
			delete opt.movement;
		}
		if (opt.taskStatus == 0) {
			delete opt.taskStatus;
		}
		let result = taskDB
			.chain()
			.find(opt)
			.compoundsort(['scheduleTime'])
			.data();
		return result;
	}
};

export const getTaskListFromDB = (opt) => {
	return mergeDB(taskListFilter(opt));
};

export const getFreightTaskListFromDB = (opt) => {
	return mergeFreightDB(taskListFilter(opt));
};

export const saveToTaskDB = (isAll, rows, opt) => {
	isAll && taskDB.clear();
	let fixRow = process(cloneDeep(rows));
	return Promise.map(fixRow, (row) => {
		let taskId = row.taskId;
		let existTask = taskDB.by('taskId', taskId);
		if (!existTask) {
			taskDB.insert(row);
		} else {
			taskDB.update(extend(existTask, row));
		}
	}).then(() => {
		return getTaskListFromDB(opt);
	});
};
export const saveToFreightTaskDB = (isAll, rows, opt) => {
	isAll && taskDB.clear();
	let fixRow = freightProcess(cloneDeep(rows));
	return Promise.map(fixRow, (row) => {
		let taskId = row.taskId;
		let existTask = taskDB.by('taskId', taskId);
		if (!existTask) {
			taskDB.insert(row);
		} else {
			taskDB.update(extend(existTask, row));
		}
	}).then(() => {
		return getFreightTaskListFromDB(opt);
	});
};

const transfromPersons = (data) => {
	return map(data, (v, k) => {
		let param = {};
		param.areaId = k;
		if (k == 'jpyxzh_O') {
			param.areaName = '其他人员';
		} else {
			param.areaName = v[0] ? v[0].areaName : '';
		}
		param.workerList = v;
		console.log(param);
		return param;
	});
};

export const saveToPersonDB = (data) => {
	let rows = transfromPersons(data);
	personDB.clear();
	return Promise.map(rows, (row) => {
		personDB.insert(row);
	}).then(() => {
		let result = personDB.find();
		return Promise.resolve(result);
	});
};

export const getSearchPersons = (key) => {
	let result = cloneDeep(personDB.find());
	if (!key) {
		return Promise.resolve(result);
	}
	let a = flow([
		(r) =>
			filter(r, (item) => {
				let area = filter(item.workerList, (worker) => {
					return worker.staffName.indexOf(key) != -1 || (worker.workerName && worker.workerName.indexOf(key) != -1);
				});
				item.workerList = area;
				return !!area;
			}),
	])(result);
	return Promise.resolve(a);
};

export const saveHomeTableDB = (isAll, data) => {
	isAll && homeTableDB.clear();
	let fixRow = process(cloneDeep(data));
	return Promise.map(fixRow, (row) => {
		let taskId = row.taskId;
		let existTask = homeTableDB.by('taskId', taskId);
		if (!existTask) {
			homeTableDB.insert(row);
		} else {
			homeTableDB.update(extend(existTask, row));
		}
	});
};

const TableListFilter = (filterOpt) => {
	let opt = cloneDeep(filterOpt);
	if (opt.searchPersonKey) {
		let key = opt.searchPersonKey;
		let offsetSize = (opt.currentPage - 1) * opt.pageSize;
		let result1 = homeTableDB.find({ taskBindingShiftNames: { $regex: key } }).length;
		let result2 = homeTableDB
			.chain()
			.find({ taskBindingShiftNames: { $regex: key } })
			.offset(offsetSize)
			.limit(opt.pageSize)
			.data();
		let result = { total: result1, data: result2 };
		return result;
	} else if (opt.searchKey) {
		var key = opt.searchKey;
		let offsetSize = (opt.currentPage - 1) * opt.pageSize;
		let result1 = new Set();
		each(['flightNo', 'gate', 'seat', 'aircraftNumber', 'aircraftType', 'correlationFlightNo', 'areaName', 'taskBindingShiftName'], (item) => {
			result1 = new Set([...result1, ...new Set(homeTableDB.find({ [item]: { $regex: key } }))]);
		});
		let len = result1.size;
		let result2 = [...result1];
		offsetSize = len < opt.pageSize ? (offsetSize = 0) : offsetSize;
		let result3 = result2.slice(offsetSize, offsetSize + opt.pageSize);
		let result = { total: len, data: result3 };
		return result;
	} else {
		opt = pick(opt, ['taskStatus', 'movement', 'flightIndicator', 'flightStatus', 'pageSize', 'currentPage']);
		opt.taskStatus && (opt.taskStatus = parseInt(opt.taskStatus));
		if (opt.taskStatus == 1) {
			opt.taskStatus = {
				$between: [0, 5],
			};
		}
		opt = pickBy(opt, (v, k) => {
			if (v) {
				return true;
			} else {
				return false;
			}
		});
		if (opt.movement == 0) {
			delete opt.movement;
		}
		if (opt.taskStatus == 0) {
			delete opt.taskStatus;
		}
		let pageSize = opt.pageSize;
		let currentPage = parseInt(opt.currentPage) - 1;
		let offsetSize = currentPage * pageSize;
		delete opt.pageSize;
		delete opt.currentPage;
		let result1 = homeTableDB.find(opt).length;
		let result2 = homeTableDB
			.chain()
			.find(opt)
			.compoundsort(['scheduleTime'])
			.offset(offsetSize)
			.limit(pageSize)
			.data();
		let result = { total: result1, data: result2 };
		return result;
	}
};

export const getHomeTableFromDB = (value) => {
	return Promise.resolve(TableListFilter(value));
};

// const splitFlights = (flights) => {
// 	let movementCfg = {
// 		D: 'arriveFlight',
// 		A: 'departFlight',
// 	};
// 	return flatMap(flights, (item) => {
// 		let movement = get(item, 'movement');
// 		let field = movementCfg[movement];
// 		let otherFlight = item[field];
// 		if (otherFlight) {
// 			item[field] = otherFlight.flightId;
// 			return [item, otherFlight];
// 		}
// 		return item;
// 	});
// };

// export const saveToFlightDB = (flights) => {
// 	return Promise.map(splitFlights(flights), (item) => {
// 		//忽略内存数据库的特有属性
// 		let fixedItem = omit(item, ['$loki', 'meta']);

// 		if (has(fixedItem, 'deleted') && get(fixedItem, 'deleted')) {
// 			let flightId = get(fixedItem, 'flightId');
// 			let removeFlight = flightDB.by('flightId', flightId);
// 			if (removeFlight) {
// 				flightDB.remove(removeFlight);
// 			}
// 			return Promise.resolve();
// 		}
// 		//检查是否有对象不含FlightId, 忽略
// 		let flightId = get(fixedItem, 'flightId');
// 		if (flightId === 'null') {
// 			log.error('flightId is string null');
// 			return Promise.resolve();
// 		}
// 		if (flightId === 'undefined') {
// 			log.error('flightId is string undefined');
// 			return Promise.resolve();
// 		}
// 		if (!has(fixedItem, 'flightId')) {
// 			// log.error('missed key flightId for', fixedItem);
// 			return Promise.resolve();
// 		}

// 		//尝试Insert, 如果失败就Update
// 		try {
// 			let flightId = get(fixedItem, 'flightId');
// 			let existFlight = flightDB.by('flightId', flightId);
// 			if (!existFlight) {
// 				flightDB.insert(fixedItem);
// 			} else {
// 				flightDB.update(extend(existFlight, fixedItem));
// 			}
// 		} catch (ex) {
// 			log.error(fixedItem, ex);
// 		}
// 		return Promise.resolve();
// 	});
// };

// export const replacePersonalDBByType = (type, data) => {
// 	personalDB.findAndRemove({ type: type });
// 	let groupData = groupBy(data, (d) => get(d, 'pageKey'));
// 	groupData = each(groupData, (v, k) => {
// 		let value = each(v, (setting) => {
// 			personalDB.insert({ type: type, pageKey: k, key: get(setting, 'key'), value: get(setting, 'value') });
// 		});
// 	});
// 	return Promise.resolve();
// };
