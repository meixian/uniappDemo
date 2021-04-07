import Request from './request';
import indexConfig from '@/config/index.config';
import tool from '../tool.js';

const request = new Request();

// request全局参数设置
request.setConfig(config => {
	// 设置全局配置
	config.baseUrl = indexConfig.baseUrl; // 根域名不同
	return config;
});

request.interceptor.request(
	config => {
		// 请求之前拦截器
		// config.header['x-access-token'] = uni.getStorageSync('accessToken');
		// config.header['x-access-token'] = 'accessToken';
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

request.interceptor.response(
	response => {
		return Promise.resolve(response.data);
	},
	error => {
		tool.showAlert(error);
		return Promise.reject(error);
	}
);

export default request;
