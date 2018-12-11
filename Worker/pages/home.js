import Promise from 'bluebird';
import postal from 'postal';
import {sub, pub,  removeSub} from "postalControl";
import { personDB, saveToPersonDB, getSearchPersons, saveToTaskDB, getTaskListFromDB, saveHomeTableDB } from "../../lib/storage";
import { ajax } from "ajax";

var homeFilter={
	personList:{},
	taskList:{}
};
const homeInit = () => {
	ajax.post('personList').then(d=>{
		console.log(d);
		saveToPersonDB(d.data).then( data => {
			getSearchPersons().then((result) => {
				pub('UI','Home.Area.Sync', result);	
				pub('UI','Home.Area.All', result);	
			});
		});
	});
	ajax.post('taskList').then(data=>{
		console.log(data);
		saveHomeTableDB(data.data).then(result => {
			postal.channel('UI').publish('Home.Table.Sync',result);
		});
		saveToTaskDB(true,data.data, homeFilter['taskList']).then(result => {
			postal.channel('UI').publish('Home.Task.Sync',result);
		});
		
	});
	// ajax.get('getViolationData').then(data=>{
	// 	console.log(data);
	// 	//postal.channel('UI').publish('Home.Sync',data);
	// });
	sub('Worker','Home.Area.SetPersonSearchKey',(key) =>{
		homeFilter['personList']['searchPersonKey'] = key;
		getSearchPersons(homeFilter['personList']['searchPersonKey']).then((result) => {
			pub('UI','Home.Area.Sync', result);	
		});
	});
	sub('Worker','Home.Task.SetTaskFilter',(taskListFilterOpt) =>{
		homeFilter['taskList'] = taskListFilterOpt;
		getTaskListFromDB(homeFilter['taskList']).then((result) => {
			pub('UI','Home.Task.Sync', result);	
		})
	});
	pub('UI','Home.Message.Alert',{
		content:'324235345',
	})
	pub('UI','Home.Event.Ready',null);
}
export const initPage = () => {
    return Promise.all([
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
	client.sub('/user/web/scheduling/changes', (d) => {
		console.log('task:::',d);
		//saveToAreaDB(d.data).then( data => {
			//getSearchPersons(homeFilter['searchPersonKey']).then((result) => {
				//pub('UI','Home.Area.Sync', result);	
			//});
			//getSearchPersons().then((result) => {
				//pub('UI','Home.Task.Sync', result);	
			//});
		//});
	});
	client.sub('/user/web/scheduling/getAreaAndWorkerList', (d) => {
		console.log('area:::', d)
		saveToPersonDB(d.data).then( data => {
			getSearchPersons(homeFilter['searchPersonKey']).then((result) => {
				pub('UI','Home.Area.Sync', result);	
			})
		});
	});
	client.sub('/user/web/scheduling/popoMessage', (d) => {
		console.log('message:::',d)
	});
}

