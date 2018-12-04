import Vue from "vue";
import Vuex from "vuex";
import createLogger from '../../src/plugins/logger';
import home  from './modules/home';
import rollCall  from './modules/rollCall';
import sheet from './modules/sheet';
import violation from './modules/violation';


Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export const smartSchedulingStore =  new Vuex.Store({
  modules: {
    home,
	rollCall,
    sheet,
    violation,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
});

