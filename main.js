import Vue from 'vue';
import App from './App';
import store from './store';
import './mixins/indexMixin';

// 引入全局配置
import $indexConfig from '@/config/index.config';
import $routesConfig from '@/config/routes.config.js';
import $constDataConfig from '@/config/constData.config.js';
import $assetsConfig from '@/config/assets.config.js';
import $settingConfig from '@/config/setting.config.js';

// 引入全局方法
import $mTool from '@/utils/tool';
import $mRouter from '@/utils/router';

// 引入方法
import { objParseUrlAndParam } from '@/utils/index';

// 挂载全局配置及方法
Vue.prototype.$indexConfig = $indexConfig;
Vue.prototype.$routesConfig = $routesConfig;
Vue.prototype.$constDataConfig = $constDataConfig;
Vue.prototype.$assetsConfig = $assetsConfig;
Vue.prototype.$settingConfig = $settingConfig;


Vue.prototype.$mTool = $mTool;
Vue.prototype.$mRouter = $mRouter;


if (process.env.NODE_ENV === 'production') {
	Vue.config.productionTip = false;
}

// 路由导航守卫
$mRouter.beforeEach((navType, to) => {
	uni[navType]({
		url: objParseUrlAndParam(to.route, to.query)
	});
});

App.mpType = 'app';

const app = new Vue({
    ...App,
	store
})
app.$mount()
