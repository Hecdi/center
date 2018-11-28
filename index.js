import Vue from "vue";
import App from "./Page/App.vue";
import config from "./config";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./Page/scss/smartScheduling.scss";
import {init as initWorker} from "./Worker/init";
import { remote } from 'electron';

Vue.config.productionTip = false;
Vue.use(ElementUI);
let app = config.smartScheduling.App ? config.smartScheduling.App : App;
export const ajaxAPI={...config.smartScheduling.ajaxAPI};
export const socketAPI={...config.smartScheduling.socketAPI};
console.log(ajaxAPI);
remote.setGlobal("ajaxAPI",ajaxAPI);
new Vue({
router: config.smartScheduling.router,
store: config.smartScheduling.store,
	render: h => h(app)
}).$mount("#app");

initWorker();
