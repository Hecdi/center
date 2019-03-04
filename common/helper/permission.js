import {remote} from 'electron';
import {each, get} from 'lodash';

let getPermission = () => {
	let userInfo = JSON.parse(remote.getGlobal('userInfo'));
	return get(userInfo, 'roleRS', []);
};

let depCode = null;

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

export const getCompontsNameByPosition = (pos) => {
	if (!depCode) {
		depCode = remote.getGlobal('deptCode');
	}
	return get(compontsMap, depCode + '.' + pos);
};

const compontsMap = {
	Freight_transport: {
		// 货运
		home: {
			peopleList: '123',
			taskList: 'freightMainList',
		},
	},
	jpyxzh: {
		// 机坪
		home: {
			peopleList: 'jpPeopleList',
			taskList: 'jpMainList',
		},
	},
}