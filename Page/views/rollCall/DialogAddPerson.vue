<template>
	<el-dialog class="dialogAddPerson" center :title="this.currentRow && this.currentRow.staffId ? '修改人员':'添加人员'"
	 :visible.sync="dialogAddPersonVisible" width="1000px" >
		<PersonSelect :team="sendTeam()"  @selected="getChecked" :currentTeamId="getCurrentTeam()"
		:checkedWorkerId="this.currentRow?this.currentRow.staffId : ''" />
		<span slot="footer" class="dialog-footer">
			<el-button type="primary" @click="submit" >确定</el-button>
			<el-button @click="dialogAddPersonVisible = false;">取 消</el-button>
		</span>
	</el-dialog>
</template>
<script>
import { mapState } from 'vuex';
import PersonSelect from 'PersonSelect.vue';
import {cloneDeep , filter, get} from 'lodash';

export default {
	name: 'dialogAddPerson',
	data (){
		return {
			currentStaffId: '',
			currentStaffName: '',
			currentWorkerName: '',
			currentWorkerId: '',
          	person:{},
			newCurrentPerson: this.currentPerson,
		}
	},
	methods: {
		sendTeam(){
			let tmp = cloneDeep(this.team);
			if(this.$isDep('Freight_transport')){
				tmp =  filter(tmp, (item)=>{
					return item.squadId != this.currentTeam;
				});
			}
			if(this.$isDep('jpyxzh')){
				tmp =  filter(tmp, (item)=>{
					return item.squadId == this.currentTeam;
				})
			}
			return tmp;
		},
		getCurrentTeam(){
			if(this.$isDep('Freight_transport')){
				console.log(get(this.sendTeam(), '[0].squadId'));
				return get(this.sendTeam(), '[0].squadId');
			}
			if(this.$isDep('jpyxzh')){
				return this.currentTeam;
			}
		},
		submit(){
			if(this.$isDep('jpyxzh')) {
				this.$store.commit('rollCall/updateObj', {
					currentRow: {
						staffId: this.currentStaffId,
						staffName: this.currentStaffName,
						workerId: this.currentWorkerId,
						workerName: this.currentWorkerName,
					}
				})
			}
			if(this.$isDep('Freight_transport')){
				this.$store.commit('rollCall/addPersonToTeam', {
					teamId: this.currentTeam,
					person: this.person,
				});
			}
			this.dialogAddPersonVisible = false;
		},
		getChecked({staffId,staffName,workerName,workerId, person}){
				this.currentStaffId = staffId;
				this.currentStaffName = staffName;
				this.currentWorkerId = workerId;
				this.currentWorkerName = workerName;
				this.person = person;
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

