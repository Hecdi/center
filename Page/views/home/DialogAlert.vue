<template>
  <el-dialog
    class="dialogAlert"
    center
    title="提示"
    :visible.sync="dialogAlertVisible"
    width="1000px"
  >
  <p v-for="(message, index) in messages" :key="index">{{message.flightNo}} {{message.content}}</p>
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
		props:['messages'],
		data() {
			return {
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
						dialogAlertVisible: false,	
					});
				}
			},
			...mapState("home", []),
		},
	};
</script>



