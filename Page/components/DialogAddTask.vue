<template>
  <el-dialog
    class="dialogAddTask"
    title="添加临时任务"
    :visible.sync="dialogAddTaskVisible"
    width="1000px"
    :before-close="handleClose"
  >
    <el-row :gutter="10" class="personList">
      <el-col :span="2" v-for="worker in allPersons" :key="worker.staffId" class="person-panel">
        <div class="grid-content bg-person person" @click="show" :data-id="worker.staffId">
          {{ worker.staffName + (worker.workerName ? '(' + worker.workerName + ')' : '') }}
          <div class="taskNum">{{ worker.taskNumber }}</div>
        </div>
      </el-col>
    </el-row>
    <div class="line"/>
    <el-row :gutter="0">
      <el-col class="addTaskType" :span="3">
        <i class="el-icon-tickets"/>
        <span style="line-height:32px;">临时任务类型</span>
      </el-col>
      <el-col :span="6">
        <el-input
          size="small"
          style="width:180px;"
          placeholder="自定义临时任务类型"
          v-model="temporaryTaskType"
          clearable
        />
      </el-col>
    </el-row>
    <div class="line"/>
    <el-row :gutter="40">
      <el-col :span="10">
        <el-input
          size="small"
          style="width:400px;"
          placeholder="航班号或者机位号"
          v-model="searchFlight"
          suffix-icon="el-icon-search"
        />
      </el-col>
      <el-col :span="8">
        <span style="color:#939393">任务时限:</span>
        <el-select v-model="timeLimitValue" size="small" placeholder="请选择">
          <el-option
            v-for="item in timeLimitOpts"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
    </el-row>
    <el-table
      ref="multipleTable"
      :data="flights"
      show-overflow-tooltip="true"
      height="250"
      highlight-current-row
      style="width: 100%"
      @selection-change="handleSelectionChange"
      @row-click="handleRowClick"
    >
      <el-table-column type="selection" label="选择" width="60"/>
      <el-table-column prop="flightNo" label="航班号"/>
      <el-table-column prop="aircraftNumber" label="机尾号"/>
      <el-table-column prop="seat" label="机位"/>
      <el-table-column prop="aircraftType" label="机型"/>
      <el-table-column prop="ETA" label="预计到达"/>
      <el-table-column prop="STA" label="计划到达"/>
      <el-table-column prop="ETD" label="预计起飞"/>
      <el-table-column prop="STD" label="计划起飞"/>
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dialogAddTaskVisible = false;">提交</el-button>
      <el-button @click="dialogAddTaskVisible = false;">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "DialogAddTask",
  data() {
    return {
      timeLimitValue: "",
      multipleSelection: [],
	  input10: "",
	  temporaryTaskType: "",
	  searchFlight: "",
      flights: [
        {
          flightId: "254652",
          flightNo: "CA5553",
          aircraftNumber: "FJ432",
          seat: "164",
          aircraftType: "320",
          ETA: "10:20(20)",
          STA: "10:20(20)",
          ETD: "10:20(20)",
          STD: "10:20(20)"
        },
        {
          flightId: "254651",
          flightNo: "CA5553",
          aircraftNumber: "FJ432",
          seat: "164",
          aircraftType: "320",
          ETA: "10:20(20)",
          STA: "10:20(20)",
          ETD: "10:20(20)",
          STD: "10:20(20)"
        },
        {
          flightId: "254658",
          flightNo: "CA5553",
          aircraftNumber: "FJ432",
          seat: "164",
          aircraftType: "320",
          ETA: "10:20(20)",
          STA: "10:20(20)",
          ETD: "10:20(20)",
          STD: "10:20(20)"
        },
        {
          flightId: "2546502",
          flightNo: "CA5553",
          aircraftNumber: "FJ432",
          seat: "164",
          aircraftType: "320",
          ETA: "10:20(20)",
          STA: "10:20(20)",
          ETD: "10:20(20)",
          STD: "10:20(20)"
        },
        {
          flightId: "2546512",
          flightNo: "CA5553",
          aircraftNumber: "FJ432",
          seat: "164",
          aircraftType: "320",
          ETA: "10:20(20)",
          STA: "10:20(20)",
          ETD: "10:20(20)",
          STD: "10:20(20)"
        }
      ]
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    show() {},
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    handleRowClick(row) {
      this.$refs.multipleTable.toggleRowSelection(row);
    }
  },
  computed: {
    dialogAddTaskVisible: {
      get() {
        return this.$store.state.home.dialogAddTaskVisible;
      },
      set() {
        this.$store.dispatch(`home/update`, { dialogAddTaskVisible: false });
      }
    },
    ...mapState("home", ["allPersons", "timeLimitOpts"])
  }
};
</script>
