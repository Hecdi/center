<template>
  <div class="all-table">
    <el-table :data="cards" stripe style="width: 100%">
      <el-table-column label="序号" width="80" type="index" :index="indexMethod"/>
      <el-table-column prop="violationCodeName" label="违规类型" width="80"/>
      <el-table-column prop="violationCode" label="人员编号" width="80"/>
      <el-table-column prop="violationName" label="违规人员" width="130"/>
      <el-table-column prop="violationName1" label="车辆编号" width="80"/>
      <el-table-column prop="violationName2" label="设备编号" width="80"/>
      <el-table-column prop="airLineName" label="所属单位" width="180"/>
      <el-table-column prop="violationDescription" label="违规描述" width="180"/>
      <el-table-column prop="date" label="图像记录" width="180"/>
      <el-table-column prop="reportTime" :formatter="dateFormat" label="上报时间" width="180"/>
      <el-table-column prop="status" label="状态" :formatter="statusFormat" width="80"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">撤回</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from 'moment';


export default {
  data() {
    return {
      props: "statusValue",
      status: "22"
    };
  },
  computed: {
    ...mapState("violation", ["cards"])
  },
  methods: {
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
    statusFormat(row,column){
        if(row.status == 1){
            return "通过";
        } else if(row.status == 2){
            return "不通过";
        } else {
            return "待审核";
        }
    }

  }
};
</script>
