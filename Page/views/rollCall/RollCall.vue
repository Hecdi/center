<template>
	<div class="rollCall" >
		<el-row :gutter=20 class="header">
			<el-col :span=12>
				<div class='stick'></div>工作人员点到分配
			</el-col>
			<el-col :span=12 class='option'>
			 <el-button type="success" style="background-color:#25b346;" size="mini">提交</el-button> <el-button style="background-color:#c33030;" type="danger" size="mini">重新点到</el-button>				
			</el-col>
		</el-row>
		<div class="content">
			<PersonList />
		</div>

		<DialogPersonDetail />
	</div>
</template>
	<!--<el-tabs  type="card" >-->
						<!--<el-tab-pane>-->
							 <!--<el-button slot="label" icon="el-icon-success" round>我的行程</el-button>-->
							 <!--我的行程-->
						<!--</el-tab-pane>		-->
						<!--<el-tab-pane>-->
							 <!--<el-button slot="label" icon="el-icon-success" round>我的行程</el-button>-->
							 <!--我的行程-->
						<!--</el-tab-pane>		-->
						<!--<el-tab-pane>-->
							 <!--<el-button slot="label" icon="el-icon-success" round>我的行程</el-button>-->
							 <!--我的行程-->
						<!--</el-tab-pane>		-->
						<!--<el-tab-pane>-->
							 <!--<el-button slot="label" icon="el-icon-success" round>我的行程</el-button>-->
							 <!--我的行程-->
						<!--</el-tab-pane>		-->
					<!--</el-tabs>-->

<script>
import ajaxx from "ajax";
import { mapState } from 'vuex';
import DialogPersonDetail from "./DialogPersonDetail.vue";
import PersonList from "PersonList.vue";
export default {
	name: 'RollCall',
	data(){
		return {
			card:'',
		}
	},
	methods:{
		handleClick(){},
		getChecked(person){
			console.log(person);
		},
	},
	computed:{
	},
	beforeCreate(){
		let ajax = ajaxx();
		ajax.post('rollCall.getPersons',{deptId:'depc37237f086fc4b90afa43780946dba68'}).then(data =>{
			this.$store.dispatch('rollCall/updateArray', {team:data.data});
			console.log(data);	
		});	
		ajax.post('rollCall.getModule',{deptId:'depc37237f086fc4b90afa43780946dba68'}).then(data =>{
			this.$store.dispatch('rollCall/updateArray', {module:data.data});
			console.log(data);	
		});	
	},
	components:{
		DialogPersonDetail,
		PersonList,
	},
};
</script>

