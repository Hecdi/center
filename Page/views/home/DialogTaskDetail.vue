<template>
  <el-dialog
    class="dialogTaskDetail"
    :title="title"
    :visible.sync="dialogTaskDetailVisible"
    width="600px"
  >
	<section class="row1">
		<section>
			<div class="city">{{currentTask.airRoute[0]}}</div>
			<div class="airport">机场名</div>
		</section>
			<i class="iconfont icon-hangxian"></i>
		<section>
			<div class="city">{{currentTask.airRoute[1]}}</div>
			<div class="airport">机场名</div>
		</section>
		<section class="column4">
			<div>机位/登机口：<b>{{`${currentTask.seat}/${currentTask.gate}`}}</b></div>
			<div>机号/机型/机类：<b>{{`${currentTask.aircraftNumber}/${currentTask.aircraftType}/${currentTask.aircraftFlightType}`}}</b></div>
		</section>
		<section class="column5">
			<div>计划时间：<b>{{currentTask.disPlayExpectedTime}}</b></div>
			<div>实际时间：<b>{{currentTask.disPlayActuralTime}}</b></div>
		</section>
	</section>
    <el-tabs class="taskPersonList" v-model="tab">
	  <el-tab-pane>
		<span slot="label">
		  <!--<el-button class="taskBtn1" type="primary">-->
			  <!--任务人员-->
		  <!--</el-button>-->
		  <el-tag>aaa</el-tag>
		</span>
        <el-row :gutter="0">
          <el-col class="currentRegion" :span="14">
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
          <el-col class="selectedStaff" :span="7">
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
      <el-tab-pane >
		<span slot="label">
		  <el-button type="primary">
			  任务详情
		  </el-button>
		</span>
        <p v-for="(step, index) in guaranteeDataList" class="taskDetailList" :key="index">
          {{`${formatDate(step.operationTime,'DD HH:mm:ss','--')}`}}
          <span>{{step.operationName}}</span>
          {{step.staffName}}
        </p>
      </el-tab-pane>
    </el-tabs>
    <span slot="footer" class="dialog-footer">
      <el-button type="danger" v-if="this.currentTask.taskStatus != -1 && this.currentTask.taskStatus != 6 && this.currentTask.taskStatus != 8" @click="release(8)">不保障该航班</el-button>
	  <el-button type="success" @click="release(2)" v-if=" taskWorkerList.size>0 && this.currentTask.taskStatus == 1">发布</el-button>
      <el-button type="primary"  v-if="this.currentTask.taskStatus != -1 && this.currentTask.taskStatus != 6 && this.currentTask.taskStatus != 8" @click="submit">提交</el-button>
      <el-button @click="dialogTaskDetailVisible = false;">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script>
	import { ajax } from "ajax";
	import moment from "moment";
	import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
	import { getNaturalDate, formatDate } from "date";
	import { map } from "lodash";

	export default {
		name: "dialogTaskDetail",
		data() {
			return {
				tab:'person',
				taskWorkerList: new Set(),
				workerList: new Set(),
				guaranteeDataList: [],
			};
		},
		methods: {	

			release: function(val) {
				ajax.post(
					"home.taskRelease",
					{
						flightTaskId: this.currentTask.taskId,
						taskState: val
					},
					data => {
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
					return worker.worerkId || worker.staffId;
				});
				let param = {
					flightTaskId: this.currentTask.taskId,
					staffIds: staffIds.join('&'),
				};
				console.log(param);
				ajax.post("home.taskSubmit", param, data => {
					this.$message({
						type: data.responseCode == 1000 ? "success" : "error",
						message: data.responseMessage
					});
					this.dialogTaskDetailVisible = false;
				});
			},
			setCurrentPerson(person, isAdd) {
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
				ajax.post("home.taskDetail", { flightTaskId: val.taskId }).then(data => {
					this.workerList = new Set(data.workerList);
					this.taskWorkerList = new Set(data.taskWorkerList);
					this.guaranteeDataList= data.guaranteeDataList;
					this.flight = data.flight;
					console.log(data);


					/*this.guaranteeDataList = [
		  {
			operationTime: 1544174180000,
			staffName: "system_01",
			operationName: "开始"
		  },
		  {
			operationTime: 1544174229000,
			staffName: "system_01",
			operationName: "结束"
		  },
		  {
			operationTime: 1544098325000,
			staffName: "system_01",
			operationName: "领受"
		  },
		  {
			operationTime: 1544102026878,
			staffName: "system_01",
			operationName: "到位"
		  }
		];
		this.taskWorkerList = new Set([
		  {
			staffId: "23",
			staffName: "离散",
			jobFlag: "航前",
			workerId: 102,
			workerName: "李大刀",
			taskNumber: 0
		  },
		  {
			staffId: "22",
			staffName: "离散",
			jobFlag: "航后",
			workerId: 103,
			workerName: "王晓四",
			taskNumber: 2
		  },
		  {
			staffId: "21",
			staffName: "离散",
			jobFlag: "航后",
			workerId: 103,
			workerName: "王晓四",
			taskNumber: 2
		  },
		  {
			staffId: "20",
			staffName: "离散",
			jobFlag: "航后",
			workerId: 103,
			workerName: "王晓四",
			taskNumber: 2
		  },
		  {
			staffId: "19",
			staffName: "离散",
			jobFlag: "航后",
			workerId: 103,
			workerName: "王晓四",
			taskNumber: 2
		  },
		  {
			staffId: "18",
			staffName: "离散",
			jobFlag: "航后",
			workerId: 103,
			workerName: "王晓四",
			taskNumber: 2
		  },
		  {
			staffId: "17",
			staffName: "离散",
			jobFlag: "航后",
			workerId: 103,
			workerName: "王晓四",
			taskNumber: 2
		  }
		]);
		this.workerList = new Set([
		  {
			staffId: "24",
			staffName: "离散",
			jobFlag: "航前",
			workerId: 102,
			workerName: "李大刀",
			taskNumber: 0
		  },
		  {
			staffId: "25",
			staffName: "离散",
			jobFlag: "航后",
			workerId: 103,
			workerName: "王晓四",
			taskNumber: 2
		  }
		]);*/
				});
			}
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
				}
			}
		},
		mounted() {
			this.getTaskDetail(this.currentTask);
		}
	};
</script>

