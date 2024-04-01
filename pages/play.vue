<template>
	<view class="content">
		<video class="video" :src="src"></video>
		<view class="play-list">
			<u-button v-for="(item,index) in vodPlayList" @click="lineClick(item)" :text="index" :plain="true"
				:hairline="true"></u-button>
			<view class="play-list--item">
				<!-- 	<button class="b" size="mini" :plain="true">01</button>
				<button class="c" size="mini">02</button> -->
				<view class="play-list-button" v-for="item in currentList" @click="line(item)">
					<button size="mini">{{item.title}}</button>
				</view>
			</view>
		</view>

	</view>
</template>

<script setup>
	import {
		onInit,
		onLoad
	} from '@dcloudio/uni-app';

	import {
		ref
	} from 'vue';

	var vodPlayList = ref([]);

	let currentList = ref([]);

	let src = ref('');

	function parsePlayUrl(url = '') {
		let playList = url.split('$$$').map(vodUrls => {
			return vodUrls.split('#').map(item => {
				let [title, url] = item.split('$');
				return {
					title,
					url
				}
			});
		});
		return playList;
	}

	function lineClick(item) {
		console.log(item);
		currentList.value = item;
	}

	function line(item) {
		console.log(item);
		src.value = item.url;
	}

	onLoad(function() {
		let vodPlayUrls = getApp().globalData.play.vod_play_url;
		vodPlayList.value = parsePlayUrl(vodPlayUrls);
		console.log(vodPlayList);
	})
</script>

<style scoped>
	.content,
	video {
		width: 100%;
	}

	.play-list {
		padding: 10px;
	}

	.u-button {
		margin-bottom: 4px;
	}

	.play-list--item {
		display: flex;
		flex-wrap: wrap;
	}

	.play-list-button {
		width: 25%;
		padding: 4px;
		text-align: center;
		box-sizing: border-box;
	}

	.play-list-button button {
		width: 100%;
	}

	button {
		white-space: nowrap;
		color: #5f6368;
		border: #f8f8f8 1px solid;
	}

	.play-list-button button::after {
		border: none;
	}

	.play-list-button--current {
		border: #e74032 1px solid;
		color: #e74032;
	}
</style>