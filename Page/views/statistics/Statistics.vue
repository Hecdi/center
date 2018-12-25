<template>
  <div class="statistics">
    <el-button @click="handleClick1">图标渲染顺序测试</el-button>
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
        <el-card shadow="always">
          <!-- <h2>违规类型统计</h2> -->
          <div id="violation-type"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <!-- <h2>违规统计</h2> -->
          <div id="violation-sum"></div>
        </el-card>
      </el-col>
      <h1>Table</h1>
      <el-col :span="24">
        <el-table :data="tableData1" stripe style="width: 100%">
          <el-table-column type="index" label="序号" width="50"/>
          <el-table-column prop="date" label="日期" width="120"/>
          <el-table-column prop="clickRate" label="点击率" min-width="80"/>
          <el-table-column prop="createTask" label="生成任务" min-width="180"/>
          <el-table-column prop="finishRate" label="完成率" min-width="180"/>
          <el-table-column prop="finishTask" label="完成任务" min-width="120"/>
          <el-table-column prop="movementA" label="进港航班" width="120"/>
          <el-table-column prop="movementD" label="离港航班" width="120"/>
          <el-table-column prop="notGuaranteeTask" label="不保障任务" width="120"/>
          <el-table-column prop="operateTask" label="操作任务" width="120"/>
          <el-table-column prop="operateTotal" label="操作总数" width="120"/>
        </el-table>
      </el-col>
      <h1>完成工作量top5</h1>
      <el-col :span="24">
        <div v-for="w in staffWorkCount" v-bind:key="w.time" class="top-worker">
          <span class="time-col">{{w}}</span>
          <!-- <span>{{w.name1}}</span>
          <span>{{w.time2}}</span>
          <span>{{w.name3}}</span>
          <span>{{w.time4}}</span>
          <span>{{w.name5}}</span> -->
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { ajax } from "ajax";
import { mapActions, mapGetters, mapMutations } from "vuex";
import * as echarts from "echarts";
import moment from "moment";

export default {
  name: "Statistics",
  components: {
    // TopBar,
  },
  computed: {
    ...mapGetters({ cards: "processedCards" })
  },
  data() {
    // debugger;
    return {
      activeName: "second",
      status: "全部",
      currentView: "all",
      time: [],
      tableData1: [],
      staffWorkCount: [],
      tableData: [
        {
          date: "2016",
          name: "王虎",
          address: "上海"
        },
        {
          date: "05-04",
          name: "小虎",
          address: "普陀区"
        },
        {
          date: "2016",
          name: "王小",
          address: "金沙江路"
        },
        {
          date: "2013",
          name: "王虎",
          address: "1516"
        }
      ],
      works: [
        {
          time: "2018-12-03",
          name1: "章三",
          name2: "里斯",
          name3: "王麻子",
          name4: "哈哈哈",
          name5: "超越"
        },
        {
          time: "2018-12-23",
          name1: "章三",
          name2: "里斯",
          name3: "王麻子",
          name4: "哈哈哈",
          name5: "超越"
        },
        {
          time: "2018-12-13",
          name1: "章三",
          name2: "里斯",
          name3: "王麻子",
          name4: "哈哈哈",
          name5: "超越"
        },
        {
          time: "2018-12-02",
          name1: "章三",
          name2: "里斯",
          name3: "王麻子",
          name4: "哈哈哈",
          name5: "超越"
        },
        {
          time: "2018-11-23",
          name1: "章三",
          name2: "里斯",
          name3: "王麻子",
          name4: "哈哈哈",
          name5: "超越"
        },
        {
          time: "2018-12-09",
          name1: "章三",
          name2: "里斯",
          name3: "王麻子",
          name4: "哈哈哈",
          name5: "超越"
        },
      ],
    getOption: {
          title: {
              text: '进出港统计',
            },
            legend: {
              data: ['进港','离港']
            },
            xAxis: [
              {
                // type: 'category',
                data: [],
              }
            ],
            yAxis : [
                  {
                      type : 'value'
                  }
            ],
             series : [
                  {
                      name:'进港',
                      type:'bar',
                      data:[],
                  },
                  {
                      name:'离港',
                      type:'bar',
                      data:[],
                  },
          ]
        },
        getOption1: {
          title: {
              text: '工作量统计',
            },
            legend: {
              data: ['生成任务','不保障任务','操作任务','自动排班任务','完成任务','操作数']
            },
            xAxis: [
              {
                data: [],
              }
            ],
            yAxis : [
                  {
                      type : 'value'
                  }
            ],
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
                      data:[],
                  },  
              ]
          },
          getOption3: {
          title: {
              text: '工作量统计',
            },
            legend: {
              data: ['生成任务','不保障任务','操作任务','自动排班任务','完成任务','操作数']
            },
            xAxis: [
              {
                data: [],
              }
            ],
            yAxis : [
                  {
                      type : 'value'
                  }
            ],
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
                      data:[],
                  },  
              ]
          },
          getOption4: {
          title: {
              text: '工作量统计',
            },
            legend: {
              data: ['生成任务','不保障任务','操作任务','自动排班任务','完成任务','操作数']
            },
            xAxis: [
              {
                data: [],
              }
            ],
            yAxis : [
                  {
                      type : 'value'
                  }
            ],
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
                      data:[],
                  },  
              ]
          },
//     }
// },
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
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleClick1(){
      this.refreshData();
      this.drawLine();
    },
    getData(data) {
      // this.$store.dispatch("violation/getData", data);
      this.list = data;
      let _this = this;
      // for(let i in  data){

      //     console.log(i);
      // }
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
      let staffWorkCount = [];
      data.forEach((item,index) => {
        console.log(item);
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
        taskDataCount1.push(item.taskDataCount);
        staffWorkCount.push(item.staffWorkCount);
        staffWorkCount[index].push(item.scheduleTime);
      })  

      this.dateRange = dateRange;
      this.movementA = movementA;
      this.movementD = movementD;
      this.createTask = createTask;
      this.finishTask = finishTask;
      this.notGuaranteeTask = notGuaranteeTask;
      this.operateTask = operateTask;
      this.operateTotal = operateTotal;
      this.tableData1 = taskDataCount1;
      this.staffWorkCount = staffWorkCount;
      console.log(staffWorkCount);
      console.log(this.tableData1);
      this.getOption = {
        color: ['#194eff','#00a700'],
        title: {
              text: '进出港统计',
              textStyle:{
                color:'#333',
                fontSize: '14',
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
                    color:'rgba(58,58,58,1)',
                    }
                },
              splitArea : {show : true,
                areaStyle: {
                      color: ['#f7faff'],
                    }}//保留网格区域
            },
             series : [
                  {
                      name:'进港',
                      type:'line',
                      // symbol:'none',
                      smooth: true, 
                      data: this.movementA,
                  },
                  {
                      name:'离港',
                      type:'line',
                      // symbol:'none',
                      smooth: true, 
                      data:this.movementD,
                  },
          ]
      }
      this.getOption1 = {
        backgroundColor: '#fff',
        color: ['#9dcae4','#fcca3d','#2fb1fe','#bea5f6','#7fe7dc','#ffa7a7'],
          title: {
              text: '工作量统计',
              textStyle:{
                color:'#333',
                fontSize: '14',
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
            // width: {totalWidth} - x - x2,
            // height: {totalHeight} - y - y2,
            backgroundColor: '#E6EEF4',
            borderWidth: 1,
            // borderColor: '#ccc',
            // borderStyle: 'dashed',
          },
            xAxis:
              {
                // type: 'category',
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
                  },
                  {
                      name:'不保障任务',
                      type:'bar',
                      data:this.finishTask,
                  },
                  {
                      name:'操作任务',
                      type:'bar',
                      data:this.operateTask,
                  },
                   {
                      name:'自动排班任务',
                      type:'bar',
                      data:this.automaticTask,
                  },
                  {
                      name:'完成任务',
                      type:'bar',
                      data:this.finishTask,
                  },
                  {
                      name:'操作数',
                      type:'bar',
                      hoverAnimation:true,
                      data:this.operateTotal,
                      itemStyle: {
                        //柱形图圆角，鼠标移上去效果，如果只是一个数字则说明四个参数全部设置为那么多
                        emphasis: {
                            barBorderRadius: [30,30,0,0]
                        },
                        normal: {
                            //柱形图圆角，初始化效果
                            barBorderRadius:[30, 30, 0, 0],
                            // label: {
                            //     show: true,//是否展示
                            //     textStyle: {
                            //         fontWeight:'bolder',
                            //         fontSize : '12',
                            //         fontFamily : '微软雅黑',
                            //     }
                            // }
                        }
                    },
                  }, 
          ]
        }

        this.getOption3 = {
        color: ['#00a700','#677f94','#ff0000'],
        title: {
              text: '违规统计',
              textStyle:{
                color:'#333',
                fontSize: '14',
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
                    }}//保留网格区域
            },
             series : [
                  {
                      name:'审核通过',
                      type:'line',
                      // symbol:'none',
                      smooth: true, 
                      data: this.movementA,
                  },
                  {
                      name:'审核中',
                      type:'line',
                      // symbol:'none',
                      smooth: true, 
                      data:this.movementD,
                  },
                  {
                      name:'未通过',
                      type:'line',
                      smooth: true, 
                      data:this.movementD,
                  },
          ]
      }

      this.getOption4 = {
        color: ['#ff7600','#386eff','#677f95','#a600ff'],
        title: {
              text: '违规类型统计',
              textStyle:{
                color:'#333',
                fontSize: '14',
              }
            },
            legend: {
              itemWidth: 14,
              itemHeight: 14,
              itemGap: 20,
              x: 'right',
              icon: "circle", 
              data: ['人员','车辆','设备','单位']
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
                    }}//保留网格区域
            },
             series : [
                  {
                      name:'人员',
                      type:'line',
                      smooth: true, 
                      data: this.movementA,
                  },
                  {
                      name:'车辆',
                      type:'line',
                      smooth: true, 
                      data:this.movementD,
                  },
                  {
                      name:'设备',
                      type:'line',
                      smooth: true, 
                      data:this.movementD,
                  },
                  {
                      name:'单位',
                      type:'line',
                      smooth: true, 
                      data:this.movementD,
                  },
          ]
      }


    },
    refreshData() {
      let timeArr = this.time;
      let startDate;
      let endDate;
      let that = this;
      if(timeArr){
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
          startDate = new Date(new Date(new Date().toLocaleDateString()).getTime());
          startDate = moment(startDate).format("YYYY-MM-DD");
          endDate = startDate;
      }
      let params = {"startTime":startDate,"endTime":endDate};
      console.log(params);
      ajax.post("statistics",params).then(data => {
        console.log(data);
        let statistics = data;
        this.getData(data);
      });
    },
    setOption3() {
      let _this = this;
            //进出港统计
          let option3 = {
            title: {
              text: '进出港统计',
            },
            legend: {
              data: ['进港','离港']
            },
            xAxis: [
              {
                // type: 'category',
                data: _this.dateRange,
              }
            ],
            yAxis : [
                  {
                      type : 'value'
                  }
            ],
             series : [
                  {
                      name:'进港',
                      type:'bar',
                      data:_this.movementA,
                  },
                  {
                      name:'离港',
                      type:'bar',
                      data:_this.movementD,
                  },
          ]
        };
        return option3;
      },
    drawLine() {
      let _this = this;
      var myChart = echarts.init(document.getElementById("workload"));
      var myChart1 = echarts.init(document.getElementById("in-out"));
      var myChart2 = echarts.init(document.getElementById("violation-type"));
      var myChart3 = echarts.init(document.getElementById("violation-sum"));

      let option = {
        legend: {},
        tooltip: {},
        dataset: {
          source: [
            ["product", "2015", "2016", "2017"],
            ["Matcha Latte", 43.3, 85.8, 93.7],
            ["Milk Tea", 83.1, 73.4, 55.1],
            ["Cheese Cocoa", 86.4, 65.2, 82.5],
            ["Walnut Brownie", 72.4, 53.9, 39.1]
          ]
        },
        xAxis: { type: "category" },
        yAxis: {},
        series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }]
      };

      let option1 = {
        title: {
          text: "异步数据加载示例"
        },
        tooltip: {},
        legend: {
          data: ["销量"]
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      };


console.log(_this.setOption3());
console.log(_this.getOption);

      myChart.setOption(_this.getOption1);
      myChart1.setOption(_this.getOption);
      myChart2.setOption(_this.getOption3);
      myChart3.setOption(_this.getOption4);
      myChart.on('axisareaselected', function () {
      var series0 = myChart.getModel().getSeries()[0];
      var series1 = myChart.getModel().getSeries()[1];
      var indices0 = series0.getRawIndicesByActiveState('active');
      var indices1 = series1.getRawIndicesByActiveState('active');
      console.log(indices0, indices1);
    });
    }
  },
  // updated(){
  //   this.drawLine()
  // },
  beforeMount() {
    this.refreshData();
    // this.drawLine();
  }
};




</script>