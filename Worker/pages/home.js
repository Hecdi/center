import Promise from 'bluebird';
import postal from 'postal';
import {sub, removeSub} from "postalControl";
import { areaDB } from "../../lib/storage";
import ajaxx from "ajax";

const homeInit = () => {
let ajax = ajaxx();
    ajax.get('mainList').then(data=>{
        console.log(data);
		postal.channel('UI').publish('Home.Sync',data);
    });
}
export const initPage = () => {
    return Promise.all([
        (() => {console.log('initHome start')})(),
        (() => {sub('Worker','Home.Start',()=>{
                console.log('initHome');
                homeInit();
            })})()
    ]).then(()=>{
        return Promise.resolve('Home.ready');
    });
}

export const destroy = () => {
    removeSub('Home.start');
}

export const initSocket = (client) =>{
	client.sub('/web/scheduling/getAreaAndWorkerList', (data) => {
		console.log('66666666');
		console.log(data);
	});
}

