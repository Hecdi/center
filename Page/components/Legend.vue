<template>
	<div class="legend" :style="{ color: color, fontSize: fontSize, width: width, height: height, lineHeight: lineHeight }">
		<i v-if="icon":class="icon" :style="{ color: iconColor, fontSize: iconSize }"/>
		<div v-if="!icon" :style="{display:'inline-block',height:iconSize,width:iconSize,
			marginTop:'-4px',verticalAlign:'middle',
			borderRadius:type == 'circle'?(height?height:iconSize):0,
			backgroundColor:backgroundColor,border:border}"></div>
			{{ data }}
	</div>
</template>

<script>
export default {
	name: 'Legend',
	props: ['data', 'icon', 'iconColor', 'type','iconSize', 'fontSize', 'color', 'width', 'height', 'lineHeight'],
	computed:{
		border:function(){
			if(this.iconColor == 'white'){
				return '1px solid #ababab';
			}
			if(this.type == 'circle'){
				return `1px solid ${this.iconColor}`;
			}
			return 'none';
		},
		backgroundColor:function(){
			if(this.type == 'circle'){
				return '#feedef';
			}
			return this.iconColor;
		}
	}
};
</script>
