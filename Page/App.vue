<template>
  <div id="app">
    <el-container>
      <el-header height="50px;">
        <div id="nav" class="top-menu navbar navbar-dark bg-inverse">
          <a class="navbar-brand" href="javascript:void(0)"/>
          <span class="navbar-departName">机坪运行管理</span>
          <ul class="nav navbar-nav">
            <router-link tag="li" to="/home" class="nav-item" exact>排班</router-link>
            <router-link tag="li" to="/rollCall" class="nav-item">点到</router-link>
            <router-link tag="li" to="/urgentReport" class="nav-item">偏离上报</router-link>
            <router-link tag="li" to="/violations" class="nav-item">违规记录</router-link>
            <router-link tag="li" to="/report" class="nav-item">报表</router-link>
            <router-link tag="li" to="/statistics" class="nav-item">统计</router-link>
            <router-link tag="li" to="/operationManual" class="nav-item">操作手册</router-link>
            <!-- <router-link tag="li" to="/login" class="nav-item">登陆测试</router-link> -->
            <!--<router-link tag="li" to="/login" class="nav-item el-icon-circle-close-outline" style="float:right;color:#fff">-->
              <!--[> 00 <]-->
            <!--</router-link>-->
          </ul>
		  <section class="timeAndName">
			  <span><i class="iconfont icon-riqi"></i>{{getTimeYMD}}</span>
			  <span><i class="iconfont icon-shijian"></i>{{getTimeHms}}</span>
			  <span><i class="iconfont icon-yonghu"></i>{{username}}</span>
		  </section>
		  <el-button size="mini" style="float:right;margin-top:12px;" type="info" @click="logOut">登出</el-button>
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
	export default {
		name: "app",
		data(){
			return {
				getTimeYMD:'',
				getTimeHms:'',
				username:remote.getGlobal('username'),
			}
		},
		methods:{
			logOut(){
				localStorage.clear();
				this.$router.push('/login');
			}
		},
		mounted(){
			var _this = this;
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

