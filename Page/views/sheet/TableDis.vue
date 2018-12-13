<template>
  <div class="sheet-table">
    <el-table :data="sheetList" stripe style="width: 100%">
      <el-table-column prop="aircraftType" label="机型" width="80"/>
      <el-table-column prop="flightType" label="机类" width="80"/>
      <el-table-column prop="routeName" label="航线" width="80"/>
      <el-table-column prop="eta" label="预达" width="120"/>
      <el-table-column prop="sta" label="计达" width="120"/>
      <el-table-column prop="ata" label="实达" width="120"/>
      <el-table-column prop="preAtd" label="前起" width="120"/>
      <el-table-column prop="boardingTime" label="登机时间" width="120"/>
      <el-table-column prop="cobt" label="协关" width="120"/>
      <el-table-column prop="std" label="计飞" width="120"/>
      <el-table-column prop="atd" label="实飞" width="120"/>
      <el-table-column prop="projectName" label="引导车" width="120"/>
      <el-table-column prop="departmentGuaranteeStaff" label="引导人员" width="120"/>
    </el-table>
  </div>
</template>

<script>
// import { ajax } from 'ajax';
// export default {
//   data() {
//     return {
// 		sheetList:[],
//   	}
//   },
//   methods: {
// 	  getSheetData(){
// 		// let vm = this;
// 		ajax.post('getDataList',{}).then(data=> {
// 			if(data.responseCode == 1000) {
// 				debugger;
// 				this.sheetList = data.data;
// 			} else {
// 				console.log('请求失败');
// 			}
// 		})
// 	}
//   },
//   beforeMount(){
// 	  this.getSheetData();
//   }

// };
</script>
