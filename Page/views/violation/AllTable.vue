<template>
  <div class="all-table">
    <el-table :data="cards" stripe style="width: 100%" :cell-class-name="violationTypeBg">
      <el-table-column label="序号" width="80" type="index" :index="indexMethod"/>
      <!-- <el-table-column prop="violationCodeName" label="违规类型" width="80" 	/> -->
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
      <el-table-column prop="violationCode" label="人员编号" width="130"/>
      <el-table-column prop="violationName" label="违规人员" width="180"/>
      <el-table-column prop="deptId" label="车辆编号" min-width="80"/>
      <el-table-column prop="violationName2" label="设备编号" min-width="80"/>
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
      <el-table-column prop="status" label="状态" :formatter="statusFormat" width="80"/>
      <el-table-column label="操作">
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
// import ajaxx from 'ajax';
import img from "../../assets/logo.png";
import ShowImg from "./ShowImg.vue";
import { ajax } from "ajax";
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
      // totalSize: 100,
      pageSize: 10,
      currentPage:1,
    };
  },
  computed: {
    ...mapState("violation", ["cards","totalSize","allCondition"])
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
    refreshData() {
      let param = {"pageNumber":this.currentPage,"pageSize":this.pageSize}
      param = Object.assign({}, param, this.allCondition);
      ajax.post("getViolationDataForLike",param).then(data => {
        let violation = data;
        console.log(violation);
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
  // beforeMount(){
  //     this.getData();
  // }
};
</script>
