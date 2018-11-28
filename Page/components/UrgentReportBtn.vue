<template>
	<div class="urgentReportBtn">
		<el-badge :value="messageNum" :max="99" class="item"> <el-button type="primary" icon="el-icon-warning"> 偏离上报 </el-button> </el-badge>
  </div>
</template>

<script>
export default {
	name: 'UrgentReportBtn',
	props: ['messageNum'],
};
</script>
