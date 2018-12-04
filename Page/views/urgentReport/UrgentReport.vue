<template>
	<section class="urgentReport">
		<el-row :gutter="5" id='card'>
			<el-col :span="4" v-for="site in sites" :key="site.flightTaskId" >
				<el-card>
						<section class="Row1">
							<i class="el-icon-view"></i>
							<div class="No">{{site.flightNo}}</div>
							<div class="Dname">{{site.deviationItemName}}</div>
						</section>
						<div class="Row2">{{site.remarks}}</div>
						<section class="Row3">
							<i class="el-icon-caret-right"></i>
							<div class="Sname">{{site.staffName}}</div>
						</section>
						<section class="Row4">
							<i class="el-icon-time"></i>
							<div class="Dtime">{{site.deviateTime}}</div>
						</section>
						<div class="Row5">
							<i class="el-icon-message"></i>
						</div>
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
		   /* ajax.get('urgentReport').then((data)=>{*/
				/*data = [*/
					 /*{'undefined1':'撤桥',*/
					  /*'undefined2':'航后',*/
					  /*'deviationitemName':'EU2280',*/
					  /*'staffName':'leo',*/
					  /*'deviateTime':'2018-12-03'*/
					 /*},*/
					 /*{'undefined1':'撤桥',*/
					  /*'undefined2':'航后',*/
					  /*'deviationitemName':'EU2280',*/
					  /*'staffName':'leo',*/
					  /*'deviateTime':'2018-12-03'*/
					 /*}*/
				/*];*/
				/*this.getData(data);*/
			/*});*/
		}
	}
</script>
