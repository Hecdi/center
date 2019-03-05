import {remote} from 'electron';
import {each, get} from 'lodash';

let getPermission = () => {
	let userInfo = JSON.parse(remote.getGlobal('userInfo'));
	return get(userInfo, 'roleRS', []);
};

let deptCode = null;

export const isHavePermission = (p) => {
	let permission = getPermission();
	let flag = false;
	each(permission, (item) => {
		if (get(item, 'roleCode') === p) {
			flag = true;
		}
	});
	return flag;
};

export const isDep = (p) => {
	if (!deptCode) {
		deptCode = remote.getGlobal('deptCode');
	}
	return deptCode === p;
};

export const getCompontsNameByPosition = (pos) => {
	if (!deptCode) {
		deptCode = remote.getGlobal('deptCode');
	}
	return get(compontsMap, deptCode + '.' + pos);
};

const compontsMap = {
	Freight_transport: {
		// 货运
		home: {
			peopleList: 'freightPeopleList',
			taskList: 'freightTaskList',
			addTask: 'freightAddTask',
		},
	},
	jpyxzh: {
		// 机坪
		home: {
			peopleList: 'jpPeopleList',
			taskList: 'jpMainList',
			addTask: 'jpAddTask',
		},
	},
}