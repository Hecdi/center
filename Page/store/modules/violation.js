import ajaxx from "ajax";
import {get, mapKeys } from 'lodash';

const state = {
    cards: [],
    currentStatus: 1,
    filterCards: [],
    showImgDialog: false,
}

const mutations = {
    setData(state, data) {
        state.cards = data.data;
    },
    setCurrentStatus(state, status) {
        state.currentStatus = status;
        console.log(state.currentStatus);
    },
    filterStatus(state, data) {
        state.filterCards = data.data.filter(item => item.status == 3);
    },
    updateShowImg(state,obj){
        mapKeys(obj,(v,k) => {
            state[k] = v;
        })
    },
    changeStatus(state,value){
        let filterCards = state.filterCards;
        let allCards = state.cards;
        // allCards.forEach(item,index){
        //     if(item.id == value.id){
        //         item.status = value.status;
        //     }
        // },
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
