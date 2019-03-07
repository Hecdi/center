<template>
	<el-row :gutter="10" class="personList">
		<el-tabs v-model="currentTeamIndex" type="card">
			<el-tab-pane v-for="item in teamArry" :key="item.squadId" :name="item.squadId" >
				<el-button slot="label" icon="el-icon-success" round >{{item.squadName}}</el-button>
				<el-button  @click="setCurrentPerson(person)"
					v-for="person in item.organization" :class="personStyle(person)" :key="person.staffId"  icon="iconfont icon-user">
					{{person.staffName}}<span class="tip">{{getReason(person.nonArrivalReason)}}</span>
					{{`${person.nonArrivalReason == 5 ? person.workerName:''}`}} </el-button>
				<el-button class="addBtn" icon="el-icon-plus" @click="addPerson">增加人员</el-button>
			</el-tab-pane>
		</el-tabs>
	</el-row>
</template>
<script>
import { mapState, mapGetters } from 'vuex';
import { cloneDeep, get,each} from 'lodash';
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
			addPerson(row){
				this.$store.commit('rollCall/update',{dialogAddPersonVisible: true,currentRow:row});
			},
			setCurrentPerson(person){
					let currentPerson = cloneDeep(person);		
					this.$store.commit('rollCall/setCurrentPerson',{
					currentPerson:currentPerson,
					fixPerson:person,
				})
			},
		},
		computed:{
			teamArry(){
				let isAttendanceSquad = false;
				let tmp = [];
				each(this.team , (item)=>{
					if(item.isAttendanceSquad){
						tmp.push(item);
					}
				})
				if(tmp.length){
					return tmp;
				}else{
					return this.team;
				}
			},
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
<style lang="scss">
	.personList {
        $btnColor: darkgreen !important;
		$btnHoverCol : white !important;
	.addBtn {
			color: $btnColor;
			border-color: $btnColor;
			i{
				color: $btnColor;
			}
            &:hover{
				color: $btnHoverCol ;
				i {
					color: $btnHoverCol ;
				}
			}
		}
	}
</style>
