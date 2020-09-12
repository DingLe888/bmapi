/**
 * 服务请求，业务相关
 *
 * Created by apple on 2017/1/3.
 */


import { defaultConfig } from '../../configs';
import { getFileType } from '../extention/publicFunc';
import messageEmit from '../message/message';
import tips from '../tip';
/**
*  请求参数
*/
interface Param {
	[keys: string]: any
}

// 请求体
interface Request {
	method: string;
	headers: { Accept: string, 'Content-Type': string, [other: string]: string };
	body?: any
}
// 响应体
interface Response<T> {
	/**
	*  状态码
	*/
	code: number,
	/**
	*  数据对象
	*/
	data: T,
	/**
	*  消息
	*/
	message: string,
}

// callback 回调函数有两个返回值，第一个返回值返回结果数据或错误信息，第二个返回值返回请求是否成功
export default class request {
	static buildUrl(url: string, params: Param) {
		if (!params) return url;
		let result = request.getParamsArray(params);
		if (result.length == 0) { return url }
		let prefix = '?';
		if (url.indexOf('?') > -1) {
			prefix = '&';
		}
		return url + prefix + result.join('&');
	}

	static getParamsArray(params: Param) {
		let result: string[] = [];
		if (!params) return result;
		Object.keys(params).forEach(key => {
			if (params.hasOwnProperty(key) && !!params[key]) {
				let value = params[key];
				result.push(key + '=' + encodeURIComponent(value));
			}
		});
		return result;
	}

	/**
	*  http 请求封装
	*/
	static http(url: string, req: Request) {

		return new Promise((resolve, reject) => {
			fetch(url, req)
				.then(res => {
					return res.json()
				})
				.then(res => {
					resolve(res);
				})
				.catch(err => {
					reject(err);
				})
		});
	};

	/**
	*  http请求参以及响应处理
	*/
	static requestTask<T = any>(url: string, method: 'POST' | 'GET', params: Param = {}, loding: boolean = false, pretreatment = true) {

		/* 处理url */
		if (url.substring(0, 4) != "http") {
			url = `${defaultConfig.apiHost}${url[0] !== '/' ? '/' : ''}${url}`
		}

		let body = ''
		if (method == 'GET') {
			url = url + '?' + this.getParamsArray(params).join('&');
		} else {
			body = JSON.stringify(params)
		}

		var requestData = {
			method,
			headers: {
				Accept: 'application/json',
				'Content-Type': method == 'GET' ? 'application/x-www-form-urlencoded;charset=UTF-8' : 'application/json;charset=utf-8',
				...defaultConfig.defaultReqHeader
			},
			body: body,
		};

		if (loding) {
			tips.showLoading('奋力加载中...')
		}


		return new Promise<T>((resolve, reject) => {
			this.http(url, requestData).then(
				(res: any) => {
					let rescode = res.rescode;
					let data = <T>res.data;
					let message = res.msg;

					// 测试环境打印访问结果
					if (__DEV__) {
						console.log('--------------------------------------------------http 开始--------------------------------------------------------');
						console.log('访问接口:' + url);
						console.log('请求头:', requestData);
						console.log('请求参数', params);
						console.log('响应数据 ：', res);
						// let str = JSON.stringify(res, null, "");
						// console.log('响应数据的JSON字符串', str);
						console.log('--------------------------------------------------http 结束--------------------------------------------------------');
					}
					if (loding) {
						tips.hideLoading()
					}

					if (pretreatment) {
						// 需要预处理
						if (rescode == 200) {
							resolve(data)
						} else {
							if (loding) {
								tips.showTips(message);
							}
							if (rescode == 202) {
								// token 失效 退出登陆
								messageEmit.emit("tokenInvalid")
							}
							reject({ message, rescode });
						}
					} else {
						// 不需要预处理
						resolve(res)
					}
				},
				(error: any) => {
					if (__DEV__) {
						console.log('访问接口:' + '==>' + url + '  ///   请求头:' + requestData)
						console.log('请求参数', params);
						console.log('响应错误❌：', error)
					}
					if (loding) { //  关闭转圈
						tips.hideLoading()
						// 网络错误 提示，并回调
						tips.showTips('网络差，请稍后再试。');
					}
					reject({ message: '网络差，请稍后再试。', rescode: 404 });
				}
			);
		});
	}


	/**
	*  POST 请求
	*/
	static post<T = any>(url: string, params: Param = {}, loding: boolean = false, pretreatment = true) {
		return this.requestTask<T>(url, 'POST', params, loding, pretreatment);
	}

	/**
	*  GET 请求
	*/
	static get<T = any>(url: string, params: Param = {}, loding: boolean = false, pretreatment = true) {
		return this.requestTask<T>(url, 'GET', params, loding, pretreatment);
	}

	/**
	*  上传
	*/
	static upload<T = any>(url: string, params: { paths: string[] }, loding: boolean = false, fileKey: string = 'codes') {

		/* 处理url */
		if (url.substring(0, 4) != "http") {
			url = defaultConfig.apiHost + (url.substring(0, 1) == "/" ? "" : "/") + url
		}

		let formData = new FormData();
		let paths: string[] = params.paths;
		paths.forEach((path, index) => {
			let file = this.getFileData(path)
			formData.append(fileKey, file)
		})

		let requestData = {
			method: "POST",
			headers: {
				Accept: 'application/json',
				'Content-Type': 'Multipart/form-data',
				...defaultConfig.uploadReqHeader
			},
			body: formData
		}

		if (loding) {
			tips.showLoading('上传中...', 60000)
		}

		console.log(url)
		return new Promise<T>((resolve, reject) => {
			this.http(url, requestData).then(
				(res: any) => {
					let rescode = res.rescode;
					let data = res.data as T;
					let message = res.msg;

					// 测试环境打印访问结果
					if (__DEV__) {
						console.log('访问接口:UPLOAD' + '==>' + url)
						console.log('请求头', requestData);
						console.log('响应数据', res)
					}

					if (loding) {
						tips.hideLoading()
					}

					if (rescode == 200) {
						resolve(data)
					} else {
						if (loding) {
							tips.showTips(message);
						}
						reject({ message, rescode });
					}

				},
				(error: any) => {
					if (__DEV__) {
						console.log(error);
					}
					if (loding) { //  关闭转圈
						tips.hideLoading()
						// 网络错误 提示，并回调
						tips.showTips('网络差，请稍后再试。');
					}
					reject({ message: error.message, rescode: 404 })
				}
			);
		});


	}


	/**
	*  是否有中文
	*/
	static hasChina(str: string) {
		if (/.*[\u4e00-\u9fa5]+.*$/.test(str)) {
			return true
		}
		return false
	}

	/**
		*  从路径中获取文件信息
		*/
	static getFileData(path: string) {

		var arr = path.split('/');
		let tempName = arr[arr.length - 1]
		let type = getFileType(tempName);

		if (this.hasChina(tempName)) {
			tempName = tempName.replace(/[ ]/g, "");//去空格
			tempName = tempName.replace(/[\u4e00-\u9fa5]/g, "");//去除中文
		}
		let file = { uri: path, type, name: tempName };

		return file
	}
}
