<template>
	<view class="content">
		<u-tabs :list="tabs" :current="currentIndex" @click="click" @change="tabChange"></u-tabs>
		<view class="vod-body">
			<scroll-view class="vod-body--item" :class="{'current-tab':index === currentIndex}"
				v-for="(vod_item,index) in tabs" v-show="index === currentIndex" :scroll-y="true" :show-scrollbar="true"
				@scroll="scroll(this,$event,vod_item)">
				<!-- 			<view v-for="vod_list in vod_item.vod_lists">
					<image :src="vod_list.vod_pic" @click="imageClick(vod_list)"></image>
				</view> -->


				<view class="cover-box">
					<view class="cover" v-for="vod_list in vod_item.vod_lists">
						<image :src="vod_list.vod_pic" @click="imageClick(vod_list)" mode="scaleToFill"></image>
						<text>{{vod_list.vod_name}}</text>
					</view>
				</view>

				<!-- <u-loadmore :status="vod_item.load.status" /> -->
			</scroll-view>
		</view>
	</view>
</template>

<script>
</script>

<script setup>
	import {
		reactive,
		nextTick,
		ref,
		toRefs,
		toRef,
		getCurrentInstance
	} from 'vue'
	import request from '@/util/request.js'
	import {
		onLoad,
		onPageScroll,
		onReachBottom
	} from '@dcloudio/uni-app'

	import vodLists from './MY.vue';

	let tabs = ref([]);

	let currentIndex = ref(0);

	function getList(typeID, pg, ids) {
		return uni.request({
			url: '/api.php/provide/vod',
			data: {
				ac: 'detail',
				ids: ids,
				t: typeID,
				pg: pg || 1
			}
		})
	}

	function tabChange(data) {
		currentIndex.value = data.index;
	}

	function handlePage(page = {}) {
		let currentPage = Math.abs(page.page) + 1;
		return currentPage;
	}

	async function setList(data = {}) {
		let currentTab = tabs.value[data.index];
		let {
			data: {
				list,
				page,
				pagecount,
				total,
				limit
			}
		} = await getList(currentTab.type_id, handlePage(currentTab.page))
		currentTab.page = {
			page,
			pagecount,
			total,
			limit
		}

		currentTab.vod_lists = currentTab.vod_lists.concat(list);

	}

	function scroll(instance, event, vod_item) {

		const query = uni.createSelectorQuery().in(instance),
			{
				detail
			} = event;

		query
			.select('.current-tab')
			.boundingClientRect(({
				height
			}) => {
				if (detail.scrollHeight - height === Math.floor(detail.scrollTop)) {
					console.log('到底了');
					let load = toRef(vod_item, 'load');

					load.value.status = 'loading';

					setList({
						index: currentIndex.value
					})
					console.log(currentIndex.value);
				}
				// console.log(height);
				// console.log(detail);
			})
			.exec();

	}

	async function click(data) {
		if (data.type_id !== 999 && data.vod_lists.length === 0) {
			setList(data);
		}
	}

	function imageClick(list) {
		console.log(list);
		getApp().globalData.play = list;
		uni.navigateTo({
			url: '/pages/play?age=888'

		})
	}

	uni.request({
		url: '/api.php/provide/vod',
		data: {
			ac: 'list'
		},
		success({
			data
		}) {
			let tabLists = data.class.map((item, index) => {
				item.name = item.type_name;
				item.vod_lists = [];
				item.index = index;
				item.page = {
					page: 0,
					pagecount: 0,
					total: 0,
					limit: 0
				}
				item.load = {
					status: 'loadmore',
					line: false
				}
				return item;
			})
			// tabLists.unshift({
			// 	name: '推荐',
			// 	type_id: 999
			// })
			tabs.value = tabLists;
			setList(tabLists[currentIndex.value])
			console.log(tabs);
		}
	})

	onPageScroll(() => {
		console.log(888);
	})

	onReachBottom(() => {
		console.log('到底了');
	})
</script>

<style scoped lang="scss">
	.content,
	uni-page-body {
		position: relative;
		height: 100%;
		overflow: hidden;
	}

	.content {
		margin: 0 10px;
	}

	.tabs {
		height: 44px;
	}

	.vod-body {
		position: absolute;
		top: 44px;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		overflow: hidden;
	}

	.vod-body--item {
		height: 100%;
		overflow: auto;
	}

	.cover-box {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.cover {
		width: calc(100% / 3 - 10px);
		margin-bottom: 10px;
		// overflow: hidden;
		// background-color: aliceblue;
	}

	.cover image {
		width: 100%;
		height: 330rpx;
		border-radius: 6px;
	}
	
	.cover text{
		display: block;
		width: 100%;
		font-size: 14px;
		font-weight: 500;
		text-align: center;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
</style>