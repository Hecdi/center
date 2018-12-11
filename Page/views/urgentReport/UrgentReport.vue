<template>
<section class="outermostsection" >
	<section class="outermostheader">
		<el-row :gutter="20">
			<el-col :span="12">
				<el-radio-group v-model="radio1">
					<el-radio-button round label="当前部门" ></el-radio-button>
					<el-radio-button round label="所有部门" ></el-radio-button>
				</el-radio-group>
			</el-col>
			<el-col :span="6">
				<el-input class="input1" placeholder="选择时间段" prefix-icon="el-icon-date" v-model="input1" clearable>
				</el-input>
			</el-col>
			<el-col :span="6">
				<el-input placeholder="输入关键词搜索" suffix-icon="el-icon-search" v-model="input2" clearable>
				</el-input>
			</el-col>
		</el-row>
	</section>
	<section class="urgentReport" v-if="radio1=='当前部门'">
		<el-row :gutter="5" id='card'>
			<el-col :span="4" v-for="site in sites" :key="site.flightTaskId" >
				<el-card>
						<section class="Row1">
							<i class="iconfont icon-feiji"></i>
							<div class="No">{{site.flightNo}}</div>
							<div class="Dname">{{site.deviationItemName}}</div>
						</section>
						<section class="Row2">
							<i class="iconfont icon-user"></i>
							<div class="Sname">{{site.staffName}}</div>
							<div class="Dtime">{{site.deviateTime}}</div>
						</section>
						<section class="Row3">
							<i class="iconfont icon-neirongguanli"></i>
							<p class="Content" :title="site.remarks">{{site.remarks}}</p>
						</section>
						<section class="Row4">
							<div v-if="site.imgFile" class="Yesphoto">
								<el-button type="text" @click="dialogVisible = true">
									图片详情>
								</el-button>
								<el-dialog
									title="提示"
									:visible.sync="dialogVisible">
									<el-carousel height="150px">
										<el-carousel-item  >
											<img />
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
	<section v-else>
		<el-table 
			:data = "sites"
			stripe
			highlight-current-row
			style = "width:auto">
			<el-table-column 
				type = "index"
				width = "80px"
				label = "序号">
			</el-table-column>
			<el-table-column
				prop = "flightNo"
				width = "180px"
				label = "航班号">
			</el-table-column>
			<el-table-column
				prop = "deviationItemName"
				width = "180px"
				label = "步骤名称">
			</el-table-column>
			<el-table-column
				prop = "staffName"
				width = "180px"
				label = "上报人">
			</el-table-column>
			<el-table-column
				prop = "deviateTime"
				min-width = "180px"
				label = "上报时间">
			</el-table-column>
			<el-table-column
				prop = "remarks"
				min-width = "300px"
				label = "偏离描述">
			</el-table-column>
			<el-table-column label = "附件">
				<template slot-scope="scope" >
					<div v-if = "scope.row.imgFile">
						<el-button type = "primary" @click="dialogVisible = true">查看</el-button>
					</div>
					<div v-else>查看</div>
				</template>
			</el-table-column>
		</el-table>
	</section>
</section>
</template>


<script>
import ajaxx from "ajax";
import {formatDate} from "date.js";
	export default {
		name:"card",
		data(){
			return {
				sites:[],
				dialogVisible:false,
				radio1:'当前部门',
				input1:'',
				input2:'',
				
			}
		},
		methods:{
			getData(data){
				/*this.sites = data.data;*/
				console.log(data);

			console.log(11112);	
				for(var i in data){
				var newDate = formatDate(data[i].deviateTime,'YYYY-MM-DD HH:mm','');
				data[i].deviateTime = newDate;	
				}

				console.log(data);
				this.sites = data;
			}
		},
		beforeMount(){
			let ajax = ajaxx();
			 ajax.get('urgentReport').then(data =>{
					console.log(data);
					this.getData(data.data);

					});
		  /*ajax.get('urgentReport').then((data)=>{*/
				/*data = [*/
					 /*{'deviationItemName':'撤桥',*/
					  /*'remarks':'航后',*/
					  /*'flightNo':'EU2280',*/
					  /*'staffName':'leo',*/
					  /*'deviateTime':1544075290,*/
					  /*'content':'这是很长很长的内容很长很长这是很长很长的内容很长很长这是很长很长的内容很长很长这是很长很长的内容很长很长这是很长很长的内容很长很长这是很长很长的内容很长很长',*/
					  /*'imgFile':'aaaaaasbbb',*/
					 /*},*/
					/*{'deviationItemName':'撤桥',*/
					  /*'remarks':'这是很长很长的内容很长很长这是很长很长的内容很长很长',*/
					  /*'flightNo':'EU2280',*/
					  /*'staffName':'leo',*/
					  /*'deviateTime':1544075290,*/
					  /*'conTent':'这是很长很长的内容很长很长这是很长很长的内容很长很长'*/
					 /*}*/
				/*];*/
				/*this.getData(data);*/
			/*});*/
		}
	}
</script>
