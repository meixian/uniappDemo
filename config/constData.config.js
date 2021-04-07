export default {
	// app应用名称
	appName: '商城demo',
	//个人中心-积分余额
	amountList: [
		{ title: '余额', value: 0, url: '/pages/user/account/account' },
		{ title: '优惠券', value: 0, url: '/pages/user/coupon/coupon?type=1' },
		{ title: '积分', value: 0, url: '/pages/user/account/integral' }
	],
	// 个人中心-设置中心菜单 e07472 ff4757 ff6b81
	settingList: [
		{ icon: 'icongonggao', url: '/pages/index/notice/notice', title: '商城公告', color: '#ff6b81' },
		{ icon: 'iconyouhuiquan-copy', url: '/pages/user/coupon/list', title: '领券中心', color: '#ff6b81' },
		{ icon: 'icondizhi1', url: '/pages/user/address/address', title: '地址管理', color: '#ff6b81' },
		{ icon: 'iconshoucang3', url: '/pages/user/collection/collection', title: '我的收藏', color: '#ff6b81' },
		{ icon: 'iconfenxiang', url: '', title: '分享', color: '#ff6b81' },
		{ icon: 'iconzhibo', url: '/pages/marketing/live/list', title: '直播', color: '#ff6b81' },
		{ icon: 'iconshezhi3', url: '/pages/set/set', title: '设置', color: '#ff6b81' }
	],
	//主题列表
	themeList: [
		{
			title: '官方',
			name: 'default',
			color: '#fa436a',
			tabList: [
				'/static/tab-home-default.png',
				'/static/tab-cate-default.png',
				'/static/tab-notify-default.png',
				'/static/tab-cart-default.png',
				'/static/tab-my-default.png'
			]
		},
		{
			title: '嫣红',
			name: 'red',
			color: '#e54d42',
			tabList: [
				'/static/tab-home-red.png',
				'/static/tab-cate-red.png',
				'/static/tab-notify-red.png',
				'/static/tab-cart-red.png',
				'/static/tab-my-red.png'
			]
		},
		{
			title: '桔橙',
			name: 'orange',
			color: '#f37b1d',
			tabList: [
				'/static/tab-home-orange.png',
				'/static/tab-cate-orange.png',
				'/static/tab-notify-orange.png',
				'/static/tab-cart-orange.png',
				'/static/tab-my-orange.png'
			]
		},
		{
			title: '明黄',
			name: 'yellow',
			color: '#fbbd08',
			tabList: [
				'/static/tab-home-yellow.png',
				'/static/tab-cate-yellow.png',
				'/static/tab-notify-yellow.png',
				'/static/tab-cart-yellow.png',
				'/static/tab-my-yellow.png'
			]
		},
		{
			title: '橄榄',
			name: 'olive',
			color: '#8dc63f',
			tabList: [
				'/static/tab-home-olive.png',
				'/static/tab-cate-olive.png',
				'/static/tab-notify-olive.png',
				'/static/tab-cart-olive.png',
				'/static/tab-my-olive.png'
			]
		},
		{
			title: '森绿',
			name: 'green',
			color: '#39b54a',
			tabList: [
				'/static/tab-home-green.png',
				'/static/tab-cate-green.png',
				'/static/tab-notify-green.png',
				'/static/tab-cart-green.png',
				'/static/tab-my-green.png'
			]
		},
		{
			title: '天青',
			name: 'cyan',
			color: '#1cbbb4',
			tabList: [
				'/static/tab-home-cyan.png',
				'/static/tab-cate-cyan.png',
				'/static/tab-notify-cyan.png',
				'/static/tab-cart-cyan.png',
				'/static/tab-my-cyan.png'
			]
		},
		{
			title: '海蓝',
			name: 'blue',
			color: '#0081ff',
			tabList: [
				'/static/tab-home-blue.png',
				'/static/tab-cate-blue.png',
				'/static/tab-notify-blue.png',
				'/static/tab-cart-blue.png',
				'/static/tab-my-blue.png'
			]
		},
		{
			title: '姹紫',
			name: 'purple',
			color: '#6739b6',
			tabList: [
				'/static/tab-home-purple.png',
				'/static/tab-cate-purple.png',
				'/static/tab-notify-purple.png',
				'/static/tab-cart-purple.png',
				'/static/tab-my-purple.png'
			]
		},
		{
			title: '木槿',
			name: 'mauve',
			color: '#9c26b0',
			tabList: [
				'/static/tab-home-mauve.png',
				'/static/tab-cate-mauve.png',
				'/static/tab-notify-mauve.png',
				'/static/tab-cart-mauve.png',
				'/static/tab-my-mauve.png'
			]
		},
		{
			title: '桃粉',
			name: 'pink',
			color: '#e03997',
			tabList: [
				'/static/tab-home-pink.png',
				'/static/tab-cate-pink.png',
				'/static/tab-notify-pink.png',
				'/static/tab-cart-pink.png',
				'/static/tab-my-pink.png'
			]
		},
		{
			title: '棕褐',
			name: 'brown',
			color: '#a5673f',
			tabList: [
				'/static/tab-home-brown.png',
				'/static/tab-cate-brown.png',
				'/static/tab-notify-brown.png',
				'/static/tab-cart-brown.png',
				'/static/tab-my-brown.png'
			]
		},
		{
			title: '玄灰',
			name: 'grey',
			color: '#8799a3',
			tabList: [
				'/static/tab-home-grey.png',
				'/static/tab-cate-grey.png',
				'/static/tab-notify-grey.png',
				'/static/tab-cart-grey.png',
				'/static/tab-my-grey.png'
			]
		},
		{
			title: '草灰',
			name: 'gray',
			color: '#aaaaaa',
			tabList: [
				'/static/tab-home-gray.png',
				'/static/tab-cate-gray.png',
				'/static/tab-notify-gray.png',
				'/static/tab-cart-gray.png',
				'/static/tab-my-gray.png'
			]
		},
		{
			title: '墨黑',
			name: 'black',
			color: '#333333',
			tabList: [
				'/static/tab-home-black.png',
				'/static/tab-cate-black.png',
				'/static/tab-notify-black.png',
				'/static/tab-cart-black.png',
				'/static/tab-my-black.png'
			]
		}
	]
}