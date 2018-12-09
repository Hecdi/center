import axios from 'axios';
import { extend } from 'lodash';
import { remote } from 'electron';
import qs from 'qs';
import Logger from 'logger';
import promise from 'bluebird';

const log = new Logger('worker:http');
class Ajaxx {
    // constructor(httpConfig) {
    //     this.httpConfig = httpConfig;
    //     //axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    //     // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    // }
    getPath(http) {
        return http.path ? `/${http.path}` : '';
    }
    post(url,data, callback) {
		const userId = remote.getGlobal('userId');
		const ajaxAPI = remote.getGlobal('ajaxAPI');
		return axios({
            method: 'post',
            url: `${ajaxAPI.path+ajaxAPI['url'][url]}`,
            data: qs.stringify(extend(data, { userId: userId, userName: 'schedule' })),
        })
		 .then(function(response) {
				if (response === true || response === false) {
					callback && callback(response);
					return promise.resolve(response);
				} else if (response.data) {
					let sBody = response.data;
					if (sBody.responseCode && sBody.responseCode === 200) {
						let contentData = sBody;
						if (sBody.responseType === 'json' && sBody.responseData) {
							contentData = JSON.parse(sBody.responseData);
						}
						callback && callback(contentData);
						return promise.resolve(contentData);
					} else if (sBody.responseCode && sBody.responseCode === 500) {
						log.error('server error', sBody.responseCode);
						let contentData = sBody;
						if (sBody.responseType === 'json' && sBody.responseData) {
							contentData = JSON.parse(sBody.responseData);
						}
						callback && callback(contentData);
						return promise.resolve(sBody);
					}
					if (sBody.code && sBody.code === 200) {
						callback && callback(sBody.data, sBody);
						return promise.resolve(sBody.data);
					} else if (sBody.code && sBody.code === 500) {
						callback && callback(sBody.data, sBody);
						log.error('server error', sBody);
						return promise.resolve(sBody.data);
					}
					if (sBody.code === 0) {
						callback && callback(sBody.data);
						return promise.resolve(sBody.data);
					} else if (sBody.code !== 0) {
						// log.error('server error', sBody);
						callback && callback(sBody);
						return promise.resolve(sBody);
					}
				} else {
					callback && callback(response);
					return promise.resolve(response);
				}
			})
			.catch(function(error) {
				log.error(error);
			});
    }
    get(url, callback, param) {
		const userId = remote.getGlobal('userId');
		const ajaxAPI = remote.getGlobal('ajaxAPI');
        return axios({
            method: 'get',
            url: `${ajaxAPI.path+ajaxAPI['url'][url]+(param?param:'')}`,
            // data: qs.stringify(extend(data, { userId: userId, userName: 'schedule' })),
        })
			.then(function(response) {
				if (response === true || response === false) {
					callback && callback(response);
					return;
				} else if (response.data) {
					let sBody = response.data;
					if (sBody.responseCode && sBody.responseCode === 200) {
						let contentData = sBody;
						if (sBody.responseType === 'json' && sBody.responseData) {
							contentData = JSON.parse(sBody.responseData);
						}
						callback && callback(contentData);
						return promise.resolve(contentData);
					} else if (sBody.responseCode && sBody.responseCode === 500) {
						log.error('server error', sBody.responseCode);
						let contentData = sBody;
						if (sBody.responseType === 'json' && sBody.responseData) {
							contentData = JSON.parse(sBody.responseData);
						}
						callback && callback(contentData);
						return promise.resolve(sBody);
					}
					if (sBody.code && sBody.code === 200) {
						callback && callback(sBody.data, sBody);
						return promise.resolve(sBody.data);
					} else if (sBody.code && sBody.code === 500) {
						callback && callback(sBody.data, sBody);
						log.error('server error', sBody);
						return promise.resolve(sBody.data);
					}
					if (sBody.code === 0) {
						callback && callback(sBody.data);
						return promise.resolve(sBody.data);
					} else if (sBody.code !== 0) {
						// log.error('server error', sBody);
						callback && callback(sBody);
						return promise.resolve(sBody);
					}
				} else {
					callback && callback(response);
					return promise.resolve(response);
				}
			})
			.catch(function(error) {
				log.error(error);
			});
		//return axios({
			//method: 'get',
			//url: `http://${http.host}:${http.port}${this.getPath(http)}/${name}`,
		//})
    }
}

const injection= {
	get:'',
	post:{},
}

const ajaxF = (url,param,callback,type)=>{
	const userId = remote.getGlobal('userId');
	const ajaxAPI = remote.getGlobal('ajaxAPI');
	return axios({
		method: type,
		url: `${ajaxAPI.path+ajaxAPI['url'][url]+(type=='get'?param:'')}`,
		data: type =='post'? qs.stringify(param):'' ,
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

export default (http) => {
	return new Ajaxx(http);
};
