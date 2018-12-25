<template>
	<el-container class="home">
		<el-aside :style="{ width: asideWith }">
			<el-row v-if="!isHidden">
				<el-col :span="24">
					<el-input v-model="searchPerson" placeholder>
						<i slot="suffix" class="el-input__icon el-icon-search"/>
					</el-input>
				</el-col>
			</el-row>
			<div class="panel" v-if="!isHidden">
				<el-row :gutter="20" v-for="(person,index) in persons" :key="person.areaId+index" class="persons-panel"
					style="margin:0;">
					<el-col
						:span="24"
						v-if="person.workerList && person.workerList.length"
						class="area-panel"
						>{{ person.areaName }}
					</el-col>
					<el-row :gutter="20" style="margin:0;" class="personList">
						<el-col
							:span="24"
							v-for="worker in person.workerList"
							:key="worker.staffId"
							class="person-panel"
							:class="{'online':worker.memberState == 1}"
							style="float:none"
							>
							<el-tooltip effect="light" :disabled="!worker.phone" :content="worker.phone" placement="right">
								<div
									class="grid-content bg-person person"
									:class="{active:currentPerson && (currentPerson.staffId == worker.staffId)}"
									@dblclick="showSetting(worker,person.areaName)"
									@click="setPersonSearch(worker)"
									:data-id="worker.staffId"
									>
									{{formatPerson(worker)}}
									<!--{{ worker.staffName + (worker.workerName ? '(' + worker.workerName + ')' : '') }}-->
									<!--{{worker.staffName + `${worker.nonArrivalReason?}` }}-->
									<div class="taskNum">{{ worker.taskNumber }}</div>
								</div>
							</el-tooltip>
							<div style="font-size:12px;line-height:30px;" v-if="person.areaId == 'jpyxzh_O'" >
								{{worker.workContent}}
							</div>
						</el-col>
					</el-row>
				</el-row>
				<div class="placeHolder"/>
				</div>
				<div @click="handleToggle" class="toggleBtn">
					<i :class="isHidden?'icon-zhankai':'icon-shouqi'" class="iconfont"/>
				</div>
		</el-aside>
		<el-container>
			<el-header class="home-mian-header" height="auto">
				<el-row :gutter="0">
					<el-col :span="14">
						<!--<span @click="handleTable" class="is-table">-->
							<!--<i class="el-icon-star-on" v-if="!isTable"></i>-->
							<!--<i v-else class="el-icon-setting"></i>-->
						<!--</span>-->
						<el-radio-group v-model="isTable" size="mini" class="tabCard">
							<el-radio-button :label="true" ><i class="iconfont icon-liebiao"></i></el-radio-button>
							<el-radio-button :label="false" ><i class="iconfont icon-qiapian"></i></el-radio-button>
						</el-radio-group>
						<el-radio-group v-model="taskStatus" size="mini" >
							<el-radio-button label="1">未完成</el-radio-button>
							<el-radio-button label="6">已完成</el-radio-button>
							<el-radio-button label="0">全部</el-radio-button>
						</el-radio-group>
						<el-radio-group v-model="type" size="mini" >
							<el-radio-button label="area">区域</el-radio-button>
							<el-radio-button label="time">时间</el-radio-button>
						</el-radio-group>
						<el-radio-group v-model="movement" size="mini" >
							<el-radio-button label="0">所有</el-radio-button>
							<el-radio-button label="A">进</el-radio-button>
							<el-radio-button label="D">离</el-radio-button>
						</el-radio-group>
						<el-radio-group v-model="flightStatus" size="mini" >
							<el-radio-button label="前起">前站起飞</el-radio-button>
							<el-radio-button label="登机">已登机</el-radio-button>
						</el-radio-group>
						<el-radio-group v-model="flightIndicator" size="mini" >
							<el-radio-button label="D">国内</el-radio-button>
							<el-radio-button label="I">国际</el-radio-button>
						</el-radio-group>
						<el-button @click="reset" type="success" icon="iconfont icon-fanhui"  size="mini" >恢复默认</el-button>
					</el-col>
					<el-col :span="10" class="header-right">
						<el-input v-model="search" style="width:220px;" placeholder="输入关键词搜索" size="mini" >
							<i slot="suffix" class="el-input__icon el-icon-search"/>
						</el-input>
							<el-button
								type="primary"
								size="mini"
								@click="openAddTask"
								>临时任务</el-button>
							<el-button type="primary" size="mini"  @click="openTaskHandover" >任务交接</el-button>
							<el-button type="primary" size="mini"  >冲突检测</el-button>
					</el-col>
				</el-row>
				<el-row class="legend-panel" v-if="!isTable" :gutter="20">
					<el-col :span="12" style="text-align:left">
						<span style="padding-left:10px;font-weight:bold;font-size:14px;">
							任务状态：
						</span>
						<Legend data="未发布" iconColor="white" iconSize="16px" fontSize="12px" color="#333"/>
						<Legend data="已发布" iconColor="#ffac00" iconSize="16px" fontSize="12px" color="#333"/>
						<Legend data="已受领" iconColor="#00a0ff" iconSize="16px" fontSize="12px" color="#333"/>
						<Legend data="已到位" iconColor="#00d859" iconSize="16px" fontSize="12px" color="#333"/>
						<Legend data="进行中" iconColor="#aa67f3" iconSize="16px" fontSize="12px" color="#333"/>
						<Legend data="已完成" iconColor="#0065ff" iconSize="16px" fontSize="12px" color="#333"/>
						<Legend data="取消" iconColor="#bfbfbf" iconSize="16px" fontSize="12px" color="#333"/>
						<Legend data="不保障" iconColor="#bfbfbf" iconSize="16px" fontSize="12px" color="#333"/>
					</el-col>
					<el-col :span="12" style="text-align:left">
						<span style="padding-left:10px;font-weight:bold;font-size:14px;">
							标记说明：
						</span>
						<Legend data="延误" iconColor="#f00025" iconSize="16px" icon="iconfont icon-yanwubiaoji" fontSize="12px" color="#333"/>
						<Legend data="重点" iconColor="#009a51" iconSize="16px" icon="iconfont icon-zhongdianbiaoji" fontSize="12px" color="#333"/>
						<Legend data="VIP" iconColor="#ff7100" iconSize="16px" icon="iconfont icon-VIPbiaoji"  fontSize="12px" color="#333"/>
						<Legend data="快速过站" iconColor="#0065ff" iconSize="16px" icon="iconfont icon-kuaisubiaoji"  fontSize="12px" color="#333"/>
						<Legend data="备降" iconColor="#0065ff" iconSize="16px" icon="iconfont icon-beijiangbiaoji"  fontSize="12px" color="#333"/>
						<Legend data="返航" iconColor="#009beb" iconSize="16px" icon="iconfont icon-fanhangbiaoji" fontSize="12px" color="#333"/>
						<Legend data="告警" iconColor="#fa0013" iconSize="16px" icon="iconfont icon-gaojingbiaoji" fontSize="12px" color="#333"/>
					</el-col>
				</el-row>
			</el-header>
			<el-main v-if="!isTable">
				<MainList/>
			</el-main>
			<el-main v-else>
				<TableList/>
			</el-main>
		</el-container>
		<el-popover placement="top-end" offset="5" v-model="visible">
			<el-tabs type="card" style="width:400px;" class="home-message">
				<el-tab-pane>
					<span slot="label">
						<i class="el-icon-date"></i>警告
					</span>
					<el-row :gutter="4" v-for="(message, index) in warnings" :key="index">
						<el-col :span="4" style="text-align:center;">
							<span class="flightNo" :title="message.flightNo">{{message.flightNo}}</span>
						</el-col>
						<el-col :span="14" :title="message.content">{{message.content}}</el-col>
						<el-col :span="6" style="text-align:right;padding-right:6px;">
							<el-button size="mini" type="danger">解除警告</el-button>
						</el-col>
					</el-row>
				</el-tab-pane>
				<el-tab-pane>
					<span slot="label">
						<i class="el-icon-date"></i>偏离上报
					</span>
					<el-row :gutter="4" v-for="(message, index) in urgentReports" :key="index">
						<el-col :span="4" style="text-align:center;">
							<span class="flightNo" :title="message.flightNo">{{message.flightNo}}</span>
						</el-col>
						<el-col :span="20" :title="message.content">{{message.content}}</el-col>
					</el-row>
				</el-tab-pane>
				<el-tab-pane>
					<span slot="label">
						<i class="el-icon-date"></i>提醒
					</span>
					<el-row :gutter="4" v-for="(message, index) in tips" :key="index">
						<el-col :span="4" style="text-align:center;">
							<span class="flightNo" :title="message.flightNo">{{message.flightNo}}</span>
						</el-col>
						<el-col :span="20" :title="message.content">{{message.content}}</el-col>
					</el-row>
				</el-tab-pane>
				<el-tab-pane>
					<span slot="label">
						<i class="el-icon-date"></i>日志
					</span>
					<el-row :gutter="4" v-for="(message, index) in logs" :key="index">
						<el-col :span="4" style="text-align:center;">
							<span class="flightNo" :title="message.flightNo">{{message.flightNo}}</span>
						</el-col>
						<el-col :span="20" :title="message.content">{{message.content}}</el-col>
					</el-row>
				</el-tab-pane>
			</el-tabs>
			<MessageBtn slot="reference" @click="showMessageBox"/>
		</el-popover>
		<!--<MessageBtn :message-num="getTotal()" @click="showMessageBox"/>-->
		<DialogAddTask/>
		<dialogTaskHandover/>
		<DialogPersonSetting :currentAreaName="currentAreaName" :currentPerson="currentPerson"/>
		<DialogAlert :messages="messageAlerts"/>
	</el-container>
</template>

<script>
	// @ is an alias to /src
	/*import SearchInput from '../../components/SearchInput.vue';*/
	import Legend from "Legend.vue";
	import MainList from "./MainList.vue";
	import MessageBtn from "MessageBtn.vue";
	import DialogAddTask from "DialogAddTask.vue";
	import DialogPersonSetting from "./DialogPersonSetting.vue";
	import DialogAlert from "./DialogAlert.vue";
	import TableList from "./TableList.vue";
	import dialogTaskHandover from "./dialogTaskHandover.vue";
	import { sub, removeSub, pub } from "postalControl";
	import {filter} from 'lodash';
	import { remote } from 'electron';

	import { mapState, mapGetters } from "vuex";

	export default {
		name: "Home",
		data() {
			return {
				isHidden: false,
				isTable: false,
				isDoubleClick: false,
				currentPerson: null,
				visible: false,
				messages:[],
				currentAreaName:'',
			};
		},
		methods: {
			formatPerson(worker){
				let workerName = worker.staffName;
				let reason = worker.nonArrivalReason;
				let tmp ='';
				if(reason){
					tmp = `(${reason == 5 ? worker.workerName : this.getReason(reason)})`;  
				}
				return workerName + tmp;
				
			},
			openAddTask() {
				this.$store.dispatch(`home/update`, { dialogAddTaskVisible: true });
			},
			openTaskHandover(){
				this.$store.dispatch(`home/updateTaskHandover`, {dialogTaskHandover: true});
			},
			showMessageBox() {
				console.log(123);
				this.visible = !this.visible;
			},
			getTotal() {
				return 100;
			},
			handleToggle() {
				this.isHidden = !this.isHidden;
			},
			handleTable() {
				this.isTable = !this.isTable;
			},
			showAlert(){
				this.$store.dispatch('home/update',{
					dialogAlertVisible:true,	
				});
			},
			getPersons(data) {
				this.$store.dispatch("home/getPersons", data);
			},
			getMainListData(data) {
				this.$store.dispatch("home/getMainListData", data);
			},
			showSetting(worker, areaName) {
				this.isDoubleClick = true;
				this.currentPerson = worker;
				this.currentAreaName = areaName;
				this.$store.dispatch(`home/update`, { dialogPersonSettingVisible: true });
			},
			setPersonSearch(worker) {
				let _this = this;
				console.log(worker);
				_this.isDoubleClick = false;
				window.setTimeout(function() {
					if (!_this.isDoubleClick) {
						if(_this.currentPerson && _this.currentPerson.staffId == worker.staffId){
							_this.currentPerson = null;	
							_this.$store.dispatch("home/updateFilter", {
								name: "searchPersonKey",
								filterOption: '',
							});
						}else{
							_this.currentPerson = worker;
							_this.$store.dispatch("home/updateFilter", {
								name: "searchPersonKey",
								filterOption: worker.workerName
								? worker.workerName
								: worker.staffName
							});
						}
					}
				}, 300);
			},
			getHomeTableData(data) {
				this.$store.dispatch("home/getHomeTableData", data);
			},
			getHomeTableTotal(data) {
				this.$store.dispatch("home/getHomeTableTotal", data);
			},
			reset() {
				this.currentPerson = null;
				this.$store.dispatch(`home/resetFilter`, null);
			},
			sendTaskListFilter() {
				pub("Worker", "Home.Task.SetTaskFilter", this.filterOption);
				// console.log('777cc77c7c77c');
				// pub("Worker", "Home.Table.SetTablePageSize", this.filterOption);
			},
			getFilterMessages(k,v){
				return filter(this.messages, item =>{
					return item[k] == v;
				});
			},
		},
		computed: {
			messageAlerts:function(){
				return this.getFilterMessages('alert', true);	
			},
			warnings:function(){
				return this.getFilterMessages('type', 1);	
			},
			urgentReports:function(){
				return this.getFilterMessages('type', 2);	
			},
			tips:function(){
				return this.getFilterMessages('type', 3);	
			},
			logs:function(){
				return this.getFilterMessages('type', 4);	
			},
			asideWith() {
				return this.isHidden ? "0" : "300px";
			},
			search: {
				get() {
					return this.$store.state.home.filterOption.searchKey;
				},
				set(filterOption) {
					this.$store.dispatch(`home/updateFilter`, {
						name: "searchKey",
						filterOption: filterOption
					});
				}
			},
			searchPerson: {
				get() {
					return this.$store.state.home.personSearchKey;
				},
				set(personSearchKey) {
					pub("Worker", "Home.Area.SetPersonSearchKey", personSearchKey);
				}
			},
			taskStatus: {
				get() {
					return this.$store.state.home.filterOption.taskStatus;
				},
				set(filterOption) {
					this.$store.dispatch(`home/updateFilter`, {
						name: "taskStatus",
						filterOption: filterOption
					});
				}
			},
			type: {
				get() {
					return this.$store.state.home.filterOption.type;
				},
				set(filterOption) {
					this.$store.dispatch(`home/updateFilter`, {
						name: "type",
						filterOption: filterOption
					});
				}
			},
			movement: {
				get() {
					return this.$store.state.home.filterOption.movement;
				},
				set(filterOption) {
					this.$store.dispatch(`home/updateFilter`, {
						name: "movement",
						filterOption: filterOption
					});
				}
			},
			flightStatus: {
				get() {
					return this.$store.state.home.filterOption.flightStatus;
				},
				set(filterOption) {
					this.$store.dispatch(`home/updateFilter`, {
						name: "flightStatus",
						filterOption: filterOption
					});
				}
			},
			flightIndicator: {
				get() {
					return this.$store.state.home.filterOption.flightIndicator;
				},
				set(filterOption) {
					this.$store.dispatch(`home/updateFilter`, {
						name: "flightIndicator",
						filterOption: filterOption
					});
				}
			},
			...mapState("home", ["filterPersons", "persons", "filterOption"]),
			...mapGetters('rollCall', ['getReason']),
		},
		components: {
			/*SearchInput,*/
			MainList,
			MessageBtn,
			DialogAddTask,
			dialogTaskHandover,
			Legend,
			TableList,
			DialogPersonSetting,
			DialogAlert,
		},
		beforeMount() {
			sub("UI", "Home.Task.Sync", data => {
				this.getMainListData(data);
			});
			sub("UI", "Home.Table.Sync", data => {
				console.log(data);
				this.getHomeTableTotal(data.total);
				this.getHomeTableData(data.data);
			});
			sub("UI", "Home.Area.Sync", data => {
				this.getPersons(data);
			});
			sub("UI", "Home.Area.All", data => {
				this.getPersons(data);
			});
			sub("UI", "Home.Event.Ready", () => {
				this.sendTaskListFilter();
			});
			sub("UI","Home.Message.Sync",(data)=>{
				this.messages.push(data);
				if(data.alert){
					this.showAlert();
				}
			});	
			if(remote.getGlobal('workerInit')){
				pub("Worker", "Home.Start", null);
			}else{
				sub("UI", "All.ready", () => {
					pub("Worker", "Home.Start", null);
				});
			}
		},
		beforeDestroy() {
			removeSub("Home");
			removeSub("All");
		}
	};
</script>
