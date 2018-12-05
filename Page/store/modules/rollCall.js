import ajaxx from "ajax";
import { mapKeys, extend, forEach,get,set,assignIn} from 'lodash';
import { sub, removeSub, pub} from 'postalControl';


const state = {
	currentPerson: {
		"staffId": "uf918517bfec64a8ca29768c666167340",
		"staffName": "刘杰",
		"workerName": null,
		"workerId": null,
		"groupLeader": -1,
		"nonArrivalReason": 1,
		"deptId": "depc37237f086fc4b90afa43780946dba68",
		"deptName": null,
		"squadId": "dep73be05fd11ad4ba9be547f732081d258",
		"squadName": "二分队",
		"leaveStartTime":'',
		"leaveEndTime":'',
	},
	fixPerson:{},
	team: [],
	currentTeam: 'dep73be05fd11ad4ba9be547f732081d258', 
	dialogPersonDetailVisible: false,
	module: [],

}

const mutations = {
	//setPersonSearchKey(state, {searchKey,filterPersons}){
	//state.personSearchKey = searchKey;
	//state.filterPersons = filterPersons;
	//console.log(state.filterPersons);
	//},
	//getPersons(state, data){
	//state.persons = data;
	//},
	//updateFilter(state,data){
	//state.filterOption[data.name] = data.filterOption;
	//pub('Worker','Home.Task.SetTaskFilter', state.filterOption);
	//},
	//resetFilter(state){
	//state.filterOption={...initFilter};
	//},
	//setMainListData(state,data){
	//state.mainList = data;
	//},
	//updateWorker(state,obj){
		//mapKeys(obj, (v,k)=>{
			//state['currentPerson'][k] = 
		//})
	//},
	setPerson(state){
		let fixPerson = get(state,'fixPerson');
		assignIn(fixPerson,get(state,'currentPerson'));
		//set(state,'fixPerson', assignIn({},fixPerson,get(state,'currentPerson')));
		set(state,'dialogPersonDetailVisible', false);
	},
	setCurrentPerson(state,{currentPerson, fixPerson}){
		state['currentPerson'] = currentPerson;
		state['fixPerson'] = fixPerson;
		state['dialogPersonDetailVisible'] = true;
	},
	updateArray(state, obj){
		mapKeys(obj,(v,k)=>{
			state[k].splice(0, state[k].length)
			for(let i=0;i< v.length;i++){
				state[k].push(v[i]);
			}
		});
	},
	update(state, obj){
		mapKeys(obj,(v,k)=>{
			state[k] = v;
			//state[k]=v;
		});
	},
	updateObj(state, obj){
		mapKeys(obj,(v,k)=>{
			state[k] = extend(state[k],v);
			//state[k]=v;
		});
	}
}

const getters = {
	//getTeam:(state, getters, rootState) =>{
	//return state.team;
	//},
	// getFilter:(state, getters, rootState) =>{
	//     return {
	//         taskstatus:state => st
	//     }
	// },
}

const actions = {
	//updateFilter({commit, state}, filterOption){
	//commit('updateFilter',filterOption);
	//},
	//resetFilter({commit, state}){
	//commit('resetFilter',null);
	//},
	//getMainListData({commit,state}, data){
	////let data = [{region:'A区',persons:['招呼','三大','撒的空间','时刻点'],tasks:[{aaa:123,bb:2366664}]},{region:'B区',persons:['招呼','三大','撒的空间','时刻点'],tasks:[{aaa:1243563,bb:23674544}]},{region:'C区',persons:['招呼','三大','撒的空间','时刻点'],tasks:[{aaa:324,bb:23576574}]}];
	//commit('setMainListData',data); 
	//},
	//getPersons({commit, state}, data){
	//data = data || [];
	//commit('getPersons', data);
	//},
	update({commit, state},obj){
		commit('update', obj);
	},
	updateArray({commit, state},obj){
		commit('updateArray', obj);
	},
	updateObj({commit, state},obj){
		commit('updateObj', obj);
	},
}


export default {
	namespaced:true,
	actions,
	state,
	mutations,
	getters,
}

