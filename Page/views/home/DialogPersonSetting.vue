<template>
	<el-dialog
		class="dialogPersonSetting"
		center
		:title="currentPerson?currentPerson.staffName:''"
		:visible.sync="dialogPersonSettingVisible"
		width="800px"
		>
    <el-tabs type="card" v-model="checkedPanel">
      <el-tab-pane label="人员设置" name="set">
        <el-row :gutter="10" class="row">
          <el-col>
			  <span class="title">职务：</span>
            <el-checkbox v-model="leader"  >设为小组长</el-checkbox>
          </el-col>
        </el-row>
        <el-row :gutter="10" class="row">
          <el-col>
            <span class="title">片区：</span>
            {{currentAreaName}}
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="人员详情" name="detail">
		<el-row :gutter="20" v-for="(task,index) in detail" :key="index" class="personDetail">
			<el-col :span="2">
				<span class="flightNo">{{task.flightNo}}</span>
			</el-col>
			<el-col :span="22">
				<el-row :gutter="2">
					<el-col :span="index+1 == task.operatorStep.length?4:6" v-for="(step,index) in task.operatorStep" :key="index">
						<div class="step" :class="{'arrow':index +1 != task.operatorStep.length}">
							<p style="color:#3D568E;">{{step.operationName}}</p>
							<p style="color:#333;">{{`${formatDate(step.actTime,'HHmm','--')}` + `${"("+formatDate(step.planTime,'HHmm','--')+")"}`}}</p>
						</div>
					</el-col>
				</el-row>
			</el-col>
		</el-row>
	  </el-tab-pane>
    </el-tabs>
	<span slot="footer" class="dialog-footer" v-if="checkedPanel == 'set'">
		<el-button type="primary" @click="submit">提交</el-button>
		<el-button @click="dialogPersonSettingVisible = false;">取 消</el-button>
	</span>
  </el-dialog>
</template>
<script>
	import { mapState } from "vuex";
	import moment from "moment";
	import { ajax } from "ajax";
	import { pick, extend, identity,each } from "lodash";
	import {formatDate} from "date";

	export default {
		name: "dialogPersonSetting",
		props: ["currentPerson", "currentAreaName"],
		data() {
			return {
				leader:false,
				checkedPanel:'set',
				detail:[],

			};
		},
		watch:{
			dialogPersonSettingVisible:function(newVal,old){
				if(newVal == true){
					this.leader = this.currentPerson ? (this.currentPerson.groupLeader==1?true:false):false;
					this.checkedPanel = 'set';
					this.getPersonDetail();
				}
			},
		},
		methods: {
			formatDate:function(val,opt,empty){
				return formatDate(val,opt,empty);
			},
			getPersonDetail(){
				ajax.post('home.getPersonDetail',{staffId:this.currentPerson.staffId}).then(data=>{
					console.log(data);
					this.detail.splice(0, this.detail.length);
					each(data, item=>{
						this.detail.push(item);
					});
				});
			},
			setLeader(val){
				this.leader = val;
			},
			submit() {
				let param= {
					staffId:this.currentPerson.staffId,
					groupLeader:this.leader?1:-1,
				}
				console.log(param);
				ajax.post('home.updateStaffState',param,(data)=>{
					this.$message({
						type: data.responseCode == 1000 ? "success" : "error",
						message: data.responseMessage
					});
				});
				this.dialogPersonSettingVisible = false;
			},
		},
		computed: {
			dialogPersonSettingVisible: {
				get() {
					return this.$store.state.home.dialogPersonSettingVisible;
				},
				set() {
					this.$store.dispatch(`home/update`, {
						dialogPersonSettingVisible: false
					});
				}
			},
			...mapState("home", [""])
		},
		components: {}
	};
</script>


