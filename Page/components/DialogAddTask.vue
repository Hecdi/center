<template>
  <el-dialog
    class="dialogAddTask"
    title="添加临时任务"
    :visible.sync="dialogAddTaskVisible"
    width="1000px"
  >
    <el-row :gutter="10" class="personList">
      <el-col  v-for="worker in tempWorkerList" :key="worker.staffId+1" class="person-panel">
        <div class="grid-content bg-person person" v-bind:class="{ 'active-person': activeName ==worker.staffId  }" @click="show(worker.staffId)" :data-id="worker.staffId">
          {{ worker.staffName + (worker.workerName ? '(' + worker.workerName + ')' : '') }}
          <div class="taskNum">{{ worker.taskNumber }}</div>
        </div>
      </el-col>
    </el-row>
    <div class="line"/>
    <el-row :gutter="0">
      <el-col class="addTaskType" :span="3">
        <i class="el-icon-tickets"/>
        <span style="line-height:32px;">临时任务类型</span>
      </el-col>
	  <el-col :span="12">
		  	<div class="task-group" v-for="g in tempGuaranteeList" v-bind:key="g.projectCode" >
      			<span class="task-type" v-bind:class="{ 'active-task': tempTaskTypeName == g.projectName  }" @click="handleTaskType(g)">{{g.projectName}}</span>
    		</div>
	  </el-col>
      <el-col :span="6" style="display:none;">
        <el-input
          size="small"
          style="width:180px;"
          placeholder="自定义临时任务类型"
          v-model="temporaryTaskType"
          clearable
        />
      </el-col>
    </el-row>
    <div class="line"/>
    <el-row :gutter="40">
      <el-col :span="10">
        <el-input
          size="small"
          style="width:400px;"
          placeholder="航班号或者机位号"
          v-model="searchFlight"
          suffix-icon="el-icon-search"
		  @keyup.native.enter = "handleSearchFlight"
		  @blur = "handleSearchFlight"
        />
		<!-- <button @click="handleSearchFlight">搜索</button> -->
      </el-col>
      <el-col :span="8" style="display:none">
        <span style="color:#939393">任务时限:</span>
        <el-select v-model="timeLimitValue" size="small" placeholder="请选择">
          <el-option
            v-for="item in timeLimitOpts"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
    </el-row>
    <el-table
		class="add-task-table"
		highlight-current-row
      :data="displayFlights"
      height="250"
      width= "100%"
	  @current-change="handleCurrentChange1">
		<!-- <el-table-column label="单选" width="65" >
			<template scope="scope">
				<el-radio v-model="templateRadio" :value="scope.row" ></el-radio>
			</template>
		</el-table-column> -->
      <el-table-column prop="flightNo" label="航班号"/>
      <el-table-column prop="aircraftNumber" label="机尾号"/>
      <el-table-column prop="seat" label="机位"/>
      <el-table-column prop="aircraftType" label="机型"/>
      <el-table-column prop="displayETA" label="预计到达" min-width="160"/>
      <el-table-column prop="displaySTA" label="计划到达" min-width="160"/>
      <el-table-column prop="displayETD" label="预计起飞" min-width="160"/>
      <el-table-column prop="displaySTA" label="计划起飞" min-width="160"/>
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitTempTask">提交</el-button>
      <el-button @click="dialogAddTaskVisible = false;">取 消</el-button>
    </span>
			<page-nation style="bottom:-20px;left:200px;position:relative;margin:10px;text-align:center;"
			:currentPage="currentPage" :pageSize="pageSize" :total="total"
			@handleCurrentChange = "handleCurrentChange"
			@handleSizeChange = "handleSizeChange"/>
  </el-dialog>
</template>
<script>

	import {ajax} from 'ajax';
	import moment from 'moment';
	import { mapState,mapActions, mapGetters, mapMutations } from 'vuex';
	import {formatDate }  from 'date';
	import {map, extend} from 'lodash';
	import PageNation from 'PageNation.vue';

	export default {
		name: "DialogAddTask",
		components: {
			PageNation,
		},
		data(){
			return {
				timeLimitValue: "",
				multipleSelection: [],
				input10: "",
				temporaryTaskType: "",
				searchFlight: "",
				tempTaskType: '',
				tempTaskTypeCode: '',
				tempTaskTypeName: '',
				templateRadio: '',
				curentWorker: '',
				activeName: '',
				flights:[],
				tempWorkerList:[],
				tempGuaranteeList:[],
				pageSize: 20,
				currentPage:1,
				total: 100,
			}
		},
		watch: {
			dialogAddTaskVisible: function(newDialogAddTaskVisible,oldDialogAddTaskVisible){
			
				if(newDialogAddTaskVisible){
					this.flights = [];
					this.tempWorkerList = [];
					this.tempGuaranteeList = [];
					this.currentWorker='';
					this.activeName='';
					this.searchFlight = '';
					this.tempTaskTypeName = '';
					this.handlGettTaskModelList();
				} 
			}
		},
		methods: {
			handleCurrentChange1(val){
				if(val){
					this.templateRadio = val.flightId;
				}
			},
			show(value) {
				this.curentWorker = value;
				console.log(this.curentWorker);
				this.activeName = value;
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
				console.log(this.multipleSelection);
			},
			handleRowClick(row) {
				this.$refs.multipleTable.toggleRowSelection(row);
			},
			getTemplateRow(index,row){                                 //获取选中数据
				this.templateRadio = row.flightId;
			},
			handleTaskType(value){
				this.tempTaskTypeName = value.projectName;
				this.tempTaskTypeCode = value.projectCode;
			},
			submitSuccess(message){
				this.$message({
					showClose: true,
					message: message,
					type: 'success',
					duration: 500,
				});
			},
			submitError(message){
				this.$message({
					showClose: true,
					message: message,
					type: 'error'
				})
			},
			handleSearchFlight(){
				let condition = this.searchFlight;
				let param = {"searchCondition":condition,"pageSize":this.pageSize,pageNumber:this.currentPage};
				ajax.post('getFlightForTemporaryTask',param).then(data=>{
					console.log(data);
					this.total = data.totalNum;
					this.flights = data.items;
				})
			},
			handlGettTaskModelList(){
				ajax.post('tempTaskModelList').then(data => {
					this.tempWorkerList = data.workerList;
					this.tempGuaranteeList= data.guaranteeList;
				})
			},
			submitTempTask(){
				let time = this.timeLimitValue;
				let workerId = this.curentWorker;
				let type;
				let typeName;
				let typeCode;
				if(this.temporaryTaskType){
					type = this.temporaryTaskType; 
				} else {
					typeCode = this.tempTaskTypeCode;
					typeName = this.tempTaskTypeName;
				}
				let code = `"projectName":${typeName},"projectCode":${typeCode}`;
				let flightId = this.templateRadio;
				let params = {
					// "taskTime": time,
					"staffIds": workerId,
					"flightId": flightId,
				};

				if (type){
					params.projectName = type;
				} else {
					params.projectName = typeName;
					params.projectCode = typeCode;
				}

				console.log(params);
				ajax.post('taskSubmit',params,data => {
					let code = data.responseCode;
					if(code == 1000){
						this.dialogAddTaskVisible = false;
						this.submitSuccess(data.responseMessage);
					} else {
						this.dialogAddTaskVisible = false;
						this.submitError(data.responseMessage)
					}
				})
			},
			handleSizeChange(val){
      	this.pageSize = val;
				this.handleSearchFlight();
    	},
    	handleCurrentChange(val){
      	this.currentPage = val;
				this.handleSearchFlight();
    	},
		},
		computed: {
			displayFlights:function(){
				return map(this.flights, flight=>{
					return extend({},flight,{
						displayETA:formatDate(flight.estimatedArriveTime,'HHmm(DD)','--'),
						displaySTA:formatDate(flight.scheduleArriveTime,'HHmm(DD)','--'),
						displayETD:formatDate(flight.estimatedDepartureTime,'HHmm(DD)','--'),
						displaySTD:formatDate(flight.scheduleDepartureTime,'HHmm(DD)','--'),
					});
				});
			},
			dialogAddTaskVisible: {
				get() {
					return this.$store.state.home.dialogAddTaskVisible;
				},
				set() {
					this.$store.dispatch(`home/update`, { dialogAddTaskVisible: false });
				}
			},
			...mapState('home', ['timeLimitOpts']),
		},
	};
</script>
