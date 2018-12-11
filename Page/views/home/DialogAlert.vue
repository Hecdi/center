<template>
  <el-dialog
    class="dialogAlert"
    center
    title="提示"
    :visible.sync="dialogAlertVisible"
    width="1000px"
  >
  </el-dialog>
</template>
<script>
	import { mapState } from "vuex";
	import moment from "moment";
	import { ajax } from "ajax";
	import { pick, extend, identity,each } from "lodash";
	import {formatDate} from "date";

	export default {
		name: "dialogAlert",
		data() {
			return {
				leader:null,
				checkedPanel:'set',
				detail:[],
			};
		},
		methods: {
		},
		computed: {
			dialogAlertVisible:{
				get(){
					return this.$store.state.home.dialogAlertVisible;
				},
				set(){
					this.$store.dispatch('home/update',{
						dialogAlertVisible:true,	
					});
				}
			},
			...mapState("home", []),
		},
	};
</script>



