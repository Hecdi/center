<template>
  <el-dialog class="dialogAddTask" title="自动交接任务" :visible.sync="dialogTaskHandover" width="540px">
    <el-row>
      <div class="taskhandover" v-if="haveData" >
        <div v-for="(t,index) in taskHandover" :key="index">
          <span class="flight-no">{{t.flightNo}}</span>
          <span class="flight-id">{{t.flightId}}</span>
          <span class="time">{{t.fromUserName}}</span>
          <span class="staff-name">{{t.toUserName}}</span>
        </div>
      </div>
      <div class="" v-else>
        暂无任务交接数据
      </div>
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
  name: "dialogTaskHandover",
  data() {
    return {
      haveData: false,
      taskHandover1: [
        {
          flightTaskId: "1",
          fromUserId: "12154545",
          toUserId: "吴系挂",
          fromUserName: 2,
          toUserName: "1436864169",
          flightNo: "0",
          flightId: "3333"
        },
        {
          flightTaskId: "1",
          fromUserId: "12154545",
          toUserId: "吴系挂",
          fromUserName: 2,
          toUserName: "1436864169",
          flightNo: "0",
          flightId: "3333"
        },
        {
          flightTaskId: "1",
          fromUserId: "12154545",
          toUserId: "吴系挂",
          fromUserName: 2,
          toUserName: "1436864169",
          flightNo: "0",
          flightId: "3333"
        },
        {
          flightTaskId: "1",
          fromUserId: "12154545",
          toUserId: "吴系挂",
          fromUserName: 2,
          toUserName: "1436864169",
          flightNo: "0",
          flightId: "3333"
        },
        {
          flightTaskId: "1",
          fromUserId: "12154545",
          toUserId: "吴系挂",
          fromUserName: 2,
          toUserName: "1436864169",
          flightNo: "0",
          flightId: "3333"
        },
        {
          flightTaskId: "1",
          fromUserId: "12154545",
          toUserId: "吴系挂",
          fromUserName: 2,
          toUserName: "1436864169",
          flightNo: "0",
          flightId: "3333"
        },
        {
          flightTaskId: "1",
          fromUserId: "12154545",
          toUserId: "吴系挂",
          fromUserName: 2,
          toUserName: "1436864169",
          flightNo: "0",
          flightId: "3333"
        }
      ]
    };
  },
  watch: {
    dialogTaskHandover: function(newDialogTaskHandover, oldDialogTaskHandover) {
      if (newDialogTaskHandover) {
        this.handlGettTaskHandover();
      } else {
        return;
      }
    }
  },
  methods: {
    getTaskHandover(data) {
      this.$store.dispatch("home/getTaskHandover", data);
    },
    dateFormat: function(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD HH:mm");
    },

    submitSuccess() {
      this.$message({
        showClose: true,
        message: "恭喜你，新增临时任务成功",
        type: "success",
        duration: 500
      });
    },
    submitError() {
      this.$message({
        showClose: true,
        message: "新增临时任务失败",
        type: "error"
      });
    },
    handlGettTaskHandover() {
      let _this = this;
	    let remoteParams = remote.getGlobal("deptCode");
      ajax.post("getAssociateReportList", { deptCode: `${remoteParams}` }).then(data => {
          // let result = data.length==0 ? "对不起，暂无数据" : data;
          let result = data;
          _this.haveData = data.length == 0 ? false : true;
          console.log(_this.haveData);
          this.getTaskHandover(result);
      });
    }
  },
  computed: {
    ...mapState('home', ['taskHandover']),
    dialogTaskHandover: {
      get() {
        return this.$store.state.home.dialogTaskHandover;
      },
      set() {
        this.$store.dispatch(`home/updateTaskHandover`, {
          dialogTaskHandover: false
        });
      }
    }
  },
  beforeMount(){
    this.handlGettTaskHandover();
  },
};
</script>
