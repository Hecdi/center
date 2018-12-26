<template>
  <div class="permission-table">
    <div class="violation-topbar">
      <el-row class="tooltip">
            <el-col :span="5">
                <el-button class="tab-btn all font-Orb active-tab">历史记录</el-button>
            </el-col>
            <el-col :span="19" class="topbar">
                <el-input
                    placeholder="请输入内容"
                    prefix-icon="el-icon-search"
                    v-model="inputSearch"
                    class="seach-input"
                    blur="handleSearch"
                ></el-input>
                <span class="demonstration">时间段</span>
                <el-date-picker
                    v-model="time"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    format="yyyy 年 MM 月 dd 日"
                    @change="handleSearch"
                    value-format="timestamp">
                </el-date-picker>
                <el-button @click="handleSearch" size="mini" type="primary">查询</el-button>
                <el-button size="mini">
                    <a>导出</a>
                </el-button>
            </el-col>
        </el-row>
    <el-table :data="filterCards" stripe style="width: 100%" :cell-class-name="violationTypeBg">
      <el-table-column label="序号" width="80" type="index" :index="indexMethod"/>
      <el-table-column
        prop="violationCodeName"
        label="违规类型"
        width="130"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="violationTypeBg1(scope.row.violationCodeName)"
            disable-transitions
          >{{scope.row.violationCodeName}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="people" label="违规人员" width="180"/>
      <el-table-column prop="car" label="车辆编号" min-width="80"/>
      <el-table-column prop="device" label="设备编号" min-width="80"/>
      <el-table-column prop="belongCompanyName" label="所属单位" width="180"/>
      <el-table-column
        prop="violationDescription"
        label="违规描述"
        min-width="180"
        :show-overflow-tooltip="true"
      />
      <el-table-column label="图像记录" min-width="80">
        <template slot-scope="scope">
          <el-button
         
            size="mini"
            type="primary"
            @click="openShowImg(scope.row.picture)"
          >查看</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="reportTime" :formatter="dateFormat" label="上报时间" width="180"/>
      <el-table-column prop="status" label="状态" :formatter="statusFormat" width="80" v-if="test==1"/>
      <el-table-column v-else porp = "status" label="状态" :formatter="statusFormat" width="80"/>
      <!-- <el-table-column label="操作" v-if="test==1">
        <template slot-scope="scope">
          <el-button size="mini" @click="submitStatus(scope.row,3)">撤回</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <div class="dialog">
      <ShowImg :picture ="getPic"/>
    </div>
     <page-nation-his :currentPage="currentPage" :pageSize="pageSize" :total="perTotalSize" 
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"/>
  </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import moment from "moment";
// import ajaxx from 'ajax';
import img from "../../assets/logo.png";
import ShowImg from "./ShowImg.vue";
import { ajax } from "ajax";
import { map, extend } from 'lodash';
import PageNationHis from "./PageNationHis.vue";
// import PageNation from 'PageNation.vue';



export default {
  components: {
    ShowImg,
     PageNationHis,
  },
  data() {
    console.log(this.img);
    return {
      props: "statusValue",
      status: "22",
      img: img,
      picture: '',
      getPic: '',
      pageSize: 10,
      currentPage:1,
      test: 0,
      time: [],
      inputSearch:'',
    };
  },
  computed: {
    ...mapState("violation", ["perTotalSize","allCondition","filterCards"]),
    cardList: function() {
      return map(this.cards, list => {
        return extend({}, list, {
          people: this.formatData(list.violationCode==1,list.violationName),
          car : this.formatData(list.violationCode==2,list.violationName),
          device: this.formatData(list.violationCode==3,list.violationName)
          })
        });
      }
    },
  methods: {
    ...mapMutations({ changeStatus: "violation/changeStatus" }),
    handleChangeStatus(row, value) {
      this.changeStatus(value);
      console.log(value);
    },
    ...mapActions({
      getData: "getData"
    }),
    formatData(value,result) {
      if(value){
        return result;
      }else {
        return;
      }
    },
    indexMethod(index) {
      return index + 1;
    },
    handleSizeChange(val){
      console.log(val);
      this.pageSize = val;
      this.refreshData();
    },
    handleCurrentChange(val){
      console.log(`当前${val}`)
      this.currentPage = val;
      this.refreshData();
    },
    dateFormat: function(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD HH:mm");
    },
    filterTag(value, row) {
      return row.violationCodeName === value;
    },
    violationTypeBg({ row, rowIndex, column, columnIndex }) {
      // debugger;
      let value = row.violationCodeName;
      if (value && columnIndex == 2) {
        switch (value) {
          case "人员":
            return "vl-people";
          case "车辆":
            return "vl-car";
          case "设备":
            return "vl-tool";
          case "公司":
            return "vl-company";
        }
      }
    },
    violationTypeBg1(value) {
      if (value) {
        switch (value) {
          case "人员":
            return "vl-people";
          case "车辆":
            return "vl-car";
          case "设备":
            return "vl-tool";
          case "公司":
            return "vl-company";
        }
      }
    },
    statusFormat(row, column) {
      if (row.status == 1) {
        return "通过";
      } else if (row.status == 2) {
        return "不通过";
      } else {
        return "待审核";
      }
    },
    openShowImg(value) {
      this.getPic = value;
      console.log(this.getPic);
      this.$store.dispatch(`violation/updateShowImg`, { showImgDialog: true });
    },
    getData(data) {
      this.$store.dispatch("violation/getData", data);
      this.total = data.length;
    },
    submitStatus(param, value) {
      console.log(param);
      let id = param.id;
      let status = value;
      let subParam = `{"id":"${id}","status":${status}}`;
      let subParams = { id: id, status: status };
      console.log(subParam);
      console.log(subParams);
      ajax.post("updateState", subParams).then(data => {
        console.log(data);
        if (data) {
          this.refreshData();
        }
      });
    },
    handleSearch(){
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
            startDate = '';
            endDate = '';
        }
        let inputSearch = this.inputSearch;
        let param = `param:{"violationCode":${violationCode},"startDate":${startDate},"endDate":${endDate},"violationValue":"${inputSearch}"}`;
        let params = {"startTime":startDate,"endTime":endDate,"value":inputSearch,"pageNumber":1,"pageSize":10};
        console.log(param);
        console.log(params)
        let condition = {"startTime":startDate,"endTime":endDate,"value":inputSearch};
        // this.getAllCondition(condition);
        ajax.post('getViolationDataForLike', params).then((data) => {
            console.log(data);
            this.getData(data);
        });

    },
    refreshData() {
      let param = {"pageNumber":this.currentPage,"pageSize":this.pageSize}
    //   param = Object.assign({}, param, this.allCondition);
    //   ajax.post("getViolationDataForLike",param).then(data => {
    //     let violation = data;
    //     console.log(violation);
    //     this.getData(data);
    //   });
     let pageData = this.filterCards;
     
    },
    created() {
      this.refreshData();
    },
    getImg(value){
      this.picture = value;
    }
  },
};
</script>
