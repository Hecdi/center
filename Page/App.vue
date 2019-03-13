<template>
  <div id="app" v-if="isLoad" v-loading="waiting" element-loading-text="拼命加载中。。。" element-loading-background="rgba(0,0,0,0.1)">
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
   <router-link tag="li" to="/messageCenter" class="nav-item">
       <i class="iconfont icon-xiaoxi"></i>&nbsp;&nbsp;消息中心
      </router-link>
            <router-link tag="li" to="/operationManual" class="nav-item">
       <i class="iconfont icon-caozuoshouce"></i>&nbsp;&nbsp;操作手册
      </router-link>
      <router-link tag="li" to="/tree" class="nav-item">
       <i class="iconfont icon-caozuoshouce"></i>&nbsp;&nbsp;树形结构
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

		 <el-row style="width:100%">
        <el-col :span="4" class="tree">
            <el-tree :data="data" :props="defaultProps" 
                :highlight-current = true
                node-key="id"
								:render-content="renderContent"
								:default-expand-all=true
                @node-click="handleNodeClick">
            </el-tree>
        </el-col>
        <el-col :span="20" class="tree-table">
					<el-breadcrumb separator-class="el-icon-arrow-right">
  						<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  						<el-breadcrumb-item>活动管理</el-breadcrumb-item>
  						<el-breadcrumb-item>活动列表</el-breadcrumb-item>
  						<el-breadcrumb-item>活动详情</el-breadcrumb-item>
					</el-breadcrumb>
            <router-view>
                <h1>表格全部在这里展示</h1>
            </router-view>
        </el-col>
    </el-row>
		</el-container>
  </div>
</template>

<script>
	import {formatDate} from "date.js";
	import {remote} from "electron";
	import {isNumber} from 'lodash';
	import { mapState} from "vuex";
	import { stopWorker } from "../Worker/init";
	
	export default {
		name: "app",
		data() {
      return {
					isLoad:false,
					getTimeYMD:'',
					getTimeHms:'',
        data:
         [{
					label: '基础信息',
					className:'iconfont icon-tongji',
          children: [{
						label: '资源',
						icon:'el-icon-info',
            children: [{
							className:'iconfont icon-tongji',
              label: '机位',
              path:'home'
						},
						{
							icon:'el-icon-error',
              label: '机库',
              path:'home'
						},
						{
							icon:'el-icon-warning',
							label: '登机口',
							path:'violations',
						},
						{
							className:'el-icon-success',
							label: '行李转盘',
							path:'violations',
						}
						
						]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1',
              path:'rollCall'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1',
              path:'violations'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
							label: '机库',
							path: 'hanger'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '合约',
              path:'contact'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    // methods: {
      
    // }
		// name: "app",
		// data(){
		// 	return {
		// 		getTimeYMD:'',
		// 		getTimeHms:'',
		// 		isLoad:false,
		// 	}
		// },
		methods:{
			handleNodeClick(data) {
        console.log(data);
        if(data.children == undefined){
            this.$router.push({path:'/'+data.path})
        } else {
            return;
        }
			},
			renderContent(h, { node, data, store }) {
         return (
           <span>
             <i class={data.className}></i>
             <span style="padding:0 10px;">{node.label}</span>
           </span>
           );
        },
			logOut(){
				localStorage.clear();
				// stopWorker();
				window.location.reload();
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

