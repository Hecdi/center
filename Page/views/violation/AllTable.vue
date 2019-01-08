<template>
<div class="all-table">
    <el-table :data="cardList" stripe style="width: 100%" height="82vh" cell-class-name="violationTypeBg">
      <el-table-column label="序号" width="80" type="index" :index="indexMethod" class-name="font-One" fixed/>
      <el-table-column prop="violationNoticeNum" label="编号" width="180"/>
    <el-table-column
        prop="violationCodeName"
        label="违规主体"
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
      <el-table-column prop="violationName" label="责任人/单位" width="130"/>
      <el-table-column prop="workOrgName" label="工作单位" width="130" show-overflow-tooltip/>
      <el-table-column prop="violationSourceName" label="违规来源" width="130"/>
      <el-table-column prop="violationAreaName" label="违规区域" width="130"/>
      <el-table-column prop="phone" label="电话号码" width="130"/>
      <el-table-column prop="positionName" label="职位" width="130"/>
      <el-table-column prop="violationRulesName" label="违规条例" min-width="130" show-overflow-tooltip/>
      <el-table-column prop="passNumber" label="隔离区通行证号" width="130"/>
      <el-table-column prop="driverLicenseNumber" label="驾驶证号" width="130"/>
      <el-table-column prop="seat" label="机位" width="130"/>
      <el-table-column prop="carNo" label="车牌号" width="130"/>
      <el-table-column prop="violationDescription" label="情况说明" min-width="130"  show-overflow-tooltip/>
      <el-table-column prop="deductionScore" label="扣分分值" width="80"/>
      <el-table-column label="照片" min-width="80">
        <template slot-scope="scope">
           <el-button
            v-if = "scope.row.pictures"
            size="mini"
            plain
            type="primary"
            @click="openShowImg(scope.row.pictures)"
          >查看</el-button>
         <el-button
            v-else
            size="mini"
            type="info"
            plain
          >查看</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="reportTime" :formatter="dateFormat" label="上报时间" width="180" fixed="right"/>
      <el-table-column porp = "status" label="状态" :formatter="statusFormat" width="80"/>
      <el-table-column label="打印">
        <template slot-scope="scope">
            <!-- <i class="iconfont icon-bianji" @click="openDialogEdit(scope.row)" style="color:#0064FF"></i> -->
        <el-button size="mini" @click="submitStatus(scope.row,300)">打印</el-button>
        </template>
      </el-table-column>
      <el-table-column label="审核" width="100" v-if="havePermission">
        <template slot-scope="scope">
            <el-button size="mini" @click="submitStatus(scope.row,3)">撤回</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="dialog">
      <ShowImg :picture ="getPic"/>
    </div>
     <page-nation-his :currentPage="currentPage" :pageSize="pageSize" :total="totalSize" 
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"/>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import moment from "moment";
import img from "../../assets/logo.png";
import ShowImg from "./ShowImg.vue";
import { ajax } from "ajax";
import { map, extend } from 'lodash';
import PageNationHis from "./PageNationHis.vue";



export default {
  components: {
    ShowImg,
     PageNationHis,
  },
  data() {
    return {
      props: "statusValue",
      status: "22",
      img: img,
      picture: '',
      getPic: '',
      pageSize: 10,
      currentPage:1,
      test: 0,
    };
  },
  computed: {
    ...mapState("violation", ["cards","totalSize","allCondition",'havePermission']),
    cardList: function() {
      return map(this.cards, list => {
        return extend({}, list, {
          aviolationDescription:this.formatNull(list.violationDescription),
          violationName: this.formatNull(list.violationName),
          violationNoticeNum: this.formatNull(list.violationNoticeNum),
          workOrgName:this.formatNull(list.workOrgName),
          passNumber:this.formatNull(list.passNumber),
          driverLicen:this.formatNull(list.driverLicen),
          carTypeName:this.formatNull(list.carTypeName),
          carNo: this.formatNull(list.carNo),
          deductionScore: this.formatNull(list.deductionScore),
          driverLicenseNumber: this.formatNull(list.driverLicenseNumber),
          })
        });
      }
    },
  methods: {
    ...mapMutations({ changeStatus: "violation/changeStatus" }),
     ...mapActions({ 
      getWaitData: "getWaitData",
    }),
    handleChangeStatus(row, value) {
      this.changeStatus(value);
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
    formatNull(value){
      if(value){
        return value;
      } else {
        return '--'
      }
    },
    indexMethod(index) {
      return index + 1;
    },
    handleSizeChange(val){
      this.pageSize = val;
      this.refreshData();
    },
    handleCurrentChange(val){
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
      this.$store.dispatch(`violation/updateShowImg`, { showImgDialog: true });
    },
    getData(data) {
      this.$store.dispatch("violation/getData", data);
      this.total = data.length;
    },
    submitStatus(param, value) {
      let id = param.id;
      let status = value;
      let subParams = { id: id, status: status };
      ajax.post("updateState", subParams).then(data => {
        if (data) {
          this.refreshData();
          this.initWaitData();
        }
      });
    },
    getWaitData(value) {
        this.$store.dispatch('violation/getWaitData',value);
    },
    initWaitData(){
        ajax.post("getViolationByState", {pageSize:10, pageNumber:1}).then((data)=>{
            if(data){
                this.getWaitData(data);
            }
        })
    },
    refreshData() {
      let param = {"pageNumber":this.currentPage,"pageSize":this.pageSize}
      param = Object.assign({}, param, this.allCondition);
      ajax.post("getViolationDataForLike",param).then(data => {
        let violation = data;
        this.getData(data);
      });
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
