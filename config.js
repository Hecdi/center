import App from "./Page/App.vue";
import {smartSchedulingRouter } from "./Page/router";
import {smartSchedulingStore } from "./Page/store/index";
export default {
    smartScheduling:{
        App:App,
        router:smartSchedulingRouter,
        store:smartSchedulingStore,
        workerEntry:'',
        ajaxAPI:{
            path:'http://173.100.1.14:8080/',
            url:{
                'mainList':'seat?pageSize=10&pageNo=1&orderKey=seatCode&orderBy=asc',
            }
        }
    },
}