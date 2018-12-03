<template>
  <div class="all-table">
    <el-table :data="cards" stripe style="width: 100%">
      <el-table-column prop="violationId" label="序号" width="80" />
      <el-table-column prop="violationCodeName" label="违规类型" width="80" />
      <el-table-column prop="violationCode" label="人员编号" width="80" />
      <el-table-column prop="violationName" label="违规人员" width="130" />
      <el-table-column prop="violationName1" label="车辆编号" width="80" />
      <el-table-column prop="violationName2" label="设备编号" width="80" />
      <el-table-column prop="airLineName" label="所属单位" width="180" />
      <el-table-column prop="violationDescription" label="违规描述" width="180" />
      <el-table-column prop="date" label="图像记录" width="180" />
      <el-table-column prop="reportTime" label="上报时间" width="180" />
      <el-table-column prop="status" label="状态" width="80" />
      <el-table-column prop="date1" label="操作" width="80" />
    </el-table>
  </div>
</template>

<script>
import { mapState } from 'vuex';

 export default{
        data(){
            return {
                props:"statusValue",
                status: '22',
            }
        },
        computed: {
            ...mapState('violation', ['cards']),
        },
        // filters:{
        //     currency(value){
        //         return getNaturalDate(value);
        //     }
        // },
        methods:{
            // toggleTabs(tabKey){
            //     this.status = tabKey;
            //     this.currentView = tabKey;
            // }
        }
    }
</script>
