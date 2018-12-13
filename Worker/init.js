//import Worker from 'worker-loader!./smartScheduling.worker.js';
import postal from 'postal';
import uuid from 'uuid/v4';
import { get, truncate } from 'lodash';
import Logger from '../common/logger';
import { ajaxAPI, socketAPI } from "../index";
import { remote } from 'electron';

const log = new Logger('Worker:init:');

import Worker from './smartScheduling.worker.js';
// import myWorker from 'worker-loader?./worker';
// let worker = new myWorker;
const encoder = new TextEncoder();
const decoder = new TextDecoder();
let inited= false;
export const init = () => {
	if(inited){return;}
	inited =true;
    var worker = new Worker();
    worker.onmessage = (event) =>{
        let content = decoder.decode(event.data);
        try {
            let data = JSON.parse(content);
            let channel = get(data, 'channel');
            let topic = get(data, 'topic');
            let msg = get(data, 'data');
            log.info(`received WorkerPage message ${channel} ${topic}`);
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
	let userInfo = remote.getGlobal('userInfo');
    postal.publish({
        channel: 'Worker',
        topic: 'Start',
        data: {
            clientId,
            ajaxAPI,
			socketAPI,
			token,
			userInfo,
        },
    });

    window.addEventListener('beforeunload', function() {
        postal.publish({
            channel: 'Worker',
            topic: 'Stop',
            data: clientId,
        });
    });

    //postal.channel('UI').subscribe('All.ready', (data = {}, msg = {}) => {
        //postal.publish({
            //channel: 'Worker',
            //topic: 'Home.Start',
            //data: clientId,
        //});
    //});

}
