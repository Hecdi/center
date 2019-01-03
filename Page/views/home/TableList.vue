<template>
    <div class="flight-table">
    <el-table
      :data="homeTable"
      style="width: 100%"
      stripe	
      height="70vh"
      @row-click="showDeatil"
      >
      <el-table-column
        prop="index"
        label="序号"
        type = "index"
        class-name="font-One"
        width="50">
      </el-table-column>
      <el-table-column
        label="标志"
        width="80"
      >
        <template slot-scope="scope">
               <span v-if="scope.row.disPlaceholder == 2">
                 <i :class="scope.row.displayDelay" style="color: #f00025; font-size: 12px;"></i>
                 <i :class="scope.row.displayAlternate" style="color:#0065ff; font-size: 12px;"></i>
                 <i :class="scope.row.displayReturnFliht" style="color: #009beb; font-size: 12px;"></i>
                 <i :class="scope.row.displayQuickFlag" style="color: #0065ff; font-size: 12px;"></i>
                 <i :class="scope.row.displayVip" style="color: #ff7100; font-size: 12px;"></i>
                 <i :class="scope.row.displayKeyMaintaince" style="color: #009a51; font-size: 12px;"></i>
                 <i :class="scope.row.displayAlarm" style="color: rgb(250, 0, 19); font-size: 16px;"></i>
              </span>
              <span v-else>
                --
              </span>
         </template>
      </el-table-column>
      <el-table-column
        prop="areaName"
        label="区域"
        width="100">
      </el-table-column>
      <el-table-column
        prop="seat"
        label="停机位"
        class-name="font-One"
        width="80">
      </el-table-column>
      <el-table-column
        prop="flightNo"
        label="航班号"
        class-name="font-One"
        width="100">
      </el-table-column>
      <el-table-column
        prop="flightStatus"
        label="航班状态"
        width="80">
      </el-table-column>
      <el-table-column
        prop="aircraftNumber"
        label="飞机号"
        class-name="font-One"
        width="100">
      </el-table-column>
      <el-table-column
        prop="aircraftType"
        label="机型"
        class-name="font-One"
        width="50">
      </el-table-column>
      <el-table-column
        prop="aircraftFlightType"
        label="机类"
        width="50">
      </el-table-column>
      <el-table-column
        label="航线"
        show-overflow-tooltip
        min-width="160">
        <template slot-scope="scope">
            <span v-for="(a,index) in scope.row.airRoute" :key="index">
              <span>{{a}}</span><i v-if ="index !== scope.row.airRoute.length-1" class="iconfont icon-hangxian"></i>
            </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="displayFlightIndicator"
        label="性质"
        width="50">
      </el-table-column>
      <el-table-column
        prop="displayScheduleTimeWithDate"
        label="计划"
        width="150">
      </el-table-column>
      <el-table-column
        prop="displayATAWithDate"
        label="实际"
        width="150">
        <template slot-scope="scope">
          <span class="ATDETD">
            <i v-if="scope.row.disPlayActuralTime!=='--'" :class="{'iconfont icon-shiji2': scope.row.disPlayActuralTime&&scope.row.disPlayActuralTime!=='--'}"></i>
            <i v-else :class="{'iconfont icon-yuji2':scope.row.disPlayExpectedTime&&scope.row.disPlayExpectedTime!=='--'}"></i>
              {{scope.row.disPlayActuralTime!=='--'?scope.row.disPlayActuralTime:scope.row.disPlayExpectedTime}}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="taskBindingShiftNames"
        label="保障人员"
		    show-overflow-tooltip
        width="100">
      </el-table-column>
      <el-table-column
        prop="displayTaskStatus"
        label="任务状态"
        width="80">
      </el-table-column>
      <el-table-column
        prop="displayHaveDeviating"
        width="50"
        label="偏离">
        <template  slot-scope="scope">
               <span :class="scope.row.displayHaveDeviating"></span>
         </template>
      </el-table-column>
    </el-table>
    <DialogTaskDetail/>
    <PageNation :currentPage="currentPage" :pageSize="pageSize" :total="homeTableTotal" 
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"/>
    </div>
  </template>

  <script>
  import { mapState } from 'vuex';
  import moment from 'moment';
  import {map} from 'lodash';
import DialogTaskDetail from './DialogTaskDetail.vue';
import PageNation from 'PageNation.vue';
import { sub, removeSub, pub } from "postalControl";

export default {
  name: 'TableList',
  components: {
    PageNation,
    DialogTaskDetail,
  },
	computed: {
    ...mapState('home', ['homeTable','homeTableTotal','filterOption']),
    pageSize: {
				get() {
					return this.$store.state.home.filterOption.pageSize;
				},
				set(filterOption) {
					this.$store.dispatch(`home/updateFilter`, {
						name: "pageSize",
						filterOption: filterOption
					});
				}
      },
      currentPage: {
				get() {
					return this.$store.state.home.filterOption.currentPage;
				},
				set(filterOption) {
					this.$store.dispatch(`home/updateFilter`, {
						name: "currentPage",
						filterOption: filterOption
					});
				}
			},
    },
    data(){
      return {
        actualIcon: '',
        actural: '',
        arrive: '',
        delivery: '',
      }

    },
	methods: {
		dateFormat:function(row, column) {
        var date = row[column.property];
        if (date == undefined) {
            return "";
        }
        let time = moment(date).format("HH:mm");
        let riqi = moment(date).format("DD"); 
        return `${time}(${riqi})`;
    },
    test(val){
      let ata = val.displayATAWithDate;
      let atd = val.displayATDWithDate;
      let eta = val.displayETAWithDate;
      let etd = val.displayETDWithDate;
      return ata != '--' ? ata:(atd != '--' ? atd :(eta != '--' ? eta:(etd !='--'?etd:'--')));

    },
    handleSizeChange(val){
      this.pageSize = val;
      pub("Worker", "Home.Task.SetTaskFilter", this.filterOption);
    },
    handleCurrentChange(val){
      this.currentPage = val;
      pub("Worker", "Home.Task.SetTaskFilter", this.filterOption);
    },
    showDeatil(task) {
      console.log(task);
      this.$store.commit("home/setCurrentTask", task);
    }
  },
  
};
  </script>
