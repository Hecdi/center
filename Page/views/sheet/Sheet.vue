<template>
  <div class="sheet-container">
    <el-container class="sheet">
      <el-row :gutter="0">
        <el-col :span="8">
          <span class="float-left bread-crumb">引导车报表</span>
        </el-col>
        <el-col :span="16" class="right-col">
          <span>时间段:</span>
          <el-date-picker
            v-model="time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="timestamp"
            @change="handleSearch"
          ></el-date-picker>
          <el-input
            placeholder="请输入查询内容"
            prefix-icon="el-icon-search"
            v-model="inputSearch"
            class="seach-input"
            @blur="handleSearch"
            @keyup.enter.native="handleSearch"
          />
          <el-button type="primary" size="small" class="export-excel">
            <a :href="exportExcel()">
              导出
            </a>
          </el-button>
        </el-col>
      </el-row>
    </el-container>
    <div class="sheet-table">
      <el-table :data="sheetList1" stripe style="width: 100%" height="80vh">
        <el-table-column type="index" label="序号" width="80"  class-name="font-One" fixed/>
        <el-table-column prop="arriveFlightNo" label="进港航班号" width="120" class-name="font-One"/>
        <el-table-column prop="departmentFlightNo" label="离港航班号" width="120" class-name="font-One"/>
        <el-table-column prop="aircraftNo" label="飞机号" width="120"/>
        <el-table-column prop="aircraftType" label="机型" width="60"/>
        <el-table-column prop="flightType" label="机类" width="60" class-name="font-One"/>
        <el-table-column prop="seat" label="机位" width="80"/>
        <el-table-column prop="routeName" label="航线" min-width="150">
          <template slot-scope="scope">
            <span v-for="(a,index) in scope.row.routeName.split(',')" :key="index">
              <span>{{a}}</span><i v-if ="index !== scope.row.routeName.split(',').length-1" class="iconfont icon-hangxian"></i>
            </span>
        </template>
      </el-table-column>
        <el-table-column prop="displayETA" label="预达" width="120"/>
        <el-table-column prop="displaySTA" label="计达" width="120"/>
        <el-table-column prop="displayATA" label="实达" width="120"/>
        <el-table-column prop="displatPreAtd" label="前起" width="120"/>
        <el-table-column prop="displayBoardingTime" label="登机" width="120"/>
        <el-table-column prop="displayCTOT" label="协关" width="120"/>
        <el-table-column prop="displaySTD" label="计飞" width="120"/>
        <el-table-column prop="displayATD" label="实飞" width="120"/>
        <el-table-column prop="Staff" label="保障人员" width="120"/>
        <el-table-column prop="Receive" label="领受" width="120"/>
        <el-table-column prop="Place" label="到位" width="120"/>
         <el-table-column prop="Start" label="开始" width="120"/>
        <el-table-column prop="Finish" label="完成" width="120" fixed="right"/>
      </el-table>
    </div>
    <PageNation
      :currentPage="currentPage"
      :pageSize="pageSize"
      :total="totalSize"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    />
  </div>
</template>

<script>
import { ajax } from "ajax";
import { extend, map } from "lodash";
import { formatDate } from "date";
import PageNation from "PageNation.vue";
import moment from "moment";
import { remote } from 'electron';

export default {
  name: "Sheet",
  components: {
    PageNation
  },
  data() {
    return {
      sheetList: [],
      time: [],
      inputSearch: "",
      exportUrl: "",
      pageSize: 10,
      currentPage: 1,
      totalSize: 10
    };
  },
  methods: {
    getListData(value) {
      this.sheetList = value.items;
      this.totalSize = value.totalNum;
    },
    getTotalNum(value) {
      this.totalSize = value.totalNum;
    },
    getSheetData() {
      let violationCode = this.area;
      let timeArr = this.time;
      let startDate;
      let endDate;
      if (timeArr && timeArr.length) {
        if (timeArr[0] == timeArr[1]) {
          startDate = moment(timeArr[0]).format("YYYY-MM-DD");
          endDate = moment(timeArr[1]+24*60*60*1000).format("YYYY-MM-DD");
          // endDate = `${endDate} 23:59:59`;
        } else {
          startDate = timeArr[0];
          startDate = moment(startDate).format("YYYY-MM-DD");
          endDate = timeArr[1];
          endDate = moment(endDate).format("YYYY-MM-DD");
        }
      } else {
        startDate = '';
        endDate = '';
      }
      let inputSearch = this.inputSearch;
      let param = `param:{"violationCode":${violationCode},"startDate":${startDate},"endDate":${endDate},"violationValue":"${inputSearch}"}`;
      let params = {
        startTime: startDate,
        endTime: endDate,
        value: inputSearch,
        pageSize: this.pageSize,
        pageNumber: this.currentPage
      };
      ajax.post("getDataList", params).then(data => {
        this.getListData(data);
      });
    },
    exportExcel() {
      let _this = this;
      let violationCode = this.area;
      let timeArr = this.time;
      let startDate;
      let endDate;
      let that = this;
      if (timeArr && timeArr.length) {
        if (timeArr[0] == timeArr[1]) {
          startDate = moment(timeArr[0]).format("YYYY-MM-DD");
          endDate = moment(timeArr[1]+24*60*60*1000).format("YYYY-MM-DD");
          // endDate = `${endDate} 23:59:59`;
        } else {
          startDate = timeArr[0];
          startDate = moment(startDate).format("YYYY-MM-DD");
          endDate = timeArr[1];
          endDate = moment(endDate).format("YYYY-MM-DD");
        }
      } else {
        startDate = '';
        endDate = '';
      }
      let inputSearch = this.inputSearch;
      let param = `param:{"violationCode":${violationCode},"startDate":${startDate},"endDate":${endDate},"violationValue":"${inputSearch}"}`;
      let params = {
        startDate: startDate,
        endDate: endDate,
        value: inputSearch,
        title: "tttt"
      };
      const ajaxAPI = remote.getGlobal('ajaxAPI');
      let path = `${ajaxAPI.path}/${ajaxAPI.url.sheetExportExcel}`;
      let title = "报表统计数据";
      let exportLocation = `http://173.101.1.52:80/statement/exportExcel?title=${title}&value=${inputSearch}&startTime=${startDate}&endTime=${endDate}`;
      let exportLocation1 = `${ajaxAPI.path}${ajaxAPI.url.sheetExportExcel}?title=${title}&value=${inputSearch}&startTime=${startDate}&endTime=${endDate}`;
     return exportLocation1;
    },
    handleSearch() {
      let violationCode = this.area;
      let timeArr = this.time;
      let startDate;
      let endDate;
      if (timeArr&&timeArr.length) {
        if (timeArr[0] == timeArr[1]) {
          startDate = moment(timeArr[0]).format("YYYY-MM-DD");
          endDate = moment(timeArr[1]+24*60*60*1000).format("YYYY-MM-DD");
          // endDate = `${endDate} 23:59:59`;
        } else {
          startDate = timeArr[0];
          startDate = moment(startDate).format("YYYY-MM-DD");
          endDate = timeArr[1];
          endDate = moment(endDate).format("YYYY-MM-DD");
        }
      } else {
        startDate = '';
        endDate = '';
      }
      let inputSearch = this.inputSearch;
      let param = `param:{"violationCode":${violationCode},"startDate":${startDate},"endDate":${endDate},"violationValue":"${inputSearch}"}`;
      let params = {
        "startTime": startDate,
        "endTime": endDate,
        "value": inputSearch,
        "pageSize": this.pageSize,
        "pageNumber": 1
      };
      ajax.post("getDataList", params).then(data => {
        this.getListData(data);
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getSheetData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getSheetData();
    },
    formatNull(value){
      if(value){
        return value;
      } else {
        return '--'
      }
    },
  },

  judgeMovement(value,result){
    if(value=="A"){
      return result;
    } else {
      return result;
    }
  },
  computed: {
    sheetList1: function() {
      return map(this.sheetList, list => {
        return extend({}, list, {
          displayETA: formatDate(list.eta, "HHmm(DD)", "--"),
          displaySTA: formatDate(list.sta, "HHmm(DD)", "--"),
          displaySTD: formatDate(list.std, "HHmm(DD)", "--"),
          displayETD: formatDate(list.etd, "HHmm(DD)", "--"),
          displayATA: formatDate(list.ata, "HHmm(DD)", "--"	),
          displayCTOT: formatDate(list.ctot, "HHmm(DD)", "--"),
          displatPreAtd: formatDate(list.preAtd, "HHmm(DD)", "--"),
          displayBoardingTime: formatDate(list.boardingTime, "HHmm(DD)", "--"),
          displayATD: formatDate(list.atd, "HHmm(DD)", "--"),
          Receive: list.movement=="A"?formatDate(list.arriveReceive,"HHmm(DD)", "--"):formatDate(list.departmentReceive,"HHmm(DD)", "--"),
          Finish: list.movement=="A"?formatDate(list.arriveFinish,"HHmm(DD)", "--"	):formatDate(list.departmentFinish,"HHmm(DD)", "--"),
          Place: list.movement=="A"?formatDate(list.arriveInPlace,"HHmm(DD)", "--"):formatDate(list.departmentInPlace,"HHmm(DD)", "--"),
          Start: list.movement=="A"?formatDate(list.arriveStart,"HHmm(DD)", "--"):formatDate(list.departmentStart,"HHmm(DD)", "--"),
          Staff: this.formatNull(list.movement=="A"?list.arriveGuaranteeStaff:list.departmentGuaranteeStaff),
          arriveFlightNo: this.formatNull(list.arriveFlightNo),
          departmentFlightNo: this.formatNull(list.departmentFlightNo),
          // FlightNo: this.formatNull(list.movement=="A"?list.arriveFlightNo:list.departmentFlightNo),
          displayMove: list.movement=="A"?  "到港": "离港",
          seat: this.formatNull(list.seat),
          routeName: this.formatNull(list.routeName),
          aircraftNo : this.formatNull(list.aircraftNo),
          aircraftType: this.formatNull(list.aircraftType),
          flightType: this.formatNull(list.flightType),
        });
      });
    }
  },

  beforeMount() {
    this.getSheetData();
  }
};
</script>
