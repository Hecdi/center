<template>
	<div class="rollCall" >
		12323423
		<DialogPersonDetail />
	</div>
</template>

<script>
import ajaxx from "ajax";
import DialogPersonDetail from "./DialogPersonDetail.vue";
export default {
	name: 'RollCall',
	components:{
		DialogPersonDetail,
	},
	beforeMount(){
		let ajax = ajaxx();
		ajax.post('rollCall.getPersons',{deptId:'depc37237f086fc4b90afa43780946dba68'}).then(data =>{
			console.log(data);	
			this.$store.dispatch('rollCall/update', {team:data.data});
		});	
	}
};
</script>

