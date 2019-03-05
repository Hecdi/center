import Promise from 'bluebird';
import postal from 'postal';
import { sub, pub, removeSub } from 'postalControl';
import { remote } from 'electron';
import { saveToPersonDB, getSearchPersons, saveToTaskDB, getTaskListFromDB, saveHomeTableDB, getHomeTableFromDB } from '../../lib/storage';
import { ajax } from 'ajaxForWorker';
import { get } from 'http';
import { cloneDeep } from 'lodash';

var homeFilter = {
	personList: {},
	taskList: {},
	tableList: {},
};
const homeInit = () => {
	let depCode = remote.getGlobal('depCode');
	pub('UI', 'Home.Loading', true);
	Promise.map(
		[
			() => {
				return ajax.post('personList').then((d) => {
					if (d == 'error' || (d.response && d.response.status != 200)) {
						return Promise.resolve();
					}
					return saveToPersonDB(d).then((data) => {
						return getSearchPersons().then((result) => {
							pub('UI', 'Home.Area.All', result);
							return Promise.resolve();
						});
					});
				});
			},
			() => {
				return ajax.post('taskList').then((data) => {
					if (data == 'error' || (data.response && data.response.status != 200)) {
						return Promise.resolve();
					}
					saveHomeTableDB(true, data).then((value) => {
						getHomeTableFromDB(homeFilter.tableList).then((result) => {
							postal.channel('UI').publish('Home.Table.Sync', result);
						});
					});
					return saveToTaskDB(true, data, homeFilter['taskList']).then((result) => {
						postal.channel('UI').publish('Home.Task.Sync', result);
						return Promise.resolve();
					});
				});
			},
		],
		(f) => f(),
	).then(() => {
		pub('UI', 'Home.Loading', false);
	});
	// ajax.post('personList').then( d=>{
	// saveToPersonDB(d).then( data => {
	// getSearchPersons().then((result) => {
	// pub('UI','Home.Area.All', result);
	// });
	// });
	// });
	// ajax.post('taskList').then(data=>{
	// saveHomeTableDB(true,data).then( (value) => {
	// getHomeTableFromDB(homeFilter.tableList).then((result)=>{
	// postal.channel('UI').publish('Home.Table.Sync',result)
	// });
	// });
	// saveToTaskDB(true,data, homeFilter['taskList']).then(result => {
	// postal.channel('UI').publish('Home.Task.Sync',result);
	// });

	// });
	sub('Worker', 'Home.Area.SetPersonSearchKey', (key) => {
		homeFilter['personList']['searchPersonKey'] = key;
		getSearchPersons(homeFilter['personList']['searchPersonKey']).then((result) => {
			pub('UI', 'Home.Area.Sync', result);
		});
	});
	sub('Worker', 'Home.Task.SetTaskFilter', (taskListFilterOpt) => {
		homeFilter['taskList'] = cloneDeep(taskListFilterOpt);
		delete homeFilter['taskList'].pageSize;
		delete homeFilter['taskList'].currentPage;
		getTaskListFromDB(homeFilter['taskList']).then((result) => {
			pub('UI', 'Home.Task.Sync', result);
		});
		homeFilter['tableList'] = taskListFilterOpt;
		getHomeTableFromDB(homeFilter['tableList']).then((result) => {
			postal.channel('UI').publish('Home.Table.Sync', { total: result.total, data: result.data });
		});
	});
	pub('UI', 'Home.Event.Ready', null);
};
export const initPage = () => {
	return Promise.all([
		(() => {
			sub('Worker', 'Home.Start', () => {
				console.log('initHome');
				homeInit();
			});
		})(),
	]).then(() => {
		return Promise.resolve('Home.ready');
	});
};

export const destroy = () => {
	removeSub('Home.start');
};

export const initSocket = (client) => {
	let token = remote.getGlobal('token');
	let userId = remote.getGlobal('clientId');
	let depCode = remote.getGlobal('depCode');
	console.log('token:', token);
	console.log('userId:', userId);
	client.sub(
		'/user/web/scheduling/changes',
		(d) => {
			console.log('task:::', d);
			saveToTaskDB(false, d.data, homeFilter['taskList']).then((data) => {
				pub('UI', 'Home.Task.Sync', data);
			});
			saveHomeTableDB(false, d.data).then(() => {
				getHomeTableFromDB(homeFilter.tableList).then((result) => {
					postal.channel('UI').publish('Home.Table.Sync', result);
				});
			});
		},
		{
			userId: userId,
			token: token,
		},
	);
	client.sub(
		'/user/web/scheduling/getAreaAndWorkerList',
		(d) => {
			console.log('area:::', d);
			saveToPersonDB(d.data).then((data) => {
				getSearchPersons(homeFilter['searchPersonKey']).then((result) => {
					pub('UI', 'Home.Area.Sync', result);
				});
			});
		},
		{
			userId: userId,
			token: token,
		},
	);
	client.sub(
		'/user/web/scheduling/popoMessage',
		(d) => {
			console.log('message:::', d);
			pub('UI', 'Home.Message.Sync', d.data);
		},
		{
			userId: userId,
			token: token,
		},
	);
};
