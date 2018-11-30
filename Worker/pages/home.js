import Promise from 'bluebird';
import postal from 'postal';
import {sub, pub,  removeSub} from "postalControl";
import { areaDB, saveToAreaDB, getSearchPersons } from "../../lib/storage";
import ajaxx from "ajax";

var homeFilter={};

const homeInit = () => {
	let ajax = ajaxx();
	ajax.get('mainList').then(data=>{
		//console.log(data);
		//postal.channel('UI').publish('Home.Sync',data);
	});
	sub('Worker','Home.Area.SetPersonSearchKey',(key) =>{
		homeFilter['searchPersonKey'] = key;
		getSearchPersons(homeFilter['searchPersonKey']).then((result) => {
			pub('UI','Home.Area.Sync', result);	
		})
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
	client.sub('/web/scheduling/getAreaAndWorkerList', (d) => {
		console.log(d);
		let data =  [
			{
				"areaId": "1",
				"areaName": "A区",
				"workerList": 
				[{
					"workerId": 102,
					"workerName": "李大刀",
					"taskNumber": 0,
				},{
					"workerId": 102,
					"workerName": "李大刀",
					"taskNumber": 0,
				},{
					"workerId": 102,
					"workerName": "李大刀",
					"taskNumber": 0,
				},{
					"workerId": 102,
					"workerName": "李大刀",
					"taskNumber": 0,
				},
					{
						"workerId": 103,
						"workerName": "王晓四",
						"taskNumber": 2,
					}]
			},
			{
				"areaId": "2",
				"areaName": "B区",
				"workerList": 
				[{
					"workerId": 104,
					"workerName": "王二小",
					"taskNumber": 0,
				},
					{
						"workerId": 105,
						"workerName": "王晓五",
						"taskNumber": 2,
					}]
			}]; 
		saveToAreaDB(d.data).then( data => {
			getSearchPersons(homeFilter['searchPersonKey']).then((result) => {
				pub('UI','Home.Area.Sync', result);	
			})
		});
	});
}

