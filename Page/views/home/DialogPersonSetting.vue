<template>
  <el-dialog
    class="dialogPersonSetting"
    center
    :title="currentPerson.staffName"
    :visible.sync="dialogPersonSettingVisible"
    width="1000px"
    :before-close="handleClose"
  >
    <el-tabs type="card" v-model="checkedPanel">
      <el-tab-pane label="人员设置" name="set">
        <el-row :gutter="10" class="row">
          <el-col>
			  <span class="title">职务：</span>
            <el-checkbox :checked="currentPerson.groupLeader" @change="setLeader" :true-label="1" :false-label="-1">设为小组长</el-checkbox>
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
					<el-col :span="`${index+1 == task.operatorStep.length?4:6}`" v-for="(step,index) in task.operatorStep" :key="index">
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
				leader:null,
				checkedPanel:'set',
				detail:[],
			};
		},
		watch:{
			dialogPersonSettingVisible:function(newVal,old){
				if(newVal == true){
				this.getPersonDetail();
				}
			}
		},
		methods: {
			formatDate:function(val,opt,empty){
				return formatDate(val,opt,empty);
			},
			getPersonDetail(){
				ajax.post('home.getPersonDetail',{staffId:this.currentPerson.staffId}).then(data=>{
					console.log(data);
				});
				let data =[
					{
						"flightNo": "BS2332",
						"flightTaskId": "dgrtytgfewe3534",
						"operatorStep":[{
							"operationCode":"1",
							"operationName":"领受",
							"actTime":1544427391000,
							"planTime":1544427391000,
						},
							{
								"operationCode":"2",
								"operationName":"到位",
								"actTime":1544427391000,
								"planTime":1544427391000,
							}]
					},
					{
						"flightNo": "BS2332",
						"flightTaskId": "dgrtytgfewe3534",
						"operatorStep":[{
							"operationCode":"1",
							"operationName":"领受",
							"actTime":1544427391000,
							"planTime":1544427391000,
						},
							{
								"operationCode":"2",
								"operationName":"到位",
								"actTime":1544427391000,
								"planTime":1544427391000,
							}
						]
					}]; 
				this.detail.splice(0, this.detail.length);
				each(data, item=>{
					this.detail.push(item);
				})
			},
			setLeader(val){
				this.leader = val;
			},
			submit() {
				let param= {
					staffId:this.currentPerson.staffId,
					groupLeader:this.leader,
				}
				console.log(param);
				ajax.post('home.updateStaffState',param,(data)=>{
					console.log(data);
				});
				this.dialogPersonSettingVisible = false;
			},
			handleClose(done) {
				this.$confirm("确认关闭？")
					.then(_ => {
						done();
					})
					.catch(_ => {});
			}
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


