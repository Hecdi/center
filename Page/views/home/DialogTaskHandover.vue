<template>
  <el-dialog
    class="dialogAddTask"
    title="自动交接任务"
    :visible.sync="dialogTaskHandover"
    width="540px"
  >
     <el-row>
         <div class="taskhandover">
         <div v-for = "t in taskHandover" :key ="t.flightTaskId">
             <span class="flight-no">{{t.flightTaskId}}</span>
             <span class="flight-id">{{t.flightNo}}</span>
             <span class="time"> {{t.fromUserId}}</span>
             <span class="staff-name"> {{t.toUserId}}</span>
         </div>
         </div>
         <h1 @click = "handlGettTaskHandover">Hello 任务交接</h1>
     </el-row>
  </el-dialog>
</template>
<script>

import { ajax } from 'ajax';
import moment from 'moment';
import { mapState,mapActions, mapGetters, mapMutations } from 'vuex';
import { getNaturalDate }  from 'date';
import { remote } from 'electron';


export default {
  name: "dialogTaskHandover",
  data(){
    return {
      taskHandover: [
        {"flightTaskId": "1","fromUserId": "12154545","toUserId": "吴系挂", "fromUserName": 2 , "toUserName": "1436864169",
        "flightNo": "0", "flightId":"3333"},
         {"flightTaskId": "1","fromUserId": "12154545","toUserId": "吴系挂", "fromUserName": 2 , "toUserName": "1436864169",
        "flightNo": "0", "flightId":"3333"},
         {"flightTaskId": "1","fromUserId": "12154545","toUserId": "吴系挂", "fromUserName": 2 , "toUserName": "1436864169",
        "flightNo": "0", "flightId":"3333"},
         {"flightTaskId": "1","fromUserId": "12154545","toUserId": "吴系挂", "fromUserName": 2 , "toUserName": "1436864169",
        "flightNo": "0", "flightId":"3333"},
         {"flightTaskId": "1","fromUserId": "12154545","toUserId": "吴系挂", "fromUserName": 2 , "toUserName": "1436864169",
        "flightNo": "0", "flightId":"3333"},
         {"flightTaskId": "1","fromUserId": "12154545","toUserId": "吴系挂", "fromUserName": 2 , "toUserName": "1436864169",
        "flightNo": "0", "flightId":"3333"},
         {"flightTaskId": "1","fromUserId": "12154545","toUserId": "吴系挂", "fromUserName": 2 , "toUserName": "1436864169",
        "flightNo": "0", "flightId":"3333"},

      ]
    }
  },
  watch: {
      dialogTaskHandover: function(newDialogTaskHandover, oldDialogTaskHandover){
        if(newDialogTaskHandover) {
          this.handlGettTaskHandover();
        } else {
          return;
        }
          
      }
  },
  methods: {
    getTaskHandover(data){
        this.$store.dispatch('home/getTaskHandover',data);
    },
	dateFormat:function(row, column) {
        var date = row[column.property];
        if (date == undefined) {
            return "";
		}
		return moment(date).format("YYYY-MM-DD HH:mm");
	},
	
	submitSuccess(){
		this.$message({
			showClose: true,
          message: '恭喜你，新增临时任务成功',
		  type: 'success',
		  duration: 500,
        });
	},
	submitError(){
		this.$message({
			showClose: true,
          	message: '新增临时任务失败',
          	type: 'error'
		})
	},
	handlGettTaskHandover(){
        console.log('lisrt');
        let remoteParams = remote.getGlobal("depId");
		ajax.post('getAssociateReportList',{"depId":`${remoteParams}`}).then(data => {
			let result = data.data;
			this.getTaskHandover(result);
		})
	},
  },
  computed: {
	...mapState('home', ['taskHandover']),
    dialogTaskHandover: {
      get() {
        return this.$store.state.home.dialogTaskHandover;
      },
      set() {
        this.$store.dispatch(`home/updateTaskHandover`, { dialogTaskHandover: false });
      }
    },
  },
  	// beforeMount(){
		// this.handlGettTaskHandover();
    // },
};
</script>
