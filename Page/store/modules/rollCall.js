import ajaxx from "ajax";
import { mapKeys, extend, forEach,get,set,assignIn, flow,filter,pick, map} from 'lodash';
import { sub, removeSub, pub} from 'postalControl';


const state = {
	currentPerson: {
	},
	fixPerson:{},
	team: [],
	currentTeam: '', 
	dialogPersonDetailVisible: false,
	dialogAddPersonVisible: false,
	module: [],
	currentRow:'',
	currentModuleId:'',
	checkedRemark:'',
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
	setCurrentModule(state,currentModuleId){
		state.currentModuleId = currentModuleId;
		forEach(state.module,item =>{
			if(item.templateId == currentModuleId){
				state.checkedRemark = item.remarks;
			}
		})
	},
	setPerson(state){
		let fixPerson = get(state,'fixPerson');
		assignIn(fixPerson,get(state,'currentPerson'));
		set(state,'dialogPersonDetailVisible', false);
	},
	setCurrentPerson(state,{currentPerson, fixPerson}){
		state['currentPerson'] = currentPerson;
		state['fixPerson'] = fixPerson;
		state['dialogPersonDetailVisible'] = true;
	},
	updateInit(state, obj){
		mapKeys(obj,(v,k)=>{
			state[k].splice(0, state[k].length)
			for(let i=0;i< v.length;i++){
				state[k].push(v[i]);
			}
		});
		let team = get(state,'team',[]);
		let module = get(state,'module',[]);
		state.currentTeam = team.length?team[0].squadId:'';
		state.currentModuleId = module.length?module[0].templateId:'';
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

const resonMap = {
	1:'病假',
	2:'事假',
	3:'缺席',
	4:'下班',
	5:'换人',
}

const getters = {
	getReason:(state, getters, rootState) => (code) =>{
		return resonMap[code];
	},
	getCommitData:(state,getters, rootState)=>(code) =>{
		let param = {
			staffStates:[],
			checkIns:[],
		}
		let staffStatePropitys= ['workerId','deptId','nonArrivalReason','staffName','staffId',
			'workerName','groupLeader','leaveStartTime','leaveEndTime'];
		let checkInPropitys= ['deptId','staffName','staffId','workUnit'];
		param.staffStates = flow([
			d=>filter(d,i=>{
				return i.squadId == state.currentTeam;
			}),
			d=>d[0].organization,
			d=>map(d, i=>{
				return pick(i, staffStatePropitys)
			})
		])(get(state,'team'));
		param.checkIns = flow([
			d=>filter(d,i=>{
				return i.templateId == state.currentModuleId;
			}),
			d=>d[0].checkIns,
			d=>map(d, i=>{
				return pick(i, checkInPropitys)
			})
		])(get(state,'module'));
		return param;
	} 
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

