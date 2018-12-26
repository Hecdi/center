<template>
<div class="full-width">
  <div class="violation">
		<top-bar />
  </div>
</div>
</template>

<script>
import TopBar from './TopBar.vue';
import permissionTable from './permissionTable.vue';
import { ajax } from 'ajax';
import { mapActions, mapGetters, mapMutations,mapState } from 'vuex';
import {remote} from 'electron'; 

    export default {
        name:'ViolationRecord',
        components: {
            TopBar,
            permissionTable,
        },
        computed:{
            ...mapState("violation", ["filterCards","totalSize","allCondition",]),
            ...mapGetters({ cards:"processedCards"})
        },
        data() {
            return {
                activeName: 'second',
                status: "全部",
                currentView: 'all',
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
            handleClick(tab, event) {
              console.log(tab, event);
            },
            test(){

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
                // let ajax = ajaxx();
                ajax.post('getViolationDataForLike',{"pageNumber":1,"pageSize":10}).then(data=>{
                let violation = data;
                console.log(violation);
                this.getData(data);
                })
            },
            initWaitData(){
                //  let ajax = ajaxx();
                 ajax.post("getViolationByState",{pageSize:10, pageNumber:1}).then((data)=>{
                     if(data){
                         this.getWaitData(data);
                     }
                 })
            },
            judgePermission(){
                let userInfo = remote.getGlobal('userInfo');
                userInfo = JSON.parse(userInfo);
                console.log(userInfo);
                let permission = userInfo.roleRS;
                let _this = this;
                permission.forEach(element => {
                    let role = element.roleCode;
                    if(role=="review_schdule") {
                        // return _this.havePermission = true;
                         let value = 1;
                         return _this.getPermission(value);
                    }else {
                        // return _this.havePermission = false;
                        let value = 0;
                        return _this.getPermission(value);
                    }
                });
                // this.getPermission();
            },
        },
        beforeMount(){
            this.refreshData();
            this.initWaitData();
            this.judgePermission();
        },
    }
</script>
