<template>
  <el-dialog
    class="dialogAddTask"
    title="添加临时任务"
    :visible.sync="dialogAddTaskVisible"
    width="1000px"
  >
    <el-row :gutter="10" class="personList">
      <el-col :span="2" v-for="worker in tempWorkerList" :key="worker.staffId+1" class="person-panel">
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
		  	<el-radio-group v-model="tempTaskType" v-for="g in tempGuaranteeList" v-bind:key="g.projectCode" @click="handleTaskType(g)">
      			<el-radio-button  :label="g.projectCode">{{g.projectName}}</el-radio-button>
    		</el-radio-group>
	  </el-col>
      <el-col :span="6">
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
      <el-col :span="8">
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
		highlight-current-row
      :data="flights"
      height="250"
      style="width: 100%"
    >
    <el-table-column label="单选" width="65"  @click.native="checked">
        <template scope="scope">
            <el-radio :label="scope.$index+1" v-model="templateRadio" @change.native="getTemplateRow(scope.$index,scope.row)"></el-radio>
        </template>
    </el-table-column>
      <el-table-column prop="flightNo" label="航班号"/>
      <el-table-column prop="aircraftNumber" label="机尾号"/>
      <el-table-column prop="seat" label="机位"/>
      <el-table-column prop="aircraftType" label="机型"/>
      <el-table-column prop="estimatedArriveTime" :formatter="dateFormat" label="预计到达" min-width="160"/>
      <el-table-column prop="scheduleArriveTime" :formatter="dateFormat" label="计划到达" min-width="160"/>
      <el-table-column prop="estimatedDepartureTime" :formatter="dateFormat" label="预计起飞" min-width="160"/>
      <el-table-column prop="scheduleDepartureTime" :formatter="dateFormat" label="计划起飞" min-width="160"/>
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitTempTask">提交</el-button>
      <el-button @click="dialogAddTaskVisible = false;">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script>

import ajaxx from 'ajax';
import moment from 'moment';
import { mapState,mapActions, mapGetters, mapMutations } from 'vuex';
import { getNaturalDate }  from 'date';

export default {
  name: "DialogAddTask",
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
    }
  },
  methods: {

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
	getFlightSearchData(data) {
        this.$store.dispatch('home/getFlightSearchData',data);
	},
	getTaskModelList(data){
		this.$store.dispatch('home/getTaskModelList',data);
	},
	getTemplateRow(index,row){                                 //获取选中数据
		this.templateRadio = row.flightId;
		console.log(this.templateRadio);
	},
	handleTaskType(value){
		this.tempTaskType = value.projectName;
		this.tempTaskTypeName = value.projectName;
		this.tempTaskTypeCode = value.projectCode;
	},
	dateFormat:function(row, column) {
        var date = row[column.property];
        if (date == undefined) {
            return "";
		}
		console.log(row);
		return moment(date).format("YYYY-MM-DD HH:mm");
	},
	
	// refreshData(){
  //       let ajax = ajaxx();
  //       ajax.post('tempTaskModelList').then(data=>{
	// 	let value = data.data;
	// 	console.log(value);
  //       // console.log(violation);
  //       // this.getData(data);
  //       })
	// },
	submitSuccess(){
		this.$message({
			showClose: true,
          message: '恭喜你，新增临时任务成功',
		  type: 'success',
		  duration: 500,
        //   dangerouslyUseHTMLString: true,
        //   message: '<strong>这是 <i>HTML</i> 片段</strong>'
        });
	},
	submitError(){
		this.$message({
			showClose: true,
          	message: '新增临时任务失败',
          	type: 'error'
		})
	},
	handleSearchFlight(){
		let ajax = ajaxx();
		let condition = this.searchFlight;
		let param = {"searchCondition":condition};
		console.log(param);
        ajax.post('getFlightForTemporaryTask',param).then(data=>{
		    let value = data.data;
		    this.getFlightSearchData(value);
        })
	},
	handlGettTaskModelList(){
		console.log('lisrt');
		let ajax = ajaxx();
		ajax.post('tempTaskModelList').then(data => {
			let result = data.data;
			this.getTaskModelList(result);
		})
	},
	submitTempTask(){
		// let param = "111";
		let ajax = ajaxx();
		let time = this.timeLimitValue;
		let workerId = this.curentWorker;
		let type;
		let typeName;
		let typeCode;
		if(this.temporaryTaskType){
			type = this.temporaryTaskType; 
		} else {
			type = this.tempTaskType;
			typeCode = this.tempTaskTypeCode;
			typeName = this.tempTaskTypeName;
		}

		let flightId = this.templateRadio;
		let params = {
			"taskTime": time,
			"staffIds": workerId,
			"projectName": type,
			"flightId": flightId,
			// "projectCode": 	'111',
		}
		console.log(params);
		ajax.post('taskSubmit',params).then(data => {
			let code = data.responseCode;
			if(code == 1000){
				// this.handlGettTaskModelList();
				console.log('sssss');
				this.submitSuccess();
			} else {
				this.dialogAddTaskVisible = false;
				this.submitError()
				// this.submitSuccess();
				return console.log('eeeeee');
			}
		})
	}
  },
  computed: {
	...mapState('home', ['flights','tempGuaranteeList','tempWorkerList']),
    dialogAddTaskVisible: {
      get() {
        return this.$store.state.home.dialogAddTaskVisible;
      },
      set() {
        this.$store.dispatch(`home/update`, { dialogAddTaskVisible: false });
      }
    },
    ...mapState("home", ["allPersons", "timeLimitOpts"])
  },
  	beforeMount(){
		this.handlGettTaskModelList();
    },
};
</script>
