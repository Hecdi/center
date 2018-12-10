<template>
	<section class="urgentReport" >
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
										<el-carousel-item  :showImg="site.imgFile">
											<img :src="showImg" />
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
				showImg: '',
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
					  /*'conTent':'这是很长很长的内容很长很长这是很长很长的内容很长很长这是很长很长的内容很长很长这是很长很长的内容很长很长这是很长很长的内容很长很长这是很长很长的内容很长很长',*/
					  /*'img':'aaaaaasbbb',*/
					 /*},*/
					 /*{'deviationItemName':'撤桥',*/
					  /*'remarks':'航后',*/
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
