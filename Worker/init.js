//import Worker from 'worker-loader!./smartScheduling.worker.js';
import postal from 'postal';
import uuid from 'uuid/v4';
import { get, truncate } from 'lodash';
import Logger from '../common/logger';
import { ajaxAPI, socketAPI, myVue } from "../index";
import { remote } from 'electron';
import {sub, pub,  removeSub} from "postalControl";
const log = new Logger('Worker:init:');

import Worker from './smartScheduling.worker.js';
// import myWorker from 'worker-loader?./worker';
// let worker = new myWorker;
const encoder = new TextEncoder();
const decoder = new TextDecoder();
var worker = null;
export const stopWorker = () => {
  worker.terminate();
  worker = null;
}
export const init = () => {
	if(worker){return;}
    worker = new Worker();
    worker.onmessage = (event) =>{
        let content = decoder.decode(event.data);
        try {
            let data = JSON.parse(content);
            let channel = get(data, 'channel');
            let topic = get(data, 'topic');
            let msg = get(data, 'data');
            log.info(`received WorkerPage message ${channel} ${topic}`);
			if(topic == 'All.ready'){
				remote.setGlobal('workerInit',true);
			}
			if(topic == 'System.LogOut'){
				localStorage.clear();
				myVue.$router.push('/login');
				return;
			}
            postal.publish({
                channel: 'UI',
                topic: topic,
                data: msg,
            });
        } catch (ex) {
            let msg = truncate(content, { length: 100 });
            log.error(`failed handle worker message ${msg}`);
        }
    }
    worker.onerror = (e) =>{
        console.log(e);
    }

    const workerChannel = postal.channel('Worker');
    workerChannel.subscribe('#', (data = {}, msg = {}) => {
        let content = JSON.stringify({
            channel: get(msg, 'channel'),
            topic: get(msg, 'topic'),
            data: data,
        });
        let blob = encoder.encode(content);
        worker.postMessage(blob, [blob.buffer]);
    });

    let clientId = uuid();
	let token = remote.getGlobal('token');
	let deptCode = remote.getGlobal('deptCode');
	let userInfo = remote.getGlobal('userInfo');
	sub('UI','Time.Sync', data =>{
		let nowTime = new Date().getTime();
		let offsetTime = data && data.data ? data.data - nowTime: 0;
		console.log('offsetTime::',offsetTime);
		remote.setGlobal('offsetTime', offsetTime);
	});
    postal.publish({
        channel: 'Worker',
        topic: 'Start',
        data: {
            clientId,
            ajaxAPI,
			socketAPI,
			token,
			userInfo,
			deptCode,
        },
    });

    window.addEventListener('beforeunload', function() {
        postal.publish({
            channel: 'Worker',
            topic: 'Stop',
            data: clientId,
        });
    });

}
