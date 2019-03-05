<template>
	<div class="mainList">
		<el-row :gutter="10" v-for="(item, index) in mainList" :key="index">
			<el-col :span="2" class="region">
				<el-card shadow="always">
					<div class="areaName">{{ item.mainStaffName }}</div>
				</el-card>
			</el-col>
			<el-col :span="23" class="task">
				<el-row :gutter="20">
					<el-col :span="8" style="position:relative;" v-for=" mainTask in item.taskList" :key="mainTask.mainTaskId">
						<el-collapse v-model="activeTask" >
							<el-collapse-item :name="mainTask.mainTaskId" :class="`bgh${mainTask.mainTaskStatus}`">
								<template slot="title" calss="aaa" style="background-color: green;">
									<el-row :gutter="2" class="mainTaskPanel">
										<el-col :span="3">{{ mainTask.taskNumber }}</el-col>
										<el-col :span="13" style="text-align: left;">{{ mainTask.mainTaskId }}</el-col>
										<el-col :span="8" style="text-align: right;padding-right: 5px;">{{ `${mainTask.projectCode}/${mainTask.transfortType}` }}</el-col>
									</el-row>
								</template>
								<div v-for="(task, index) in mainTask.taskList" :key="index" style="padding-top: 8px;">
									<el-card shadow="always" :class="task.taskStatus == -1 || task.taskStatus == 8 ? 'greyPanel' : ''" :v-id="task.taskId" @click.native="showDeatil(task);">
										<el-container>
											<el-main :class="`bg-${task.taskStatus}`"> </el-main>
											<el-aside width="97%">
												<el-row :gutter="10" class="first-row">
													<el-col :span="13">
														<span class="b-black t-white">{{ `${task.auto == true ? '自' : '手'}` }}</span> <span class="b-black t-white">{{ task.flightNo }}</span> <span :class="`t-white aft b-${task.aircraftFlightType}`">{{ task.aircraftFlightType }}</span> <span style="font-weight:bold;">{{ task.seat }}</span>
													</el-col>
													<el-col :span="11" style="padding-right:30px;padding-left:0;text-align:right;">
														<legend v-if="task.delay != '--'" iconColor="#f00025" iconSize="16px" icon="iconfont icon-yanwu" fontSize="12px" color="#333" />
														<legend v-if="task.keyMaintaince != '--'" iconColor="#009a51" iconSize="16px" icon="iconfont icon-zhongdian" fontSize="12px" color="#333" />
														<legend v-if="task.vip != '--'" iconColor="#ff7100" iconSize="16px" icon="iconfont icon-VIP" fontSize="12px" color="#333" />
														<legend v-if="task.quickFlag != '--'" iconColor="#0065ff" iconSize="16px" icon="iconfont icon-kuaisu" fontSize="12px" color="#333" />
														<legend v-if="task.alternate != '--'" iconColor="#0065ff" iconSize="16px" icon="iconfont icon-beijiang" fontSize="12px" color="#333" />
														<legend v-if="task.returnFliht != '--'" iconColor="#009beb" iconSize="16px" icon="iconfont icon-fanhang" fontSize="12px" color="#333" />
														<legend v-if="task.taskAlarm == -1" iconColor="#fa0013" iconSize="16px" icon="iconfont icon-gaojingbiaoji" fontSize="12px" color="#333" />
														<legend v-if="task.haveDeviating != '--'" iconColor="#14407f" iconSize="16px" icon="iconfont icon-pianlishangbao1" fontSize="12px" color="#333" />
													</el-col>
												</el-row>
												<el-row :gutter="0" class="second-row">
													<el-col :span="10" class="route-panel">
														<div>
															<p>{{ task && task.iata ? task.iata[0] : '' }}</p>
															<p :title="task.airRoute[0]">{{ task && task.airRoute ? task.airRoute[0] : '' }}</p>
														</div>
														<div><i class="iconfont icon-hangxian"></i></div>
														<div>
															<p>{{ task && task.iata ? task.iata[task.iata.length - 1] : '' }}</p>
															<p :title="task.airRoute[1]">{{ task && task.airRoute ? task.airRoute[task.airRoute.length - 1] : '' }}</p>
														</div>
													</el-col>
													<el-col :span="4" style="border-left:1px dashed #BDBFC3;border-right:1px dashed #BDBFC3;font-size:14px;">
														<p class="airNo" :title="task.aircraftNumber">{{ task.aircraftNumber }}</p>
														<p>{{ task.aircraftType }}</p>
													</el-col>
													<el-col :span="10">
														<p><i class="iconfont icon-jihua" style="color:#00ad62;" v-if="task && task.displayScheduleTimeWithDate != '--'"></i> {{ task.displayScheduleTimeWithDate }}</p>
														<p><i class="iconfont" :class="task.disPlayActuralTime != '--' ? 'icon-shiji2' : 'icon-yuji2'" v-if="task && (task.disPlayActuralTime != '--' || task.disPlayExpectedTime != '--')"></i> {{ `${task.disPlayActuralTime != '--' ? task.disPlayActuralTime : task.disPlayExpectedTime}` }}</p>
													</el-col>
												</el-row>
												<el-row :gutter="10" class="third-row">
													<el-col :span="24">
														<i class="iconfont icon-renyuan" style="margin-right:6px;height:18px;"></i>
														<p :title="task.taskBindingShiftNames">{{ task.taskBindingShiftNames }}</p>
													</el-col>
												</el-row>
											</el-aside>
											<div :class="`flight-status bg-${task.flightStatusCode}`">{{ task.flightStatus }}</div>
										</el-container>
									</el-card>
								</div>
							</el-collapse-item>
							
						</el-collapse>
						<!--<el-card shadow="always" :class="task.taskStatus == -1 || task.taskStatus == 8 ? 'greyPanel' : ''" :v-id="task.taskId" @click.native="showDeatil(task);">-->
							<!--<el-container>-->
								<!--<el-main :class="`bg-${task.taskStatus}`"> </el-main>-->
								<!--<el-aside width="97%">-->
									<!--<el-row :gutter="10" class="first-row">-->
										<!--<el-col :span="13">-->
											<!--<span class="b-black t-white">{{ `${task.auto == true ? '自' : '手'}` }}</span> <span class="b-black t-white">{{ task.flightNo }}</span> <span :class="`t-white aft b-${task.aircraftFlightType}`">{{ task.aircraftFlightType }}</span> <span style="font-weight:bold;">{{ task.seat }}</span>-->
										<!--</el-col>-->
										<!--<el-col :span="11" style="padding-right:30px;padding-left:0;text-align:right;">-->
											<!--<legend v-if="task.delay != '&#45;&#45;'" iconColor="#f00025" iconSize="16px" icon="iconfont icon-yanwu" fontSize="12px" color="#333" />-->
											<!--<legend v-if="task.keyMaintaince != '&#45;&#45;'" iconColor="#009a51" iconSize="16px" icon="iconfont icon-zhongdian" fontSize="12px" color="#333" />-->
											<!--<legend v-if="task.vip != '&#45;&#45;'" iconColor="#ff7100" iconSize="16px" icon="iconfont icon-VIP" fontSize="12px" color="#333" />-->
											<!--<legend v-if="task.quickFlag != '&#45;&#45;'" iconColor="#0065ff" iconSize="16px" icon="iconfont icon-kuaisu" fontSize="12px" color="#333" />-->
											<!--<legend v-if="task.alternate != '&#45;&#45;'" iconColor="#0065ff" iconSize="16px" icon="iconfont icon-beijiang" fontSize="12px" color="#333" />-->
											<!--<legend v-if="task.returnFliht != '&#45;&#45;'" iconColor="#009beb" iconSize="16px" icon="iconfont icon-fanhang" fontSize="12px" color="#333" />-->
											<!--<legend v-if="task.taskAlarm == -1" iconColor="#fa0013" iconSize="16px" icon="iconfont icon-gaojingbiaoji" fontSize="12px" color="#333" />-->
											<!--<legend v-if="task.haveDeviating != '&#45;&#45;'" iconColor="#14407f" iconSize="16px" icon="iconfont icon-pianlishangbao1" fontSize="12px" color="#333" />-->
										<!--</el-col>-->
									<!--</el-row>-->
									<!--<el-row :gutter="0" class="second-row">-->
										<!--<el-col :span="10" class="route-panel">-->
											<!--<div>-->
												<!--<p>{{ task && task.iata ? task.iata[0] : '' }}</p>-->
												<!--<p :title="task.airRoute[0]">{{ task && task.airRoute ? task.airRoute[0] : '' }}</p>-->
											<!--</div>-->
											<!--<div><i class="iconfont icon-hangxian"></i></div>-->
											<!--<div>-->
												<!--<p>{{ task && task.iata ? task.iata[task.iata.length - 1] : '' }}</p>-->
												<!--<p :title="task.airRoute[1]">{{ task && task.airRoute ? task.airRoute[task.airRoute.length - 1] : '' }}</p>-->
											<!--</div>-->
										<!--</el-col>-->
										<!--<el-col :span="4" style="border-left:1px dashed #BDBFC3;border-right:1px dashed #BDBFC3;font-size:14px;">-->
											<!--<p class="airNo" :title="task.aircraftNumber">{{ task.aircraftNumber }}</p>-->
											<!--<p>{{ task.aircraftType }}</p>-->
										<!--</el-col>-->
										<!--<el-col :span="10">-->
											<!--<p><i class="iconfont icon-jihua" style="color:#00ad62;" v-if="task && task.displayScheduleTimeWithDate != '&#45;&#45;'"></i> {{ task.displayScheduleTimeWithDate }}</p>-->
											<!--<p><i class="iconfont" :class="task.disPlayActuralTime != '&#45;&#45;' ? 'icon-shiji2' : 'icon-yuji2'" v-if="task && (task.disPlayActuralTime != '&#45;&#45;' || task.disPlayExpectedTime != '&#45;&#45;')"></i> {{ `${task.disPlayActuralTime != '&#45;&#45;' ? task.disPlayActuralTime : task.disPlayExpectedTime}` }}</p>-->
										<!--</el-col>-->
									<!--</el-row>-->
									<!--<el-row :gutter="10" class="third-row">-->
										<!--<el-col :span="24">-->
											<!--<i class="iconfont icon-renyuan" style="margin-right:6px;height:18px;"></i>-->
											<!--<p :title="task.taskBindingShiftNames">{{ task.taskBindingShiftNames }}</p>-->
										<!--</el-col>-->
									<!--</el-row>-->
								<!--</el-aside>-->
								<!--<div :class="`flight-status bg-${task.flightStatusCode}`">{{ task.flightStatus }}</div>-->
							<!--</el-container>-->
						<!--</el-card>-->
						<!--<div class="poper" v-if="task.taskStatus == -1 || task.taskStatus == 8">{{ task.displayTaskStatus }}</div>-->
					</el-col>
				</el-row>
			</el-col>
		</el-row>
		<DialogTaskDetail />
	</div>
</template>

<script>
import { mapState } from 'vuex';
import ajaxx from 'ajax';
import DialogTaskDetail from '../DialogTaskDetail.vue';
import Legend from 'Legend.vue';
export default {
	name: 'MainList',
	data(){
		return {
			activeTask:[],
		}
	},
	watch:{
		activeTask: function(n, o){
			console.log(n,o)
			if(n.length > 1){
				this.activeTask = [];
				this.activeTask.push(n.pop());
			}
		}
	},
	computed: mapState('home', ['mainList']),
	methods: {
		showDeatil(task) {
			this.$store.commit('home/setCurrentTask', task);
			/* ajax.post('home.taskDetail', { flightTaskId: e.taskId }).then((data) => {
                          console.log(data);
                      }); */
		},
	},
	components: {
		DialogTaskDetail,
		Legend,
	},
};
</script>
<style lang="scss">
	.mainList{
		.el-collapse-item__wrap{
			background-color: transparent !important;
		}
		.areaName{
			word-wrap: break-word;
			word-break: break-all;
		}
		.mainTaskPanel{
			width:100%;
			.el-col{
				height:58px;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
		.el-collapse-item__header{
			color: white;
		}
		.bgh1{
			.el-collapse-item__header{
				background-color: #fff;
				color: black;
				.el-collapse-item__arrow{
					border-color: black;
					color:black;
				}
			}
		}
		.bgh2{
			.el-collapse-item__header{
				background-color: #ffac00;
			}
		}
  
		.el-collapse-item__arrow{
			border: 1px solid white;
			border-radius: 20px;
			padding: 3px;
		}
	}
</style>