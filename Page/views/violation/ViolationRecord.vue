<template>
  <div class="violation">
		<top-bar />
		<!--
			<el-tabs v-model="activeName" @tab-click="handleClick">
			    <el-tab-pane label="待审核" name="first">
			        <Card/>
			    </el-tab-pane>
			    <el-tab-pane label="全部记录" name="second">
			        <Card/>
			    </el-tab-pane>
			</el-tabs>
		-->
		<!-- <Card/> -->
		<!-- <el-radio-group class="tab-button"> -->
		<!--
			<el-radio-button label="待审核" v-on:click="displayWait"></el-radio-button>
			    <el-radio-button label="全部" v-on:click="displayAll"></el-radio-button> ->
			    <el-radio-button label="待审核" v-model="status"></el-radio-button>
			    <el-radio-button label="全部" v-model="status"></el-radio-button>
			</el-radio-group>
			<!-
			<button v-on:click="displayWait">待审核</button>
			<button v-on:click="displayWait">全部</button>
		-->
		<!-- <all/> -->
		<!-- <el-button @click="getData" />
		<span v-for="c in cards" v-bind:key="c.id"> {{ c.belongCompany }} </span> -->
  </div>
</template>

<script>
// import wait from "./Card.vue";
// import all from "./Card.vue";
import TopBar from './TopBar.vue';
import ajaxx from 'ajax';
import { mapActions } from 'vuex';
import { mapGetters, mapMutations } from 'vuex';


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
            displayWait() {
                this.status=="待审核"?"全部":"11全部";
                console.log(this.status);
            },
            // getData(){
            //     let ajax = ajaxx();
	        //     ajax.get('getViolationData').then(data=>{
            //         let violation = data.data;
            //         console.log(violation);
	        //     });
            // },
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
