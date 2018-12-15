import ajaxx from "ajax";
import {get, mapKeys ,filter } from 'lodash';
import { sub, removeSub, pub} from 'postalControl';


const initFilter = {
        taskStatus:'1',
        movement:'0',
        flightStatus:null,
        type:null,
        flightIndicator:null,
        searchKey:null,
		searchPersonKey:null,
}
const state = {
    rows: [],
    checkedRow: null,
    checkedTask: null,
    personSearchKey:null,
    dialogAddTaskVisible:false,
	dialogTaskDetailVisible:false,
	dialogPersonSettingVisible:false,
    dialogAlertVisible:false,
    dialogTaskHandover:false,
    persons:[],
    filterPersons:[],
	messages:[
		{
			taskId:'34234235435',
			flightNo:'BL34345',
			content:'45uksdjfsdjfksdf',
			type:1,
			alert:true,
		},
		{
			taskId:'342342353244435',
			flightNo:'BL34345',
			content:'45uksdjfsdjfksdf',
			type:2,
			alert:true,
		},
		{
			taskId:'34234235656565435',
			flightNo:'BL34345',
			content:'45uksdjfsdjfksdf',
			type:3,
			alert:false,
		},
		{
			taskId:'34234234564564565435',
			flightNo:'BL34345',
			content:'45uksdjfsdjfksdf',
			type:4,
			alert:true,
		},
		{
			taskId:'3423425465756756735435',
			flightNo:'BL34345',
			content:'45uksdjfsdjfksdf',
			type:2,
			alert:true,
		},
		{
			taskId:'342454645634235435',
			flightNo:'BL34345',
			content:'45uksdjfsdjfksdf',
			type:2,
			alert: false,
		},
	],
	timeLimitOpts:[{
          value: '10',
          label: '10分钟'
        }, {
          value: '15',
          label: '15分钟'
        }, {
          value: '20',
          label: '20分钟'
        }, {
          value: '30',
          label: '30分钟'
        }, {
          value: '60',
          label: '60分钟'
        }, {
          value: '90',
          label: '90分钟'
        }],
    mainList:[],
    filterOption:{...initFilter},
    flights: [],
    tempWorkerList: [],
    tempGuaranteeList: [],
	currentTask:{},
    taskDetail:{},
    homeTable: [],
    taskHandover: [],
    homeTableTotal:100,
}

const mutations = {
    setPersonSearchKey(state, {searchKey,filterPersons}){
        state.personSearchKey = searchKey;
        state.filterPersons = filterPersons;
        console.log(state.filterPersons);
    },
    getPersons(state, data){
        state.persons = data;
    },
    updateFilter(state,data){
        state.filterOption[data.name] = data.filterOption;
		if(data.name != 'searchPersonKey' && state.filterOption.searchPersonKey){
			state.filterOption.searchPersonKey = null;
		}
		pub('Worker','Home.Task.SetTaskFilter', state.filterOption);
    },
    resetFilter(state){
        state.filterOption={...initFilter};
		pub('Worker','Home.Task.SetTaskFilter', state.filterOption);
    },
    setMainListData(state,data){
        state.mainList = data;
    },
    setHomeTableData(state,data){
        state.homeTable = data;
        // state.homeTable.splice(0, state['homeTable'].length)
        // each(data,(item)=>{
		// 		state['homeTable'].push(item);
		// 	}
		// );
    },
    setHomeTableTotal(state,data){
        state.homeTableTotal = data;
    },
	update(state, obj){
		mapKeys(obj,(v,k)=>{
			state[k]=v;
		});
    },
    updateTaskHandover(state, obj) {
        mapKeys(obj,(item,index) => {
            state[index] = item; 
        });
    },
    setTaskHandover(state,data) {
        state.taskHandover = data.data;
    },
	setCurrentTask(state,data){
		state.currentTask = data;
		state.dialogTaskDetailVisible = true;
	}
}

const getters = {
    getDisplayPersons:(state, getters, rootState) =>{
        return rootState.filterPersons;
    },
	getMessages:(state, getters, rootState)=> (type) =>{
		return filter(state.messages, item =>{
				return item.type == type;
		})
	},
    // getFilter:(state, getters, rootState) =>{
    //     return {
    //         taskstatus:state => st
    //     }
    // },
}

const actions = {
    updateFilter({commit, state}, filterOption){
        commit('updateFilter',filterOption);
    },
    resetFilter({commit, state}){
        commit('resetFilter',null);
    },
    getMainListData({commit,state}, data){
        //let data = [{region:'A区',persons:['招呼','三大','撒的空间','时刻点'],tasks:[{aaa:123,bb:2366664}]},{region:'B区',persons:['招呼','三大','撒的空间','时刻点'],tasks:[{aaa:1243563,bb:23674544}]},{region:'C区',persons:['招呼','三大','撒的空间','时刻点'],tasks:[{aaa:324,bb:23576574}]}];
        commit('setMainListData',data); 
    },
    getHomeTableData({commit,state},data){
        commit('setHomeTableData',data);
    },
    getHomeTableTotal({commit,state},data){
        commit('setHomeTableTotal',data);
    },
    getPersons({commit, state}, data){
		data = data || [];
        commit('getPersons', data);
    },
	update({commit, state},obj){
		commit('update', obj);
    }, 
    updateTaskHandover({commit,state}, obj) {
        commit ('updateTaskHandover', obj);
    },
    getTaskHandover({ commit, state}, data) {
        commit('setTaskHandover',data);
    }

}


export default {
    namespaced:true,
    actions,
    state,
    mutations,
    getters,
}
