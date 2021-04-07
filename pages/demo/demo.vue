<template>
	<view class="content">
		<view class="btn"><button type="default" size="mini" @click="getData">获取数据</button></view>
		<view class="button" @click="navTo()"><button type="default">跳转</button></view>
	</view>
</template>

<script>
	import Demo from '@/api/demo.js';
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			async getData() {
				var res = await Demo.getData()
				console.log(res);
			},
			navTo() {
				this.$mRouter.switchTab({ route: '/pages/index/index',query:{demo: 1}});
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
		
	.btn {
		margin-top: 20rpx;
	}
</style>
