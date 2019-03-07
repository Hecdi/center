<template>
	<el-row :gutter="10" class="personSelect">
		<el-tabs v-model="currentTeam" type="card">
			<el-tab-pane v-for="item in teamArry" :key="item.squadId" :label="item.squadName" :name="item.squadId">
				<el-button :class="{active:currentStaffId==person.staffId}" @click="setWorker(person.staffId,person.staffName,person.workerName,person.workerId)"
						 v-for="person in getPersons(item.organization)" :key="person.staffId"  icon="iconfont icon-user">
					{{`${person.staffName}${person.workerName?'('+person.workerName+')':''}`}}</el-button>
			</el-tab-pane>
		</el-tabs>
	</el-row>
</template>
<script>
import {mapState} from 'vuex';
import { cloneDeep , filter} from 'lodash';
	export default {
		name:'personSelect',
		props:['team','currentTeamId','checkedWorkerId','hiddenWorkerId','hiddenTeamId','showTeamId'],
		data(){
			return {
				currentTeam:this.currentTeamId,
				currentStaffId: this.checkedWorkerId,
				currentWorkerName:null,
			}
		},
		methods:{
			setWorker(id,name,wn,wd){
				this.currentStaffId= id;
				this.currentStaffName = name;
				this.currentWorkerId = wd;
				this.currentWorkerName = wn;
				this.$emit('selected',{
					staffId:this.currentStaffId,
					staffName:this.currentStaffName,
					workerName:this.currentWorkerName,
					workerId:this.currentWorkerId,
				});
			},
			getPersons(persons){
				let localTeam = cloneDeep(persons);
				if(this.hiddenWorkerId){
					localTeam =  filter(localTeam, (item)=>{
						return item.staffId != this.hiddenWorkerId;
					})
				}
				return localTeam;
			},
		},
		watch:{
			checkedWorkerId(){
				this.currentWorkerId = this.checkedWorkerId;
				this.currentTeam=this.currentTeamId;
			}
		},
		computed:{
			teamArry(){
				let tmp = cloneDeep(this.team);
				if(this.hiddenTeamId){
					tmp =  filter(tmp, (item)=>{
						return item.squadId != this.hiddenTeamId;
					})
				}
				if(this.showTeamId){
					tmp =  filter(tmp, (item)=>{
						return item.squadId == this.showTeamId;
					})
				}
				return tmp;
			},
			...mapState('rollCall',['currentPerson']),
		}
	} 
</script>

