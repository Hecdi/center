<template>
	<el-dialog class="dialogPersonSetting" center :title="currentPerson.staffName"
	 :visible.sync="dialogPersonSettingVisible" width="1000px" :before-close="handleClose">
		<el-tabs  type="card" >
			<el-tab-pane label="人员设置" >
				<el-row :gutter="10" class="row">
					<el-col>
						<span class="title">职务：</span>	<el-checkbox :value="currentPerson.groupLeader"  :true-label=1 :false-label=-1 >设为小组长</el-checkbox>
					</el-col>
				</el-row>
				<el-row :gutter="10" class="row">
					<el-col>
						<span class='title'>片区：</span>
						{{currentAreaName}}
					</el-col>
				</el-row>
				<span slot="footer" class="dialog-footer">
					<el-button type="primary" @click="submit" >提交</el-button>
					<el-button @click="dialogPersonSettingVisible = false;">取 消</el-button>
				</span>
			</el-tab-pane>
			<el-tab-pane label="人员详情" >人员详情</el-tab-pane>
		</el-tabs>
	</el-dialog>
</template>
<script>
import { mapState } from 'vuex';
import moment from 'moment';
import {pick, extend, identity} from 'lodash';

export default {
	name: 'dialogPersonSetting',
	props:['currentPerson','currentAreaName'],
	data (){
		return {
			currentWorkerName: '',
			currentWorkerId: '',
		}
	},
	methods: {
		submit(){
			this.$store.commit('rollCall/updateObj',{currentRow:{
				staffId:this.currentWorkerId,
				staffName:this.currentWorkerName,
			}})
			this.dialogPersonSettingVisible = false;
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
		dialogPersonSettingVisible: {
			get() {
				return this.$store.state.home.dialogPersonSettingVisible;
			},
			set() {
				this.$store.dispatch(`home/update`, { dialogPersonSettingVisible: false });
			},
		},
		...mapState('home', ['']),
	},
	components:{
	}
};
</script>


