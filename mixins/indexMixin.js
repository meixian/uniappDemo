import Vue from 'vue';
// 引入全局存储
import store from '@/store';
Vue.mixin({
	computed: {
		themeColor: {
			get () {
				return store.getters['app/themeColor'];
			},
			set (val) {
				store.state.app.themeColor = val;
			}
		}
	}
});