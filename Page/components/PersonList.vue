<template>
	<el-row :gutter="10" class="personList">
		<el-tabs v-model="currentTeamIndex" type="card">
			<el-tab-pane v-for="item in team" :key="item.squadId" :name="item.squadId" >
				<el-button slot="label" icon="el-icon-success" round >{{item.squadName}}</el-button>
				<el-button  @click="setCurrentPerson(person)"
					v-for="person in item.organization" :class="personStyle(person)" :key="person.staffId"  icon="iconfont icon-user">
					{{person.staffName}}<span class="tip">{{getReason(person.nonArrivalReason)}}</span>
					{{`${person.nonArrivalReason == 5 ? person.workerName:''}`}} </el-button>
			</el-tab-pane>
		</el-tabs>
	</el-row>
</template>
<script>
import { mapState, mapGetters } from 'vuex';
import { cloneDeep, get} from 'lodash';
	export default {
		name:'personList',
		data(){
			return {
				personStyle(person){
					let nonArrivalReason = get(person,'nonArrivalReason');
					return {
						leave: nonArrivalReason && nonArrivalReason != 5,
						instead : nonArrivalReason == 5,
					}
				},
			}
		},
		methods:{
			setCurrentPerson(person){
					let currentPerson = cloneDeep(person);		
					this.$store.commit('rollCall/setCurrentPerson',{
					currentPerson:currentPerson,
					fixPerson:person,
				})
			},
		},
		computed:{
			currentTeamIndex:{
				get(){
					return this.currentTeam;
				},
				set(val) {
					this.$store.dispatch('rollCall/update',{currentTeam: val});
				}
			},
			...mapState('rollCall',['team','currentTeam']),
			...mapGetters('rollCall',['getReason']),
		}
	} 
</script>
