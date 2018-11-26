import postal from 'postal';
import Logger from '../common/logger';
import { each, get, truncate, map, cloneDeep } from 'lodash';
import Promise from 'bluebird';
import {initPage as initHome, destroy as destroyHome } from "./pages/home";
import { remote } from 'electron';

const log = new Logger('Worker:Worker:');

const encoder = new TextEncoder();
const decoder = new TextDecoder();

//let postalMap = {};
//export const sub = (channel, topic, callback)=>{
    //let pos = postal.subscribe({
        //channel, topic, callback
    //});
    //let [module, name] = topic.split('.');
    //if(!postalMap[module]){
        //postalMap[module] = {};
    //}
    //postalMap[module][name] = pos;
    //console.log(postalMap);
//}

//export const removeSub = (topic) =>{
    //if(!topic){return}
    //let [module, name ]= topic.split('.');
    //if(module && name && postalMap[module][name]){
        //postalMap[module][name].unsubscribe();
        //delete postalMap[module][name];
        //return;
    //}
    //if(module){
        //map(postalMap[module],(v,k)=>{
            //v && postal.unsubscribe(v);
            //delete postalMap[module][k];
        //});
        //delete postalMap[module];
    //}
//}

//const clearPostal = ()=>{
    //map(postalMap, (v,k)=>{
        //removeSub(k);
    //});
//}
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
    Promise.map([
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


