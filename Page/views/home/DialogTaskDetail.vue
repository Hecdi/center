<template>
  <el-dialog
    class="dialogTaskDetail"
    :title="title"
    :visible.sync="dialogTaskDetailVisible"
    width="600px"
	  >
   <!-- <section class="row1">-->
		<!--<section>-->
			<!--<div class="city">{{currentTask.airRoute[0]}}</div>-->
			<!--<div class="airport">机场名</div>-->
		<!--</section>-->
			<!--<i class="iconfont icon-hangxian"></i>-->
		<!--<section>-->
			<!--<div class="city">{{currentTask.airRoute[1]}}</div>-->
			<!--<div class="airport">机场名</div>-->
		<!--</section>-->
		<!--<section class="column4">-->
			<!--<div>机位/登机口：<b>{{`${currentTask.seat}/${currentTask.gate}`}}</b></div>-->
			<!--<div>机号/机型/机类：<b>{{`${currentTask.aircraftNumber}/${currentTask.aircraftType}/${currentTask.aircraftFlightType}`}}</b></div>-->
		<!--</section>-->
		<!--<section class="column5">-->
			<!--<div>计划时间：<b>{{currentTask.disPlayExpectedTime}}</b></div>-->
			<!--<div>实际时间：<b>{{currentTask.disPlayActuralTime}}</b></div>-->
		<!--</section>-->
	<!--</section>-->
	<section v-loading="waiting" element-loading-text="拼命加载中。。。">
   <el-row class="row1" :gutter="5" >
		<el-col :span="3">
			<div class="city">{{currentTask.iata ? currentTask.iata[0] : ''}}</div>
			<div class="airport">{{currentTask.airRoute ? currentTask.airRoute[0]:''}}</div>
		</el-col>
		<el-col :span="2" class="column2" style="line-height:45px;">
			<i class="iconfont icon-hangxian"></i>
		</el-col>
		<el-col :span="3">
			<div class="city">{{currentTask.iata?currentTask.iata[1]:''}}</div>
			<div class="airport">{{currentTask.airRoute?currentTask.airRoute[1]:''}}</div>
		</el-col>
		<el-col :span="10" class="column4">
			<div>机位/登机口：<b>{{`${currentTask.seat}/${currentTask.gate}`}}</b></div>
			<div>机号/机型/机类：<b>{{`${currentTask.aircraftNumber}/${currentTask.aircraftType}/${currentTask.aircraftFlightType}`}}</b></div>
		</el-col>
		<el-col :span="6" class="column5">
			<div>计划时间：<b>{{currentTask.displayScheduleTimeWithDate}}</b></div>
			<div v-if="currentTask.disPlayActuralTime && currentTask.disPlayActuralTime != '--'">实际时间：<b>{{currentTask.disPlayActuralTime}}</b></div>
			<div v-else>预计时间：<b>{{currentTask.disPlayExpectedTime}}</b></div>
		</el-col>
	</el-row>
    <el-tabs class="taskPersonList" v-model="activeName" >
	  <el-tab-pane label="任务人员" name="first">
        <el-row :gutter="0">
          <el-col class="currentRegion" :span="13">
            <div >当前区域全部人员：</div>
            <el-button
              @click="setCurrentPerson(person, true)"
              v-for="person in Array.from(workerList)"
              class="taskPersonBtn"
              :class="personStyle(person)"
              :key="person.staffId"
              icon="iconfont icon-user"
            >{{`${person.staffName}${person.workerName?'/'+person.workerName:''}`}}</el-button>
          </el-col>
		  <el-col :span="3">
			  <i class="iconfont icon-fenpei"></i>
		  </el-col>
          <el-col class="selectedStaff" :span="8">
            <div>任务已选人员：</div>
            <el-button
              @click="setCurrentPerson(person)"
              v-for="person in Array.from(taskWorkerList)"
              class="taskPersonBtn"
              :class="personStyle(person)"
              :key="person.staffId"
              icon="iconfont icon-user"
            >{{`${person.staffName}${person.workerName?'/'+person.workerName:''}`}}</el-button>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="任务详情" name="second">
		  <p v-for="(step, index) in guaranteeDataList" class="taskDetailList" :key="index">
		  <span class="span1">{{`${formatDate(step.operationTime,'DD HH:mm:ss','--')}`}}</span>
		  <span class="span2">{{step.operationName}}</span>
		  <span class="span3">{{step.staffName}}</span>
		  <span class="span4" v-if="step.overTime">{{formatOverTime(step.overTime)}} </span>
		  </p>
      </el-tab-pane>
    </el-tabs>
    <span slot="footer" class="dialog-footer">
      <el-button type="danger" v-if="this.currentTask.taskStatus != -1 && this.currentTask.taskStatus != 6 && this.currentTask.taskStatus != 8" @click="release(8)">不保障该航班</el-button>
	  <el-button type="success" @click="release(2)" v-if=" originTaskWorkerList.size != 0 && !isTaskWorkerListChange() && this.currentTask.taskStatus == 1">发布</el-button>
      <el-button type="primary"  v-if="this.currentTask.taskStatus != -1 && this.currentTask.taskStatus != 6 && this.currentTask.taskStatus != 8" @click="submit">提交
	  </el-button>
      <el-button @click="dialogTaskDetailVisible = false;">取 消</el-button>
    </span>
	</section>
  </el-dialog>
</template>
<script>
	import { ajax } from "ajax";
	import moment from "moment";
	import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
	import { getNaturalDate, formatDate, ms2Time } from "date";
	import { map } from "lodash";

	export default {
		name: "dialogTaskDetail",
		data() {
			return {
				activeName:'first',
				taskWorkerList: new Set(),
				originTaskWorkerList: new Set(),
				workerList: new Set(),
				guaranteeDataList: [],
				waiting:false,
			};
		},
		methods: {	
			formatOverTime(overTime){
				if(!overTime){
					return '';
				}	
				return `任务超时${ms2Time(overTime)}`; 
			},
			release: function(val) {
				this.waiting = true;
				ajax.post(
					"home.taskRelease",
					{
						flightTaskId: this.currentTask.taskId,
						taskState: val
					},
					data => {
						this.waiting = false;
						this.$message({
							type: data.responseCode == 1000 ? "success" : "error",
							message: data.responseMessage
						});
						this.dialogTaskDetailVisible = false;
					}
				);
			},
			formatDate: function(val, opt, empty) {
				return formatDate(val, opt, empty);
			},
			personStyle: function() {},
			submit: function() {
				let staffIds = map([...this.taskWorkerList], worker => {
					return worker.workerId || worker.staffId;
				});
				let param = {
					flightTaskId: this.currentTask.taskId,
					staffIds: staffIds.join('&'),
				};
				console.log(param);
				this.waiting = true;
				ajax.post("home.taskSubmit", param, data => {
					this.waiting = false;
					this.$message({
						type: data.responseCode == 1000 ? "success" : "error",
						message: data.responseMessage
					});
					this.dialogTaskDetailVisible = false;
				});
			},
			setCurrentPerson(person, isAdd) {
				if(this.currentTask.taskStatus == 6 || this.currentTask.taskStatus == 8 || this.currentTask.taskStatus == -1){
					return;
				}
				if (isAdd) {
					//this.workerList.delete(person);
					let flag = true;
					for(let item of this.taskWorkerList){
						if(item.staffId == person.staffId){
						flag = false;
						}
					}
					if(flag){
						this.taskWorkerList.add(person);
					}
				} else {
					//this.workerList.add(person);
					this.taskWorkerList.delete(person);
				}
				this.$forceUpdate();
			},
			getTaskDetail(val) {
				this.workerList.clear() 
				this.taskWorkerList.clear();
				this.guaranteeDataList= [];
				if(!val || !val.taskId){return;}
				this.waiting = true;
				ajax.post("home.taskDetail", { flightTaskId: val.taskId }).then(data => {
					this.workerList = new Set(data.workerList);
					this.taskWorkerList = new Set(data.taskWorkerList);
					this.originTaskWorkerList = new Set(data.taskWorkerList);
					this.guaranteeDataList= data.guaranteeDataList;
					this.flight = data.flight;
					this.waiting = false;
					console.log(data);
				});
			},
			isTaskWorkerListChange: function(){
				if(this.taskWorkerList.size != this.originTaskWorkerList.size){
					return true;
				}
				let diff = new Set([...this.originTaskWorkerList].filter(x => !this.taskWorkerList.has(x)));
				if(diff.size > 0){
					return true;
				}
				return false;
			},
		},
		computed: {
			title: function() {
				return `${this.currentTask.flightNo}`;
			},
			dialogTaskDetailVisible: {
				get() {
					return this.$store.state.home.dialogTaskDetailVisible;
				},
				set(val) {
					this.$store.commit("home/update", {
						dialogTaskDetailVisible: val
					});
				}
			},
			...mapState("home", ["currentTask"])
		},
		watch: {
			dialogTaskDetailVisible: function(n,o) {
				if(n){
					this.tab = 'person';
					this.taskWorkerList=new Set();
					this.workerList=new Set();
					this.guaranteeDataList=[];
					this.getTaskDetail(this.currentTask);
					this.activeName='first';
				}
			}
		},
		mounted() {
			this.getTaskDetail(this.currentTask);
		}
	};
</script>

