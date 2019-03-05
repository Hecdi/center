<template>
	<el-container class="home">
		<router-view :name="peopleListName" ref="peopleList"></router-view>
		<el-container>
			<el-header class="home-mian-header" height="auto">
				<el-row :gutter="0">
					<el-col :span="14">
						<!-- <span @click="handleTable" class="is-table"> -->
						<!-- <i class="el-icon-star-on" v-if="!isTable"></i> -->
						<!-- <i v-else class="el-icon-setting"></i> -->
						<!-- </span> -->
						<el-radio-group v-model="isTable" size="mini" class="tabCard">
							<el-radio-button :label="true"><i class="iconfont icon-liebiao"></i></el-radio-button>
							<el-radio-button :label="false"><i class="iconfont icon-qiapian"></i></el-radio-button>
						</el-radio-group>
						<el-radio-group v-model="taskStatus" size="mini">
							<el-radio-button label="1">未完成</el-radio-button>
							<el-radio-button label="6">已完成</el-radio-button>
							<el-radio-button label="0">全部</el-radio-button>
						</el-radio-group>
						<el-radio-group v-model="type" size="mini">
							<el-radio-button label="area">区域</el-radio-button>
							<el-radio-button label="time">时间</el-radio-button>
						</el-radio-group>
						<el-radio-group v-model="movement" size="mini">
							<el-radio-button label="0">所有</el-radio-button>
							<el-radio-button label="A">进</el-radio-button>
							<el-radio-button label="D">离</el-radio-button>
						</el-radio-group>
						<el-radio-group v-model="flightStatus" size="mini">
							<el-radio-button label="前起">前站起飞</el-radio-button>
							<el-radio-button label="登机">已登机</el-radio-button>
						</el-radio-group>
						<el-radio-group v-model="flightIndicator" size="mini">
							<el-radio-button label="D">国内</el-radio-button>
							<el-radio-button label="I">国际</el-radio-button>
						</el-radio-group>
						<el-button @click="reset" type="success" icon="iconfont icon-fanhui" size="mini">恢复默认</el-button>
					</el-col>
					<el-col :span="10" class="header-right">
						<el-input v-model="search" style="width:220px;" placeholder="输入关键词搜索" size="mini"> <i slot="suffix" class="el-input__icon el-icon-search" /> </el-input>
						<el-button type="primary" size="mini" @click="openAddTask">临时任务</el-button>
						<el-button type="primary" size="mini" @click="openTaskHandover">任务交接</el-button>
						<!-- <el-button type="primary" size="mini"  >冲突检测</el-button> -->
					</el-col>
				</el-row>
				<el-row class="legend-panel" :gutter="20">
					<el-col :span="12" style="text-align:left">
						<span style="padding-left:10px;font-weight:bold;font-size:14px;"> 任务状态： </span>
						<legend data="未发布" iconColor="white" iconSize="16px" fontSize="12px" color="#333" />
						<legend data="已发布" iconColor="#ffac00" iconSize="16px" fontSize="12px" color="#333" />
						<legend data="已领受" iconColor="#00a0ff" iconSize="16px" fontSize="12px" color="#333" />
						<legend data="已到位" iconColor="#00d859" iconSize="16px" fontSize="12px" color="#333" />
						<legend data="进行中" iconColor="#aa67f3" iconSize="16px" fontSize="12px" color="#333" />
						<legend data="已完成" iconColor="#bfbfbf" iconSize="16px" fontSize="12px" color="#333" />
						<!-- <Legend data="取消" iconColor="#bfbfbf" iconSize="16px" fontSize="12px" color="#333"/> -->
						<legend data="取消/不保障" iconColor="#ef8c8f" type="circle" iconSize="16px" fontSize="12px" color="#333" />
					</el-col>
					<el-col :span="12" style="text-align:left">
						<span style="padding-left:10px;font-weight:bold;font-size:14px;"> 标记说明： </span>
						<legend data="延误" iconColor="#f00025" iconSize="16px" icon="iconfont icon-yanwu" fontSize="12px" color="#333" />
						<legend data="重点" iconColor="#009a51" iconSize="16px" icon="iconfont icon-zhongdian" fontSize="12px" color="#333" />
						<legend data="VIP" iconColor="#ff7100" iconSize="16px" icon="iconfont icon-VIP" fontSize="12px" color="#333" />
						<legend data="快速过站" iconColor="#0065ff" iconSize="16px" icon="iconfont icon-kuaisu" fontSize="12px" color="#333" />
						<legend data="备降" iconColor="#0065ff" iconSize="16px" icon="iconfont icon-beijiang" fontSize="12px" color="#333" />
						<legend data="返航" iconColor="#009beb" iconSize="16px" icon="iconfont icon-fanhang" fontSize="12px" color="#333" />
						<legend data="告警" iconColor="#fa0013" iconSize="16px" icon="iconfont icon-gaojingbiaoji" fontSize="12px" color="#333" />
						<legend data="偏离上报" iconColor="#14407f" iconSize="16px" icon="iconfont icon-pianlishangbao1" fontSize="12px" color="#333" />
					</el-col>
				</el-row>
			</el-header>
			<el-main v-if="!isTable">
				<!-- <MainList/> -->
				<router-view :name="mainListName"></router-view>
			</el-main>
			<el-main class="table-main" v-else> <TableList /> </el-main>
		</el-container>
		<el-popover placement="top-end" offset="5" v-model="visible">
			<el-tabs type="card" style="width:400px;" class="home-message">
				<el-tab-pane>
					<span slot="label"> <i class="iconfont icon-gaojing"></i>警告 </span>
					<el-row :gutter="4" v-for="(message, index) in warnings" :key="index" @click.native="revealLogDetail(message);">
						<el-col :span="4" style="text-align:center;">
							<span class="flightNo" :title="message.flightNo">{{ message.flightNo }}</span>
						</el-col>
						<el-col :span="14" :title="message.content">{{ message.content }}</el-col>
						<el-col :span="6" style="text-align:right;padding-right:6px;"> <el-button size="mini" type="danger" @click.native.stop="relievingAlarm(message.flightTaskId);">解除警告</el-button> </el-col>
					</el-row>
				</el-tab-pane>
				<el-tab-pane>
					<span slot="label"> <i class="iconfont icon-tongzhi"></i>提醒 </span>
					<el-row :gutter="4" v-for="(message, index) in tips" :key="index" @click.native="revealLogDetail(message);">
						<el-col :span="4" style="text-align:center;">
							<span class="flightNo" :title="message.flightNo">{{ message.flightNo }}</span>
						</el-col>
						<el-col :span="20" :title="message.content">{{ message.content }}</el-col>
					</el-row>
				</el-tab-pane>
				<el-tab-pane>
					<span slot="label"> <i class="iconfont icon-log-a-04"></i>日志 </span>
					<el-row :gutter="4" v-for="(message, index) in logs" :key="index" @click.native="revealLogDetail(message);">
						<el-col :span="4" style="text-align:center;">
							<span class="flightNo" :title="message.flightNo">{{ message.flightNo }}</span>
						</el-col>
						<el-col :span="20" :title="message.content">{{ message.content }}</el-col>
					</el-row>
				</el-tab-pane>
				<el-tab-pane>
					<span slot="label"> <i class="iconfont icon-chongtu"></i>冲突 </span>
					<el-row :gutter="4" v-for="(message, index) in conflicis" :key="index" @click.native="revealLogDetail(message);">
						<el-col :span="4" style="text-align:center;">
							<span class="flightNo" :title="message.flightNo">{{ message.flightNo }}</span>
						</el-col>
						<el-col :span="20" :title="message.content">{{ message.content }}</el-col>
					</el-row>
				</el-tab-pane>
				<el-button size="mini" round style="color:#666C72;background-color:#d8d8d8;font-size:12px;" @click.native="gotoMessage">更多></el-button>
			</el-tabs>
			<MessageBtn slot="reference" @click="showMessageBox" />
		</el-popover>
		<!-- <MessageBtn :message-num="getTotal()" @click="showMessageBox"/> -->
		<!--<DialogAddTask />-->
		<router-view :name="addTaskName"></router-view>
		<dialogTaskHandover />
		<DialogAlert :messages="messageAlerts" />
	</el-container>
</template>

<script>
/* eslint-disable prettier/prettier */
	
	// @ is an alias to /src
	/* import SearchInput from '../../components/SearchInput.vue'; */
	import Legend from "Legend.vue";
	// import MainList from "./MainList.vue";
	import MessageBtn from "MessageBtn.vue";
	import DialogAlert from "./DialogAlert.vue";
	import TableList from "./TableList.vue";
	import dialogTaskHandover from "./DialogTaskHandover.vue";
	import { sub, removeSub, pub } from "postalControl";
	import {filter, each} from 'lodash';
	import { remote } from 'electron';
	import { ajax } from "ajax";

	import { mapState, mapGetters } from "vuex";

	export default {
		name: "Home",
		data() {
			return {
				isHidden: false,
				isTable: false,
				isDoubleClick: false,
				visible: false,
				messages:[],
				currentAreaName:'',
				messageAlerts:[],
			};
		},
		methods: {
			relievingAlarm(flightTaskId){
				ajax.post('relievingAlarm', {flightTaskId:flightTaskId}, data=>{
					each(this.messages, (item, index)=>{
						if(item.type == 1 && item.flightTaskId == flightTaskId){
							this.messages.splice(index, 1);	
						}
					});
					this.$message({
						type: data.responseCode == 1000 ? "success" : "error",
						message: data.responseMessage
					});
				});
			},
			gotoMessage(){
				this.$router.push('/messageCenter');	
			},
			revealLogDetail(message){
				if(message && message.flightTaskId){
					this.$store.dispatch(`home/updateFilter`, {
						name:"logTaskId",
						filterOption:message.flightTaskId,
					});
				}
			},
			openAddTask() {
				this.$store.dispatch(`home/update`, { dialogAddTaskVisible: true });
			},
			openTaskHandover(){
				this.$store.dispatch(`home/updateTaskHandover`, {dialogTaskHandover: true});
			},
			showMessageBox() {
				this.visible = !this.visible;
			},
			getTotal() {
				return 100;
			},
			handleTable() {
				this.isTable = !this.isTable;
			},
			showAlert(data){
				if(!this.dialogAlertVisible){
					this.messageAlerts = [];
				}
				this.messageAlerts.push(data);
				this.$store.dispatch('home/update', {
					dialogAlertVisible:true,	
				});
			},
			getPersons(data) {
				this.$store.dispatch("home/getPersons", data);
			},
			getMainListData(data) {
				this.$store.dispatch("home/getMainListData", data);
			},
			
			getHomeTableData(data) {
				this.$store.dispatch("home/getHomeTableData", data);
			},
			getHomeTableTotal(data) {
				this.$store.dispatch("home/getHomeTableTotal", data);
			},
			reset() {
				this.$refs.peopleList.reset && this.$refs.peopleList.reset();
				this.$store.dispatch(`home/resetFilter`, null);
			},
			sendTaskListFilter() {
				pub("Worker", "Home.Task.SetTaskFilter", this.filterOption);
			},
			getFilterMessages(k, v){
				return filter(this.messages, item =>{
					return item[k] == v;
				});
			},
		},
		computed: {
			mainListName:function(){
				return this.$getCompontsNameByPosition('home.taskList');
			},
			peopleListName:function(){
				return this.$getCompontsNameByPosition('home.peopleList');
			},
			addTaskName: function(){
				return this.$getCompontsNameByPosition('home.addTask');
			},
			warnings:function(){
				return this.getFilterMessages('type', 1);	
			},
			conflicis:function(){
				return this.getFilterMessages('type', 5);	
			},
			tips:function(){
				return this.getFilterMessages('type', 3);	
			},
			logs:function(){
				return this.getFilterMessages('type', 4);	
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
			...mapState("home", ["filterPersons", "persons", "filterOption", "dialogAlertVisible", 'mainList']),
			...mapGetters('rollCall', ['getReason']),
		},
		components: {
			/* SearchInput, */
			// MainList,
			MessageBtn,
			// DialogAddTask,
			dialogTaskHandover,
			Legend,
			TableList,
			DialogAlert,
		},
		beforeMount() {
			this.$store.dispatch('home/update', {
				waiting:true,	
			});
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
			sub("UI", "Home.Loading", data => {
				if(this.persons.length && this.mainList.length){
					data = false;
				}
				this.$store.dispatch(`home/update`, {
					waiting: data,
				});
			});
			sub("UI", "Home.Area.All", data => {
				this.getPersons(data);
			});
			sub("UI", "Home.Event.Ready", () => {
				this.sendTaskListFilter();
			});
			sub("UI", "Home.Message.Sync", (data)=>{
				this.messages.push(data);
				if(data.alert){
					this.showAlert(data);
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
