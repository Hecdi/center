<template>
	<el-row :gutter="10" class="personSelect">
		<el-tabs v-model="currentTeam" type="card">
			<el-tab-pane v-for="item in teamArry" :key="item.squadId" :label="item.squadName" :name="item.squadId">
				<el-button :class="{active:currentWorkerId==person.staffId}" @click="setWorker(person.staffId,person.staffName)" 
					v-for="person in getPersons(item.organization)" :key="person.staffId"  icon="iconfont icon-user"> {{person.staffName}}</el-button>
			</el-tab-pane>
		</el-tabs>
	</el-row>
</template>
<script>
import {mapState} from 'vuex';
import { cloneDeep , filter} from 'lodash';
	export default {
		name:'personSelect',
		props:['team','currentTeamId','checkedWorkerId'],
		data(){
			return {
				teamArry : this.team,
				currentTeam:this.currentTeamId,
				currentWorkerId: null,
				currentWorkerName:null,
			}
		},
		methods:{
			setWorker(id,name){
				this.currentWorkerId = id;
				this.currentWorkerName = name;
				this.$emit('selected',{
					workerName:this.currentWorkerName,
					workerId:this.currentWorkerId,
				});
			},
			getPersons(persons){
				let localTeam = cloneDeep(persons);
				localTeam =  filter(localTeam, (item)=>{
					return item.staffId != this.currentPerson.staffId;
				})
				return localTeam;
			},
		},
		computed:{
			...mapState('rollCall',['currentPerson']),
		}
	} 
</script>

