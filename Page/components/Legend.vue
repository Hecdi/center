<template>
	<div class="legend" :style="{ color: color, fontSize: fontSize, width: width, height: height, lineHeight: lineHeight }">
		<i v-if="icon":class="icon" :style="{ color: iconColor, fontSize: iconSize }"/>
		<div v-if="!icon" :style="{display:'inline-block',height:iconSize,width:iconSize,
			marginTop:'-4px',verticalAlign:'middle',
			backgroundColor:iconColor,border:iconColor=='white'?'1px solid #ababab':'none'}"></div>
			{{ data }}
	</div>
</template>

<script>
export default {
	name: 'Legend',
	props: ['data', 'icon', 'iconColor', 'iconSize', 'fontSize', 'color', 'width', 'height', 'lineHeight'],
};
</script>
