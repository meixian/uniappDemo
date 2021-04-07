export default {
	/**
	 *  toast提示
	 *  promise 形式  showToast
	 * @param {string} 参数 icon:none|success|loading
	 */
	showToast(title, icon = 'none', mask = false, duration = 3000 ) {
		return new Promise((resolve, reject) => {
			if(!title) return;
			uni.showToast({
				title,
				duration: duration ? duration : (icon == 'loading' ? 30000 : 3000),
				mask,
				icon,
				success: (res) => {
					resolve(res);
				},
				fail: (err) => {
					reject(err);
				}
			})
		})	
	},
	/**
	 *  alert提示
	 *  promise 形式  showModal
	 * @param {string} 参数
	 */
	showAlert(content, title = '提示') {
		return new Promise((resolve, reject) => {
			uni.showModal({
			    title,
			    content,
				showCancel: false,
				confirmText: '知道了',
			    success: function (res) {
			        resolve(res);
			    },
				fail: (err) => {
					reject(err);
				}
			});
		})
	},
	/**
	 *  confirm对话框
	 *  promise 形式  showModal
	 * @param {string} 参数
	 */
	showConfirm(content, title = '确认提示') {
		return new Promise((resolve, reject) => {
			uni.showModal({
			    title,
			    content,
			    success: function (res) {
					if (res.confirm) {
						resolve(1);
					} else if (res.cancel) {
						resolve(0);
					}
			        
			    },
				fail: (err) => {
					reject(err);
				}
			});
		})
	}
}