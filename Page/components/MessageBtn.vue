<template>
	<div class="messageBtn">
		<el-badge :value="messageNum" :max="99" class="item"> <el-button type="primary" icon="el-icon-message" /> </el-badge>
  </div>
</template>

<script>
export default {
	name: 'MessageBtn',
	props: ['messageNum'],
};
</script>
