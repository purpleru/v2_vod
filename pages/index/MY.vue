<template>
	<scroll-view class="lists" @scroll="scroll">
			<view v-for="index in 500">{{index}}</view>
	</scroll-view>
</template>

<script setup>
	import {
		onReachBottom,
		onPageScroll
	} from '@dcloudio/uni-app';


function scroll(d){
	console.log(d);
	
	// console.log(d);
}

	onReachBottom(() => {
		console.log('到底了');
	})
	
	onPageScroll(()=>{
		console.log('888');
	})
</script>

<style scoped>
	.lists{
		height: 300px;
		/* overflow: auto; */
	}
</style>