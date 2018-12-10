<template>
  <el-container class="home">
		<el-aside :style="{ width: asideWith }">
			<el-row v-if="!isHidden">
				<el-col :span="24">
					<el-input v-model="searchPerson" placeholder=""> <i slot="suffix" class="el-input__icon el-icon-search"
/> </el-input>
				</el-col>
			</el-row>
			<div class="panel" v-if="!isHidden"
>
				<el-row :gutter="20" v-for="(person,index) in persons" 
:key="person.areaId+index" class="persons-panel" style="margin:0;"
>
					<el-col :span="24" v-if="person.workerList.length" 
class="area-panel"
>{{ person.areaName }}</el-col>
					<el-row :gutter="20" style="margin:0;" 
class="personList"
>
						<el-col :span="6" v-for="worker in person.workerList" 
:key="worker.staffId" class="person-panel"
>
							<div class="grid-content bg-person person" @dblclick="showSetting" @click="setPersonSearch(worker.staffName)" 
:data-id="worker.staffId"
>
                {{ worker.staffName + (worker.workerName ? '(' + worker.workerName + ')' : '') }}
								<div class="taskNum">{{ worker.taskNumber }}</div>
							</div>
						</el-col>
					</el-row>
				</el-row>
				<div class="placeHolder" />
			</div>
			<div @click="handleToggle" class="toggleBtn"
><i class="el-icon-d-arrow-left" /></div>
		</el-aside>
    <el-container>
      <el-header 
class="home-mian-header" 
height="auto">
				<el-row>
					<el-radio-group v-model="taskStatus">
            <el-radio-button label="1">未完成</el-radio-button>
            <el-radio-button label="6">已完成</el-radio-button>
						<el-radio-button label="0">全部</el-radio-button>
          </el-radio-group>
          <el-radio-group v-model="type">
            <el-radio-button label="area">区域</el-radio-button>
            <el-radio-button label="time">时间</el-radio-button>
					</el-radio-group>
          <el-radio-group v-model="movement">
            <el-radio-button label=0>所有</el-radio-button>
			<el-radio-button label="A">进</el-radio-button>
			<el-radio-button label="D">离</el-radio-button>
		  </el-radio-group>
		  <el-radio-group v-model="flightStatus">
			  <el-radio-button label="前站起飞">前站起飞</el-radio-button>
			  <el-radio-button label="已登机">已登机</el-radio-button>
		  </el-radio-group>
          <el-radio-group v-model="flightIndicator">
						<el-radio-button label="D">国内</el-radio-button>
						<el-radio-button label="I">国际</el-radio-button>
					</el-radio-group>
					<el-input v-model="search" placeholder=""> <i slot="suffix" class="el-input__icon el-icon-search"
/> </el-input>
					<el-button @click="reset" type="primary" 
size="medium" icon="iconfont icon-return1"
>重置</el-button>
          <el-button 
type="primary" 
size="medium" icon="iconfont icon-search" @click="openAddTask">临时任务</el-button>
          <el-button 
type="primary" 
size="medium" icon="el-icon-search">任务交接</el-button>
					<el-button type="primary" size="medium" 
icon="el-icon-search">冲突检测</el-button>
        </el-row>
        <el-row class="legend-panel">
					<Legend data="未发布" iconColor="grey" 
iconSize="16px" fontSize="16px" icon="el-icon-share" color="red"
/>
					<Legend data="已发布" iconColor="#2a2b2c" 
iconSize="16px" fontSize="16px" icon="el-icon-share" color="red"
/>
					<Legend data="已受领" iconColor="pink" 
iconSize="16px" fontSize="16px" icon="el-icon-share" color="red"
/>
					<Legend data="已到位" iconColor="green" 
iconSize="16px" fontSize="16px" icon="el-icon-share" color="red"
/>
					<Legend data="进行中" iconColor="yellow" 
iconSize="16px" fontSize="16px" icon="el-icon-share" color="red"
/>
					<Legend data="已完成" iconColor="#7f4832" 
iconSize="16px" fontSize="16px" icon="el-icon-share" color="red"
/>
					<Legend data="取消" iconColor="blue" 
iconSize="16px" fontSize="16px" icon="el-icon-share" color="red"
/>
					<Legend data="警告" iconColor="black" 
iconSize="16px" fontSize="16px" icon="el-icon-share" color="red"
/>
        </el-row>
      </el-header>
			<el-main> <MainList /> </el-main>
		</el-container>
		<MessageBtn :message-num="getTotal()" />
		<UrgentReportBtn :message-num="getTotal()" />
		<DialogAddTask />
  </el-container>
</template>

<script>
// @ is an alias to /src
/*import SearchInput from '../../components/SearchInput.vue';*/
import Legend from 'Legend.vue';
import MainList from './MainList.vue';
import MessageBtn from 'MessageBtn.vue';
import UrgentReportBtn from 'UrgentReportBtn.vue';
import DialogAddTask from 'DialogAddTask.vue';
import { sub, removeSub, pub } from 'postalControl';

import { mapState } from 'vuex';

export default {
	name: 'Home',
	data() {
		return {
			isHidden: false,
		};
	},
	methods: {
		openAddTask() {
			this.$store.dispatch(`home/update`, { dialogAddTaskVisible: true });
		},
		getTotal() {
			return 100;
		},
		handleClick(tab, event) {
			console.log(tab, event);
		},
		handleToggle() {
			this.isHidden = !this.isHidden;
		},
		getPersons(data) {
			this.$store.dispatch('home/getPersons', data);
		},
		getMainListData(data) {
			this.$store.dispatch('home/getMainListData', data);
		},
		showSetting(){
			console.log('double click')
		},
		setPersonSearch(workerName) {
			this.$store.dispatch('home/updateFilter',{
				name : 'searchPersonKey',
				filterOption:workerName,
			})
		},
		reset() {
			this.$store.dispatch(`home/resetFilter`, null);
		},
		sendTaskListFilter() {
			pub('Worker', 'Home.Task.SetTaskFilter', this.filterOption);
		},
	},
	computed: {
		asideWith() {
			return this.isHidden ? '0' : '390px';
		},
		search: {
			get() {
				return this.$store.state.home.filterOption.searchKey;
			},
			set(filterOption) {
				this.$store.dispatch(`home/updateFilter`, { name: 'searchKey', filterOption: filterOption });
			},
		},
		searchPerson: {
			get() {
				return this.$store.state.home.personSearchKey;
			},
			set(personSearchKey) {
				pub('Worker', 'Home.Area.SetPersonSearchKey', personSearchKey);
				/*this.$store.dispatch(`home/setPersonSearchKey`, personSearchKey);*/
			},
		},
		taskStatus: {
			get() {
				return this.$store.state.home.filterOption.taskStatus;
			},
			set(filterOption) {
				this.$store.dispatch(`home/updateFilter`, { name: 'taskStatus', filterOption: filterOption });
			},
		},
		type: {
			get() {
				return this.$store.state.home.filterOption.type;
			},
			set(filterOption) {
				this.$store.dispatch(`home/updateFilter`, { name: 'type', filterOption: filterOption });
			},
		},
		movement: {
			get() {
				return this.$store.state.home.filterOption.movement;
			},
			set(filterOption) {
				this.$store.dispatch(`home/updateFilter`, { name: 'movement', filterOption: filterOption });
			},
		},
		flightStatus: {
			get() {
				return this.$store.state.home.filterOption.flightStatus;
			},
			set(filterOption) {
				this.$store.dispatch(`home/updateFilter`, { name: 'flightStatus', filterOption: filterOption });
			},
		},
		flightIndicator: {
			get() {
				return this.$store.state.home.filterOption.flightIndicator;
			},
			set(filterOption) {
				this.$store.dispatch(`home/updateFilter`, { name: 'flightIndicator', filterOption: filterOption });
			},
		},
		...mapState('home', ['filterPersons', 'persons', 'filterOption']),
	},
	components: {
		/*SearchInput,*/
		MainList,
		MessageBtn,
		UrgentReportBtn,
		DialogAddTask,
		Legend,
	},
	beforeMount() {
		sub('UI', 'Home.Task.Sync', (data) => {
			this.getMainListData(data);
		});
		sub('UI', 'Home.Area.Sync', (data) => {
			this.getPersons(data);
		});
		sub('UI', 'Home.Area.All', (data) => {
			this.getPersons(data);
		});
		sub('UI', 'Home.Event.Ready', () => {
			this.sendTaskListFilter();
		});
		sub('UI','All.ready',()=>{
			pub('Worker','Home.Start',null);
		})
		pub('Worker','Home.Start',null);
	},
	beforeDestroy() {
		removeSub('Home');
		removeSub('All');
	},
};
</script>
