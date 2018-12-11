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
              <!-- <img :src="api + scope.row.comImage" alt="" style="width: 36px;height:36px"> -->
               <span class="iconfont icon-user">{{scope.row.flightIndicator}}</span>
         </template>
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
        :formatter="airlineFormat"
        :show-overflow-tooltip="true"
        width="80">
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
            <i :class = "{'iconfont icon-feiji':scope.row.ata || scope.row.atd}"></i>
              {{scope.row.disPlayActuralTime?scope.row.disPlayActuralTime:scope.row.disPlayExpectedTime}}
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
        prop="vip"
        :formatter="deviateFormat"
        label="偏离">
        <template slot-scope="scope">
               <span class="iconfont icon-pianlishangbao1"></span>
         </template>
      </el-table-column>
    </el-table>
    </div>
  </template>

  <script>
  import { mapState } from 'vuex';
  import moment from 'moment';
  import {map} from 'lodash';
import ajaxx from 'ajax';
import DialogTaskDetail from './DialogTaskDetail.vue';
export default {
	name: 'TableList',
	computed: {
    ...mapState('home', ['homeTable']),
    // disActural:{
         
    //   get:function(value) {
    //   if(value.movement=="A"){
    //       let param={}
    //       param.ata = value.displayATAWithDate;
    //       param.eta = value.displayETAWithDate;
    //       param.arrive = this.ata !== '--'? this.ata : this.eta;
    //       param.actualIcon = this.arrive !=='--'? "iconfont icon-user" : '';
    //       return param;
    //   } else {
    //     return 
    //     this.atd = value.displayATDWithDate;
    //     this.etd = value.displayETDWithDate;
    //     // this.actualIcon = "iconfont icon-feiji";
    //     this.delivery = this.atd !== '--'? this.atd : this.etd;
    //     this.actualIcon = this.delivery !=='--'? "iconfont icon-feiji" : '';
    //   }
    // },
    //   set:function(value) {
    //   if(value.movement=="A"){
    //     return
    //      this.ata = value.displayATAWithDate;
    //      this.eta = value.displayETAWithDate;
    //      this.arrive = this.ata !== '--'? this.ata : this.eta;
    //       this.actualIcon = this.arrive !=='--'? "iconfont icon-user" : '';
    //   } else {
    //     return 
    //     this.atd = value.displayATDWithDate;
    //     this.etd = value.displayETDWithDate;
    //     // this.actualIcon = "iconfont icon-feiji";
    //     this.delivery = this.atd !== '--'? this.atd : this.etd;
    //     this.actualIcon = this.delivery !=='--'? "iconfont icon-feiji" : '';
    //   }
    // }
    // } 
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
    airlineFormat: function(row,column) {
      var airline = row[column.property];
			return map(airline, (r, i) => {
				let city = r;
				// let icon = classNames('icon-arrow text-blue px-1');
				let end = airline.length - 1;
				// let iconClassName;
				let iconClassName = i === end ? '' : '->';
        return `${city}${iconClassName}`;
        // (
				// 	<span key={i+1}>
				// 		{city}
				// 		<i className={iconClassName} />
				// 	</span>
				// );
			});
    },
    deviateFormat: function(row,column) {
      var value = row[column.property];
      if (value) {
        return "el-icon-success";
      } else {
        return "el-icon-error";
      }
    },
    disActural:function(value) {
      if(value.movement=="A"){
         this.ata = value.displayATAWithDate;
         this.eta = value.displayETAWithDate;
         this.arrive = this.ata !== '--'? this.ata : this.eta;
          this.actualIcon = this.arrive !=='--'? "iconfont icon-user" : '';
      } else {
        this.atd = value.displayATDWithDate;
        this.etd = value.displayETDWithDate;
        // this.actualIcon = "iconfont icon-feiji";
        this.delivery = this.atd !== '--'? this.atd : this.etd;
        this.actualIcon = this.delivery !=='--'? "iconfont icon-feiji" : '';
      }
    }
  },
  
};
  </script>
