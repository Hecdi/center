<template>
  <div class="violation">
		<top-bar />
  </div>
</template>

<script>
import TopBar from './TopBar.vue';
import { ajax } from 'ajax';
import { mapActions, mapGetters, mapMutations } from 'vuex';


    export default {
        name:'ViolationRecord',
        components: {
            TopBar,
        },
        computed:{
            ...mapGetters({ cards:"processedCards"})
        },
        data() {
            return {
                activeName: 'second',
                status: "全部",
                currentView: 'all',
            };
        },
        methods: {
            ...mapActions({ 
                getData: "getData",
                getWaitData: "getWaitData",
            }),
            created() {
                this.getData();
                this.initWaitData();
            },
            handleClick(tab, event) {
              console.log(tab, event);
            },
            getData(data) {
                this.$store.dispatch('violation/getData',data);
            },
            getWaitData(data){
                this.$store.dispatch('violation/getWaitData',data);
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
                 ajax.post("getViolationByState").then((data)=>{
                     if(data){
                         this.getWaitData(data);
                     }
                 })
            },
        },
        beforeMount(){
            // let ajax = ajaxx();
            // ajax.get('getViolationData').then(data=>{
            //     let violation = data.data;
            //     console.log(violation);
            //     this.getData(data);
            //     // let newArr = violation.filter(item => item.status!==3);
            //     // console.log(newArr);
            // });
            this.refreshData();
            this.initWaitData();
        },
    }
</script>
