import ajaxx from "ajax";
import {get } from 'lodash';

const state = {
    cards: [],
    currentStatus: "All",
}

mutations = {
    setData(state,data){
        state.cards = data.violation;
    },
    setCurrentStatus(state,status){
        state.currentStatus = status;
    },
}

getters = {
    cardsFilteredByStatus: state => state.cards
    .filter(c => state.currentStatus == "All" 
        || c.status == state.currentStatus),
}

actions = {
    getData(context){
        let ajax = ajaxx();
        ajax.get('getViolationData').then(data=>{
            let violation = data.data;
            console.log(violation);
        });
        context.commit("setData",{violation});
    }
}

export default {
    namespaced:true,
    actions,
    state,
    mutations,
    getters,
}
