<template>
<div class="full-width">
  <div class="violation">
		<top-bar />
  </div>
</div>
</template>

<script>
import TopBar from './TopBar.vue';
import { ajax } from 'ajax';
import { mapActions, mapGetters, mapMutations,mapState } from 'vuex';
import {remote} from 'electron'; 

    export default {
        name:'ViolationRecord',
        components: {
            TopBar,
        },
        computed:{
            ...mapState("violation", ["filterCards","totalSize","allCondition","waitTotalSize"]),
        },
        data() {
            return {
                activeName: 'second',
                status: "全部",
                currentView: 'wait',
                havePermission: false,
            };
        },
        methods: {
            ...mapActions({ 
                getData: "getData",
                getWaitData: "getWaitData",
                getPermission: "getPermission",
            }),
            created() {
                this.getData();
                this.initWaitData();
            },
            getData(data) {
                this.$store.dispatch('violation/getData',data);
            },
            getWaitData(data){
                this.$store.dispatch('violation/getWaitData',data);
            },
            getPermission(data) {
                this.$store.dispatch('violation/getPermission',data);
            },
            refreshData(){
                ajax.post('getViolationDataForLike',{"pageNumber":1,"pageSize":10}).then(data=>{
                this.getData(data);
                })
            },
            initWaitData(){
                 ajax.post("getViolationByState",{pageSize:10, pageNumber:1}).then((data)=>{
                     if(data){
                         this.getWaitData(data);
                     }
                 })
            },
            judgePermission(){
                let userInfo = remote.getGlobal('userInfo');
                userInfo = JSON.parse(userInfo);
                let permission = userInfo.roleRS;
                let _this = this;
                permission.forEach(element => {
                    let role = element.roleCode;
                    if(role=="review_schdule") {
                         let value = 1;
                         return _this.getPermission(value);
                    }else {
                        let value = 0;
                        return _this.getPermission(value);
                    }
                });
            },
        },
        beforeMount(){
            this.refreshData();
            this.initWaitData();
            this.judgePermission();
        },
    }
</script>
