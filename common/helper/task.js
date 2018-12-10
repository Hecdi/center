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

export const process = (rows) => {
	let processer = flow([
		addDisplayField,
		fixNull,
	]);
	return map(rows, (f) => {
		return processer(f);
	});
}
