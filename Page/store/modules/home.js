import ajaxx from "ajax";
import {get, mapKeys } from 'lodash';
import { sub, removeSub, pub} from 'postalControl';


const initFilter = {
        taskStatus:'1',
        movement:'0',
        flightStatus:null,
        type:null,
        region:null,
        searchKey:null,
}
const state = {
    rows: [],
    checkedRow: null,
    checkedTask: null,
    personSearchKey:null,
	dialogAddTaskVisible:false,
    persons:[],
	allPersons:[{staffName:'张三',taskNumber:2,staffId:123,jobFlag:'航前'},{staffName:'张三',taskNumber:2,staffId:123,jobFlag:'航前'},{staffName:'张三',taskNumber:2,staffId:123,jobFlag:'航前'},{staffName:'张三',taskNumber:2,staffId:123,jobFlag:'航前'},{staffName:'张三',taskNumber:2,staffId:123,jobFlag:'航前'},{staffName:'张三',taskNumber:2,staffId:123,jobFlag:'航前'},{staffName:'张三',taskNumber:2,staffId:123,jobFlag:'航前'},{staffName:'张三',taskNumber:2,staffId:123,jobFlag:'航前'},{staffName:'张三',taskNumber:2,staffId:123,jobFlag:'航前'},{staffName:'张三',taskNumber:2,staffId:123,jobFlag:'航前'},{staffName:'张三',taskNumber:2,staffId:123,jobFlag:'航前'},{staffName:'张三',taskNumber:2,staffId:123,jobFlag:'航前'},{staffName:'张三',taskNumber:2,staffId:123,jobFlag:'航前'},{staffName:'张三',taskNumber:2,staffId:123,jobFlag:'航前'},{staffName:'张三',taskNumber:2,staffId:123,jobFlag:'航前'},{staffName:'张三',taskNumber:2,staffId:123,jobFlag:'航前'},],
    filterPersons:[],
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
		pub('Worker','Home.Task.SetTaskFilter', state.filterOption);
    },
    resetFilter(state){
        state.filterOption={...initFilter};
    },
    setMainListData(state,data){
        state.mainList = data;
    },
	update(state, obj){
		mapKeys(obj,(v,k)=>{
			state[k]=v;
		});
	}
}

const getters = {
    getDisplayPersons:(state, getters, rootState) =>{
        return rootState.filterPersons;
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
    getPersons({commit, state}, data){
		data = data || [];
        commit('getPersons', data);
    },
	update({commit, state},obj){
		commit('update', obj);
	}
}


export default {
    namespaced:true,
    actions,
    state,
    mutations,
    getters,
}
