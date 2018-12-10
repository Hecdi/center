import {toUpper, upperFirst, get,flow,filter,map ,has, concat,compact, extend} from 'lodash';
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
	};
	let taskStatusDisplay =   {
			displayTaskStatus: taskStatusDisplayMap[row.taskStatus]
		}
	let mergedFields = concat([{}], upperRow, upperFirstRow,taskStatusDisplay);
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
			// row.disPlayActuralTime = disPlayActuralTime;
			// row.disPlayExpectedTime = disPlayExpectedTime;
			// row.push(`"disPlayActuralTime":${disPlayActuralTime}`);
			// row.push(`"disPlayExpectedTime":${disPlayExpectedTime}`);
	}
	return null;
});
	let result = extend.apply(null, time);
	return extend({}, row, result);
};	
	// map(row,(item,index) => {
	// 	let disPlayActuralTime = ata ? ata : atd;
	// 	let disPlayExpectedTime = eta ? eta : etd;
	// 	// switch(item){
	// 	// 	case 'item.ata':
	// 	// 	return disPlayActuralTime = item.ata;
	// 	// 	case 'item.atd':
	// 	// 	return disPlayActuralTime = item.ata;
	// 	// 	case 'item.eta':
	// 	// 	return disPlayExpectedTime = item.eta;
	// 	// 	case 'item.etd':
	// 	// 	return disPlayExpectedTime = item.eta;
	// 	// }
	// })
	// return row;


export const process = (rows) => {
	let processer = flow([
		actExp,
		addDisplayField,
		fixNull,
	]);
	return map(rows, (f) => {
		return processer(f);
	});
}
