import postal from 'postal';
import Logger from '../common/logger';
import { each, get, truncate, map, cloneDeep } from 'lodash';
import Promise from 'bluebird';
import {initPage as initHome, destroy as destroyHome, initSocket as initHomeSocket } from "./pages/home";
import { remote } from 'electron';
import socket from '../lib/socket';

const log = new Logger('Worker:Worker:');

const encoder = new TextEncoder();
const decoder = new TextDecoder();

onmessage = (event) => {
    if (!event || !event.data) {
        log.info('empty event data');
        return;
    }
    let content = decoder.decode(event.data);
    //try {
    let data = JSON.parse(content);
    let channel = get(data, 'channel');
    let topic = get(data, 'topic');
        let msg = get(data, 'data');
    log.verbose(`received page message topic ${topic} on channel ${channel},data is ${JSON.stringify(data)}`);

    postal.channel('Worker').publish(topic,msg);
}

var UIChannel = postal.channel('UI');
const init = ()=>{
	let socketAPI = remote.getGlobal('socketAPI');
	let mysocket = socket(socketAPI);
    Promise.map([
		()=>{
			return postal.channel('ServerConnect').subscribe(`${socketAPI.name}.Network.Connected`,()=>{
				mysocket.regist('schedule',(client) => {
					initHomeSocket(client);
				});
			});
		},
        ()=>{
            return initHome().then((data)=>{
                UIChannel.publish(data,null);
                return Promise.resolve();
            });
        },
    ],f=>f()).then(()=>{
        UIChannel.publish('All.ready',null);
        }
    );
}

UIChannel.subscribe('#', (data = {}, msg = {}) => {
    let content = JSON.stringify({
        channel: 'UI',
        topic: get(msg, 'topic'),
        data: data,
    });
    let blob = encoder.encode(content);
    self.postMessage(blob, [blob.buffer]);
});
postal.channel('Worker').subscribe('Start',(data ={}, msg={}) => {
    each(data, (v, k) => {
        remote.setGlobal(k, v);
    });
    init();
});


