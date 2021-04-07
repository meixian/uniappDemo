<template>
	<view class="user">
		<!-- 头部 -->
		<view class="user-section" :class="'bg-' + themeColor.name">
			<image class="bg" :src="userBg"></image>
			<!-- 用户信息 -->
			<view class="user-info-box">
				<view class="portrait-box">
					<image class="portrait" :src="userInfo.head_portrait || headImg"></image>
					<text class="username">{{ userInfo.nickname || userInfo.realname || '登录/注册' }}</text>
				</view>
			</view>
			<!-- vip信息 -->
			<view class="vip-card-box">
				<view class="b-btn">
					{{ userInfo.memberLevel | filterMemberLevel }}
				</view>
				<view class="tit">
					<i class="iconfont iconzuanshi" />
					{{appName}}尊享会员
				</view>
				<text class="e-m">{{appName}} 版权所有</text>
			</view>
		</view>
		<!-- 个人中心 内容区 -->
		<view 
			class="cover-container"
			:style="[
				{
					transform: coverTransform,
					transition: coverTransition
				}
			]"
			@touchstart="coverTouchstart"
			@touchmove="coverTouchmove"
			@touchend="coverTouchend"
		>
			<image class="arc" :src="arc"></image>
			<!-- 余额 优惠券 积分信息 -->
			<view class="promotion-center">
				<list-cell title="我的账户" icon="iconqianbao" :iconColor="themeColor.color" @eventClick=""></list-cell>
				<view class="tj-section">
					<view class="tj-item" v-for="item in amountList" :key="item.title" @tap="">
						<text class="num" :class="item.value>0?'text-'+themeColor.name:''">{{item.value}}</text>
						<text>{{item.title}}</text>
					</view>
				</view>
			</view>
			<!-- 我的订单 -->
			<view class="promotion-center">
				<list-cell title="全部订单" icon="iconicon1" :iconColor="themeColor.color" @eventClick=""></list-cell>
			</view>
			<!-- 浏览历史 -->
			<view class="history-section">
				<list-cell title="我的足迹" icon="iconzuji" :iconColor="themeColor.color" @eventClick=""></list-cell>
			</view>
			<!-- 我的服务 -->
			<view class="promotion-center">
				<list-cell title="我的服务" icon="iconfuwu" :iconColor="themeColor.color" @eventClick=""></list-cell>
				<view class="tj-section">
					<view class="category-list">
						<view class="category" v-for="(item, index) in settingList" :key="index" @tap="">
							<view v-if="item.title !== '分享'">
								<view class="img"><text class="iconfont" :class="[item.icon, 'text-'+themeColor.name]"></text></view>
								<view class="text">{{ item.title }}</view>
							</view>
							<button v-else class="share-btn" open-type="share" @tap="share">
								<view class="img"><text class="iconfont" :class="[item.icon, 'text-'+themeColor.name]"></text></view>
								<view class="text">{{ item.title }}</view>
							</button>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import listCell from '@/components/list-cell';
	let startY = 0, moveY = 0, pageAtTop = true;
	export default {
		components: {
			listCell
		},
		data() {
			return {
				appName: this.$settingConfig.appName,
				userBg: this.$assetsConfig.userBg,
				headImg: this.$assetsConfig.headImg,
				arc: this.$assetsConfig.arc,
				userInfo: {
					// 用户信息
					promoter: null // 分销商信息
				},
				amountList: this.$constDataConfig.amountList,
				settingList: this.$constDataConfig.settingList,
				coverTransform: 'translateY(0px)',
				coverTransition: '0s',
				moving: false,
			}
		},
		filters: {
			filterMemberLevel(val) {
				if(!val) return '普通用户';
				return val.name;
			}
		},
		methods: {
			coverTouchstart(e) {
				if (pageAtTop === false) {
					return;
				}
				this.coverTransition = 'transform .1s linear';
				startY = e.touches[0].clientY;
			},
			coverTouchmove(e) {
				moveY = e.touches[0].clientY;
				let moveDistance = moveY - startY;
				if (moveDistance < 0) {
					this.moving = false;
					return;
				}
				this.moving = true;
				if (moveDistance >= 80 && moveDistance < 100) {
					moveDistance = 80;
				}
				if (moveDistance > 0 && moveDistance <= 80) {
					this.coverTransform = `translateY(${moveDistance}px)`;
				}
			},
			coverTouchend() {
				if (this.moving === false) {
					return;
				}
				this.moving = false;
				this.coverTransition = 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)';
				this.coverTransform = 'translateY(0px)';
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: $page-color-base;
	}
	.user {
		.user-section {
			height: 520upx;
			padding: 100upx 30upx 0;
			position: relative;
			.bg {
				position: absolute;
				left: 0;
				top: 0;
				width: 100vw;
				height: 60vw;
				opacity: 0.84;
			}
			.user-info-box {
				height: 180upx;
				display: flex;
				align-items: center;
				position: relative;
				z-index: 1;
				justify-content: space-between;
				.portrait-box {
					display: flex;
					align-items: center;
					.portrait {
						width: 130upx;
						height: 130upx;
						border: 5upx solid #fff;
						border-radius: 50%;
					}
					.username {
						font-size: $font-lg + 6upx;
						color: $color-white;
						margin-left: 20upx;
					}
					button {
						background-color: transparent;
						font-size: $font-lg + 6upx;
						color: $font-color-dark;
						border: none;
					}
					button::after {
						border: none;
					}
				}
			}
			.vip-card-box {
				display: flex;
				flex-direction: column;
				color: #f7d680;
				height: 240upx;
				background: url('/static/images/vip-card.png');
				background-size: 100% 100%;
				border-radius: 16upx 16upx 0 0;
				overflow: hidden;
				position: relative;
				padding: 20upx 24upx;
				.b-btn{
					position: absolute;
					right: 24upx;
					top: 24upx;
					width: 132upx;
					height: 40upx;
					text-align: center;
					line-height: 40upx;
					font-size: 22upx;
					color: #36343c;
					border-radius: 20px;
					background: linear-gradient(to left, #f9e6af, #ffd465);
					z-index: 1;
				}
				.tit {
					font-size: $font-base + 2upx;
					color: #f7d680;
					margin-bottom: 28upx;
					.iconfont {
						color: #f6e5a3;
						display: inline-block;
						margin-right: 16upx;
					}
				}
			}
		}
		.cover-container {
			margin-top: -150upx;
			padding: 0 30upx 20upx;
			position: relative;
			background-color: $page-color-base;
			.arc {
				position: absolute;
				left: 0;
				top: -34upx;
				width: 100%;
				height: 36upx;
			}
			.promotion-center {
				background: #fff;
				margin-bottom: 20upx;
				/*分类列表*/
				.category-list {
					width: 100%;
					padding: 0 0 30upx 0;
					border-bottom: solid 2upx #f6f6f6;
					display: flex;
					flex-wrap: wrap;
					.category {
						width: 33.3%;
						margin-top: 50upx;
						display: flex;
						justify-content: center;
						flex-wrap: wrap;
						.img {
							width: 100%;
							display: flex;
							justify-content: center;
	
							.iconfont {
								font-size: $font-lg + 24upx;
							}
						}
						.text {
							width: 100%;
							display: flex;
							justify-content: center;
							font-size: 24upx;
							color: #3c3c3c;
						}
						.share-btn {
							height: 142upx;
							text-align: left;
							background: none;
							padding: 0;
							margin: 0;
						}
						.share-btn:after {
							border: none;
							border-radius: none;
						}
					}
				}
			}
			.tj-section {
				@extend %section;
				display: flex;
				.tj-item {
					@extend %flex-center;
					flex: 1;
					flex-direction: column;
					margin: 30upx 0;
					font-size: $font-sm;
					color: #75787d;
				}
				.num {
					font-size: $font-base;
				}
				.red {
					color: $base-color;
				}
			}
			.order-section {
				@extend %section;
				padding: 28upx 0;
				.order-item {
					@extend %flex-center;
					width: 120upx;
					height: 120upx;
					border-radius: 10upx;
					font-size: $font-sm;
					color: $font-color-dark;
					position: relative;
				}
				.badge {
					position: absolute;
					top: 0;
					right: 4upx;
				}
				.iconfont {
					font-size: 48upx;
				}
				.icon-shouhoutuikuan {
					font-size: 44upx;
				}
			}
			.history-section {
				background: #fff;
				margin-bottom: $spacing-sm;
				.h-list-history {
					margin: 0;
					border-radius: 10upx;
					white-space: nowrap;
					background-color: $page-color-base;
					.h-item-history {
						background-color: $color-white;
						display: inline-block;
						font-size: $font-sm;
						color: $font-color-base;
						width: 180upx;
						margin: $spacing-sm $spacing-sm 0 0;
						border-radius: 10upx;
						position: relative;
						top: 0;
						overflow: hidden;
						.h-item-img {
							width: 180%;
							height: 200upx;
							border-top-left-radius: 12upx;
							border-top-right-radius: 12upx;
							border-bottom: 1upx solid rgba(0, 0, 0, 0.01);
						}
						.tag {
							position: absolute;
							border-top-left-radius: 12upx;
							left: 0;
							right: 0;
							width: 60upx;
							height: 60upx;
						}
						.h-item-text {
							font-size: $font-sm;
							margin: $spacing-sm 4upx;
						}
					}
				}
				.no-foot-print {
					text-align: center;
					padding: 48upx 0;
	
					.no-foot-print-icon {
						font-size: $font-lg + 2upx;
						margin-right: 10upx;
					}
				}
				.share-btn {
					height: 102upx;
					text-align: left;
					background: none;
					padding: 0;
					margin: 0;
				}
				.share-btn:after {
					border: none;
					border-radius: none;
				}
			}
		}
	}
	%flex-center {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	%section {
		justify-content: space-around;
		display: flex;
		align-content: center;
		background: #fff;
		border-radius: 10upx;
	}
</style>
