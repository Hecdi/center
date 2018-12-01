import axios from 'axios';
import { extend } from 'lodash';
import { remote } from 'electron';
import qs from 'qs';
import Logger from 'logger';
import promise from 'bluebird';

const log = new Logger('worker:http');
class Ajaxx {
    constructor(httpConfig) {
        this.httpConfig = httpConfig;
        //axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    }
    getPath(http) {
        return http.path ? `/${http.path}` : '';
    }
    post(url,data, callback) {
        let userId = remote.getGlobal('userId');
        let ajaxAPI = remote.getGlobal('ajaxAPI');
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
    get(url, callback ) {
        let userId = remote.getGlobal('userId');
        let ajaxAPI = remote.getGlobal('ajaxAPI');
        console.log(ajaxAPI);
        return axios({
            method: 'get',
            url: `${ajaxAPI.path+ajaxAPI['url'][url]}`,
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
export default (http) => {
	return new Ajaxx(http);
};
