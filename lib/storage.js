import loki from 'lokijs';
import Promise from 'bluebird';
import { has, extend, get, groupBy, map, each, omit, flatMap, flow, filter, pick,cloneDeep, pickBy } from 'lodash';
import {process} from 'helper/task';

var DB = new loki('ctu.db', { adapter: 'memory' });


export var personDB = DB.addCollection('area', {
	unique: ['areaId'],
	//indices: ['staffName', 'workerName', 'movement', 'naturalDate', 'operationDate', 'groundHandler', 'monitorId', 'status', 'markD', 'markV'],
});
export var taskDB = DB.addCollection('task', {
	unique: ['taskId'],
	indices: ['areaName','airRoute','aircraftType','flightStatus','flightIndicator','taskStatus', 'movement','taskBindingShiftNames', 'aircraftNumber', 'airRoute','flightNo','correlationFlightNo','seat','gate','taskBindingShiftName'],
});
export var homeTableDB = DB.addCollection('taskTable',{
	unique:['$loki'],
});

// flightDB.ensureUniqueIndex('flightId');

// export var personalDB = DB.addCollection('personal', {
// 	indices: ['type', 'pageKey'],
// });
const mergeDB = (taskList) =>{
	let result = taskList;
	let area = personDB.find();	
	let areas ={};
	each(area, item => {
		areas[item.areaId]={};
		areas[item.areaId]['areaName']=item.areaName;
		areas[item.areaId]['workerList']=item.workerList;
	});
	each(result, (item, index) =>{
		if(!areas[item.areaId]){
			//areas[item.areaId]={};
			if(!areas['jpyxzh_O']['taskList']){
				areas['jpyxzh_O']['taskList'] = [];
			}
			areas['jpyxzh_O']['taskList'].push(item); 
		}else{
			if(!areas[item.areaId]['taskList']){
			areas[item.areaId]['taskList'] = [];
			}
			areas[item.areaId]['taskList'].push(item); 
		}
		//if(!areas[item.areaId]['taskList']){
			//areas[item.areaId]['taskList'] = [];
		//}
	});
	let data = map(areas, (v, k)=>{
		return {areaId:k,...v};
	});
	data = filter(data, item=> {
		return item.taskList && item.taskList.length;
	})
	return Promise.resolve(data);
}

const taskListFilter = (filterOpt) =>{
	let opt = cloneDeep(filterOpt);
	if(opt.searchPersonKey){
		let key = opt.searchPersonKey;
		let result = taskDB.find({taskBindingShiftNames:{'$regex':key}});
		return result;
	}else if(opt.searchKey){
		let key = opt.searchKey;
		let result = new Set();
		each(['flightNo','gate','seat','aircraftNumber','aircraftType','correlationFlightNo','areaName','taskBindingShiftName'],item=>{	
			result = new Set([...result,... new Set(taskDB.find({[item]:{'$regex':key}}))]);
		});
		return [...result];
	}else{
		opt = pick(opt,['taskStatus', 'movement','flightIndicator','flightStatus'])
		opt.taskStatus && (opt.taskStatus = parseInt(opt.taskStatus));
		if(opt.taskStatus == 1){
			opt.taskStatus = {
				$gt: 0,
				$lte: 5,
			}
		}
		opt= pickBy(opt, (v,k)=>{
			if(v){
				return true;
			}else{
				return false;
			}
		});
		if(opt.movement == 0){
			delete opt.movement;
		}
		if(opt.taskStatus == 0){
			delete opt.taskStatus;
		}
		let result = taskDB.find(opt);
		return result;
	}
}

export const getTaskListFromDB = (opt)=>{
	return mergeDB(taskListFilter(opt));
}

export const saveToTaskDB = (isAll, rows,opt) => {
	isAll && taskDB.clear();
	let fixRow = process(cloneDeep(rows));
	return Promise.map(fixRow, row => {
		let taskId = row.taskId;
		let existTask= taskDB.by('taskId', taskId);
		if (!existTask) {
			taskDB.insert(row);
		} else {
			taskDB.update(extend(existTask, row));
		}
	}).then(() =>{
		return getTaskListFromDB(opt);
	});
} 

const transfromPersons = (data) =>{
	return map(data, (v,k)=>{
		let param ={};
		param.areaId = k;
		if(k == 'jpyxzh_O'){
			param.areaName = '其他人员'; 
		}else{
			param.areaName = v[0]?v[0].areaName:'';
		}
		param.workerList = v;
		console.log(param);
		return param;
	})
}

export const saveToPersonDB = (data) => {
	let rows = transfromPersons(data);
	personDB.clear();
	return Promise.map(rows, row => {
		personDB.insert(row);
	}).then(() =>{
		let result = personDB.find();
		return Promise.resolve(result);
	});
} 

export const getSearchPersons = (key) => {
	let result = cloneDeep(personDB.find());
	if(!key){
		return Promise.resolve(result);
	}
	let a = flow([
		r => filter(r, item=> {
			let area =  filter(item.workerList, worker=>{
				return worker.staffName.indexOf(key) != -1;
			});
			item.workerList = area;
			return !!area;
		}),
	])(result);
	return Promise.resolve(a);
}

export const saveHomeTableDB = (data) => {
	homeTableDB.insert(process(cloneDeep(data)));
	return Promise.resolve(homeTableDB.chain().find());
}


export const getHomeTableFromDB = (currentPage,pageSize)=>{
	return Promise.resolve(homeTableDB.chain().offset(currentPage).limit(pageSize).data());
	// return homeTableDB.;
}

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
