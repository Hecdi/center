<template>
	<div class="rollCall" >
		<el-row :gutter=20 class="header">
			<el-col :span=12>
				<div class='stick'></div>工作人员点到分配
			</el-col>
			<el-col :span=12 class='option'>
			 <el-button type="success" style="background-color:#25b346;" @click="onSubmit" size="mini">提交</el-button>
			 <el-button style="background-color:#c33030;" type="danger" @click="onClickReset" size="mini">重新点到</el-button>				
			</el-col>
		</el-row>
		<div class="content">
			<PersonList />
		</div>
		
		<div class="content" style="margin-top:20px;">
			<ModuleList />
		</div>
		<DialogPersonDetail />
		<DialogAddPerson />
	</div>
</template>
<script>
	import {ajax} from "ajax";
	import { mapGetters} from 'vuex';
	import DialogPersonDetail from "./DialogPersonDetail.vue";
	import DialogAddPerson from "./DialogAddPerson.vue";
	import PersonList from "PersonList.vue";
	import ModuleList from "./ModuleList.vue";
	import Promise from 'bluebird';
	export default {
		name: 'RollCall',
		data(){
			return {
				card:'',
			}
		},
		methods:{
			onClickReset(){
				this.$confirm('是否是要重新点到?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.init(true).then(()=>{
						this.$message({
							type: 'success',
							message: '已重置!'
						});
						this.$store.commit('rollCall/update',{dialogPersonDetailVisible:false});
					}).catch(()=>{
						this.$message({
							type: 'error',
							message: '重置失败!'
						});
					});
				}).catch(() => {
					this.$message({
						type: 'error',
						message: '取消重置!'
					});
				});
			},
			onSubmit(){
				let param = this.getCommitData();
				console.log(param);
				ajax.post('rollCall.save',param,(data) =>{
					if(data.responseCode == 1000){
						this.$message({
							type: 'success',
							message: data.responseMessage,
						});
					}else{
						this.$message({
							type: 'error',
							message: data.responseMessage,
						});
					}
				});	
			},
			init(reset){
				return Promise.map([
					()=>{
						return ajax.post('rollCall.getPersons',{deptId:'jpyxzh',isAgainAttendance:reset}).then(data =>{
							this.$store.commit('rollCall/updateInit', {team:data});
								console.log(data);	
							return Promise.resolve();
						});	
					},
					()=>{
						return ajax.post('rollCall.getModule',{deptId:'jpyxzh',isAgainAttendance:reset}).then(data =>{
							this.$store.commit('rollCall/updateInit', {module:data});
							console.log(data);	
							return Promise.resolve();
						});	
					}
				],f=>f()).then(()=>{
					return Promise.resolve();
				}).catch(()=>{
					return Promise.reject(new Error('数据获取失败'));
				});
			}
		},
		computed:{
			...mapGetters('rollCall',['getCommitData']),
		},
		beforeMount(){
			this.init(false);
		},
		components:{
			DialogPersonDetail,
			PersonList,
			ModuleList,
			DialogAddPerson,
		},
	};
</script>

