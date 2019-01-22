<template>
  <div class="statistics">
    <el-row :gutter="0">
      <el-col :span="24">
        <el-date-picker
          v-model="time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="timestamp"
          @change = "handleClick"
        ></el-date-picker>
      </el-col>
      <el-col :span="12">
        <el-card shadow="always">
          <div id="workload"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="always">
          <div id="in-out"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <div id="violation-sum"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="always">
          <div id="violation-type"></div>
        </el-card>
      </el-col>
      <h4 class="table-title">数据统计汇总</h4>
      <el-col :span="24" class="data-sum">
        <el-table :data="tableData1" stripe style="width: 100%">
          <el-table-column type="index" label="序号" width="50"/>
          <el-table-column prop="scheduleTime" label="日期" width="120"/>
          <el-table-column prop="createTask" label="生成任务" min-width="100"/>
          <el-table-column prop="notGuaranteeTask" label="不保障任务" width="120"/>
          <el-table-column prop="operateTask" label="操作任务" width="120"/>
          <el-table-column prop="createTask" label="自动排班" min-width="100"/>
          <el-table-column prop="finishTask" label="完成任务" min-width="100"/>
          <el-table-column prop="operateTotal" label="操作总数" width="100"/>    
          <el-table-column prop="finishRate" label="完成率" min-width="80"/>
          <el-table-column prop="clickRate" label="点击率" min-width="80"/>
          <el-table-column prop="movementA" label="进港航班" width="100"/>
          <el-table-column prop="movementD" label="离港航班" width="100"/>
          <el-table-column prop="people" label="人员违规" min-width="100"/>
          <el-table-column prop="car" label="车辆违规" min-width="100"/>
          <el-table-column prop="device" label="设备违规" min-width="100"/>
          <el-table-column prop="company" label="其他违规" min-width="100"/>
           <el-table-column prop="pass" label="审核通过" min-width="100"/>
          <el-table-column prop="unPass" label="审核未通过" min-width="100"/>
          <el-table-column prop="checking" label="审核中" min-width="100"/>
          <el-table-column label="未完成任务" min-width="100">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.unfinishTask.length == 0"
                size="mini"
                type="info"
              >查看</el-button>
              <el-button
                v-else
                size="mini"
                type="primary"
                @click="openUnfinish(scope.row.unfinishTask)"
              >查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <h4 class="table-title">每日完成工作量top5</h4>
      <el-col :span="24" v-if="topStaff && topStaff.length>0">
        <div v-for="(w,index) in topStaff" v-bind:key="index" class="top-worker">
          <span class="time-col">
            {{w.scheduleTime}}
          </span>
          <span class="top-cell" v-for = "(s,index) in w.topStaff" v-bind:key="index">
            {{s}}
          </span>
        </div>
      </el-col>
      <el-col v-else>
        <h3 style="text-align:center;">暂无数据</h3>
      </el-col>
    </el-row>
    <div class="dialog-unfinish">
        <dialogUnFinishView :unfinishData ="getUnfinish"/>
    </div>
  </div>
</template>

<script>
import { ajax } from "ajax";
import { mapActions, mapGetters, mapMutations } from "vuex";
import * as echarts from "echarts";
import moment from "moment";
import dialogUnFinishView from "./dialogUnFinishView.vue";
import {extend} from "lodash";

export default {
  name: "Statistics",
  components: {
    dialogUnFinishView
  },
  data() {
    return {
      time: [],
      tableData1: [],
      staffWorkCount: [],
      getUnfinish: [],
      topStaff: [{scheduleTime:'2019-01-01'},{topStaff:[]}],
      getInOut:{
        color: ['#194eff','#00a700'],
        title: {
            text: '进出港统计',
            textStyle:{
              color:'#333',
              fontSize: '14',
            }
        },
        tooltip: {
		    	trigger: 'axis',
		    	axisPointer: { 
		    		type: 'shadow'
		    	}
		    },
        legend: {
          itemWidth: 14,
          itemHeight: 14,
          itemGap: 30,
          x: 'right',
          icon: "circle", 
          data: ['进港','离港']
        },
        xAxis: [
          {
            data: [],
            splitLine: {show:true,lineStyle:{type:'dashed'}},
            max:'4',
            axisLine: {
              lineStyle: {
                type:'dashed',
                color:'#3A3A3A',
                },
              onZero: true,
              nameLocation:'end',//坐标轴名称显示位置。
              axisLabel : {
                interval:0,
                rotate:"45"
              }
            },
          }
        ],
        yAxis : {
          splitLine: {
            show: true,
            lineStyle:{type:'dashed'}
          },
          type : 'value',
          axisLine: {
              lineStyle: {
                type:'dashed',
                color:'rgba(58,58,58,1)',
                }
            },
          splitArea : {show : true,
              areaStyle: {
                  color: ['#f7faff'],
              }},
        },
         series : [
            {
                name:'进港',
                type:'line',
                smooth: true, 
                data: [],
            },
            {
                name:'离港',
                type:'line',
                smooth: true, 
                data:[],
            },
          ]
      },
      getWorkload: {
        backgroundColor: '#fff',
        color: ['#9dcae4','#fcca3d','#2fb1fe','#bea5f6','#7fe7dc','#ffa7a7'],
        title: {
            text: '工作量统计',
            textStyle:{
              color:'#333',
              fontSize: '14',
            } 
        },
        tooltip: {
			    trigger: 'axis',
			    axisPointer: { 
			    	type: 'shadow'
			    }
		    },
        legend: {
          itemWidth: 14,
          itemHeight: 14,
          itemGap: 14,
          x: 'right',
          icon: "circle", 
          data: ['生成任务','不保障任务','操作任务','自动排班任务','完成任务','操作数']
        },
        grid: {
          backgroundColor: '#E6EEF4',
          borderWidth: 1,
          top: 40,
          left: 40,
          right: 19,
          bottom: 40
        },
        xAxis:{
            data: [],
            splitLine: {show:true,lineStyle:{type:'dashed'}},
            max:'4',
            axisLine: {
              lineStyle: {
                type:'dashed',
                color:'#3A3A3A',
                }
            }
        },
        yAxis : {
          splitLine: {
            show: true,
            lineStyle:{type:'dashed'}
          },
          type : 'value',
          axisLine: {
              lineStyle: {
                type:'dashed',
                color:'rgba(58,58,58,1)',
                }
            },
          splitArea : {show : true,
            areaStyle: {
                  color: ['#f5f8fa'],
            }}
        },
        series : [
             {
                 name:'生成任务',
                 type:'bar',
                 data:[],
             },
             {
                 name:'不保障任务',
                 type:'bar',
                 data:[],
             },
             {
                 name:'操作任务',
                 type:'bar',
                 data:[],
             },
              {
                 name:'自动排班任务',
                 type:'bar',
                 data:[],
             },
             {
                 name:'完成任务',
                 type:'bar',
                 data:[],
             },
             {
                 name:'操作数',
                 type:'bar',
                 hoverAnimation:true,
                 data:[],
                 itemStyle: {
                   emphasis: {
                       barBorderRadius: [30,30,0,0]
                   },
                   normal: {
                       barBorderRadius:[30, 30, 0, 0],
                   }
               },
             }, 
          ]
      },
      getViolationNum: {
        color: ['#00a700','#677f94','#ff0000'],
        title: {
              text: '违规统计',
              textStyle:{
                color:'#333',
                fontSize: '14',
              }
            },
        grid: { 
          top: 40,
          left: 40,
          right: 19,
          bottom: 40
        },
        tooltip: {
			trigger: 'axis',
			axisPointer: { 
				type: 'shadow'
			}
		},
        legend: {
          itemWidth: 14,
            itemHeight: 14,
            itemGap: 20,
            x: 'right',
            icon: "circle", 
            data: ['审核通过','审核中','未通过']
          },
        xAxis: [
          {
            data: [],
            splitLine: {show:true,lineStyle:{type:'dashed'}},
            max:'4',
            axisLine: {
              lineStyle: {
                type:'dashed',
                color:'#3A3A3A',
                }
            }
          }
        ],
        yAxis : {
          splitLine: {
            show: true,
            lineStyle:{type:'dashed'}
          },
          type : 'value',
          axisLine: {
              lineStyle: {
                type:'dashed',
                color:'rgba(58,58,58,0.5)',
                }
            },
          splitArea : {show : true,
            areaStyle: {
                  color: ['#f5f8fa'],
                }}
        },
        series : [
            {
                name:'审核通过',
                type:'line',
                smooth: true, 
                data: [],
            },
            {
                name:'审核中',
                type:'line',
                smooth: true, 
                data:[],
            },
            {
                name:'未通过',
                type:'line',
                smooth: true, 
                data:[],
            },
        ]
      },
      getViolationType: {
        color: ['#ff7600','#386eff','#677f95','#a600ff'],
        title: {
            text: '违规类型统计',
            textStyle:{
              color:'#333',
              fontSize: '14',
            }
        },
        tooltip: {
			  trigger: 'axis',
			  axisPointer: { 
			  	type: 'shadow'
		     }
        },
        grid: { 
            top: 40,
            left: 40,
            right: 19,
            bottom: 40
          },
       legend: {
         itemWidth: 14,
         itemHeight: 14,
         itemGap: 20,
         x: 'right',
         icon: "circle", 
         data: ['人员','车辆','设备','其他']
       },
        xAxis: [{
            data: [],
            splitLine: {show:true,lineStyle:{type:'dashed'}},
            max:'4',
            axisLine: {
              lineStyle: {
                type:'dashed',
                color:'#3A3A3A',
                }
            }
          }],
        yAxis : {
          splitLine: {
            show: true,
            lineStyle:{type:'dashed'}
          },
          type : 'value',
          axisLine: {
              lineStyle: {
                type:'dashed',
                color:'rgba(58,58,58,0.5)',
                }
          },
          splitArea : {
              show : true,
              areaStyle: {
                color: ['#f5f8fa'],
              }}//保留网格区域
          },
          series : [
               {
                   name:'人员',
                   type:'line',
                   smooth: true, 
                   data: [],
               },
               {
                   name:'车辆',
                   type:'line',
                   smooth: true, 
                   data:[],
               },
               {
                   name:'设备',
                   type:'line',
                   smooth: true, 
                   data:[],
               },
               {
                   name:'其他',
                   type:'line',
                   smooth: true, 
                   data:[],
               },
          ]
      },
      dateRange: [],
      movementD:[],
      movementA: [],

    };
  },
  created(){
    this.refreshData()
  },
  mounted() {
    this.refreshData()
    this.drawLine()
  },
  methods: {
    created() {
      this.getData();
    },
    openUnfinish(value) {
      this.getUnfinish = value;
      this.$store.dispatch('statistics/updateTaskHandover', { dialogUnFinish: true });
    },
    handleClick() {
        this.refreshData();
    },
   
    getData(data) {
      this.list = data;
      let _this = this;
      let dateRange = [];
      let movementA = [];
      let movementD = [];
      let automaticTask = [];
      let createTask = [];
      let finishTask = [];
      let notGuaranteeTask = [];
      let operateTask = [];
      let operateTotal = [];
      let car =[];
      let company = [];
      let device = [];
      let people = [];
      let checking = [];
      let pass = [];
      let unPass = [];
      let taskDataCount1 = [];
      let staffWorkCount = {};
      let topStaff = [];
      data.topMam = {};
      data.forEach((item,index) => {
        dateRange.push(item.scheduleTime);
        movementA.push(item.movementCount.movementA);
        movementD.push(item.movementCount.movementD);
        automaticTask.push(item.taskDataCount.automaticTask);
        createTask.push(item.taskDataCount.createTask);
        finishTask.push(item.taskDataCount.finishTask);
        notGuaranteeTask.push(item.taskDataCount.notGuaranteeTask);
        operateTask.push(item.taskDataCount.operateTask);
        operateTotal.push(item.taskDataCount.operateTotal);
        let violationType = item.violationType;
        car.push(violationType.car);
        company.push(violationType.company);
        device.push(violationType.device);
        people.push(violationType.people);
        let violationHandle = item.violationHandle;
        checking.push(violationHandle.checking);
        pass.push(violationHandle.pass);
        unPass.push(violationHandle.unPass);
        item.totalCount = extend({},item.totalCount , {scheduleTime:item.scheduleTime});
        taskDataCount1.push(item.totalCount);
        staffWorkCount.item1 = (item.staffWorkCount);
        item.topMam = extend({},{topStaff:item.staffWorkCount},{scheduleTime:item.scheduleTime})
        topStaff.push( item.topMam );
      })  

      this.dateRange = dateRange;
      this.movementA = movementA;
       var movementDReverse = [];
      movementD.forEach((item,index) =>{
        movementDReverse.push(item*-1);
      });
      this.movementD = movementDReverse;
      this.automaticTask = automaticTask;
      this.createTask = createTask;
      this.finishTask = finishTask;
      this.notGuaranteeTask = notGuaranteeTask;
      this.operateTask = operateTask;
      this.operateTotal = operateTotal;
      this.tableData1 = taskDataCount1;
      this.topStaff = topStaff;
      this.staffWorkCount = staffWorkCount;
      this.pass = pass;
      this.unPass = unPass;
      this.checking = checking;
      this.company = company;
      this.car = car;
      this.device = device;
      this.people = people;
      this.getInOutLine = {
        color: ['#194eff','#00a700'],
        title: {
              text: '进出港统计',
              textStyle:{
                color:'#333',
                fontSize: '14',
              }
            },
        tooltip: {
				  trigger: 'axis',
				  axisPointer: { 
				  	type: 'shadow'
				  }
				},
            legend: {
              itemWidth: 14,
              itemHeight: 14,
              itemGap: 30,
              x: 'right',
              icon: "circle", 
              data: ['进港','离港']
            },
            xAxis: [
              {
                // type: 'category',
                data: this.dateRange,
                splitLine: {show:true,lineStyle:{type:'dashed'}},
                max:'4',
                axisLine: {
                  lineStyle: {
                    type:'dashed',
                    color:'#3A3A3A',
                    },
                  onZero: true,
                  nameLocation:'end',//坐标轴名称显示位置。
              axisLabel : {//坐标轴刻度标签的相关设置。
                interval:0,
                rotate:"45"
              }
                },
              }
            ],
            yAxis : {
              splitLine: {
                show: true,
                lineStyle:{type:'dashed'}
              },
              type : 'value',
              axisLine: {
                  lineStyle: {
                    type:'dashed',
                    color:'rgba(58,58,58,1)',
                    }
                },
              splitArea : {show : true,
                  areaStyle: {
                      color: ['#f7faff'],
                  }},
            },
             series : [
                  {
                      name:'进港',
                      type:'line',
                      smooth: true, 
                      data: this.movementA,
                  },
                  {
                      name:'离港',
                      type:'line',
                      smooth: true, 
                      data:this.movementD,
                  },
          ]
      }
      this.getInOutBar = {
        color: ['#194eff','#00a700'],
        title: {
              text: '进出港统计',
              textStyle:{
                color:'#333',
                fontSize: '14',
              }
            },
        tooltip: {
				  trigger: 'axis',
				  axisPointer: { 
				  	type: 'shadow'
          },
          formatter : function(params){
            let res = '';
            params.forEach((item,index) => {
              res += item.marker + item.seriesName+' : ' + Math.abs(item.value)+'<br/>';
             });
            return res = params[0].axisValue + '<br/>' + res;
          },
        },
        grid: {
          top: 40,
          left: 40,
          right: 19,
          bottom: 40
        },
            legend: {
              itemWidth: 14,
              itemHeight: 14,
              itemGap: 30,
              x: 'right',
              icon: "circle", 
              data: ['进港','离港']
            },
            xAxis: [
              {
                data: this.dateRange,
                splitLine: {show:true,lineStyle:{type:'dashed'}},
                max:'4',
                axisLine: {
                  lineStyle: {
                    type:'solid',
                    color:'#3A3A3A',
                    },
                  onZero: true
                },
              }
            ],
            yAxis : {
              splitLine: {
                show: true,
                lineStyle:{type:'dashed'}
              },
              type : 'value',
              axisLine: {
                  lineStyle: {
                    type:'dashed',
                    color:'rgba(58,58,58,1)',
                    }
                },
              splitArea : {show : true,
                  areaStyle: {
                      color: ['#f7faff'],
                  }},//保留网格区域
              axisLabel: {
                formatter: function (value, index) {
                  let result;
                  if(value>0){
                    result = value;
                  }else {
                    result = value * -1;
                  }
                  return result;
                }
              }
            },
             series : [
                  {
                      name:'进港',
                      type:'bar',
                      data: this.movementA,
                      barMaxWidth:20,
                      stack: 'one',
                      hoverAnimation:true,
                      itemStyle: {
                        emphasis: {
                            barBorderRadius: [30,30,0,0]
                        },
                        normal: {
                            barBorderRadius:[30, 30, 0, 0],
                        }
                      },
                      label: {
                        normal: {
                            position: 'inner'
                        }
                      },
                  },
                  {
                      name:'离港',
                      type:'bar',
                      barMaxWidth:20,
                      stack: 'one',
                      data:this.movementD,
                      hoverAnimation:true,
                      itemStyle: {
                        emphasis: {
                            barBorderRadius: [0,0,30,30,]
                        },
                        normal: {
                            barBorderRadius:[0, 0,30, 30,],
                        }
                    },
                  },
          ]
      }
      this.getInOut = this.dateRange.length>7? this.getInOutLine : this.getInOutBar;

      this.getWorkloadBar = {
        backgroundColor: '#fff',
        color: ['#9dcae4','#fcca3d','#2fb1fe','#bea5f6','#7fe7dc','#ffa7a7'],
        title: {
            text: '工作量统计',
            textStyle:{
              color:'#333',
              fontSize: '14',
            }
            
        },
        tooltip: {
				  trigger: 'axis',
				  axisPointer: { 
                      type: 'shadow',
                      lineStyle: {
                       backgroundColor:'#fff',
                    },
                  },
				},
          legend: {
            itemWidth: 14,
            itemHeight: 14,
            itemGap: 14,
            x: 'right',
            icon: "circle", 
            data: ['生成任务','不保障任务','操作任务','自动排班任务','完成任务','操作数']
          },
          grid: {
            backgroundColor: '#E6EEF4',
            borderWidth: 1,
            top: 40,
            left: 40,
            right: 19,
            bottom: 40
          },
            xAxis:
              {
                data: this.dateRange,
                splitLine: {show:true,lineStyle:{type:'dashed'}},
                max:'4',
                axisLine: {
                  lineStyle: {
                    type:'dashed',
                    color:'#3A3A3A',
                    }
                }
              }
            ,
            yAxis : {
              splitLine: {
                show: true,
                lineStyle:{type:'dashed'}
              },
              type : 'value',
              axisLine: {
                  lineStyle: {
                    type:'dashed',
                    color:'rgba(58,58,58,1)',
                    }
                },
              splitArea : {show : true,
                areaStyle: {
                      color: ['#f5f8fa'],
                    }}//保留网格区域
            },
             series : [
                  {
                      name:'生成任务',
                      type:'bar',
                      data:this.createTask,
                      hoverAnimation:true,
                      barMaxWidth:20,
                      itemStyle: {
                        emphasis: {
                            barBorderRadius: [30,30,0,0]
                        },
                        normal: {
                            barBorderRadius:[30, 30, 0, 0],
                        }
                    },
                  },
                  {
                      name:'不保障任务',
                      type:'bar',
                      data:this.finishTask,
                      hoverAnimation:true,
                      barMaxWidth:20,
                      itemStyle: {
                        emphasis: {
                            barBorderRadius: [30,30,0,0]
                        },
                        normal: {
                            barBorderRadius:[30, 30, 0, 0],
                        }
                    },
                  },
                  {
                      name:'操作任务',
                      type:'bar',
                      barMaxWidth:20,
                      data:this.operateTask,
                      hoverAnimation:true,
                      itemStyle: {
                        emphasis: {
                            barBorderRadius: [30,30,0,0]
                        },
                        normal: {
                            barBorderRadius:[30, 30, 0, 0],
                        }
                    },
                  },
                   {
                      name:'自动排班任务',
                      type:'bar',
                      barMaxWidth:20,
                      data:this.automaticTask,
                      hoverAnimation:true,
                      itemStyle: {
                        emphasis: {
                            barBorderRadius: [30,30,0,0]
                        },
                        normal: {
                            barBorderRadius:[30, 30, 0, 0],
                        }
                    },
                  },
                  {
                      name:'完成任务',
                      type:'bar',
                      barMaxWidth:20,
                      data:this.finishTask,
                      hoverAnimation:true,
                      itemStyle: {
                        emphasis: {
                            barBorderRadius: [30,30,0,0]
                        },
                        normal: {
                            barBorderRadius:[30, 30, 0, 0],
                        }
                    },
                  },
                  {
                      name:'操作数',
                      type:'bar',
                      barMaxWidth:20,
                      hoverAnimation:true,
                      data:this.operateTotal,
                      itemStyle: {
                        emphasis: {
                            barBorderRadius: [30,30,0,0]
                        },
                        normal: {
                            barBorderRadius:[30, 30, 0, 0],
                        }
                    },
                  }, 
          ]
        }

        this.getWorkloadLine = {
        backgroundColor: '#fff',
        color: ['#9dcae4','#fcca3d','#2fb1fe','#bea5f6','#7fe7dc','#ffa7a7'],
        title: {
            text: '工作量统计',
            textStyle:{
              color:'#333',
              fontSize: '14',
            }
            
        },
        tooltip: {
				  trigger: 'axis',
				  axisPointer: { 
				  	type: 'shadow'
				  }
				},
          legend: {
            itemWidth: 14,
            itemHeight: 14,
            itemGap: 14,
            x: 'right',
            icon: "circle", 
            data: ['生成任务','不保障任务','操作任务','自动排班任务','完成任务','操作数']
          },
          grid: {
            backgroundColor: '#E6EEF4',
            borderWidth: 1,
            top: 40,
            left: 40,
            right: 19,
            bottom: 40
          },
            xAxis:
              {
                data: this.dateRange,
                splitLine: {show:true,lineStyle:{type:'dashed'}},
                max:'4',
                axisLine: {
                  lineStyle: {
                    type:'dashed',
                    color:'#3A3A3A',
                    }
                }
              }
            ,
            yAxis : {
              splitLine: {
                show: true,
                lineStyle:{type:'dashed'}
              },
              type : 'value',
              axisLine: {
                  lineStyle: {
                    type:'dashed',
                    color:'rgba(58,58,58,1)',
                    }
                },
              splitArea : {show : true,
                areaStyle: {
                      color: ['#f5f8fa'],
                    }}//保留网格区域
            },
             series : [
                  {
                      name:'生成任务',
                      type:'line',
                      data:this.createTask,
                      smooth: true, 
                  },
                  {
                      name:'不保障任务',
                      type:'line',
                      data:this.finishTask,
                      smooth: true, 
                  },
                  {
                      name:'操作任务',
                      type:'line',
                      data:this.operateTask,
                      smooth: true, 
                  },
                   {
                      name:'自动排班任务',
                      type:'line',
                      data:this.automaticTask,
                      smooth: true, 

                  },
                  {
                      name:'完成任务',
                      type:'line',
                      data:this.finishTask,
                      smooth: true, 

                  },
                  {
                      name:'操作数',
                      type:'line',
                      hoverAnimation:true,
                      data:this.operateTotal,
                      smooth: true,
                  }, 
          ]
        }

        this.getViolationNumLine = {
        color: ['#00a700','#677f94','#ff0000'],
        title: {
              text: '违规统计',
              textStyle:{
                color:'#333',
                fontSize: '14',
              }
            },
          grid: { 
            top: 40,
            left: 40,
            right: 19,
            bottom: 40
          },
          tooltip: {
				  trigger: 'axis',
				  axisPointer: { 
				  	type: 'shadow'
				  }
				},
            legend: {
              itemWidth: 14,
              itemHeight: 14,
              itemGap: 20,
              x: 'right',
              icon: "circle", 
              data: ['审核通过','审核中','未通过']
            },
            xAxis: [
              {
                data: this.dateRange,
                splitLine: {show:true,lineStyle:{type:'dashed'}},
                max:'4',
                axisLine: {
                  lineStyle: {
                    type:'dashed',
                    color:'#3A3A3A',
                    }
                }
              }
            ],
            yAxis : {
              splitLine: {
                show: true,
                lineStyle:{type:'dashed'}
              },
              type : 'value',
              axisLine: {
                  lineStyle: {
                    type:'dashed',
                    color:'rgba(58,58,58,0.5)',
                    }
                },
              splitArea : {show : true,
                areaStyle: {
                      color: ['#f5f8fa'],
                    }}
            },
             series : [
                  {
                      name:'审核通过',
                      type:'line',
                      smooth: true, 
                      data: this.pass,
                  },
                  {
                      name:'审核中',
                      type:'line',
                      smooth: true, 
                      data:this.checking,
                  },
                  {
                      name:'未通过',
                      type:'line',
                      smooth: true, 
                      data:this.unPass,
                  },
          ]
      }

      this.getViolationNumBar = {
        color: ['#00a700','#677f94','#ff0000'],
        title: {
              text: '违规统计',
              textStyle:{
                color:'#333',
                fontSize: '14',
              }
            },
          grid: { 
            top: 40,
            left: 40,
            right: 19,
            bottom: 40
          },
          tooltip: {
				  trigger: 'axis',
				  axisPointer: { 
				  	type: 'shadow'
				  }
				},
            legend: {
              itemWidth: 14,
              itemHeight: 14,
              itemGap: 20,
              x: 'right',
              icon: "circle", 
              data: ['审核通过','审核中','未通过']
            },
            xAxis: [
              {
                data: this.dateRange,
                splitLine: {show:true,lineStyle:{type:'dashed'}},
                max:'4',
                axisLine: {
                  lineStyle: {
                    type:'dashed',
                    color:'#3A3A3A',
                    }
                }
              }
            ],
            yAxis : {
              splitLine: {
                show: true,
                lineStyle:{type:'dashed'}
              },
              type : 'value',
              axisLine: {
                  lineStyle: {
                    type:'dashed',
                    color:'rgba(58,58,58,0.5)',
                    }
                },
              splitArea : {show : true,
                areaStyle: {
                      color: ['#f5f8fa'],
                    }}
            },
             series : [
                  {
                      name:'审核通过',
                      type:'bar',
                      barMaxWidth:20,
                      data: this.pass,
                      hoverAnimation:true,
                      itemStyle: {
                        emphasis: {
                            barBorderRadius: [30,30,0,0]
                        },
                        normal: {
                            barBorderRadius:[30, 30, 0, 0],
                        }
                    },
                  },
                  {
                      name:'审核中',
                      type:'bar',
                      barMaxWidth:20,
                      data:this.checking,
                      hoverAnimation:true,
                      itemStyle: {
                        emphasis: {
                            barBorderRadius: [30,30,0,0]
                        },
                        normal: {
                            barBorderRadius:[30, 30, 0, 0],
                        }
                    },
                  },
                  {
                      name:'未通过',
                      type:'bar',
                      barMaxWidth:20,
                      data:this.unPass,
                      hoverAnimation:true,
                      itemStyle: {
                        emphasis: {
                            barBorderRadius: [30,30,0,0]
                        },
                        normal: {
                            barBorderRadius:[30, 30, 0, 0],
                        }
                    },
                  },
          ]
      }

      this.getViolationTypeLine = {
        color: ['#ff7600','#386eff','#677f95','#a600ff'],
        title: {
              text: '违规类型统计',
              textStyle:{
                color:'#333',
                fontSize: '14',
              }
            },
            tooltip: {
				  trigger: 'axis',
				  axisPointer: { 
				  	type: 'shadow'
				  }
        },
        grid: { 
            top: 40,
            left: 40,
            right: 19,
            bottom: 40
          },
            legend: {
              itemWidth: 14,
              itemHeight: 14,
              itemGap: 20,
              x: 'right',
              icon: "circle", 
              data: ['人员','车辆','设备','其他']
            },
            xAxis: [
              {
                data: this.dateRange,
                splitLine: {show:true,lineStyle:{type:'dashed'}},
                max:'4',
                axisLine: {
                  lineStyle: {
                    type:'dashed',
                    color:'#3A3A3A',
                    }
                }
              }
            ],
            yAxis : {
              splitLine: {
                show: true,
                lineStyle:{type:'dashed'}
              },
              type : 'value',
              axisLine: {
                  lineStyle: {
                    type:'dashed',
                    color:'rgba(58,58,58,0.5)',
                    }
                },
              splitArea : {show : true,
                areaStyle: {
                      color: ['#f5f8fa'],
                    }}
            },
             series : [
                  {
                      name:'人员',
                      type:'line',
                      smooth: true, 
                      data: this.people,
                  },
                  {
                      name:'车辆',
                      type:'line',
                      smooth: true, 
                      data:this.car,
                  },
                  {
                      name:'设备',
                      type:'line',
                      smooth: true, 
                      data:this.device,
                  },
                  {
                      name:'其他',
                      type:'line',
                      smooth: true, 
                      data:this.company,
                  },
          ]
      }
      this.getViolationTypeBar = {
        color: ['#ff7600','#386eff','#677f95','#a600ff'],
        title: {
              text: '违规类型统计',
              textStyle:{
                color:'#333',
                fontSize: '14',
              }
            },
            tooltip: {
				  trigger: 'axis',
				  axisPointer: { 
				  	type: 'shadow'
				  }
        },
        grid: { 
            top: 40,
            left: 40,
            right: 19,
            bottom: 40
          },
            legend: {
              itemWidth: 14,
              itemHeight: 14,
              itemGap: 20,
              x: 'right',
              icon: "circle", 
              data: ['人员','车辆','设备','其他']
            },
            xAxis: [
              {
                data: this.dateRange,
                splitLine: {show:true,lineStyle:{type:'dashed'}},
                max:'4',
                axisLine: {
                  lineStyle: {
                    type:'dashed',
                    color:'#3A3A3A',
                    }
                }
              }
            ],
            yAxis : {
              splitLine: {
                show: true,
                lineStyle:{type:'dashed'}
              },
              type : 'value',
              axisLine: {
                  lineStyle: {
                    type:'dashed',
                    color:'rgba(58,58,58,0.5)',
                    }
                },
              splitArea : {show : true,
                areaStyle: {
                      color: ['#f5f8fa'],
                    }}
            },
             series : [
                  {
                      name:'人员',
                      type:'bar',
                      barMaxWidth:20,
                      data: this.people,
                      hoverAnimation:true,
                      itemStyle: {
                        emphasis: {
                            barBorderRadius: [30,30,0,0]
                        },
                        normal: {
                            barBorderRadius:[30, 30, 0, 0],
                        }
                    },
                  },
                  {
                      name:'车辆',
                      type:'bar',
                      barMaxWidth:20,
                      data:this.car,
                      hoverAnimation:true,
                      itemStyle: {
                        emphasis: {
                            barBorderRadius: [30,30,0,0]
                        },
                        normal: {
                            barBorderRadius:[30, 30, 0, 0],
                        }
                    },
                  },
                  {
                      name:'设备',
                      type:'bar',
                      barMaxWidth:20,
                      data:this.device,
                      hoverAnimation:true,
                      itemStyle: {
                        emphasis: {
                            barBorderRadius: [30,30,0,0]
                        },
                        normal: {
                            barBorderRadius:[30, 30, 0, 0],
                        }
                    },
                  },
                  {
                      name:'其他',
                      type:'bar',
                      barMaxWidth:20,
                      data:this.company,
                      hoverAnimation:true,
                      itemStyle: {
                        emphasis: {
                            barBorderRadius: [30,30,0,0]
                        },
                        normal: {
                            barBorderRadius:[30, 30, 0, 0],
                        }
                    },
                  },
          ]
      }
    //  this.getInOut = this.dateRange.length>7? this.getInOutLine : this.getInOutBar;
     this.getWorkload = this.dateRange.length>7? this.getWorkloadLine : this.getWorkloadBar;
     this.getViolationNum = this.dateRange.length>7? this.getViolationNumLine : this.getViolationNumBar;
     this.getViolationType = this.dateRange.length>7? this.getViolationTypeLine : this.getViolationTypeBar;

    },
    refreshData() {
      let timeArr = this.time;
      // console.log(timeArr);
      let startDate;
      let endDate;
      let _this = this;
      if(timeArr && timeArr.length){
          if(timeArr[0] == timeArr[1]){
              startDate = moment(timeArr[0]).format("YYYY-MM-DD");
              endDate = moment(timeArr[1]).format("YYYY-MM-DD");
          } else {
              startDate = timeArr[0];
              startDate = moment(startDate).format("YYYY-MM-DD");
              endDate = timeArr[1];
              endDate = moment(endDate).format("YYYY-MM-DD")
          }  
      } else {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
          const date = [start, end]
          startDate = moment(date[0]).format("YYYY-MM-DD");
          endDate = moment(date[1]).format("YYYY-MM-DD");
      }
      let params = {"startTime":startDate,"endTime":endDate};
      ajax.post("statistics",params).then(data => {
        let statistics = data;
        this.getData(data);
      });
    },
    drawLine() {
      let _this = this;
      let workloadChart = echarts.init(document.getElementById("workload"));
      let inOutChart = echarts.init(document.getElementById("in-out"));
      let violationTypeChart = echarts.init(document.getElementById("violation-type"));
      let violationNumChart = echarts.init(document.getElementById("violation-sum"));
      workloadChart.setOption(_this.getWorkload);
      inOutChart.setOption(_this.getInOut);
      violationTypeChart.setOption(_this.getViolationType);
      violationNumChart.setOption(_this.getViolationNum);
    }
  },
  updated(){
    this.drawLine()
  },
  beforeMount() {
    this.refreshData();
  }
};

</script>