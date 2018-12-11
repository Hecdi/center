<template>
  <div class="mainList">
    <el-row :gutter="20" v-for="item in mainList" :key="item.areaName">
      <el-col :span="3" class="region">
        <el-card shadow="always">
          <div class="areaName">{{ item.areaName }}</div>
          <div
            class="workerName"
            v-for="worker in item.workerList"
            :key="worker.staffId"
          >{{ worker.staffName }}</div>
        </el-card>
      </el-col>
      <el-col :span="21" class="task">
        <el-row :gutter="20">
          <el-col :span="12" v-for="task in item.taskList" :key="task.taskId">
            <el-card shadow="always" :v-id="task.taskId" @click.native="showDeatil(task);">
              <el-container>
                <el-aside width="95%">
                  <el-row :gutter="10" class="first-row">
                    <el-col :span="20">
                      <i class="el-icon-edit"/>
                      {{ task.seat }}
                      <i class="el-icon-edit"/>
                      {{ task.gate }}
                      <i class="el-icon-edit"/>
                      {{ task.aircraftType }}
                    </el-col>
                    <el-col :span="4">{{task.displayTaskStatus}} {{`${task.delay == true?'D':''}`}}</el-col>
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
                <el-main>
                  <div>{{ task.taskServiceCode }}</div>
                </el-main>
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
    DialogTaskDetail
  }
};
</script>
