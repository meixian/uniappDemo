import $constDataConfig from './constData.config.js';
class Setting {
	constructor(appName,styleType) {
		this._appName = appName; 
	    this._styleType = styleType; //主题类型
	}
	get appName() {
		return this._appName;
	}
	set appName(value) {
		this._appName = value;
	}
	get styleType() {
		return this._styleType;
	}
	set styleType(value) {
		this._styleType = value;
	}
}
export default new Setting(
	$constDataConfig.appName,  //应用名称
	'default'  //主题
)