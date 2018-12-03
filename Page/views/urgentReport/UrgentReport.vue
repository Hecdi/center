<template>
	<section class="urgentReport">
		<el-row :gutter="5" id='card'>
			<el-col :span="4" v-for="site in sites" >
				<el-card>
						<section class="Row1">
							<i class="el-icon-view"></i>
							<div class="No">{{site.flightNO}}</div>
							<div class="Ud1">{{site.undefined1}}</div>
						</section>
						<div class="Row2">{{site.undefined2}}</div>
						<section class="Row3">
							<i class="el-icon-caret-right"></i>
							<div class="Name">{{site.staffName}}</div>
						</section>
						<section class="Row4">
							<i class="el-icon-time"></i>
							<div class="Time">{{site.reportTime}}</div>
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

	export default {
		name:"card",
		data(){
			return {
				sites:[],
			}
		},
		methods:{
			getData(data){
				this.sites = data;
			}
		},
		beforeMount(){
			let ajax = ajaxx();
			/*ajax.get('urgentReport').then(function(data){*/
					/*this.getData(data);*/
					/*});*/
			let data = [
			{
				"flightTaskId":"2",
				"guaranteeDataId":"2",
				 "flightNO":"EU2356",
				"operationCode":"1",
				"staffId":"112",
				"staffName":"刘洋",
				"reportTime":"2018-11-12 17:21",
				"undefined1":"撤桥",
				"undefined2":"航后",
			}];
			this.getData(data);
		}
	}
</script>
