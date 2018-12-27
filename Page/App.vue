<template>
  <div id="app" v-if="isLoad" v-loading="waiting" element-loading-text="拼命加载中。。。">
    <el-container>
      <el-header height="50px;">
        <div id="nav" class="top-menu navbar navbar-dark bg-inverse">
          <span class="navbar-brand" href="javascript:void(0)">
			  <i class="iconfont icon-logo" style="font-size:80px;margin-left:10px;"></i>
            <span class="nav-title">机坪运行管理</span></span>
          <!-- <span class="navbar-departName">机坪运行管理</span> -->
          <ul class="nav navbar-nav">
            <router-link tag="li" to="/home" class="nav-item" exact>
							<i class="iconfont icon-paibanguanli"></i>&nbsp;&nbsp;排班
						</router-link>
            <router-link tag="li" to="/rollCall" class="nav-item">
							<i class="iconfont icon-diandao"></i>&nbsp;&nbsp;点到
						</router-link>
            <router-link tag="li" to="/urgentReport" class="nav-item">
							<i class="iconfont icon-pianlishangbao"></i>&nbsp;&nbsp;偏离上报
						</router-link>
            <router-link tag="li" to="/violations" class="nav-item">
							<i class="iconfont icon-weiguijilu"></i>&nbsp;&nbsp;违规记录
						</router-link>
            <router-link tag="li" to="/report" class="nav-item">
							<i class="iconfont icon-baobiao-copy"></i>&nbsp;&nbsp;报表
						</router-link>
            <router-link tag="li" to="/statistics" class="nav-item">
							<i class="iconfont icon-tongji"></i>&nbsp;&nbsp;统计
						</router-link>
            <router-link tag="li" to="/operationManual" class="nav-item">
							<i class="iconfont icon-caozuoshouce"></i>&nbsp;&nbsp;操作手册
						</router-link>
          </ul>
		  <section class="timeAndName">
			  <span><i class="iconfont icon-riqi"></i>{{getTimeYMD}}</span>
			  <span><i class="iconfont icon-shijian"></i>{{getTimeHms}}</span>
			  <span><i class="iconfont icon-yonghu"></i>{{getUserName()}}</span>
		  </section>
		  <el-button icon="iconfont icon-tuichu" type="info" @click="logOut"></el-button>
        </div>
      </el-header>
      <el-container>
        <router-view/>
      </el-container>
    </el-container>
  </div>
</template>

<script>
	import {formatDate} from "date.js";
	import {remote} from "electron";
	import {isNumber} from 'lodash';
	import { mapState} from "vuex";
	export default {
		name: "app",
		data(){
			return {
				getTimeYMD:'',
				getTimeHms:'',
				isLoad:false,
			}
		},
		methods:{
			logOut(){
				localStorage.clear();
				this.$router.push('/login');
			},
			getUserName(){
				return remote.getGlobal('username');	
			}
		},
		computed:{
			...mapState("home", ['waiting']),
		},
		mounted(){
			var _this = this;
			window.onload = ()=>{
				_this.isLoad = true;
			}
			this.timer1 = setInterval(function(){
				let offsetTime = remote.getGlobal('offsetTime');
				offsetTime = isNumber(offsetTime) ? offsetTime:0;
				let correctTime = new Date().getTime() + offsetTime ;
				_this.getTimeHms = formatDate(correctTime,'HHmmss','');
			},1000);
			this.timer2 = setInterval(function(){
				let offsetTime = remote.getGlobal('offsetTime');
				offsetTime = isNumber(offsetTime) ? offsetTime:0;
				let correctTime = new Date().getTime() + offsetTime ;
				_this.getTimeYMD = formatDate(correctTime,'YYYY-MM-DD','');
			},1000);
		},
		beforeDestroy(){
				if(this.timer1){
					clearInterval(this.timer1);
				};
				if(this.timer2){
					clearInterval(this.timer2);
				}
		},
	}
</script>

