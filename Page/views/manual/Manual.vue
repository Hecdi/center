<template>
	<section class="manual" >
		<img :src="`../../../public/manual/${index}.png`" v-for="index in imgs" :key="index"/>
	</section>
</template>

<script>
	// @ is an alias to /src
	export default {
		name: "Manual",
		data() {
			return {
				imgs:[1,2,3,4,5,6,7,8,9],
			};
		},
		methods: {
		},
		computed: {
		},
		components: {
			/*SearchInput,*/
		},
		beforeMount() {
		},
		beforeDestroy() {
		}
	};
</script>

