<template>
  <div class="all-table">
    <el-table :data="cards" stripe style="width: 100%"
    :cell-class-name="violationTypeBg" 
    >
      <el-table-column label="序号" width="80" type="index" :index="indexMethod"/>
      <!-- <el-table-column prop="violationCodeName" label="违规类型" width="80" 	/> -->
      <el-table-column
      prop="violationCodeName"
      label="违规类型"
      width="80"
      
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          :type="violationTypeBg1(scope.row.violationCodeName)"
          disable-transitions>{{scope.row.violationCodeName}}</el-tag>
      </template>
    </el-table-column>
      <el-table-column prop="violationCode" label="人员编号" width="80"/>
      <el-table-column prop="violationName" label="违规人员" width="130"/>
      <el-table-column prop="violationName1" label="车辆编号" min-width="80"/>
      <el-table-column prop="violationName2" label="设备编号" min-width="80"/>
      <el-table-column prop="airLineName" label="所属单位" width="180"/>
      <el-table-column prop="violationDescription" label="违规描述" min-width="180" :show-overflow-tooltip="true"/>
      <el-table-column prop="img" label="图像记录" min-width="80">
         <template slot-scope="scope">
          <el-button :picture = "scope.row.picture" size="mini" type="primary" @click="openShowImg()">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="reportTime" :formatter="dateFormat" label="上报时间" width="180"/>
      <el-table-column prop="status" label="状态" :formatter="statusFormat" width="80"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="changeStatus(scope.row,3)">撤回</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="dialog">
            <ShowImg/>
        </div>
  </div>
  
</template>

<script>
import { mapState, mapMutations } from "vuex";
import moment from 'moment';
// import ajaxx from 'ajax';
import img from "../../assets/logo.png";
import ShowImg from './ShowImg.vue';




export default {
  components: {
    ShowImg,
  },
  data() {
    return {
      props: "statusValue",
      status: "22",
      img: img,
    };
  },
  computed: {
    ...mapState("violation", ["cards"])
  },
  methods: {
    ...mapMutations({changeStatus:"violation/changeStatus"}),
        handleChangeStatus(row,value){
            this.changeStatus(value);
            console.log(value);
        },
    indexMethod(index) {
      return index + 1;
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    dateFormat:function(row, column) {
        var date = row[column.property];
        if (date == undefined) {
            return "";
        }
        return moment(date).format("YYYY-MM-DD HH:mm");
    },
    filterTag(value, row) {
        return row.violationCodeName === value;
      },
    violationTypeBg({row,rowIndex,column,columnIndex}){
      // debugger;
      let value = row.violationCodeName;
      if(value && columnIndex == 2){
        switch(value){
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
    violationTypeBg1(value){
      if(value){
        switch(value){
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
    statusFormat(row,column){
        if(row.status == 1){
            return "通过";
        } else if(row.status == 2){
            return "不通过";
        } else {
            return "待审核";
        }
    },
    openShowImg() {
			    this.$store.dispatch(`violation/updateShowImg`, { showImgDialog: true });
		    },

  }
};
</script>
