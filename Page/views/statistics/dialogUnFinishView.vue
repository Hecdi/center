<template>
  <el-dialog class="dialogUnFinish" title="未完成任务" :visible.sync="dialogUnFinish" width="1000px"
  :append-to-body="true"
  :modal-append-to-body="false"
  >
    <el-row class="unfinish-table">
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
              type="index+1"
              label="序号"
              width="80"
              class-name="font-One"
              >
            </el-table-column>
            <el-table-column
              prop="status"
              label="状态"
              width="150">
            </el-table-column>
            <el-table-column
              prop="address"
              label="航班号"
              width="180"
              >
            </el-table-column>
            <el-table-column
              prop="address"
              label="机位"
              width="180"
              >
            </el-table-column>
            <el-table-column
              prop="address"
              label="机型"
              width="180"
              >
            </el-table-column>
            <el-table-column
              prop="address"
              label="任务名称"
              width="180"
              >
            </el-table-column>
            <el-table-column
              prop="address"
              label="计划时间"
              width="180"
              >
            </el-table-column>
            <el-table-column
              prop="address"
              label="保障人员"
              width="180"
              >
            </el-table-column>
        </el-table>
    </el-row>
  </el-dialog>
</template>
<script>
import { ajax } from "ajax";
import moment from "moment";
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import { getNaturalDate } from "date";
import { remote } from "electron";

export default {
  name: "dialogUnFinish",
  props:["dialogVisible","unfinishData"],
  data() {
    return {
      tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: ' 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市沙江路 1516 弄'
        }],
    };
  },
  computed: {
    dialogUnFinish: {
      get() {
        return this.$store.state.statistics.dialogUnFinish;
      },
      set() {
        this.$store.dispatch(`statistics/updateTaskHandover`, {
        dialogUnFinish: false
      });
      }
    }
  },
};



</script>





