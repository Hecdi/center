<template>
    <div class="flight-table">
    <el-table
      :data="homeTable"
      style="width: 100%"
     
      >
      <el-table-column
        prop="index"
        label="序号"
        type = "index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="flightIndicator"
        label="标志"
        width="50">
      </el-table-column>
      <el-table-column
        prop="movement"
        label="区域"
        width="50">
      </el-table-column>
      <el-table-column
        prop="seat"
        label="停机位"
        width="80">
      </el-table-column>
      <el-table-column
        prop="flightNo"
        label="航班号"
        width="80">
      </el-table-column>
      <el-table-column
        prop="flightStatus"
        label="航班状态"
        width="80">
      </el-table-column>
      <el-table-column
        prop="aircraftNumber"
        label="飞机号"
        width="80">
      </el-table-column>
      <el-table-column
        prop="aircraftFlightType"
        label="机型"
        width="50">
      </el-table-column>
      <el-table-column
        prop="aircraftType"
        label="机类"
        width="50">
      </el-table-column>
      <el-table-column
        prop="airRoute"
        label="航线"
        width="80">
      </el-table-column>
      <el-table-column
        prop="alternate"
        label="性质"
        width="50">
      </el-table-column>
      <el-table-column
        prop="etd"
        label="计划"
        width="80">
      </el-table-column>
      <el-table-column
        prop="ata"
        label="实际"
        width="80">
      </el-table-column>
      <el-table-column
        prop="taskServiceCode"
        label="保障人员"
        width="80">
      </el-table-column>
      <el-table-column
        prop="taskStatus"
        label="任务状态"
        width="80">
      </el-table-column>
      <el-table-column
        prop="vip"
        label="偏离">
      </el-table-column>
    </el-table>
    </div>
  </template>

  <script>
  import { mapState } from 'vuex';
import ajaxx from 'ajax';
import DialogTaskDetail from './DialogTaskDetail.vue';
export default {
	name: 'TableList',
	computed: mapState('home', ['homeTable']),
	methods: {
		showDeatil(task) {
			console.log(task);
			this.$store.commit('home/setCurrentTask', task);
		},
	},
};
    // export default {
    //   data() {
    //     return {
    //       tableData: [{
    //         date: '2016-05-02',
    //         name: '王小虎',
    //         address: '上海市普陀区金沙江路 1518 弄'
    //       }, {
    //         date: '2016-05-04',
    //         name: '王小虎',
    //         address: '上海市普陀区金沙江路 1517 弄'
    //       }, {
    //         date: '2016-05-01',
    //         name: '王小虎',
    //         address: '上海市普陀区金沙江路 1519 弄'
    //       }, {
    //         date: '2016-05-03',
    //         name: '王小虎',
    //         address: '上海市普陀区金沙江路 1516 弄'
    //       }]
    //     }
    //   }
    // }
  </script>