const CONFIG = {
    // 开发环境配置
    development: {
        assetsPath: '/static', // 静态资源路径
		// baseUrl: 'http://demo.rageframe.com/api', // 后台接口请求地址
		baseUrl: 'http://localhost:8080',
		hostUrl: 'http://h5.tinyshop.rageframe.com', // H5地址(前端运行地址)
    },
    // 生产环境配置
    production: {
        assetsPath: '/static', // 静态资源路径
        baseUrl: 'http://demo.rageframe.com/api', // 后台接口请求地址
        hostUrl: 'http://h5.tinyshop.rageframe.com', // H5地址(前端运行地址)
    }

};
export default CONFIG[process.env.NODE_ENV];
