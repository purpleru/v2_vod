<script>
	export default {
		globalData: {
			play: {}
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uview-plus/index.scss";

	.uni-scroll-view::before {
		display: block;
		clear: both;
		content: '';
	}
	
	.uni-tabbar__item .uni-tabbar__icon{
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>