<template>
  <div class="sheet-container">
		<ToolBar />
		<table-dis />
	</div>
</template>

<script>
import ToolBar from './ToolBar.vue';
import TableDis from './TableDis.vue';

export default {
	name: 'Sheet',
	components: {
		ToolBar,
		TableDis,
	},
};
</script>
