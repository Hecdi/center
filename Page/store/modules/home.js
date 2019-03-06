import { get, mapKeys, filter } from 'lodash';
import { sub, removeSub, pub } from 'postalControl';

const initFilter = {
	taskStatus: '1',
	movement: '0',
	flightStatus: null,
	type: null,
	flightIndicator: null,
	searchKey: null,
	searchPersonKey: null,
	pageSize: 10,
	currentPage: 1,
	logTaskId: null,
};
const state = {
	rows: [],
	waiting: false,
	checkedRow: null,
	checkedTask: null,
	personSearchKey: null,
	dialogAddTaskVisible: false,
	dialogTaskDetailVisible: false,
	dialogPersonSettingVisible: false,
	dialogAlertVisible: false,
	dialogTaskHandover: false,
	persons: [],
	filterPersons: [],
	messages: [],
	timeLimitOpts: [
		{
			value: '10',
			label: '10分钟',
		},
		{
			value: '15',
			label: '15分钟',
		},
		{
			value: '20',
			label: '20分钟',
		},
		{
			value: '30',
			label: '30分钟',
		},
		{
			value: '60',
			label: '60分钟',
		},
		{
			value: '90',
			label: '90分钟',
		},
	],
	mainList: [],
	filterOption: { ...initFilter },
	flights: [],
	tempWorkerList: [],
	tempGuaranteeList: [],
	currentTask: {},
	taskDetail: {},
	homeTable: [],
	taskHandover: [],
	homeTableTotal: 100,
};

const mutations = {
	setPersonSearchKey(state, { searchKey, filterPersons }) {
		state.personSearchKey = searchKey;
		state.filterPersons = filterPersons;
		console.log(state.filterPersons);
	},
	getPersons(state, data) {
		state.persons = data;
	},
	updateFilter(state, data) {
		console.log(state.filterOption);
		state.filterOption[data.name] = data.filterOption;
		if (data.name != 'searchPersonKey' && state.filterOption.searchPersonKey) {
			state.filterOption.searchPersonKey = null;
		}
		if (data.name != 'logTaskId' && state.filterOption.logTaskId) {
			state.filterOption.logTaskId = null;
		}
		pub('Worker', 'Home.Task.SetTaskFilter', state.filterOption);
	},
	resetFilter(state) {
		state.filterOption = { ...initFilter };
		pub('Worker', 'Home.Task.SetTaskFilter', state.filterOption);
	},
	setMainListData(state, data) {
		state.mainList = data;
	},
	setHomeTableData(state, data) {
		state.homeTable = data;
	},
	setHomeTableTotal(state, data) {
		state.homeTableTotal = data;
	},
	update(state, obj) {
		mapKeys(obj, (v, k) => {
			state[k] = v;
		});
	},
	updateTaskHandover(state, obj) {
		mapKeys(obj, (item, index) => {
			state[index] = item;
		});
	},
	setTaskHandover(state, data) {
		state.taskHandover = data;
	},
	setCurrentTask(state, data) {
		state.currentTask = data;
		state.dialogTaskDetailVisible = true;
	},
};

const getters = {
	getDisplayPersons: (state, getters, rootState) => {
		return rootState.filterPersons;
	},
	getMessages: (state, getters, rootState) => (type) => {
		return filter(state.messages, (item) => {
			return item.type == type;
		});
	},
};

const actions = {
	updateFilter({ commit, state }, filterOption) {
		commit('updateFilter', filterOption);
	},
	resetFilter({ commit, state }) {
		commit('resetFilter', null);
	},
	getMainListData({ commit, state }, data) {
		commit('setMainListData', data);
	},
	getHomeTableData({ commit, state }, data) {
		commit('setHomeTableData', data);
	},
	getHomeTableTotal({ commit, state }, data) {
		commit('setHomeTableTotal', data);
	},
	getPersons({ commit, state }, data) {
		data = data || [];
		commit('getPersons', data);
	},
	update({ commit, state }, obj) {
		commit('update', obj);
	},
	updateTaskHandover({ commit, state }, obj) {
		commit('updateTaskHandover', obj);
	},
	getTaskHandover({ commit, state }, data) {
		commit('setTaskHandover', data);
	},
};

export default {
	namespaced: true,
	actions,
	state,
	mutations,
	getters,
};
