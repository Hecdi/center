<template>
  <el-container class="sheet">
    <el-row :gutter="0">
			<el-col :span="12"> <span class="float-left bread-crumb">引导车报表</span> </el-col>
			<el-col :span="12" class="right-col"
>
        <span>时间段:</span>
				<el-date-picker v-model="value1" type="date" 
placeholder="开始日期"
/>
        <span> - </span>
				<el-date-picker v-model="value2" type="date" 
placeholder="结束日期"
/>
				<el-input placeholder="请输入内容" prefix-icon="el-icon-search" 
v-model="inputSearch" class="seach-input"
/>
        <el-button type="" 
size="small" class="export-excel">导出excel<i class="el-icon-upload el-icon--right" /></el-button>
      </el-col>
		</el-row>
  </el-container>
</template>

<script>
export default {
	data() {
		return {
			pickerOptions1: {
				disabledDate(time) {
					return time.getTime() > Date.now();
				},
				shortcuts: [
					{
						text: '今天',
						onClick(picker) {
							picker.$emit('pick', new Date());
						},
					},
					{
						text: '昨天',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24);
							picker.$emit('pick', date);
						},
					},
					{
						text: '一周前',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', date);
						},
					},
				],
			},
			value1: '',
			value2: '',
			inputSearch: '',
		};
	},
};
// console.log('toolbar');
</script>
