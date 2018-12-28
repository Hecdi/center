<template>
  <el-dialog class="dialogUnFinish" title="未完成任务" :visible.sync="dialogUnFinish" width="1000px"
  :append-to-body="true"
  :modal-append-to-body="false"
  >
    <el-row class="unfinish-table">
        <el-table
            :data="unfinishList"
            border
            style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              width="80"
              class-name="font-One"
              >
            </el-table-column>
            <el-table-column
              prop="taskState"
              label="状态"
              width="150">
            </el-table-column>
            <el-table-column
              prop="flightNo"
              label="航班号"
              width="180"
              >
            </el-table-column>
            <el-table-column
              prop="routeName"
              label="航线"
              min-width="180"
              >
                <template slot-scope="scope">
                  <span v-for="(a,index) in scope.row.routeName.split(',')" :key="index">
                    <span>{{a}}</span><i v-if ="index !== scope.row.routeName.split(',').length-1" class="iconfont icon-hangxian"></i>
                  </span>
                </template>
            </el-table-column>
            <el-table-column
              prop="aircraftNo"
              label="飞机号"
              width="180"
              >
            </el-table-column>
            <el-table-column
              prop="seat"
              label="机位"
              width="180"
              >
            </el-table-column>
            <el-table-column
              prop="aircraftType"
              label="机型"
              width="180"
              >
            </el-table-column>
            <el-table-column
              prop="projectName"
              label="任务名称"
              width="180"
              >
            </el-table-column>
            <el-table-column
              prop="scheduleTime"
              label="计划时间"
              width="180"
              >
            </el-table-column>
            <el-table-column
              prop="guaranteeStaff"
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
// import { getNaturalDate } from "date";
import { map, extend } from 'lodash';
import { remote } from "electron";
import { formatDate } from "date";


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
  methods:{
    formatNull(value){
      if(value){
        return value;
      } else {
        return '--'
      }
    },
    formatState(value){
      if(value){
        switch (value) {
          case "R": 
            return "领受";
          case "A": 
            return "到位";
          case "S":
            return "开始";
        }
      } else {
        return '--';
      }
    }
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
    },
    unfinishList: function(){
      return map(this.unfinishData, item => {
          return extend({},item,{
            taskState: this.formatState(item.taskState),
            flightNo: this.formatNull(item.flightNo),
            scheduleTime: formatDate(item.scheduleTime,"HHmm(DD)", "--"),
            aircraftNo:this.formatNull(item.aircraftNo),
            aircraftType: this.formatNull(item.aircraftType),
            seat: this.formatNull(item.seat),
            projectName: this.formatNull(item.projectName),
            guaranteeStaff: this.formatNull(item.guaranteeStaff),
            // routeName:item.routeName.split(",")
          })
      })
    }
  },
};



</script>





