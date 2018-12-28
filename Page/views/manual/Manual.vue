<template>
	<section class="manual" >
		<img :src="`manual/${index}.png`" v-for="index in imgs" :key="index"/>
	</section>
</template>

<script>
	// @ is an alias to /src
	export default {
		name: "Manual",
		data() {
			return {
				imgs:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,
					17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38],
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

