import Vue from "vue";
import config from "./config";
import ElementUI from "element-ui";
// import "./Page/scss/smartScheduling.scss";
import {init as initWorker} from "./Worker/init";
import { remote } from 'electron';
// import router from "vue-router";
import {smartSchedulingRouter} from './Page/router';


let router = smartSchedulingRouter;
Vue.config.productionTip = false;
Vue.use(ElementUI);
let app = config.smartScheduling.App;
export const ajaxAPI={...config.smartScheduling.ajaxAPI};
export const socketAPI={...config.smartScheduling.socketAPI};
remote.setGlobal("ajaxAPI",ajaxAPI);


// let token = storage.getItem("token");
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireAuth)){  // 判断该路由是否需要登录权限
      if(!localStorage.getItem('token')){
        // if(!localStorage.getItem('token')){
            next({
              path: '/login',
              query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }else{
			remote.setGlobal("token",localStorage.getItem('token'));
			remote.setGlobal("userInfo",localStorage.getItem('userInfo'));
			remote.setGlobal("depId",localStorage.getItem('depId'));
			initWorker();
           next(
            //    {path: '/'}
           );
      }
    }else {
		next();
    }
  });

new Vue({
    router:config.smartScheduling.router,
    store: config.smartScheduling.store,
	render: h => h(app)
}).$mount("#app");

