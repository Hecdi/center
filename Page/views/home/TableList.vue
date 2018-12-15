<template>
    <div class="flight-table">
    <el-table
      :data="homeTable"
      style="width: 100%"
      stripe	
      max-height="850"
      >
      <el-table-column
        prop="index"
        label="序号"
        type = "index"
        width="50">
      </el-table-column>
      <el-table-column
        label="标志"
        width="50"
      >
        <template slot-scope="scope">
               <span>
                 <i :class="scope.row.displayDelay"></i>
                 <i :class="scope.row.displayAlternate"></i>
                 <i :class="scope.row.displayReturnFliht"></i>
                 </span>
         </template>
      </el-table-column>
      <el-table-column
        prop="areaName"
        label="区域"
        width="150">
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
        label="航线"
        :show-overflow-tooltip="true"
        width="180">
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
        prop="displayETD"
        label="计划"
        width="80">
        <template slot-scope="scope">
          <span class="ATDETD" >
           <!-- <i :class = "{'iconfont icon-feiji':scope.row.ata || scope.row.atd}"></i> -->
           {{scope.row.disPlayActuralTime?scope.row.disPlayActuralTime:scope.row.disPlayExpectedTime}}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="displayATAWithDate"
        label="实际"
        width="180">
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
        width="80">
      </el-table-column>
      <el-table-column
        prop="displayTaskStatus"
        label="任务状态"
        width="80">
      </el-table-column>
      <el-table-column
        prop="displayHaveDeviating"
        label="偏离">
        <template  slot-scope="scope">
               <span :class="scope.row.displayHaveDeviating"></span>
         </template>
      </el-table-column>
    </el-table>
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
        // pageSize: 10,
        // currentPage:1,
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
      console.log(val);
      this.pageSize = val;
      // pub("Worker", "Home.Table.SetTablePageSize", {pageSize:this.pageSize, currentPage:this.currentPage});
      pub("Worker", "Home.Task.SetTaskFilter", this.filterOption);

     // sub("UI", "Home.Table.Sync", data => {
      //   // this.getHomeTableData(data);
      //   this.homeTable = data;
			// });
    },
    handleCurrentChange(val){
      console.log(`当前${val}`)
      this.currentPage = val;
      // pub("Worker", "Home.Table.SetTablePageSize", {pageSize:this.pageSize, currentPage:this.currentPage});
      pub("Worker", "Home.Task.SetTaskFilter", this.filterOption);


      //  sub("Worker","Home.TablePageNation", data => {
      //   this.getHomeTableData(data);
      // });
    },
  },
  
};
  </script>
