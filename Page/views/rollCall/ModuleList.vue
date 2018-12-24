<template>
	<el-row :gutter="10" class="moduleList">
		<label class='remark'>{{checkedRemark}}</label>
		<el-tabs v-model="currentModuleId" type="card">
			<el-tab-pane v-for="item in module" :key="item.templateId" :name="item.templateId" >
				<el-button slot="label" icon="el-icon-success" round >{{item.templateName}}</el-button>
				<el-row :gutter="0" class='module-head'>
					<el-col class='blue center' :span="2">分配人员</el-col>
					<el-col class="ruler" :span="20">
						<el-row :gutter="0">
							<el-col :span="1" v-for="(time,index) in times" :key="index">{{time}}<label>{{time}}</label></el-col>
						</el-row>
					</el-col>
					<el-col class='blue center' :span="2">工时(小时)</el-col>
				</el-row>
				<el-row :gutter="0" class="module-content" v-for="row in item.checkIns" :key="row.workUnit">
					<el-col class='cyan center' :span="2">
						<span class="iconfont icon-zengjia addPerson" v-if="!row.staffId" @click="addPerson(row)"> 添加人员</span>
						<span class="addPerson" v-if="row.staffId" @click="addPerson(row)">
							{{`${row.staffName}${row.workerName?'('+row.workerName+')':''}`}}</span>
					</el-col>
					<el-col :span="20">
						<el-row :gutter="0" class="wokerRow">
							<el-col class='workContent' :class="priorityClass(col.priority)" 
								:title="col.workContent"
								v-for="col in row.workContents" :span="calcWidth(col)" :key="col.orderNumber">
								{{col.workContent}}
							</el-col>
						</el-row>
					</el-col>
					<el-col class="cyan center" :span="2">{{`${row.workHours?row.workHours+'小时':' '}`}}</el-col>
				</el-row>
			</el-tab-pane>
		</el-tabs>
	</el-row>
</template>
<script>
import { mapState, mapGetters } from 'vuex';
import { cloneDeep, get,parseInt} from 'lodash';
	export default {
		name:'moduleList',

		data(){
			return {
				times:['09','10:00','11:00','12:00','13:00','14:00','15:00','16:00',
					'17:00','18:00','19:00','20:00','21:00','22:00','23:00','24:00',
					'01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00',],
			}
		},
		methods:{
			addPerson(row){
				this.$store.commit('rollCall/update',{dialogAddPersonVisible: true,currentRow:row});
			},
			priorityClass(priority){
				return priority == 1 ? 'p-blue': priority == 2? 'p-green':'p-grey';
			},
			calcWidth(col){
				let s = parseInt(col.startTime.substr(0,2));
				let e = parseInt(col.endTime.substr(0,2));
				return s>e? 24-s+e : e-s;
			},
		},
		computed:{
			currentModuleId:{
				get(){
					return this.$store.state.rollCall.currentModuleId;
				},
				set(val) {
					this.$store.commit('rollCall/setCurrentModule',val);
				}
			},
			...mapState('rollCall',['module','checkedRemark','dialogAddPersonVisible']),
		}
	} 
</script>

