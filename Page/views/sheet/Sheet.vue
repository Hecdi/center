<template>
  <div class="sheet-container">
    <!-- <ToolBar /> -->
    <el-container class="sheet">
      <el-row :gutter="0">
        <el-col :span="12">
          <span class="float-left bread-crumb">引导车报表</span>
        </el-col>
        <el-col :span="12" class="right-col">
          <span>时间段:</span>
          <!-- <el-date-picker v-model="value1" type="date" placeholder="开始日期"/>
          <span>-</span>
          <el-date-picker v-model="value2" type="date" placeholder="结束日期"/> -->
		  <el-date-picker
            v-model="time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="timestamp">
        </el-date-picker>
          <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="inputSearch"
            class="seach-input"
			blur = "handleSearch"
          />
          <el-button type size="small" class="export-excel" @click="exportExcel">导出excel
            <i class="el-icon-upload el-icon--right"/>
          </el-button>
        </el-col>
      </el-row>
    </el-container>
    <div class="sheet-table">
      <el-table :data="sheetList1" stripe style="width: 100%" height="100vh">
		<el-table-column type="index" label="序号" width="80"/>
        <el-table-column prop="aircraftType" label="机型" width="80"/>
        <el-table-column prop="flightType" label="机类" width="80"/>
        <el-table-column prop="routeName" label="航线" width="80"/>
        <el-table-column prop="displayETA" label="预达" width="120"/>
        <el-table-column prop="displaySTA" label="计达" width="120"/>
        <el-table-column prop="displayATA" label="实达" width="120"/>
        <el-table-column prop="displatPreAtd" label="前起" width="120"/>
        <el-table-column prop="displayBoardingTime" label="登机时间" width="120"/>
        <el-table-column prop="displayCTOT" label="协关" width="120"/>
        <el-table-column prop="displaySTD" label="计飞" width="120"/>
        <el-table-column prop="displayATD" label="实飞" width="120"/>
        <el-table-column prop="projectName" label="引导车" width="120"/>
        <el-table-column prop="departmentGuaranteeStaff" label="引导人员" width="120"/>
      </el-table>
    </div>
  </div>
</template>

<script>
import ToolBar from "./ToolBar.vue";
import TableDis from "./TableDis.vue";
import { ajax } from "ajax";
import { extend, map } from "lodash";
import { formatDate } from "date";
import moment from 'moment';

export default {
  name: "Sheet",
  components: {
    ToolBar,
    TableDis
  },
  data() {
    return {
	  sheetList: [],
	  time:[],
	  inputSearch: '',
    };
  },
  methods: {
	getListData(value){
		this.sheetList = value;
	},
    getSheetData() {
      // let vm = this;
      ajax.post("getDataList").then(data => {
		  this.getListData(data);
        // this.sheetList = data;
        // if(data.responseCode == 1000) {
        // 	// debugger;
        // 	this.sheetList = data;
        // } else {
        // 	console.log('请求失败');
        // }
      });
	},
	exportExcel(){
                let violationCode = this.area;
                let timeArr = this.time;
                let startDate;
                let endDate;
                let that = this;
                if(timeArr){
                    if(timeArr[0] == timeArr[1]){
                        startDate = moment(timeArr[0]).format("YYYY-MM-DD HH:mm:ss");
                        endDate = moment(timeArr[1]).format("YYYY-MM-DD");
                        endDate = `${endDate} 23:59:59`;
                    } else {
                        startDate = timeArr[0];
                        startDate = moment(startDate).format("YYYY-MM-DD HH:mm:ss");
                        endDate = timeArr[1];
                        endDate = moment(endDate).format("YYYY-MM-DD HH:mm:ss")
                    }  
                } else {
                    startDate = new Date(new Date(new Date().toLocaleDateString()).getTime());
                    startDate = moment(startDate).format("YYYY-MM-DD HH:mm:ss");
                    endDate = new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1);
                    endDate = moment(endDate).format("YYYY-MM-DD HH:mm:ss");
                }
                let inputSearch = this.inputSearch;
                let param = `param:{"violationCode":${violationCode},"startDate":${startDate},"endDate":${endDate},"violationValue":"${inputSearch}"}`;
                let params = {"startDate":startDate,"endDate":endDate,"value":inputSearch,"title":'tttt'};
                let exportLocation = `http://173.100.1.52:9099/violationRecord/exportExcel?title=11&value=${inputSearch}&startTime=${startDate}&endTime=${endDate}`;
                console.log(exportLocation);
                window.open(exportLocation);
                // return exportLocation;
                // that.exportLocation = exportLocation;
               // console.log(param);
                // console.log(params)
                // ajax.post('exportExcel', params).then((data) => {
                //     console.log(data);
                //     window.open(`http://173.100.1.52:9099/violationRecord/exportExcel?title=11&value=1`);
                //     // this.getData(data);
                // });
            },
            handleSearch(){
                // let ajax = ajaxx();
                let violationCode = this.area;
                let timeArr = this.time;
                let startDate;
                let endDate;
                if(timeArr){
                    if(timeArr[0] == timeArr[1]){
                        startDate = moment(timeArr[0]).format("YYYY-MM-DD HH:mm:ss");
                        endDate = moment(timeArr[1]).format("YYYY-MM-DD");
                        endDate = `${endDate} 23:59:59`;
                    } else {
                        startDate = timeArr[0];
                        startDate = moment(startDate).format("YYYY-MM-DD HH:mm:ss");
                        endDate = timeArr[1];
                        endDate = moment(endDate).format("YYYY-MM-DD HH:mm:ss")
                    }  
                } else {
                    startDate = new Date(new Date(new Date().toLocaleDateString()).getTime());
                    startDate = moment(startDate).format("YYYY-MM-DD HH:mm:ss");
                    endDate = new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1);
                    endDate = moment(endDate).format("YYYY-MM-DD HH:mm:ss");
                }
                let inputSearch = this.inputSearch;
                let param = `param:{"violationCode":${violationCode},"startDate":${startDate},"endDate":${endDate},"violationValue":"${inputSearch}"}`;
                let params = {"startTime":startDate,"endTime":endDate,"value":inputSearch};
                console.log(param);
                console.log(params)
                ajax.post('getDataList', params).then((data) => {
                    console.log(data);
                    this.getListData(data);
                });

            },
  },
  computed: {
    sheetList1: function() {
      return map(this.sheetList, list => {
        return extend({}, list, {
          displayETA: formatDate(list.eta, "HHmm(DD)", "--"),
          displaySTA: formatDate(list.sta, "HHmm(DD)", "--"),
          displaySTD: formatDate(list.std, "HHmm(DD)", "--"),
          displayETD: formatDate(list.etd, "HHmm(DD)", "--"),
          // displaySTD:formatDate(list.std,'HHmm(DD)','--'),
          displayCTOT: formatDate(list.ctot, "HHmm(DD)", "--"),
          displatPreAtd: formatDate(list.preAtd, "HHmm(DD)", "--"),
          displatBoardingTime: formatDate(list.boardingTime, "HHmm(DD)", "--")
        });
      });
    }
  },

  beforeMount() {
    this.getSheetData();
  }
};
</script>
