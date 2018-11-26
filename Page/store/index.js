import Vue from "vue";
import Vuex from "vuex";
import createLogger from '../../src/plugins/logger';
import home from './modules/home';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export const smartSchedulingStore =  new Vuex.Store({
  modules: {
    home,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
});

