/**
 * @Class Request
 */
export default class Request {
	config = {
		baseUrl: '',
		header: {
			'content-type': 'application/json'
		},
		method: 'GET',
		dataType: 'json',
		custom: {},
		xhrFields: {
			withCredentials: true
		}
	}
	
	// 判断url是否为绝对路径
	static absoluteUrl(url) {
		return /(http|https):\/\/([\w.]+\/?)\S*/.test(url);
	}
	// 合并url
	static mergeUrl(url, baseUrl, params) {
		let mergeUrl = Request.absoluteUrl(url) ? url : `${baseUrl}${url}`;
		if(Object.keys(params).length !== 0) {
			const paramsH = Request.addQueryString(params);
			mergeUrl += mergeUrl.includes('?') ? `&${paramsH}` : `?${paramsH}`;
		}
		return mergeUrl;
	}
	// 将参数转换为字符串拼接在url后面
	static addQueryString(params) {
		let paramsData = '';
		Object.keys(params).forEach(function(key) {
			paramsData += key + '=' + encodeURIComponent(params[key]) + '&';
		});
		return paramsData.substring(0, paramsData.length - 1);
	}
	/**
	 * @property {Function} request 请求拦截器
	 * @property {Function} response 响应拦截器
	 * @type {{request: Request.interceptor.request, response: Request.interceptor.response}}
	 */
	interceptor = {
		/**
		 * @param {Request~requestCallback} cb - 请求之前拦截,接收一个函数（config, cancel）=> {return config}。第一个参数为全局config,第二个参数为函数，调用则取消本次请求。
		 */
		request: cb => {
			if (cb) {
				this.requestBeforeFun = cb;
			}
		},
		/**
		 * @param {Request~responseCallback} cb 响应拦截器，响应成功
		 * @param {Request~responseErrCallback} ecb 响应拦截器，响应错误
		 */
		response: (cb, ecb) => {
			if (cb) {
				this.requestComFun = cb;
			}
			if (ecb) {
				this.requestComFail = ecb;
			}
		}
	}
	requestBeforeFun(config) {
		return config;
	}
	requestComFun(response) {
		return response;
	}
	requestComFail(response) {
		return response;
	}
	/**
	 * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
	 * @param { Number } statusCode - 请求响应体statusCode
	 * @return { Boolean }
	 */
	validateStatus(statusCode) {
		return statusCode === 200;
	}
	/**
	 * @Function
	 * @param {Request~setConfigCallback} f - 设置全局默认配置
	 */
	setConfig(f) {
		this.config = f(this.config);
	}
	/**
	 * @Function
	 * @param {Object} options - 请求配置项
	 * @property {String} options.url - 请求路径
	 * @property {Object} options.data - 请求参数
	 * @property {Object} [options.responseType = config.responseType] [text|arraybuffer] - 响应的数据类型
	 * @property {Object} [options.dataType = config.dataType] - 如果设为 json，会尝试对返回的数据做一次 JSON.parse
	 * @property {Object} [options.header = config.header] - 请求header
	 * @property {Object} [options.method = config.method] - 请求方法
	 * @returns {Promise<unknown>}
	 */
	request(options = {}) {
		options = {
			baseUrl: this.config.baseUrl,
			url: options.url || '',
			method: options.method || this.config.method,
			header: options.header || this.config.header,
			dataType: options.dataType || this.config.dataType,
			data: options.data || {},
			params: options.params || {},
			getTask: options.getTask || this.config.getTask
		}
		return new Promise((resolve, reject) => {
			let next = true;
			const cancel = (t = 'handle cancel', config = options) => {
				const err = {
					errMsg: t,
					config: config
				};
				reject(err);
				next = false;
			};
			const handleRe = { ...this.requestBeforeFun(options, cancel) };
			const _config = { ...handleRe };
			if (!next) return;
			const requestTask = uni.request({
				url: Request.mergeUrl(_config.url, _config.baseUrl, _config.params),
				data: _config.data,
				header: _config.header,
				method: _config.method,
				dataType: _config.dataType,
				complete: response => {
					response.config = handleRe;
					if (this.validateStatus(response.statusCode)) {
						// 成功
						response = this.requestComFun(response);
						resolve(response);
					} else {
						response = this.requestComFail(response);
						reject(response);
					}
				}
			})
			if (handleRe.getTask) {
				handleRe.getTask(requestTask, handleRe);
			}
		})
	}
	get(url, params = {}) {
		const options = {};
		options.params = params;
		return this.request({
			url,
			method: 'GET',
			...options
		});
	}
	post(url, data, options = {}) {
		return this.request({
			url,
			data,
			method: 'POST',
			...options
		});
	}
	upload(url, { filePath, name, header, formData = {}, custom = {}, params = {}, getTask}) {
		return new Promise((resolve, reject) => {
			let next = true;
			const globalHeader = { ...this.config.header };
			delete globalHeader['content-type'];
			delete globalHeader['Content-Type'];
			const pubConfig = {
				baseUrl: this.config.baseUrl,
				url,
				filePath,
				method: 'UPLOAD',
				name,
				header: header || globalHeader,
				formData,
				params,
				custom: { ...this.config.custom, ...custom },
				getTask: getTask || this.config.getTask
			};
			const cancel = (t = 'handle cancel', config = pubConfig) => {
				const err = {
					errMsg: t,
					config: config
				};
				reject(err);
				next = false;
			};
			const handleRe = { ...this.requestBeforeFun(pubConfig, cancel) };
			const _config = {
				url: Request.mergeUrl(handleRe.url, handleRe.baseUrl, handleRe.params),
				filePath: handleRe.filePath,
				name: handleRe.name,
				header: handleRe.header,
				formData: handleRe.formData,
				complete: response => {
					response.config = handleRe;
					if (typeof response.data === 'string') {
						response.data = JSON.parse(response.data);
					}
					if (this.validateStatus(response.statusCode)) {
						// 成功
						response = this.requestComFun(response);
						resolve(response);
					} else {
						response = this.requestComFail(response);
						reject(response);
					}
				}
			};
			if (!next) return;
			const requestTask = uni.uploadFile(_config);
			if (handleRe.getTask) {
				handleRe.getTask(requestTask, handleRe);
			}
		});
	}
	download(url, options = {}) {
		return new Promise((resolve, reject) => {
			let next = true;
			const pubConfig = {
				baseUrl: this.config.baseUrl,
				url,
				method: 'DOWNLOAD',
				header: options.header || this.config.header,
				params: options.params || {},
				custom: { ...this.config.custom, ...(options.custom || {}) },
				getTask: options.getTask || this.config.getTask
			};
			const cancel = (t = 'handle cancel', config = pubConfig) => {
				const err = {
					errMsg: t,
					config: config
				};
				reject(err);
				next = false;
			};
	
			const handleRe = { ...this.requestBeforeFun(pubConfig, cancel) };
			if (!next) return;
			const requestTask = uni.downloadFile({
				url: Request.mergeUrl(handleRe.url, handleRe.baseUrl, handleRe.params),
				header: handleRe.header,
				complete: response => {
					response.config = handleRe;
					if (this.validateStatus(response.statusCode)) {
						// 成功
						response = this.requestComFun(response);
						resolve(response);
					} else {
						response = this.requestComFail(response);
						reject(response);
					}
				}
			});
			if (handleRe.getTask) {
				handleRe.getTask(requestTask, handleRe);
			}
		});
	}
}