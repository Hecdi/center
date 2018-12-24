<template>
	<el-dialog class="dialogAddPerson" center :title="this.currentRow && this.currentRow.staffId ? '修改人员':'添加人员'"
	 :visible.sync="dialogAddPersonVisible" width="1000px" >
		<PersonSelect :team="team"  @selected="getChecked" :currentTeamId="currentTeam"
		:checkedWorkerId="this.currentRow?this.currentRow.staffId : ''" :showTeamId="currentTeam" />
		<span slot="footer" class="dialog-footer">
			<el-button type="primary" @click="submit" >确定</el-button>
			<el-button @click="dialogAddPersonVisible = false;">取 消</el-button>
		</span>
	</el-dialog>
</template>
<script>
import { mapState } from 'vuex';
import moment from 'moment';
import PersonSelect from 'PersonSelect.vue';
import {pick, extend, identity} from 'lodash';

export default {
	name: 'dialogAddPerson',
	data (){
		return {
			currentStaffId: '',
			currentStaffName: '',
			currentWorkerName: '',
			currentWorkerId: '',
			newCurrentPerson: this.currentPerson,
		}
	},
	methods: {
		submit(){
			this.$store.commit('rollCall/updateObj',{currentRow:{
				staffId:this.currentStaffId,
				staffName:this.currentStaffName,
				workerId:this.currentWorkerId,
				workerName:this.currentWorkerName,
			}})
			this.dialogAddPersonVisible = false;
		},
		getChecked({staffId,staffName,workerName,workerId}){
			this.currentStaffId = staffId;
			this.currentStaffName = staffName;
			this.currentWorkerId = workerId;
			this.currentWorkerName = workerName;
			console.log(workerName,workerId);
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
		dialogAddPersonVisible: {
			get() {
				return this.$store.state.rollCall.dialogAddPersonVisible;
			},
			set() {
				this.$store.dispatch(`rollCall/update`, { dialogAddPersonVisible: false });
			},
		},
		...mapState('rollCall', ['currentPerson', 'team','currentTeam','currentRow']),
	},
	components:{
		PersonSelect,
	}
};
</script>

