<template>
	<section class="messageCenter">
		<section class="rowHead">
			<div class="pic"></div>
			<p>消息内容</p>
			<el-input class="input" placeholder="输入关键词搜索" suffix-icon="el-icon-search" v-model="search" clearable>
			</el-input>
			<el-date-picker class="date" v-model="time" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期">
			</el-date-picker>
		</section>
		<section class="rowBody">
			<section class="card1">
				<div class="cardHeader">
					<i class="iconfont icon-gaojing"></i>
					警告
					<div class="column3">
						<div class="sum">86</div>
					</div>
				</div>
				<div class="cardBody">
					<el-row v-for="(item,index) in computedAlarmList" :key = "index">
						<el-col class="colA colB col1" :span = "2">{{index+1}}
						</el-col>
						<el-col class="colA colB col2" :span = "4">
							<div>{{item.flightNo}}</div>
						</el-col>
						<el-col class="colA colB col3" :span = "6">{{item.createTime}}
						</el-col>
						<el-col class="colA colB col4" :span = "9">{{item.context}}
						</el-col>
						<el-col class="colA col5" :span = "3">
							<div>解除</div>
						</el-col>
					</el-row>
				</div>
				<div class="cardFooter">
					<el-pagination
						background
						small
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						:pager-count="5"
						layout="prev,pager,next,jumper"
						:current-page="PG"
						:page-size="15"
						:total="500">
					</el-pagination>
				</div>
			</section>
			<section class="card2">
				<div class="cardHeader">
					<i class="iconfont icon-tongzhi"></i>
					提醒
					<div class="column3">
						<div class="sum">86</div>
					</div>
				</div>
				<div class="cardBody">
					<el-row v-for="(item,index) in computedRemindlist" :key = "index">
						<el-col class="colA colB col1" :span = "2">{{index+1}}
						</el-col>
						<el-col class="colA colB col2" :span = "4">
							<div>{{item.flightNo}}</div>
						</el-col>
						<el-col class="colA colB col3" :span = "10">{{item.context}}
						</el-col>
						<el-col class="colA col4" :span = "8">{{item.createTime}}
						</el-col>
					</el-row>
				</div>
				<div class="cardFooter">
					<el-pagination
						background
						small
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						:pager-count="5"
						layout="prev,pager,next,jumper"
						:current-page="PG"
						:page-size="15"
						:total="500">
					</el-pagination>
				</div>
			</section>
			<section class="card3">
				<div class="cardHeader">
					<i class="iconfont icon-log-a-04"></i>
					日志
					<div class="column3">
						<div class="sum">86</div>
					</div>
				</div>
				<div class="cardBody">
					<el-row v-for="(item,index) in computedRecordelist" :key = "index">
						<el-col class="colA colB col1" :span = "2">{{index+1}}
						</el-col>
						<el-col class="colA colB col2" :span = "4">
							<div>{{item.flightNo}}</div>
						</el-col>
						<el-col class="colA colB col3" :span = "10">{{item.context}}
						</el-col>
						<el-col class="colA col4" :span = "8">{{item.createTime}}
						</el-col>
					</el-row>
				</div>
				<div class="cardFooter">
					<el-pagination
						background
						small
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						:pager-count="5"
						layout="prev,pager,next,jumper"
						:current-page="PG"
						:page-size="15"
						:total="500">
					</el-pagination>
				</div>
			</section>
			<section class="card4">
				<div class="cardHeader">
					<i class="iconfont icon-chongtu"></i>
					冲突
					<div class="column3">
						<div class="sum">86</div>
					</div>
				</div>
				<div class="cardBody">
					<el-row v-for="(item,index) in computedConflictlist" :key = "index">
						<el-col class="colA colB col1" :span = "2">{{index+1}}
						</el-col>
						<el-col class="colA colB col2" :span = "3">
							{{item.staffName}}
						</el-col>
						<el-col class="colA colB col3" :span = "11">{{item.context}}
						</el-col>
						<el-col class="colA col4" :span = "8">{{item.createTime}}
						</el-col>
					</el-row>
				</div>
				<div class="cardFooter">
					<el-pagination
						background
						small
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						:pager-count="5"
						layout="prev,pager,next,jumper"
						:current-page="PG"
						:page-size="15"
						:total="500">
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
				searchCondition:'',
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
				PG:1,
			}
		},
		methods:{
			handleSizeChange(val){
				console.log(`每页${val}条`);
			},
			handleCurrentChange(val){
				console.log(`当前页:${val}`);
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
			}
		},
		computed:{
			computedAlarmList:function(){
				let list = this.alarmList.items;
				let result = this.process(list);
				return result;
			},
			computedRemindlist:function(){
				let list = this.remindList.items;
				let result = this.process(list);
				return result;
			},
			computedRecordelist:function(){
				let list = this.recordeList.items;
				let result = this.process(list);
				return result;
			},
			computedConflictlist:function(){
				let list = this.conflictList.items;
				let result = this.process(list);
				return result;
			},
		},
		beforeMount(){
			ajax.post('messageCenter',{
				'startTime':this.starTime,
				'endTime':this.endTime,
				'searchCondition':this.searchCondition,
				'messages':`1&${this.valSize}&${this.valPageType1},3&${this.valSize}&${this.valPageType3},4&${this.valSize}&${this.valPageType4},5&${this.valSize}&${this.valPageType5}`
			}).then(data => {
				this.setData(data);
				console.log(data);
			});
		},
	}
</script>
