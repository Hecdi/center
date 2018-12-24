<template>
	<el-dialog class="dialogPersonDetail" center :title=currentPerson.staffName
:visible.sync="dialogPersonDetailVisible" width="1000px" >
		<el-row :gutter="10" class="row">
			<el-checkbox v-model="groupLeader"  :true-label=1 :false-label=-1 >设为小组长</el-checkbox>
		</el-row>
		<el-row :gutter="10" class="row">
			<el-radio-group v-model="nonArrivalReason">
				<el-radio :label="1">病假</el-radio>
				<el-radio :label="2">事假</el-radio>
				<el-radio :label="3">缺席</el-radio>
				<el-radio :label="4">下班</el-radio>
				<el-radio :label="5">代班</el-radio>
				<el-radio label="">正常上班</el-radio>
			</el-radio-group>
		</el-row>
		<el-row v-if="nonArrivalReason == 5">
			<span>代班人员：</span><span style="color:#2F61D5;font-size:12px;">{{currentWorkerName}}</span>
		</el-row>
		<div class="line"></div>
		<PersonSelect :team="team"  @selected="getChecked" :currentTeamId="activeTeamId"
		:hiddenWorkerId="currentPerson?currentPerson.staffId:''" :hiddenTeamId="currentTeam" v-if="nonArrivalReason == 5"/>
		<el-row v-if="nonArrivalReason == 1 || nonArrivalReason==2">
			<span>开始时间：</span>
			<el-date-picker
				v-model="leaveTime"
				type="datetimerange"
				range-separator="至"
				value-format="timestamp"
				:default-time="['08:00:00', '18:00:00']"
				start-placeholder="开始日期"
				end-placeholder="结束日期">
			</el-date-picker>
		</el-row>
		<span slot="footer" class="dialog-footer">
			<el-button type="primary" @click="submit" >确定</el-button>
			<el-button @click="dialogPersonDetailVisible = false;">取 消</el-button>
		</span>
	</el-dialog>
</template>
<script>
import { mapState } from 'vuex';
import PersonSelect from 'PersonSelect.vue';
import moment from 'moment';
import {pick, extend, identity, filter} from 'lodash';

export default {
	name: 'dialogPersonDetail',
	data (){
		return {
			currentWorkerName: '',
			newCurrentPerson: this.currentPerson,
		}
	},
	methods: {
		submit(){
			if((this.nonArrivalReason == 1 || this.nonArrivalReason ==2)
			&& (!this.currentPerson.leaveEndTime || !this.currentPerson.leaveStartTime)){
				this.$store.dispatch('rollCall/updateObj',{currentPerson:{
					leaveEndTime:this.leaveTime[1],
					leaveStartTime:this.leaveTime[0],
				}});
			}
			this.$store.commit('rollCall/setPerson');
		},
		getChecked({staffId,staffName,workerName,workerId}){
			this.$store.dispatch(`rollCall/updateObj`,{currentPerson:{
				workerName:staffName,
				workerId:staffId,
			}});
		},
		checked(flag){
			console.log(flag);
		},
		handleClose(done) {
			this.$confirm('确认关闭？')
				.then((_) => {
					done();
				})
				.catch((_) => {});
		},
	},
	computed: {
		activeTeamId(){
			let tmp = filter(this.team , (item)=>{
				return !item.isAttendanceSquad; 
			});
			return tmp[0].squadId;
		},
		leaveTime:{
			get(){
				return [this.currentPerson.leaveStartTime?this.currentPerson.leaveStartTime:moment().valueOf(),this.currentPerson.leaveEndTime?this.currentPerson.leaveEndTime:moment().add(8,'h').valueOf()];
			},
			set(val){
				console.log(val);
				this.$store.dispatch('rollCall/updateObj',{currentPerson:{
					leaveEndTime:val[1],
					leaveStartTime:val[0],
				}});
			}
		},
		groupLeader:{
			get(){
				return this.currentPerson.groupLeader;
			},
			set(val){
				this.$store.dispatch('rollCall/updateObj',{currentPerson:{groupLeader:val}});
			}
		},
		nonArrivalReason: {
			get(){
				return this.currentPerson.nonArrivalReason;
			},
			set(val){
				let param = {
					nonArrivalReason:val,	
				}
				if(val !=1 && val != 2){
					param.leaveEndTime='';
					param.leaveStartTime = '';
				}
				if(val != 5){
					param.workerName='';
					param.workerId = '';
				}
				console.log(val);
				this.$store.dispatch('rollCall/updateObj',{currentPerson:param});
			}
			
		},
		dialogPersonDetailVisible: {
			get() {
				return this.$store.state.rollCall.dialogPersonDetailVisible;
			},
			set() {
				this.$store.dispatch(`rollCall/update`, { dialogPersonDetailVisible: false });
			},
		},
		...mapState('rollCall', ['currentPerson', 'team','currentTeam']),
	},
	components:{
		PersonSelect,	
	}
};
</script>
