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
        inline-template>
        <span prop="flightIndicator">{{flightIndicator}}</span>
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
        prop="alternate"
        label="性质"
        width="50">
      </el-table-column>
      <el-table-column
        prop="displayETD"
        label="计划"
        width="80">
      </el-table-column>
      <el-table-column
        prop="displayATAWithDate"
        label="实际"
        width="80">
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
	computed: mapState('home', ['homeTable']),
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
    airlineFormat: function(row,column) {
      var airline = row[column.property];
			return map(airline, (r, i) => {
				let city = r;
				// let icon = classNames('icon-arrow text-blue px-1');
				let end = airline.length - 1;
				// let iconClassName;
				let iconClassName = i === end ? undefined : '->';
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
    }
	},
};
  </script>