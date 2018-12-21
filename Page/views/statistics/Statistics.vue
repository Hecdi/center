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
      <el-col :span="24">
        <div id="workload"></div>
      </el-col>
      <el-col :span="24">
        <div id="in-out"></div>
      </el-col>
      <el-col :span="12">
        <el-card shadow="always">
          <h2>违规类型统计</h2>
          <div id="violation-type"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <h2>违规统计</h2>
          <div id="violation-sum"></div>
        </el-card>
      </el-col>
      <h1>Table</h1>
      <el-col :span="24">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="date" label="机型" min-width="80"/>
          <el-table-column prop="name" label="机类" min-width="180"/>
          <el-table-column prop="address" label="航线" min-width="180"/>
          <el-table-column prop="date" label="预达" min-width="120"/>
          <el-table-column prop="name" label="计达" width="120"/>
          <el-table-column prop="address" label="实达" width="120"/>
          <el-table-column prop="date" label="前飞" width="120"/>
          <el-table-column prop="name" label="登机" width="120"/>
          <el-table-column prop="address" label="协关" width="120"/>
          <el-table-column prop="address" label="计飞" width="120"/>
          <el-table-column prop="date" label="实飞" width="120"/>
          <el-table-column prop="name" label="引导车" width="120"/>
          <el-table-column prop="address" label="引导人员" width="120"/>
        </el-table>
      </el-col>
      <h1>完成工作量top5</h1>
      <el-col :span="24">
        <div v-for="w in works" v-bind:key="w.time" class="top-worker">
          <span class="time-col">{{w.time}}</span>
          <span>{{w.name1}}</span>
          <span>{{w.time2}}</span>
          <span>{{w.name3}}</span>
          <span>{{w.time4}}</span>
          <span>{{w.name5}}</span>
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
      })  

      this.dateRange = dateRange;
      this.movementA = movementA;
      this.movementD = movementD;
      this.createTask = createTask;
      this.finishTask = finishTask;
      this.notGuaranteeTask = notGuaranteeTask;
      this.operateTask = operateTask;
      this.operateTotal = operateTotal;
      this.getOption = {
        title: {
              text: '进出港统计',
            },
            legend: {
              data: ['进港','离港']
            },
            xAxis: [
              {
                // type: 'category',
                data: this.dateRange,
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
                      data: this.movementA,
                  },
                  {
                      name:'离港',
                      type:'bar',
                      data:this.movementD,
                  },
          ]
      }
      this.getOption1 = {
          title: {
              text: '工作量统计',
            },
            legend: {
              data: ['生成任务','不保障任务','操作任务','自动排班任务','完成任务','操作数']
            },
            xAxis: [
              {
                // type: 'category',
                data: this.dateRange,
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
                      data:this.operateTotal,
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
      myChart2.setOption(option1);
      myChart3.setOption(option);
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