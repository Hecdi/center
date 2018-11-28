<template>
	<div class="legend" :style="{ color: color, fontSize: fontSize, width: width, height: height, lineHeight: lineHeight }"><i :class="icon" :style="{ color: iconColor, fontSize: iconSize }" /> {{ data }}</div>
</template>

<script>
export default {
	name: 'Legend',
	props: ['data', 'icon', 'iconColor', 'iconSize', 'fontSize', 'color', 'width', 'height', 'lineHeight'],
};
</script>
