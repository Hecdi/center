<template>
    <el-container class="home">
        <el-aside :style="{width:asideWith}">
            <el-row v-if="!isHidden">
              <el-col :span="24">
				  <el-input
				  placeholder=""
				  v-model="searchPerson">
				  <i slot="suffix" class="el-input__icon el-icon-search"></i>
				  </el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20" v-for="person in persons" v-if="!isHidden" class="persons-panel" style="margin:0;">
				<el-col :span="24"  v-if="person.workerList.length" class="area-panel">{{person.areaName}}</el-col>
				<el-row :gutter="20"  v-if="!isHidden" style="margin:0;" class="personList">
					<el-col :span="6" v-for="worker in person.workerList" class="person-panel" >
						<div class="grid-content bg-person person" @click="show" :data-id="worker.staffId">{{worker.staffName + (worker.workerName?'('+ worker.workerName+')':'')}}
							<div class='taskNum'>
								{{worker.taskNumber}}
							</div>
						</div>
					</el-col>
				</el-row>
            </el-row>
            <div @click="handleToggle" class='toggleBtn'><i class="el-icon-d-arrow-left"></i>
            </div>
        </el-aside>
        <el-container>
                <el-header class="home-mian-header" height="auto">
                    <el-row >
                            <el-radio-group v-model="taskStatus">
                              <el-radio-button label="0">未完成</el-radio-button>
                              <el-radio-button label="1">已完成</el-radio-button>
                              <el-radio-button label="2">全部</el-radio-button>
                            </el-radio-group>
                            <el-radio-group v-model="type">
                              <el-radio-button label="0">区域</el-radio-button>
                              <el-radio-button label="1">时间</el-radio-button>
                            </el-radio-group>
                            <el-radio-group v-model="ad">
                              <el-radio-button label="0">所有</el-radio-button>
                              <el-radio-button label="1">进</el-radio-button>
                              <el-radio-button label="2">离</el-radio-button>
                            </el-radio-group>
                            <el-radio-group v-model="flightStatus">
                              <el-radio-button label="0">前站起飞</el-radio-button>
                              <el-radio-button label="1">已登机</el-radio-button>
                            </el-radio-group>
                            <el-radio-group v-model="region">
                              <el-radio-button label="0">国内</el-radio-button>
                              <el-radio-button label="1">国际</el-radio-button>
                            </el-radio-group>
                            <el-input
                                placeholder=""
                                v-model="search">
                                <i slot="suffix" class="el-input__icon el-icon-search"></i>
                            </el-input>
                            <el-button @click="reset" type="primary" size="medium" icon="el-icon-search">重置</el-button>
                            <el-button type="primary" size="medium" icon="el-icon-search">临时任务</el-button>
                            <el-button type="primary" size="medium" icon="el-icon-search">任务交接</el-button>
                            <el-button type="primary" size="medium" icon="el-icon-search">冲突检测</el-button>
                    </el-row>
                    <el-row class="legend-panel">
                        <Legend data="未发布" iconColor="grey" iconSize="16px" fontSize="16px" icon="el-icon-share" color="red"/>
                        <Legend data="已发布" iconColor="#2a2b2c" iconSize="16px" fontSize="16px" icon="el-icon-share" color="red"/>
                        <Legend data="已受领" iconColor="pink" iconSize="16px" fontSize="16px" icon="el-icon-share" color="red"/>
                        <Legend data="已到位" iconColor="green" iconSize="16px" fontSize="16px" icon="el-icon-share" color="red"/>
                        <Legend data="进行中" iconColor="yellow" iconSize="16px" fontSize="16px" icon="el-icon-share" color="red"/>
                        <Legend data="已完成" iconColor="#7f4832" iconSize="16px" fontSize="16px" icon="el-icon-share" color="red"/>
                        <Legend data="取消" iconColor="blue" iconSize="16px" fontSize="16px" icon="el-icon-share" color="red"/>
                        <Legend data="警告" iconColor="black" iconSize="16px" fontSize="16px" icon="el-icon-share" color="red"/>
                    </el-row>
                </el-header>
                <el-main>
                    <MainList/>
                </el-main>
        </el-container>
		<MessageBtn :message-num="getTotal()" />
		<UrgentReportBtn :message-num="getTotal()" />
  </el-container>
</template>

<script>
// @ is an alias to /src
import SearchInput from '../../components/SearchInput.vue';
import Legend from '../../components/Legend.vue';
import MainList from './MainList.vue';
import MessageBtn from 'MessageBtn.vue';
import UrgentReportBtn from 'UrgentReportBtn.vue';
import { sub, removeSub, pub} from 'postalControl';

import { mapState } from 'vuex';

export default {
    name: "home",
    data() {
      return {
        isHidden:false,
      };
    },
    methods: {
		getTotal(){
			return 100;
		},
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleToggle(){
        this.isHidden = !this.isHidden;
      },
      getPersons(data) {
        this.$store.dispatch('home/getPersons',data);
      },
      getMainListData() {
        this.$store.dispatch('home/getMainListData',null);
      },
      show(evt){
        console.log(evt.currentTarget.dataset.id);
      },
      reset(){
        this.$store.dispatch(`home/resetFilter`,null);
      },
    },
    computed: {
        asideWith() {
            return this.isHidden? '0':'390px';
        },
        search:{
            get(){
                    return this.$store.state.home.filterOption.searchKey;
            },
            set(filterOption){
                this.$store.dispatch(`home/updateFilter`,{name:'searchKey',filterOption:filterOption});
            }
        },
		searchPerson:{
            get(){
                    return this.$store.state.home.personSearchKey;
            },
            set(personSearchKey){
				pub('Worker','Home.Area.SetPersonSearchKey', personSearchKey );
                /*this.$store.dispatch(`home/setPersonSearchKey`, personSearchKey);*/
            }
        },
        taskStatus:{
            get(){
                    return this.$store.state.home.filterOption.taskStatus;
            },
            set(filterOption){
                this.$store.dispatch(`home/updateFilter`,{name:'taskStatus',filterOption:filterOption});
            }
        },
        type:{
            get(){
                    return this.$store.state.home.filterOption.type;
            },
            set(filterOption){
                this.$store.dispatch(`home/updateFilter`,{name:'type',filterOption:filterOption});
            }
        },
        ad:{
            get(){
                    return this.$store.state.home.filterOption.ad;
            },
            set(filterOption){
                this.$store.dispatch(`home/updateFilter`,{name:'ad',filterOption:filterOption});
            }
        },
        flightStatus:{
            get(){
                    return this.$store.state.home.filterOption.flightStatus;
            },
            set(filterOption){
                this.$store.dispatch(`home/updateFilter`,{name:'flightStatus',filterOption:filterOption});
            }
        },
        region:{
            get(){
                    return this.$store.state.home.filterOption.region;
            },
            set(filterOption){
                this.$store.dispatch(`home/updateFilter`,{name:'region',filterOption:filterOption});
            }
        },
        ...mapState('home',['filterPersons','persons']),

    },
    components: {
        SearchInput,
        Legend,
        MainList,
		MessageBtn,
		UrgentReportBtn,
    },
	beforeMount(){
		/*this.getPersons('aaaa');*/
		this.getMainListData();
		/*sub('UI','Home.Sync',(data)=>{*/
			/*console.log(data);*/
			/*this.getPersons(data);*/
		/*});*/
		sub('UI','Home.Area.Sync',(data)=>{
			console.log(data);
			this.getPersons(data);
		});
	},
	beforeDestroy() {
		removeSub('Home');
	},
};
</script>
