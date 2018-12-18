<template>
	<el-dialog class="dialogAddPerson" center title="增加人员"
	 :visible.sync="dialogAddPersonVisible" width="1000px" >
		<PersonSelect :team="team"  @selected="getChecked" :currentTeamId="currentTeam?currentTeam:team[0].squadId" />
		<span slot="footer" class="dialog-footer">
			<el-button type="primary" @click="submit" >提交</el-button>
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
			currentWorkerName: '',
			currentWorkerId: '',
			newCurrentPerson: this.currentPerson,
		}
	},
	methods: {
		submit(){
			this.$store.commit('rollCall/updateObj',{currentRow:{
				staffId:this.currentWorkerId,
				staffName:this.currentWorkerName,
			}})
			this.dialogAddPersonVisible = false;
		},
		getChecked({workerName,workerId}){
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
		...mapState('rollCall', ['currentPerson', 'team','currentTeam']),
	},
	components:{
		PersonSelect,	
	}
};
</script>

