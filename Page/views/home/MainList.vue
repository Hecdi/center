<template>
  <div class="mainList">
    <el-row :gutter="20" v-for="item in mainList" :key="item.areaName">
      <el-col :span="2" class="region">
        <el-card shadow="always">
          <div class="areaName">{{ item.areaName }}</div>
          <div
            class="workerName"
            v-for="worker in item.workerList"
            :key="worker.staffId"
          >{{ worker.staffName }}</div>
        </el-card>
      </el-col>
      <el-col :span="22" class="task">
        <el-row :gutter="10">
          <el-col :span="7" v-for="task in item.taskList" :key="task.taskId">
            <el-card shadow="always" :v-id="task.taskId" @click.native="showDeatil(task);">
              <el-container>
                <el-main>
                </el-main>
                <el-aside width="97%">
                  <el-row :gutter="10" class="first-row">
                    <el-col :span="11">
						<span class='b-black t-white'>手</span>
						<span class='b-black t-white'>{{task.flightNo}}</span>
						<span class="t-white b-blue">{{ task.aircraftFlightType }}</span>
						<span style="font-weight:bold;color:black;">{{ task.seat }}</span>
                    </el-col>
                    <el-col :span="13" style="padding-right:30px;text-align:right;">
						<Legend  iconColor="#f00025" iconSize="16px" icon="iconfont icon-yanwubiaoji" fontSize="12px" color="#333"/>
						<Legend  iconColor="#009a51" iconSize="16px" icon="iconfont icon-zhongdianbiaoji" fontSize="12px" color="#333"/>
						<Legend  iconColor="#ff7100" iconSize="16px" icon="iconfont icon-VIPbiaoji"  fontSize="12px" color="#333"/>
						<Legend  iconColor="#ff7100" iconSize="16px" icon="iconfont icon-kuaisubiaoji"  fontSize="12px" color="#333"/>
						<Legend  iconColor="#0065ff" iconSize="16px" icon="iconfont icon-beijiangbiaoji"  fontSize="12px" color="#333"/>
						<Legend  iconColor="#009beb" iconSize="16px" icon="iconfont icon-fanhangbiaoji" fontSize="12px" color="#333"/>
						<Legend  iconColor="#fa0013" iconSize="16px" icon="iconfont icon-gaojingbiaoji" fontSize="12px" color="#333"/>
					</el-col>
                  </el-row>
                  <el-row :gutter="10" class="second-row">
                    <el-col :span="24">
                      <label class="flightNo">{{ `${task.flightNo}` }}</label>
                      {{ `(${task.correlationFlightNo})|` }}
                      <label class="aircraftNumber">{{ task.aircraftNumber }}</label> |
                      <label v-for="(route, index) in task.airRoute" :key="route">
                        <i v-if="index != 0" class="el-icon-caret-right"/>
                        {{ route }}
                      </label>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10" class="third-row">
                    <el-col :span="24">
                      计{{ task.displayScheduleTimeWithDate || task.dispalySTAWithDate || task.displaySTDWithDate }}/
                      <label
                        class="et"
                      >预{{ `${task.displayEstimatedTimeWithDate || task.dispalyETAWithDate || task.displayETDWithDate}` }}</label>
                    </el-col>
                  </el-row>
                </el-aside>
                <div class="flight-status">{{task.flightStatus}}</div>
              </el-container>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <DialogTaskDetail/>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ajaxx from "ajax";
import DialogTaskDetail from "./DialogTaskDetail.vue";
import Legend from "Legend.vue";
export default {
  name: "MainList",
  computed: mapState("home", ["mainList"]),
  methods: {
    showDeatil(task) {
      console.log(task);
      this.$store.commit("home/setCurrentTask", task);
      /*ajax.post('home.taskDetail', { flightTaskId: e.taskId }).then((data) => {
				console.log(data);
			});*/
    }
  },
  components: {
	  DialogTaskDetail,
	  Legend
  }
};
</script>
