<template>
	<section class="messageCenter">
		<section class="rowHead">
			<div class="pic"></div>
			<p>消息内容</p>
			<el-input class="input" placeholder="输入关键词搜索" suffix-icon="el-icon-search" v-model="search" clearable @keyup.enter.native="exportOnsearch">
			</el-input>
			<el-date-picker class="date" v-model="time" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" @change="exportOnsearch">
			</el-date-picker>
		</section>
		<section class="rowBody">
			<section class="card1">
				<div class="cardHeader">
					<i class="iconfont icon-gaojing"></i>
					警告
					<div class="column3">
						<div class="sum">{{alarmList?alarmList.totalNum:0}}</div>
					</div>
				</div>
				<div class="cardBody">
					<el-row v-for="(item,index) in computedAlarmList" :key = "index">
						<el-col class="colA colB col1" :span = "2">{{index+1+(valPageType1-1)*valSize}}
						</el-col>
						<el-col class="colA colB col2" :span = "4">
							<div :title="item.flightNo">{{item.flightNo}}</div>
						</el-col>
						<el-col class="colA colB col3" :span = "7" :title="item.createTime">{{item.createTime}}
						</el-col>
						<el-col class="colA colB col4" :span = "8" :title="item.context">{{item.context}}
						</el-col>
						<el-col class="colA col5" :span = "3">
							
							<div v-if="item.status == -1" class="active" @click="relieveAlarm(item.flightTaskId)" @mouseenter="mouseEnter()">解除</div>
							<div v-if="item.status == 2" class="disable">解除</div>
						</el-col>
					</el-row>
				</div>
				<div class="cardFooter">
					<el-pagination
						background
						small
						@current-change="handleCurrentChangeType1"
						:pager-count="5"
						layout="prev,pager,next,jumper"
						:current-page="alarmList ? alarmList.currentPage:0"
						:page-size="15"
						:total="alarmList ? alarmList.totalNum:0">
					</el-pagination>
				</div>
			</section>
			<section class="card2">
				<div class="cardHeader">
					<i class="iconfont icon-tongzhi"></i>
					提醒
					<div class="column3">
						<div class="sum">{{remindList?remindList.totalNum:0}}</div>
					</div>
				</div>
				<div class="cardBody">
					<el-row v-for="(item,index) in computedRemindlist" :key = "index">
						<el-col class="colA colB col1" :span = "2">{{index+1+(valPageType3-1)*valSize}}
						</el-col>
						<el-col class="colA colB col2" :span = "4">
							<div :title="item.flightNo">{{item.flightNo}}</div>
						</el-col>
						<el-col class="colA colB col3" :span = "10" :title="item.context">{{item.context}}
						</el-col>
						<el-col class="colA col4" :span = "8" :title="item.createTime">{{item.createTime}}
						</el-col>
					</el-row>
				</div>
				<div class="cardFooter">
					<el-pagination
						background
						small
						@current-change="handleCurrentChangeType3"
						:pager-count="5"
						layout="prev,pager,next,jumper"
						:current-page="remindList ? remindList.currentPage:0"
						:page-size="15"
						:total="remindList?remindList.totalNum:0">
					</el-pagination>
				</div>
			</section>
			<section class="card3">
				<div class="cardHeader">
					<i class="iconfont icon-log-a-04"></i>
					日志
					<div class="column3">
						<div class="sum">{{recordeList?recordeList.totalNum:0}}</div>
					</div>
				</div>
				<div class="cardBody">
					<el-row v-for="(item,index) in computedRecordelist" :key = "index">
						<el-col class="colA colB col1" :span = "2">{{index+1+(valPageType4-1)*valSize}}
						</el-col>
						<el-col class="colA colB col2" :span = "4">
							<div :title="item.flightNo">{{item.flightNo}}</div>
						</el-col>
						<el-col class="colA colB col3" :span = "10" :title="item.context">{{item.context}}
						</el-col>
						<el-col class="colA col4" :span = "8" :title="item.createTime">{{item.createTime}}
						</el-col>
					</el-row>
				</div>
				<div class="cardFooter">
					<el-pagination
						background
						small
						@current-change="handleCurrentChangeType4"
						:pager-count="5"
						layout="prev,pager,next,jumper"
						:current-page="recordeList ? recordeList.currentPage:0"
						:page-size="15"
						:total="recordeList?recordeList.totalNum:0">
					</el-pagination>
				</div>
			</section>
			<section class="card4">
				<div class="cardHeader">
					<i class="iconfont icon-chongtu"></i>
					冲突
					<div class="column3">
						<div class="sum">{{conflictList?conflictList.totalNum:0}}</div>
					</div>
				</div>
				<div class="cardBody">
					<el-row v-for="(item,index) in computedConflictlist" :key = "index">
						<el-col class="colA colB col1" :span = "2">{{index+1+(valPageType5-1)*valSize}}
						</el-col>
						<el-col class="colA colB col2" :span = "3" >
							{{item.staffName}}
						</el-col>
						<el-col class="colA colB col3" :span = "11" :title="item.context">{{item.context}}
						</el-col>
						<el-col class="colA col4" :span = "8" :title="item.createTime">{{item.createTime}}
						</el-col>
					</el-row>
				</div>
				<div class="cardFooter">
					<el-pagination
						background
						small
						@current-change="handleCurrentChangeType5"
						:pager-count="5"
						layout="prev,pager,next,jumper"
						:current-page="conflictList ? conflictList.currentPage:0"
						:page-size="15"
						:total="conflictList?conflictList.totalNum:0">
					</el-pagination>
				</div>
			</section>
		</section>
	</section>
</template>

<script>
	import moment from "moment";
	import {ajax} from "ajax";
	import {formatDate} from "date.js";
	export default {
		name:"messageCenter",
		data(){
			return {
				startTime:moment(new Date()).format('YYYY-MM-DD') + ' 00:00:00',
				endTime:moment(new Date()).format('YYYY-MM-DD') + ' 23:59:59',
				valSize:15,
				valPageType1:1,
				valPageType3:1,
				valPageType4:1,
				valPageType5:1,
				alarmList:{},
				remindList:{},
				recordeList:{},
				conflictList:{},
				time:[],
				search:'',
				alramItems:'',


			}
		},
		methods:{
			handleCurrentChangeType1(val){
				this.valPageType1 = val ;
				let param = this.getSendParams();
				ajax.post('messageCenter',param).then((data) => {
					this.setData(data);
				})
			},
			handleCurrentChangeType3(val){
				this.valPageType3 = val ;
				let param = this.getSendParams();
				ajax.post('messageCenter',param).then((data) => {
					this.setData(data);
				})
			},
			handleCurrentChangeType4(val){
				this.valPageType4 = val ;
				let param = this.getSendParams();
				ajax.post('messageCenter',param).then((data) => {
					this.setData(data);
				})
			},
			handleCurrentChangeType5(val){
				this.valPageType5 = val ;
				let param = this.getSendParams();
				ajax.post('messageCenter',param).then((data) => {
					this.setData(data);
				})
			},
			exportOnsearch(){
				this.valSize = 15;
				this.valPageType1 = 1;
				this.valPageType2 = 1;
				this.valPageType3 = 1;
				this.valPageType4 = 1;
				let param = this.getSendParams();
				ajax.post('messageCenter',param).then((data) => {
					this.setData(data);
				})
			},
			getSendParams(){
				let timeArr = this.time;
				let startDate;
				let endDate;
				if(timeArr && timeArr.length){
					startDate = moment(timeArr[0]).format("YYYY-MM-DD HH:mm:ss");
					endDate = moment(timeArr[1]).format("YYYY-MM-DD") + ' 23:59:59';
				} else if(this.search != '' && !(timeArr && timeArr.length)) {
					startDate = '';
					endDate = '';
				} else {
					startDate = moment(new Date()).format("YYYY-MM-DD") + ' 00:00:00';
					endDate = moment(new Date()).format("YYYY-MM-DD") + ' 23:59:59';
				}
				let params = {
					'startTime':startDate,
					'endTime':endDate,
					'searchCondition':this.search,
					'messages':`1&${this.valSize}&${this.valPageType1},3&${this.valSize}&${this.valPageType3},4&${this.valSize}&${this.valPageType4},5&${this.valSize}&${this.valPageType5}`
				};
				return params;
			},
			setData(data){
				this.alarmList = data.alarmlist;
				this.remindList = data.remindlist;
				this.recordeList = data.recordelist;
				this.conflictList = data.conflictlist;
			},
			process(arr){
				for(let i in arr){
					let timestamp = new Date(arr[i].createTime).getTime();
					let newDate = formatDate(timestamp,'YYYY-MM-DD HH:mm','');
					arr[i].createTime = newDate;
				};
				return arr;
			},

			relieveAlarm(val){
				ajax.post('relievingAlarm',{
					flightTaskId:val
				},(data) => {
					this.$message({
						type: data.responseCode == 1000 ? "success" : "error",
						message: data.responseMessage
					});
					let param = this.getSendParams();
					ajax.post('messageCenter',param).then((data) => {
						this.setData(data);
					})
				});
			},

			mouseEnter(){
			},

		},
		computed:{
			computedAlarmList:function(){
				let list = this.alarmList?this.alarmList.items:[];
				let result = this.process(list);
				return result;
			},
			computedRemindlist:function(){
				let list = this.remindList?this.remindList.items:[];
				let result = this.process(list);
				return result;
			},
			computedRecordelist:function(){
				let list = this.recordeList?this.recordeList.items:[];
				let result = this.process(list);
				return result;
			},
			computedConflictlist:function(){
				let list = this.conflictList?this.conflictList.items:[];
				let result = this.process(list);
				return result;
			},
		},
		beforeMount(){
			ajax.post('messageCenter',{
				'startTime':this.startTime,
				'endTime':this.endTime,
				'searchCondition':this.search,
				'messages':`1&${this.valSize}&${this.valPageType1},3&${this.valSize}&${this.valPageType3},4&${this.valSize}&${this.valPageType4},5&${this.valSize}&${this.valPageType5}`
			}).then(data => {
				this.setData(data);
				console.log(data);
			});
		},
	}
</script>
