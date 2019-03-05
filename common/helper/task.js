import {toUpper, upperFirst, get,flow,filter,map ,has, concat,compact, extend, each, set} from 'lodash';
import { getNaturalDate, getOperationDate, formatDate, getTime } from 'date';

const DISPLAYNULL = '--';
const displayUpperFields = ['eta','etd','ata','atd','sta','std','cobt','ttot','tobt','ctot'];
const displayUpperFirstFields = ['estimateTime','scheduleTime'];
const addDisplayField = (row) => {
    let upperRow = map(displayUpperFields, fieldKey=>{
		if(has(row, fieldKey)){
			return { [`display${toUpper(fieldKey)}`]: formatDate(get(row, fieldKey), 'HHmm'),
				[`display${toUpper(fieldKey)}WithDate`]: formatDate(get(row, fieldKey), 'HHmm(DD)'), 
			}
		}
		return null;
	});	
	let upperFirstRow = map(displayUpperFirstFields, fieldKey=>{
		if(has(row, fieldKey)){
			return {
				[`display${upperFirst(fieldKey)}`]: formatDate(get(row, fieldKey), 'HHmm'),
				[`display${upperFirst(fieldKey)}WithDate`]: formatDate(get(row, fieldKey), 'HHmm(DD)'),
			};
		}
		return null;
	});	


	let taskStatusDisplayMap = {
		1:"未发布",
		2:"已发布",
		3:"已领受",
		4:"已到位",
		5:"进行中",
		6:"已完成",
		"-1":"取消",
		7:"告警",
		8:"不保障",
	};
	let taskStatusDisplay =   {
			displayTaskStatus: taskStatusDisplayMap[row.taskStatus]
		}
	let flightIndicatorDisplayMap = {
		"D": "国内",
		"I": "国际",
		"M": "混合",
		"R": "地区",
	};
	
	let flightIndicatorDisplay = {
		displayFlightIndicator: flightIndicatorDisplayMap[row.flightIndicator]
	}
	let haveDeviatingDisplayMap = {
		true: "iconfont icon-pianlishangbao1",
		false: "iconfont icon-pianlishangbao",
	};
	let haveDeviatingDisplay = {
		displayHaveDeviating: haveDeviatingDisplayMap[row.haveDeviating]
	};
	let delayDisplayMap = {
		true: "iconfont icon-yanwu",
		false: "iconfont",
	};
	let delayDisplay = {
		displayDelay: delayDisplayMap[row.delay]
	};
	let returnFlihtDisplayMap = {
		true: "iconfont icon-fanhang",
		false: "iconfont",
	};
	let returnFlihtDisplay = {
		displayReturnFliht: returnFlihtDisplayMap[row.returnFliht]
	};
	let alternateMap = {
		true: "iconfont icon-beijiang",
		false: "iconfont",
	};
	let alternateDisplay = {
		displayAlternate: alternateMap[row.alternate]
	};
	let quickFlagMap = {
		true: "iconfont icon-kuaisu",
		false: "iconfont",
	};
	let quickFlagDisplay = {
		displayQuickFlag: quickFlagMap[row.quickFlag]
	};
	let keyMaintainceMap = {
		true: "iconfont icon-zhongdian",
		false: "iconfont",
	}
	let keyMaintaince = row.keyMaintaince == 1 ? true: false;
	let keyMaintainceDisplay = {
		displayKeyMaintaince: keyMaintainceMap[keyMaintaince]
	};
	let vipMap = {
		true: "iconfont icon-VIP",
		false: "iconfont",
	};
	let vipDisplay = {
		displayVip: vipMap[row.vip]
	};
	let alarmMap = {
		true : "iconfont icon-gaojingbiaoji",
		false: "iconfont",
	};
	let record = row.taskAlarm == -1 ? true : false;
	let alarmDisplay = {
		displayAlarm: alarmMap[record]
	};
	let PlaceholderMap = {
		true: 1,
		false: 2,
	}; 
	
	let Placeholder = {
		disPlaceholder:PlaceholderMap[!(row.vip ||row.quickFlag ||row.alternate || keyMaintaince || row.delay ||row.returnFliht||record)]
	};
	let mergedFields = concat([{}], upperRow, upperFirstRow,taskStatusDisplay,flightIndicatorDisplay, haveDeviatingDisplay, keyMaintainceDisplay, delayDisplay,returnFlihtDisplay,alternateDisplay,vipDisplay,quickFlagDisplay,alarmDisplay,Placeholder);
	mergedFields = compact(mergedFields);
	let result = extend.apply(null, mergedFields);
	return extend({}, row, result);
}

const fixNull = (row) => {
	map(row, (v,k)=>{
		row[k] = v || DISPLAYNULL;
	})
	return row;
}

const displayTime = ['eta','etd','ata','atd'];

const actExp = (row) => {
	let time = map(displayTime, fieldKey=>{
		if(has(row, fieldKey)){
			let ata = get(row, "ata");
			let atd = get(row,'atd');
			let eta = get(row,'eta');
			let etd = get(row,'etd');
			let disPlayActuralTime = ata ? ata : atd;
			let disPlayExpectedTime = eta ? eta : etd;
			return { 
				[`disPlayActuralTime`]: formatDate(disPlayActuralTime, 'HHmm(DD)'),
				[`disPlayExpectedTime`]: formatDate(disPlayExpectedTime, 'HHmm(DD)'), 
			}
	}
	return null;
});
	let result = extend.apply(null, time);
	return extend({}, row, result);
};	



export const process = (rows) => {
	let processer = flow([
		actExp,
		addDisplayField,
		fixNull,
	]);
	return map(rows, (f) => {
		return processer(f);
	});
};

export const freightProcess = (rows) => {
	let processer = flow([
		actExp,
		addDisplayField,
		fixNull,
	]);
	let arr = [];
	map(rows, item => {
		each(get(item, 'taskRS', []), (i) =>{
			set(i, 'mainTaskId', get(item, 'taskId'));
			set(i, 'mainStaffId', get(item, 'staffId'));
			set(i, 'mainStaffName', get(item, 'staffName'));
			arr.push(i);
		});
	});
	return map(arr, (f) => {
		return processer(f);
	});
}
