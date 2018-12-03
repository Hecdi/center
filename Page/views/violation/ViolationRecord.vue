<template>
  <div class="violation">
		<top-bar />
  </div>
</template>

<script>
// import wait from "./Card.vue";
// import all from "./Card.vue";
import TopBar from './TopBar.vue';
import ajaxx from 'ajax';
import { mapActions, mapGetters, mapMutations } from 'vuex';


    export default {
        name:'ViolationRecord',
        components: {
            // wait,
            // all,
            TopBar,
        },
        computed:{
            ...mapGetters({ cards:"processedCards"})
        },
        data() {
            // debugger;
            return {
                activeName: 'second',
                status: "全部",
                currentView: 'all',
            };
        },
        methods: {
            ...mapActions({ 
                getData: "getData",
            }),
            created() {
                this.getData();
            },
            handleClick(tab, event) {
              console.log(tab, event);
            },
            getData(data) {
                this.$store.dispatch('violation/getData',data);
            },
        },
        beforeMount(){
		// sub('UI','Home.Task.Sync',(data)=>{
		// 	this.getMainListData(data);
        // });
            let ajax = ajaxx();
            ajax.get('getViolationData').then(data=>{
                let violation = data.data;
                console.log(violation);
                this.getData(data);
            });
        },
    }
</script>
