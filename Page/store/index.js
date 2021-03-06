import Vue from "vue";
import Vuex from "vuex";
import createLogger from '../../src/plugins/logger';
import home  from './modules/home';
import rollCall  from './modules/rollCall';
import sheet from './modules/sheet';
import violation from './modules/violation';
import statistics from './modules/statistics';
import hanger from './modules/hanger';
import contact from './modules/contact';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export const smartSchedulingStore =  new Vuex.Store({
  modules: {
    home,
	  rollCall,
    sheet,
    violation,
    statistics,
    hanger,
    contact,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
});

