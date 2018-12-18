<template>
  <div class="mainList">
    <el-row :gutter="10" v-for="item in mainList" :key="item.areaName">
      <el-col :span="2" class="region">
        <el-card shadow="always">
          <div class="areaName">{{ item.areaName }}</div>
        </el-card>
      </el-col>
      <el-col :span="23" class="task">
        <el-row :gutter="10">
			<el-col :span="8" style="position:relative" v-for="task in item.taskList" :key="task.taskId"> 
            <el-card shadow="always" :class="(task.taskStatus == -1 || task.taskStatus == 8) ? 'greyPanel':''" :v-id="task.taskId" @click.native="showDeatil(task);">
              <el-container>
				  <el-main :class="`bg-${task.taskStatus}`">
                </el-main>
                <el-aside width="97%">
                  <el-row :gutter="10" class="first-row">
                    <el-col :span="13">
						<span class='b-black t-white'>{{`${task.auto?'自':'手'}`}}</span>
						<span class='b-black t-white'>{{task.flightNo}}</span>
						<span :class="`t-white aft b-${task.aircraftFlightType}`">{{ task.aircraftFlightType }}</span>
						<span style="font-weight:bold;">{{ task.seat }}</span>
                    </el-col>
                    <el-col :span="11" style="padding-right:30px;padding-left:0;text-align:right;">
						<Legend v-if="task.delay != '--'"  iconColor="#f00025" iconSize="16px" icon="iconfont icon-yanwubiaoji" fontSize="12px" color="#333"/>
						<Legend v-if="task.keyMaintaince != '--'"  iconColor="#009a51" iconSize="16px" icon="iconfont icon-zhongdianbiaoji" fontSize="12px" color="#333"/>
						<Legend v-if="task.vip != '--'" iconColor="#ff7100" iconSize="16px" icon="iconfont icon-VIPbiaoji"  fontSize="12px" color="#333"/>
						<Legend v-if="task.quickFlag != '--'"   iconColor="#0065ff" iconSize="16px" icon="iconfont icon-kuaisubiaoji"  fontSize="12px" color="#333"/>
						<Legend v-if="task.alternate != '--'" iconColor="#0065ff" iconSize="16px" icon="iconfont icon-beijiangbiaoji"  fontSize="12px" color="#333"/>
						<Legend v-if="task.returnFliht != '--'" iconColor="#009beb" iconSize="16px" icon="iconfont icon-fanhangbiaoji" fontSize="12px" color="#333"/>
						<Legend v-if="task.taskAlarm != '--'" iconColor="#fa0013" iconSize="16px" icon="iconfont icon-gaojingbiaoji" fontSize="12px" color="#333"/>
					</el-col>
                  </el-row>
                  <el-row :gutter="0" class="second-row">
                    <el-col :span="10" class="route-panel">
						<div>
							<p>{{task.iata[0]}}</p>
							<p :title="task.airRoute[0]">{{task.airRoute[0]}}</p>
						</div>
						<div><i class="iconfont icon-hangxian"></i></div>
						<div>
							<p>{{task.iata[1]}}</p>
							<p :title="task.airRoute[1]">{{task.airRoute[1]}}</p>
						</div>
                    </el-col>
                    <el-col :span="4" style="border-left:1px dashed #BDBFC3;border-right:1px dashed #BDBFC3;font-size:14px;">
						<p>{{task.aircraftNumber}}</p>
						<p>{{task.aircraftType}}</p>
                    </el-col>
                    <el-col :span="10">
						<p><i class="iconfont icon-jihua" style="color:#00ad62;" v-if="task && (task.displayScheduleTimeWithDate != '--')"></i>{{task.displayScheduleTimeWithDate}}</p>
						<p>
							<i class="iconfont" :class="(task.disPlayActuralTime != '--') ? 'icon-shiji2':'icon-yuji2'" 
						   v-if="task && (task.disPlayActuralTime != '--' || task.disPlayExpectedTime != '--')"></i>
							{{`${task.disPlayActuralTime != '--'? task.disPlayActuralTime:task.disPlayExpectedTime}`}}
						</p>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10" class="third-row">
                    <el-col :span="24" style="margin-top:6px;font-size:12px;overflow:hidden">
						<i class="iconfont icon-renyuan" style="margin-right:6px;"></i>
						{{task.taskBindingShiftNames}}
                    </el-col>
                  </el-row>
                </el-aside>
				<div :class="`flight-status bg-${task.flightStatusCode}`">{{task.flightStatus}}</div>
              </el-container>
            </el-card>
			<div class='poper'v-if="task.taskStatus == -1 || task.taskStatus == 8" >
				{{task.displayTaskStatus}}
			</div>
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
