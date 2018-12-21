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

    <!-- <div v-on:click="drawLine">test</div> -->
  </div>
</template>

<script>
import { ajax } from "ajax";
import { mapActions, mapGetters, mapMutations } from "vuex";
import * as echarts from "echarts";

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
      time: "",
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
      test2:{ "2018-12-20": {
            "movementCount": {
                "movementD": 683,
                "movementA": 889
            },
            "violationType": {
                "car": 1,
                "company": 0,
                "people": 0,
                "device": 0
            },
            "violationHandle": {
                "unPass": 0,
                "checking": 1,
                "pass": 0
            },
            "taskDataCount": {
                "finishTask": 1,
                "operateTotal": 35,
                "createTask": 27,
                "automaticTask": 0,
                "notGuaranteeTask": 1,
                "operateTask": 2
            },
            "staffWorkCount": [
                "u4be9fc7ee7dc4fc399d4cc0f065cc313(1)",
                "u58f07a49719446a188b8687cd0da6c8c(1)"
            ],
            "totalCount": {
                "finishRate": "3%",
                "clickRate": "7%",
                "finishTask": 1,
                "operateTotal": 35,
                "movementD": 683,
                "movementA": 889,
                "createTask": 27,
                "notGuaranteeTask": 1,
                "operateTask": 2
            }
        },
      },

      test1:[ {
            "movementCount": {
                "movementD": 683,
                "movementA": 889
            },
            "violationType": {
                "car": 1,
                "company": 0,
                "people": 0,
                "device": 0
            },
            "violationHandle": {
                "unPass": 0,
                "checking": 1,
                "pass": 0
            },
            "taskDataCount": {
                "finishTask": 1,
                "operateTotal": 35,
                "createTask": 27,
                "automaticTask": 0,
                "notGuaranteeTask": 1,
                "operateTask": 2
            },
            "staffWorkCount": [
                "u4be9fc7ee7dc4fc399d4cc0f065cc313(1)",
                "u58f07a49719446a188b8687cd0da6c8c(1)"
            ],
            "totalCount": {
                "finishRate": "3%",
                "clickRate": "7%",
                "finishTask": 1,
                "operateTotal": 35,
                "movementD": 683,
                "movementA": 889,
                "createTask": 27,
                "notGuaranteeTask": 1,
                "operateTask": 2
            },
            "scheduleTime": "2018-12-11",
        },
         {
            "movementCount": {
                "movementD": 683,
                "movementA": 889
            },
            "violationType": {
                "car": 1,
                "company": 0,
                "people": 0,
                "device": 0
            },
            "violationHandle": {
                "unPass": 0,
                "checking": 1,
                "pass": 0
            },
            "taskDataCount": {
                "finishTask": 1,
                "operateTotal": 35,
                "createTask": 27,
                "automaticTask": 0,
                "notGuaranteeTask": 1,
                "operateTask": 2
            },
            "staffWorkCount": [
                "u4be9fc7ee7dc4fc399d4cc0f065cc313(1)",
                "u58f07a49719446a188b8687cd0da6c8c(1)"
            ],
            "totalCount": {
                "finishRate": "3%",
                "clickRate": "7%",
                "finishTask": 1,
                "operateTotal": 35,
                "movementD": 683,
                "movementA": 889,
                "createTask": 27,
                "notGuaranteeTask": 1,
                "operateTask": 2
            },
            "scheduleTime": "2018-12-11",
        },
      ],
      mockData: {
    "data": {
        "2018-12-20": {
            "movementCount": {
                "movementD": 683,
                "movementA": 889
            },
            "violationType": {
                "car": 1,
                "company": 0,
                "people": 0,
                "device": 0
            },
            "violationHandle": {
                "unPass": 0,
                "checking": 1,
                "pass": 0
            },
            "taskDataCount": {
                "finishTask": 1,
                "operateTotal": 35,
                "createTask": 27,
                "automaticTask": 0,
                "notGuaranteeTask": 1,
                "operateTask": 2
            },
            "staffWorkCount": [
                "u4be9fc7ee7dc4fc399d4cc0f065cc313(1)",
                "u58f07a49719446a188b8687cd0da6c8c(1)"
            ],
            "totalCount": {
                "finishRate": "3%",
                "clickRate": "7%",
                "finishTask": 1,
                "operateTotal": 35,
                "movementD": 683,
                "movementA": 889,
                "createTask": 27,
                "notGuaranteeTask": 1,
                "operateTask": 2
            }
        },
        "2018-12-19": {
            "movementCount": {
                "movementD": 936,
                "movementA": 901
            },
            "violationType": {
                "car": 9,
                "company": 0,
                "people": 0,
                "device": 0
            },
            "violationHandle": {
                "unPass": 7,
                "checking": 2,
                "pass": 0
            },
            "taskDataCount": {
                "finishTask": 0,
                "operateTotal": 104,
                "createTask": 65,
                "automaticTask": 0,
                "notGuaranteeTask": 7,
                "operateTask": 4
            },
            "staffWorkCount": [],
            "totalCount": {
                "finishRate": "0%",
                "clickRate": "6%",
                "finishTask": 0,
                "operateTotal": 104,
                "movementD": 936,
                "movementA": 901,
                "createTask": 65,
                "notGuaranteeTask": 7,
                "operateTask": 4
            }
        },
        "2018-12-18": {
            "movementCount": {
                "movementD": 939,
                "movementA": 916
            },
            "violationType": {
                "car": 21,
                "company": 0,
                "people": 1,
                "device": 0
            },
            "violationHandle": {
                "unPass": 9,
                "checking": 0,
                "pass": 13
            },
            "taskDataCount": {
                "finishTask": 3,
                "operateTotal": 248,
                "createTask": 60,
                "automaticTask": 0,
                "notGuaranteeTask": 4,
                "operateTask": 14
            },
            "staffWorkCount": [
                "u3282300247e94ef5bc9d1337ef3a03a0(1)",
                "uf2bfd70c5f5c47c79b75e856efd909a7(1)",
                "uddd8c63f0e3e43f08b41fa55def26151(2)"
            ],
            "totalCount": {
                "finishRate": "5%",
                "clickRate": "25%",
                "finishTask": 3,
                "operateTotal": 248,
                "movementD": 939,
                "movementA": 916,
                "createTask": 60,
                "notGuaranteeTask": 4,
                "operateTask": 14
            }
        }
    }
}
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    created() {
      this.getData();
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    getData(data) {
      // this.$store.dispatch("violation/getData", data);
      this.list = data;


      for(let i in  data){
          console.log(i);
      } 

      console.log(data);
    },
    refreshData() {
      ajax.post("statistics").then(data => {
        let statistics = data;
        console.log(statistics);
        this.getData(data);
      });
    },
    drawLine() {
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
      data: ["2018-12-18","2018-12-19","2018-12-20"]
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
            data:[889,292,222],
        },
        {
            name:'离港',
            type:'bar',
            data:[683,223,444],
        },
]
};

      myChart.setOption(option);
      myChart1.setOption(option3);
      myChart2.setOption(option1);
      myChart3.setOption(option);
    }
  },
  beforeMount() {
    this.refreshData();
  }
};




</script>