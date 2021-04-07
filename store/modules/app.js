import $constDataConfig from '@/config/constData.config';
import $settingConfig from '@/config/setting.config';
const state = {
	themeColor: ''
}

const getters = {
	// 主题全局配置
	themeColor: state => {
		let theme = state.themeColor;
		if (!theme) {
			theme = $constDataConfig.themeList.filter((item) => item.name === ($settingConfig.styleType || 'default'))[0];
		}
		return theme;
	}
}

const mutations = {}

const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
