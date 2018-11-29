import ajaxx from "ajax";
import {get } from 'lodash';
const initFilter = {
        taskStatus:'0',
        ad:'0',
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
    persons:[],
    filterPersons:[],
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
    },
    resetFilter(state){
        state.filterOption={...initFilter};
    },
    setMainListData(state,data){
        state.mainList = data;
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
    getMainListData({commit,state}){
        let data = [{region:'A区',persons:['招呼','三大','撒的空间','时刻点'],tasks:[{aaa:123,bb:2366664}]},{region:'B区',persons:['招呼','三大','撒的空间','时刻点'],tasks:[{aaa:1243563,bb:23674544}]},{region:'C区',persons:['招呼','三大','撒的空间','时刻点'],tasks:[{aaa:324,bb:23576574}]}];
        commit('setMainListData',data); 
    },
    getPersons({commit, state}, data){
		data = data || [];
        commit('getPersons', data);
    },
}


export default {
    namespaced:true,
    actions,
    state,
    mutations,
    getters,
}
