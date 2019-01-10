import {remote} from 'electron';
import {get, each} from 'lodash';

let getPermission = () => {
	let userInfo = JSON.parse(remote.getGlobal('userInfo'));
	let permission = get(userInfo, 'roleRS', []);
	return permission;
}

export const isHavePermission = (p) =>{
	let permission = getPermission(); 
	let flag = false;
	each(permission, item => {
		if(get(item, 'roleCode') == p){
			flag = true;
		}
	});
	return flag;
}

