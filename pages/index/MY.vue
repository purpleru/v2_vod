<template>
	<view>
		<view>888</view>
		<view>888</view>
		<view>888</view>
		<view>888</view>
		<view>888</view>
		<view>888</view>
	</view>
</template>

<script setup>
	import {
		onReachBottom,
		onPageScroll
	} from '@dcloudio/uni-app';


	function scroll(d) {
		console.log(d);

		// console.log(d);
	}

	onReachBottom(() => {
		console.log('到底了');
	})

	onPageScroll(() => {
		console.log('888');
	})
</script>

<style scoped>
	
</style>