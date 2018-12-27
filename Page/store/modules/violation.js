import ajaxx from "ajax";
import {get, mapKeys } from 'lodash';

const state = {
    cards: [],
    currentStatus: 1,
    filterCards: [],
    showImgDialog: false,
    waitItems: [],
    totalSize: 0,
    waitTotalSize: 1,
    allCondition:{},
    waitCondition: {},
    havePermission: false,
    perTotalSize: 0,
}

const mutations = {
    setData(state, data) {
        // state.cards = data;
        state.cards = data.items.filter(item => item.status < 3);
        // state.cards = data.items;
        state.totalSize = data.totalNum;
    },
    setWaitData(state,data) {
        state.waitItems = data.items;
        state.waitTotalSize = data.totalNum;
    },
    setPermission(state,data) {
        state.havePermission = data;
    },
    setAllCondition(state,data){
        state.allCondition = data;
    },
    setWaitCondition(state,data){
        state.waitCondition = data;
    },
    setCurrentStatus(state, status) {
        state.currentStatus = status;
        console.log(state.currentStatus);
    },
   
    filterStatus(state, data) {
        state.filterCards = state.cards.filter(item => item.status == 1);
        state.perTotalSize = state.filterCards.length; 
    },
    updateShowImg(state,obj){
        mapKeys(obj,(v,k) => {
            state[k] = v;
        })
    },
    changeStatus(state,value){
        let filterCards = state.filterCards;
        let allCards = state.cards;
        let index  = filterCards.findIndex(c => c.id == value.id);
        console.log(index);
            if (index > -1) {
                filterCards.splice(index, 1);
            }
        
    }
}

const getters = {
    cardsFilteredByStatus: state => state.cards
        .filter(c => state.currentStatus == 1
            || c.status == state.currentStatus),
    processedCards: state => {
        let index = 0;
        return state.cards.slice(index, index + state.cards.length);
    },
    getDisplayPersons: (state, getters, rootState) => {
        return rootState.filterPersons;
    },
    pageCount: (state, getter) =>
        Math.ceil(getters.cardsFilteredByStatus.length / state.pageSize),
    // categories: state=> ["1",...state.cards],
}

const actions = {
    getData({ commit, state }, data) {
        commit('setData', data);
        commit('filterStatus', data);
    },
    getPermission({commit,state},data){
        commit('setPermission',data);
    },
    getWaitData({ commit, state }, data) {
        commit ('setWaitData',data);
    },
    getAllCondition({commit,state},data){
        commit ('setAllCondition',data);
    },
    getWaitCondition({commit,state},data){
        commit ('setWaitCondition',data);
    },
    setCurrentStatus({ commit, state }, data) {
        data = data || [];
        commit('setCurrentStatus', data);
    },
    changeStatus({ commit, state}, data) {
        commit('changeStatus',data);
    },
    updateShowImg({commit,state},obj){
        commit('updateShowImg',obj);
    },
}

export default {
    namespaced: true,
    actions,
    state,
    mutations,
    getters,
}
