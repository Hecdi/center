import axios from 'axios';
import { extend } from 'lodash';
import { remote } from 'electron';
import {myVue } from "../index";
import qs from 'qs';
import Logger from 'logger';
import promise from 'bluebird';
const log = new Logger('UI:http');
const injection= {
	get:'',
	post:{},
}

const notLoadingMap = {
	"home.taskDetail":true,
	"home.taskSubmit":true,
	"home.updateStaffState":true,
	"home.getPersonDetail":true,
	"tempTaskModelList":true,
	"getFlightForTemporaryTask":true,
	"getAssociateReportList":true,
	"taskSubmit":true,
}

const ajaxF = (url,param,callback,type)=>{
	const userId = remote.getGlobal('userId');
	const ajaxAPI = remote.getGlobal('ajaxAPI');
	const token = remote.getGlobal('token');
	let headers = {};
	if(token){
		headers.token=token;
	}
	if(myVue && !notLoadingMap[url] ){
		myVue.$store.dispatch(`home/update`, {
			waiting: true,
		});
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
		if(myVue && !notLoadingMap[url]){
			myVue.$store.dispatch(`home/update`, {
				waiting:false,
			});
		}
		if(response.status == 200){
			if(response.data.responseCode == 10003){
				localStorage.clear();
				myVue.$router.push('/login');
				return;
			}
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
	}).catch(error=>{
		if(myVue && !notLoadingMap[url]){
			myVue.$store.dispatch(`home/update`, {
				waiting:false,
			});
		}
		console.error(error);
	});
}

export const ajax ={
	get:(url,param,callback)=>{
		return ajaxF(url,param,callback,'get');
	},
	post:(url,param,callback)=>{
		return ajaxF(url,param,callback,'post');
	}
}
