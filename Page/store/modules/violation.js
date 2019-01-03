import {mapKeys } from 'lodash';

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
    dialogCheckEdit: false,
}

const mutations = {
    setData(state, data) {
        state.cards = data.items.filter(item => item.status < 3);
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
    updateDialogCheckEdit(state,obj){
        mapKeys(obj,(v,k) => {
            state[k] = v;
        })
    },
}

const getters = {
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
    updateDialogCheckEdit({commit,state},obj){
        commit('updateDialogCheckEdit',obj);
    },
}

export default {
    namespaced: true,
    actions,
    state,
    mutations,
    getters,
}
