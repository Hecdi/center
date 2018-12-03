<template>
	<section class="urgentReport">
		<el-row :gutter="5" id='card'>
			<el-col :span="4" v-for="site in sites" :key="site.flightTaskId" >
				<el-card>
						<section class="Row1">
							<i class="el-icon-view"></i>
							<div class="No">{{site.undefined1}}</div>
							<div class="Ud1">{{site.deviationitemName}}</div>
						</section>
						<div class="Row2">{{site.undefined2}}</div>
						<section class="Row3">
							<i class="el-icon-caret-right"></i>
							<div class="Name">{{site.staffName}}</div>
						</section>
						<section class="Row4">
							<i class="el-icon-time"></i>
							<div class="Time">{{site.deviateTime}}</div>
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
				this.sites = data.data;
			}
		},
		beforeMount(){
			let ajax = ajaxx();
			ajax.get('urgentReport').then(function(data){
					console.log(111);
					console.log(data);
					console.log(222);
					this.getData(data);
					});
		}
	}
</script>
