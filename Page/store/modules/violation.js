import ajaxx from "ajax";
import {get } from 'lodash';

const state = {
    cards: [],
    currentStatus: "All",
}

const mutations = {
    setData(state,data){
        state.cards = data.data;
    },
    setCurrentStatus(state,status){
        state.currentStatus = status;
    },
}

const getters = {
    cardsFilteredByStatus: state => state.cards
    .filter(c => state.currentStatus == "All" 
        || c.status == state.currentStatus),
    processedCards: state=> {
        let index = 0;
        return state.cards.slice(index,index+state.cards.length);
    },
    getDisplayPersons:(state, getters, rootState) =>{
        return rootState.filterPersons;
    },
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
    }
}

export default {
    namespaced:true,
    actions,
    state,
    mutations,
    getters,
}
