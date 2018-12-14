<template>
<section class="outermostsection" >
	<section class="outermostheader" v-if="currentBtn == 'p1'">
		<el-row :gutter="50">
			<el-col class="deptRow" :span="12">
				<el-button class="deptBtn deptBtn1" :type="currentBtn == 'p1'?'primary':''" round @click="showSector('p1')">当前部门</el-button>
				<el-button class="deptBtn deptBtn2" :type="currentBtn == 'p2'?'primary':''" round @click="showSector('p2')">所有部门</el-button>
		   </el-col>
		   <el-col class="dateRow" id="dateRow" :span="6">
				<el-date-picker class="datePicker" v-model="time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="exportOnsearch">
				</el-date-picker>
		   </el-col>
		   <el-col class="inputRow" :span="6">
				<el-input class="input" placeholder="输入关键词搜索" suffix-icon="el-icon-search" v-model="inputSearch" clearable @keyup.enter.native="exportOnsearch">
				</el-input>
		   </el-col>
		</el-row>
	</section>
	<section v-else class="allDeptsection">
		<el-row :gutter="20">
			<el-col :span="16" :offset="4">
				<el-row :gutter="50">
					<el-col class="deptRow" :span="12">
						<el-button class="deptBtn deptBtn1" :type="currentBtn == 'p1'?'primary':''" round @click="showSector('p1')">当前部门</el-button>
						<el-button class="deptBtn deptBtn2" :type="currentBtn == 'p2'?'primary':''" round @click="showSector('p2')">所有部门</el-button>
				   </el-col>
				   <el-col class="dateRow" id="dateRow" :span="6">
						<el-date-picker class="datePicker" v-model="time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="exportOnsearch">
						</el-date-picker>
				   </el-col>
				   <el-col class="inputRow" :span="6">
						<el-input class="input" placeholder="输入关键词搜索" suffix-icon="el-icon-search" v-model="inputSearch" clearable @keyup.enter.native="exportOnsearch">
						</el-input>
				   </el-col>
				</el-row>
			</el-col>
		</el-row>
	</section>
	<section class="urgentReport" v-if="currentBtn=='p1'">
		<el-row :gutter="5" id='card'>
			<el-col :span="4" v-for="(site,index) in items" :key="index" >
				<el-card>
						<section class="Row1">
							<i class="iconfont icon-feiji"></i>
							<div class="No">{{flightNo}}</div>
							<div class="Dname">{{operationName}}</div>
						</section>
						<section class="Row2">
							<i class="iconfont icon-user"></i>
							<div class="Sname">{{staffName}}</div>
							<div class="Dtime">{{reportTime}}</div>
						</section>
						<section class="Row3">
							<i class="iconfont icon-neirongguanli"></i>
							<p class="Content" :title="remarks">{{remarks}}</p>
						</section>
						<section class="Row4">
							<div v-if="imgFile" class="Yesphoto">
								<el-button type="text" @click="showPics(imgFile)">
									图片详情
								</el-button>
								<el-dialog
									title="提示"
									:visible.sync="dialogVisible">
									<el-carousel :autoplay=false  height="300px" >
										<el-carousel-item  v-for = "(item,index) in imgArr" :key = "index">
											<img :src = "item"  class="img" />
										</el-carousel-item>
									</el-carousel>
								</el-dialog>
							</div>
							<p v-else class="Nophoto">暂无图片</p>
						</section>
					</el-card>
				</el-col>
			</el-row>
	</section>
	<section v-else class="sectionP2">
		<el-row :gutter="20">
			<el-col :span="16" :offset="4">
				<el-table
					:data = "sites"
					stripe
					highlight-current-row
					style = "width:auto">
					<el-table-column
						type = "index"
						min-width = "40px"
						label = "序号">
					</el-table-column>
					<el-table-column
						prop = "flightNo"
						min-width = "80px"
						label = "航班号">
					</el-table-column>
					<el-table-column
						prop = "operationName"
						min-width = "80px"
						label = "步骤名称">
					</el-table-column>
					<el-table-column
						prop = "staffName"
						min-width = "80px"
						label = "上报人">
					</el-table-column>
					<el-table-column
						prop = "reportTime"
						min-width = "200px"
						label = "上报时间">
					</el-table-column>
					<el-table-column
						show-overflow-tooltip			
						prop = "remarks"
						min-width = "200px"
						label = "偏离描述">
					</el-table-column>
					<el-table-column label = "附件" min-width = "100px">
						<template slot-scope="scope" >
							<div>
								<el-button :type = "scope.row.imgFile?'primary':'info'" @click.native="showPics(scope.row.imgFile)">查看</el-button>
								<el-dialog v-if = "scope.row.imgFile"  title="提示" :visible.sync="dialogVisible">
									<el-carousel :autoplay=false height="300px" >
										<el-carousel-item v-for = "(item,index) in imgArr" :key = "index">
											<img :src = "item" class="img"/>
										</el-carousel-item>
									</el-carousel>
								</el-dialog>
							</div>
						</template>
					</el-table-column>
				</el-table>
			</el-col>
		</el-row>
	</section>
</section>
</template>


<script>
	import moment from "moment";
	import {ajax} from "ajax";
	import {formatDate} from "date.js";
	import { remote } from 'electron';
	export default {
		name:"card",
		data(){
			return {
				sites:[],
				items:[],
				dialogVisible:false,
				radio1:'当前部门',
				input1:'',
				input2:'',
				time:[],
				inputSearch:'',
				imgArr:[],
				currentBtn:'p2',
			}
		},
		methods:{
			showSector(sector){
				this.currentBtn = sector;
						},
			showPics(picUrls){
				if(!picUrls){return;}
				console.log(picUrls);
				this.imgArr = picUrls.split(',');
				this.dialogVisible = true;
			},
			getData(data){
				/*this.sites = data.data;*/
				console.log(1111);
				console.log(data);
				if(data.responseMessage == "未查询到内容！"){
					return ;
				}else{

				for(var i in data){
					var timestamp = new Date(data[i].reportTime).getTime();
					/*var newDate = formatDate(data[i].reportTime,'YYYY-MM-DD HH:mm','');*/
					var newDate = formatDate(timestamp,'YYYY-MM-DD HH:mm','');
					data[i].reportTime = newDate;
				   /*data[i].abc = data[i].imgFile ? data[i].imgFile.split(','):[];  //第二种方法，将后端给的data中新增一个属性名为abc的数组*/

				}
				};

				console.log(data);
				this.sites = data;
			},
			exportOnsearch(){
				let timeArr = this.time;
				let startDate;
				let endDate;
				if(timeArr){
					if(moment(timeArr[0]).format("YYYY-MM-DD") == moment(timeArr[1]).format("YYYY-MM-DD")){
						startDate = moment(timeArr[0]).format("YYYY-MM-DD HH:mm:ss");
						endDate = moment(timeArr[1]).format("YYYY-MM-DD");
						endDate = `${endDate} 23:59:59`;
					} else{
						startDate = timeArr[0];
						startDate = moment(startDate).format("YYYY-MM-DD HH:mm:ss");
						endDate = timeArr[1];
						endDate = moment(endDate).format("YYYY-MM-DD");
						endDate = `${endDate} 23:59:59`;
					}
				} else{
					startDate = new Date(
						new Date(new Date().toLocaleDateString()).getTime()
					);
					startDate = moment(startDate).format("YYYY-MM-DD HH:mm:ss");
					endDate = new Date(
						new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1
					);
					endDate = moment(endDate).format("YYYY-MM-DD HH:mm:ss");
				}
				let inputSearch = this.inputSearch;
				let params = {"startTime":startDate,"endTime":endDate,"value":inputSearch,};
				console.log('2222');
				console.log(params);
				ajax.post('urgentReport', params).then((data) => {
					console.log('3333');
					console.log(data);
					this.getData(data);
				})
			},
		},
		beforeMount(){
			ajax.post('urgentReport').then(data =>{
				console.log(4444);
				console.log(data);
				this.getData(data);

			});
			/*ajax.get('urgentReport').then((data)=>{*/
			/*data = [*/
			/*{'deviationItemName':'撤桥',*/
			/*'remarks':'航后',*/
			/*'flightNo':'EU2280',*/
			/*'staffName':'leo',*/
			/*'deviateTime':1544075290,*/
			/*'imgFile':'https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/02/05/ChMkJlbKyaGIGGNjABT85XemdQ8AALIQQI-6pcAFPz9490.jpg,https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/02/02/ChMkJlbKxgqIc2QIAAd2hfADVfMAALHfQDYbgAAB3ad736.jpg',*/
			/*},*/
			/*{'deviationItemName':'撤桥',*/
			/*'remarks':'这是很长很长的内容很长很长这是很长很长的内容很长很长',*/
			/*'flightNo':'EU2280',*/
			/*'staffName':'leo',*/
			/*'deviateTime':null,*/
			/*'imgFile':null,*/
			/*}*/
			/*];*/
			/*this.getData(data);*/
			/*});*/
		}
	}
</script>
