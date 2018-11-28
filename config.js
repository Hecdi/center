import App from "./Page/App.vue";
import {smartSchedulingRouter } from "./Page/router";
import {smartSchedulingStore } from "./Page/store/index";
export default {
    smartScheduling:{
        App:App,
        router:smartSchedulingRouter,
        store:smartSchedulingStore,
        socketAPI:[{
			name: 'schedule',
			host: '173.100.1.52',
			port: '9099',
			channel: 'intelligent_scheduling',
			headers: {
				//userId: 'aoc',
			},
		}],
        ajaxAPI:{
            path:'http://173.100.1.14:8080/',
            url:{
                'mainList':'seat?pageSize=10&pageNo=1&orderKey=seatCode&orderBy=asc',
            }
        }
    },
}
