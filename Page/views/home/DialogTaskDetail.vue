<template>
  <el-dialog
    class="dialogTaskDetail"
    :title="title"
    :visible.sync="dialogTaskDetailVisible"
    width="1000px"
  >
    <div class="taskInfo">
      <el-row :gutter="30">
        <el-col :span="8">航班号:{{currentTask.flightNo}}</el-col>
        <el-col :span="8">机号：{{`${currentTask.aircraftNumber}`}}</el-col>
        <el-col :span="8">机位/登机口:{{`${currentTask.seat}/${currentTask.gate}`}}</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="8">航线:{{currentTask.airRoute}}</el-col>
        <el-col :span="8">机型/机类：{{`${currentTask.aircraftType}/${currentTask.aircraftFlightType}`}}</el-col>
        <el-col :span="8">实际落地时间:{{currentTask.displayATAWithDate}}</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="8">关联航线:{{currentTask.correlationFlightNo}}</el-col>
        <el-col :span="8">计划离港时间:{{currentTask.displaySTDWithDate}}</el-col>
        <el-col :span="8">预计离港时间:{{currentTask.displayETDWithDate}}</el-col>
      </el-row>
    </div>
    <el-tabs type="card" class="taskPersonList">
      <el-tab-pane label="任务人员">
        <el-row :gutter="20">
          <el-col :span="14">
            <div>人员列表：</div>
            <el-button
              @click="setCurrentPerson(person, true)"
              v-for="person in Array.from(workerList)"
              class="taskPersonBtn"
              :class="personStyle(person)"
              :key="person.staffId"
              icon="iconfont icon-user"
            >{{`${person.staffName}${person.workerName?'/'+person.workerName:''}`}}</el-button>
          </el-col>
          <el-col :span="10">
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
      <el-tab-pane label="任务详情">
        <p v-for="(step, index) in guaranteeDataList" class="taskDetailList" :key="index">
          {{`${formatDate(step.operationTime,'DD HH:mm:ss','--')}`}}
          <span>{{step.operationName}}</span>
          {{step.staffName}}
        </p>
      </el-tab-pane>
    </el-tabs>
    <span slot="footer" class="dialog-footer">
      <el-button type="danger" @click="release(8)">不保障该航班</el-button>
      <el-button type="success" @click="release(2)">发布</el-button>
      <el-button type="primary" @click="submit">提交</el-button>
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
				taskWorkerList: new Set(),
				workerList: new Set(),
				guaranteeDataList: []
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
					this.workerList.delete(person);
					this.taskWorkerList.add(person);
				} else {
					this.workerList.add(person);
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
			currentTask: function(val) {
				this.getTaskDetail(val);
			}
		},
		mounted() {
			this.getTaskDetail(this.currentTask);
		}
	};
</script>

