import axios from 'axios';
import { extend } from 'lodash';
import { remote } from 'electron';
import qs from 'qs';
import Logger from 'logger';
import promise from 'bluebird';
const injection= {
	get:'',
	post:{},
}

const ajaxF = (url,param,callback,type)=>{
	const userId = remote.getGlobal('userId');
	const ajaxAPI = remote.getGlobal('ajaxAPI');
	const token = remote.getGlobal('token');
	let headers = {};
	if(token){
		headers.token=token;
	}
	return axios({
		method: type,
		headers:headers,
		url: `${ajaxAPI.path+ajaxAPI['url'][url]+(type=='get'?param:'')}`,
		data: type =='post'? qs.stringify(param):'' ,
		//data: type =='post'? qs.stringify(param,{ arrayFormat: 'brackets' }):'' ,
		//data: type =='post'? qs.stringify(param):'' ,
		//data: type =='post'? qs.stringify(extend(param, { userId: userId, userName: 'schedule' })) :'' ,
	}).then(response =>{
		if(response.status == 200){
			callback && callback(response.data);
			if(response.data.responseCode !=1000){
				return Promise.resolve(response.data);
			}else{
				return Promise.resolve(response.data.data);
			}	
		}else{
			callback && callback(response);
			return Promise.resolve(response);
		}
	})
}

export const ajax ={
	get:(url,param,callback)=>{
		return ajaxF(url,param,callback,'get');
	},
	post:(url,param,callback)=>{
		return ajaxF(url,param,callback,'post');
	}
}
