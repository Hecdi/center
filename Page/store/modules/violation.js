import ajaxx from "ajax";
import {get } from 'lodash';

const state = {
    cards: [],
    currentStatus: 1,
    filterCards:[],
}

const mutations = {
    setData(state,data){
        state.cards = data.data;
    },
    setCurrentStatus(state,status){
        // debugger;
        state.currentStatus = status;
    },
    filterStatus(state, data){
         state.filterCards = data.data.filter(item=>item.status !== 3);
    }
}

const getters = {
    cardsFilteredByStatus: state => state.cards
    .filter(c => state.currentStatus == 1 
        || c.status == state.currentStatus),
    processedCards: state=> {
        let index = 0;
        return state.cards.slice(index,index+state.cards.length);
    },
    getDisplayPersons:(state, getters, rootState) =>{
        return rootState.filterPersons;
    },
    pageCount: (state, getter) => 
        Math.ceil(getters.cardsFilteredByStatus.length / state.pageSize),
        // categories: state=> ["1",...state.cards],
}



// const actions = {
//     getData(context){
//         let ajax = ajaxx();
//         ajax.get('getViolationData').then(data=>{
//             let violation = data.data;
//             console.log(violation);
//             context.commit("setData",{violation});
//         });
//     }
// }

const actions = {
    getData({commit,state},data){
        commit('setData',data);
        commit('filterStatus',data);
    },
    setCurrentStatus({commit, state}, data){
		data = data || [];
        commit('setCurrentStatus', data);
    },
}

export default {
    namespaced:true,
    actions,
    state,
    mutations,
    getters,
}
