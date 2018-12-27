import ajaxx from "ajax";
import {get, mapKeys ,filter } from 'lodash';
import { sub, removeSub, pub} from 'postalControl';

const state = {
    dialogUnFinish: false,
    unfinishData: [],
}

const mutations = {
    updateTaskHandover(state, obj) {
        mapKeys(obj,(item,index) => {
            state[index] = item; 
        });
    },
    setUnfinishData(state,data) {
        state.unfinishData = data;
    },
}

const getters = {
}

const actions = { 
    updateTaskHandover({commit,state}, obj) {
        commit ('updateTaskHandover', obj);
    },
    getUnfinishData({ commit, state}, data) {
        commit('setUnfinishData',data);
    }
}


export default {
    namespaced:true,
    actions,
    state,
    mutations,
    getters,
}
