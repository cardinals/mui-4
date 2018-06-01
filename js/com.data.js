/**
 * Created by Administrator on 2016/7/29.
 */
//数据处理
if(!com) {
	var com = new Object();
}
if(!com.data) {
	com.data = new Object();
}
if(!com.data.ajax) {
	com.data.ajax = new Object();
}

//------------------------------------------ajax
com.data.ajax.param = function() {
	this.type = "POST";
	this.url = null;
	this.data = {};
	this.fun_success = null;
	this.async = true; //默认异步加载，同步，请设置为false
	this.fun_error = null;
	this.nologin = null; //如果没有登陆，会在合理回调，如果没有回调会重启应用
	this.loading = {
		title: '努力加载中....',
		options: {
			back: "none" //可取值"none"表示截获处理返回键，但不做任何响应；"close"表示截获处理返回键并关闭等待框；"transmit"表示不截获返回键，向后传递给Webview窗口继续处理（与未显示等待框的情况一致）
		}
	}
}

com.data.ajax.error = function(XMLHttpRequest, textStatus, errorThrown) {
	if(XMLHttpRequest.status == 0) {
		var startu1 = '网络异常';
		return startu1;
	} else {
		var status2 = '错误码：' + XMLHttpRequest.status;
		return status2
	}
}

com.data.ajax.json = function(sendParams) {
	$.ajax({
		url: sendParams.url,
		type: sendParams.type,
		dataType: "JSON",
		async: false,
		data: {
			'platform': 'wscn-platform',
			'channel': 'most-read',
			'limit': '10'
		},
		success: function(data) {
			//成功
			if(data.code == "20000") {
				sendParams.fun_success(data.data);
			}
		}
	});
}

//配合后端jsonp请求中转服务
com.data.ajax.jsonp = function(sendParams) {
	if(!sendParams) {
		return;
	}
	var this_wt = null;
	//
	if(!sendParams.data) {
		sendParams.data = {};
	}

	//循环所有的key如果value= null

	sendParams.data['timestamp'] = getTimeStmap();
	var step1 = objKeySort(sendParams.data);
	var sign = getMD5(step1);
	sendParams.data['sign'] = sign;
	sendParams.data['app_key'] = com.data.APP_KEY;
	sendParams.data['token'] = com.data.loginToken.get();
	var param_url = "";
	for(var index in sendParams.data) {
		param_url += "&" + index + "=" + sendParams.data[index];
	}
	var real_url = sendParams.url + param_url;

	console.log("==========>请求地址为:" + real_url)
	$.ajax({
		url: real_url,
		type: 'get',
		dataType: "jsonp",
		timeout: 50000,
		jsonp: "jsoncallback",
		//              jsonpCallback:'jsoncallback',
		success: function(data) {
			// alert(JSON.stringify(data));
			console.log("请求返回数据+=============》" + JSON.stringify(data))
			
			if("1" == data.success_type) {
				sendParams.fun_success(data.result_map, data.msg, data.token, data.finish_info_flag);
			} else {
				console.log(sendParams.url.substring(sendParams.url.lastIndexOf('/')))
				//              alert(JSON.stringify(sendParams.url.substring(sendParams.url.lastIndexOf('/'))))
				if(
					sendParams.url.substring(sendParams.url.lastIndexOf('/')) == '/tradeController.do?trade_limit_check'
				) {
					sendParams.fun_success(data.result_map, data.msg, data.token, data.finish_info_flag);
				} else if(data.login_flag == 0) {
					if(sendParams.url.substring(sendParams.url.lastIndexOf('/')) != '/loginController.do?user_check' &&
						sendParams.url.substring(sendParams.url.lastIndexOf('/')) != '/smsController.do?single_sms_send_check_mobile' &&
						sendParams.url.substring(sendParams.url.lastIndexOf('/')) != '/registerController.do?register_info_save' &&
						sendParams.url.substring(sendParams.url.lastIndexOf('/')) != '/loginController.do?verification_code_login_check') {
//						com.plus.openWindowX('/app/login.html', {});
						mui.openWindow({url: "/app/login.html"});
//						mui.toast("请先登录");
					}
				} else if(sendParams.fun_error) {
					sendParams.fun_error(); //错误码
				}
//				mui.toast(data.msg);
				mui.toast("请先登录");
				//登陆错误提示
				//用户状态错误的判断没有处理
			}

		},
		beforeSend: function(xhr) {
			if(sendParams.loading) {
				this_wt = plus.nativeUI.showWaiting(sendParams.loading.title, sendParams.loading.options);
			}
		},
		complete: function(XMLHttpRequest, status) {
			if(status == 'timeout') {
				mui.toast("请求超时")
			}
			if(sendParams.loading) {
				this_wt.close();
			}
		}
	});

	// $.ajax({
	//     url: real_url,
	//     type: 'get',
	//     dataType: "jsonp",
	//     jsonp: "jsoncallback"
	//       			,
	// beforeSend: function(xhr) {
	// 	alert(1);
	// },
	//     //jsonpCallback:'jsoncallback',
	//     success: function (data) {
	//     	alert(2);
	//         alert(JSON.stringify(data));
	//     }
	//     ,
	//     complete: function() {
	//     	alert(4);
	// 	// if(sendParams.loading) {
	// 	// 	this_wt.close();
	// 	// }
	// },
	// error: function(data) {
	//     	alert(3);
	// }
	// })
	// mui.ajax(real_url,{
	// // data: sendParams.data,
	// dataType: 'jsonp' //服务器返回json格式数据
	// 	,
	// jsonp: "jsoncallback"
	// 	,
	// type: 'get' //HTTP请求类型
	// 	,
	// timeout: 15000 //超时时间设置为15秒
	// 	,
	// beforeSend: function(xhr) {
	// 	if(sendParams.loading) {
	// 		this_wt = plus.nativeUI.showWaiting(sendParams.loading.title, sendParams.loading.options);
	// 	}
	// },
	//
	// complete: function() {
	// 	if(sendParams.loading) {
	// 		this_wt.close();
	// 	}
	// },
	// success: function(data) {
	//
	// 	if(sendParams.loading) {
	// 		this_wt.close();
	// 	}
	// 	//服务器返回响应，根据响应结果，分析是否登录成功
	// 	console.log("服务器返回响应==>" + JSON.stringify(data));
	// 	var code = "";
	// 	try {
	// 		code = data.errorCode;
	// 	} catch(e) {
	// 		sendParams.fun_error("无效的请求");
	// 		return;
	// 	}
	// 	if(code == '') {
	// 		sendParams.fun_success(data.data, data.page, data.errorMsgCn);
	// 	} else if(code == com.data.code.no_login) { //如果没有登陆
	// 		if(sendParams.nologin) {
	// 			sendParams.nologin();
	// 		} else {
	// 			// plus.runtime.restart();
	// 			mui.ge.addListener("loginsuccess", function(args) {
	// 				location.reload();
	// 				mui.ge.callback(args, {})
	// 			});
	// 			// alert(location.href);
	// 			alert("暂未登陆请先登陆");
	// 			com.plus.openWindowX('../../app/oauth.html');
	// 		}
	// 	} else if(code == com.data.code.user_disabled) {
	// 		if(sendParams.nologin) {
	// 			sendParams.nologin();
	// 		} else {
	// 			plus.runtime.restart();
	// 		}
	// 	} else if(code == com.data.code.no_phone) {
	// 		if(sendParams.nologin) {
	// 			sendParams.nologin();
	// 		} else {
	// 			// plus.runtime.restart();
	// 			// mui.ge.addListener("loginsuccess", function(args) {
	// 			//     location.reload();
	// 			//     mui.ge.callback(args, {})
	// 			// });
	// 			alert("请绑定手机号");
	// 			com.plus.openWindowX('../../app/usermain/add_phone.html');
	// 		}
	// 	} else {
	// 		if(sendParams.fun_error) {
	// 			sendParams.fun_error(data.errorMsgCn, code, data.errorTitle, data.data); //错误码
	// 		}
	// 	}
	// },
	// error: function(xhr, type, errorThrown) {
	// 	if(sendParams.loading) {
	// 		this_wt.close();
	// 	}
	// 	var err_msg = com.data.ajax.error(xhr, type, errorThrown);
	// 	if(sendParams.fun_error) {
	// 		sendParams.fun_error(err_msg, xhr.status);
	// 	} else {
	// 		mui.alert(err_msg);
	// 	}
	// }
	// });
}

function getTimeStmap() {
	var time = new Date().Format("yyyyMMddHHmmss");
	return time;
}
//var jsonstr=JSON.stringify(objKeySort(arys));
//排序的函数
function objKeySort(arys) {
	console.log("===========>传入参数为" + JSON.stringify(arys));
	//先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
	var newkey = Object.keys(arys).sort();
	//console.log('newkey='+newkey);
	var newObj = {}; //创建一个新的对象，用于存放排好序的键值对
	for(var i = 0; i < newkey.length; i++) {
		//遍历newkey数组
		newObj[newkey[i]] = arys[newkey[i]];
		//向新创建的对象中按照排好的顺序依次增加键值对

	}
	console.log("===========>排序后的参数为" + JSON.stringify(newObj));
	return newObj; //返回排好序的新对象
}

function getMD5(str) {
	var changestr = "";
	// alert(JSON.stringify(str));
	$.each(str, function(idx, obj1) {
		if(obj1 != null && isNaN(obj1)) {
			if(obj1.indexOf("%25") >= 0) {
				str[idx] = decodeURIComponent(obj1);
			}
		}
	});
	for(var index in str) {
		changestr += "&" + index + "=" + str[index];
	}
	changestr = changestr.substring(1);
	console.log("===========>md5加密字符串前为" + changestr);
	var sign = $.md5("b7e7fccf2b0b4f49aa39ad678fd74ba5" + changestr);
	return sign.toUpperCase();
}
Date.prototype.Format = function(fmt) { //author: meizz 
	var o = {
		"M+": this.getMonth() + 1, //月份 
		"d+": this.getDate(), //日 
		"H+": this.getHours(), //小时 
		"m+": this.getMinutes(), //分 
		"s+": this.getSeconds(), //秒 
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		"S": this.getMilliseconds() //毫秒 
	};
	if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for(var k in o)
		if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

//测试----

//com.data._BASE_URL = "http://101.132.181.5:18088/";
//com.data.APP_KEY = "orient_app_key_20171108_test";
//com.data.APP_SECRET = "9e787f77f3774fa7ac053321ed556bb4";


//生产-----
com.data._BASE_URL = "https://apijijin.dzqh.com.cn:11443/";
com.data.APP_KEY = "orient_app_key_20180316";
com.data.APP_SECRET = "b7e7fccf2b0b4f49aa39ad678fd74ba5";

//测试的相关，上架需要注释掉
com.data.test = {
	// test_login_token: "59dc735b4400c909866387a76d8587af"
	// , test_code_token: ""
}

//显示二维码图片
com.data.codeImg = {

	getUrl: function(img_url) {
			return com.data._BASE_URL + img_url;
		}
		/**
		 *  刷新
		 * @param container_ele 容器
		 */
		,
	refresh: function(img_ele, img_url) {
		com.data.user.getImgCheck({}, function(data) {
			var img_ = new Image();
			var url = com.data._BASE_URL + img_url;
			console.log("验证码刷新的url：" + url);
			img_.onload = function() {
				img_.onload = null;
				console.log("加载完成");
				img_ele.src = url;
			}
			img_.onerror = function() {
				console.log("加载失败");
				img_ele.src = null;
			}
			img_.src = url;
		})

	}
}

//============================================================================本地数据相关
com.data.code = { //数据返回码
	no_login: "USER_TOKEN_ERROR_000002" //表示登陆失败
		,
	user_disabled: "USER_ERROR_000002" //表示用户被禁用
		,
	money_enough: "USER_ERROR_000002" //表示用户被禁用
		,
	no_phone: "USER_PHONE_ERROR" //标识用户没有手机号
}

com.data.key = {
	userInfo: 'userInfo', //用户信息
	loginToken: 'loginToken',
	codeToken: 'codeToken'
}
/**
 * 登陆Token
 * @type {{get: Function, update: Function, clear: Function}}
 */

com.data.loginToken = {

	/**
	 * 获取token
	 */
	get: function() {
			if(com.data.test &&
				com.data.test.test_login_token) {
				return com.data.test.test_login_token
			}
			var loginToken = com.plus.storage.get(com.data.key.loginToken);
			if(!loginToken) {
				return null;
			}
			return loginToken;

		}
		/**
		 * 修改token
		 */
		,
	update: function(token_) {
		com.plus.storage.put(com.data.key.loginToken, token_);
	},
	clear: function() {
		com.plus.storage.remove(com.data.key.loginToken);
	}
}

/**
 * 验证码回话token
 * @type {{get: Function, update: Function, clear: Function}}
 */
com.data.codeToken = {
	/**
	 * 获取token
	 */
	get: function() {
			if(com.data.test &&
				com.data.test.test_code_token) {
				return com.data.test.test_code_token;
			}
			var codeToken = com.plus.storage.get(com.data.key.codeToken);
			if(!codeToken) {
				var codeToken = com.data.common.getCodeToken(); //网络获取图片
				this.update(codeToken);
				return codeToken;
			}
			return codeToken;
		}
		/**
		 * 修改token
		 */
		,
	update: function(token_) {
		com.plus.storage.put(com.data.key.codeToken, token_);
	},
	clear: function() {
		com.plus.storage.remove(com.data.key.codeToken);
	}
}

//个人信息操作
/**
 "banklist": [ ],
 "money_bean": 10,
 "level": "大众",
 "head_img": "XXXXX",
 "sex": 1,
 "money": 1000,
 "phone": "18252146252",
 "integral": 100,
 "nickname": "kajie",
 "integral_canuse": 100,
 "id": 1,
 */
com.data.userInfo = {

	/**
	 * 获取个人信息
	 */
	get: function() {
			var userinfo = com.plus.storage.get(com.data.key.userInfo);
			return userinfo;
		}
		/**
		 * 重新修改信息
		 */
		,
	update: function(userinfo) {
		com.plus.storage.put(com.data.key.userInfo, userinfo);
	},

	clear: function() {
		com.plus.storage.remove(com.data.key.userInfo);
	}

}

//============================================================================

com.data.common = {
	/**
	 * 获取版本消息列表
	 输入
	 code:应用类型- bus_android,user_android
	 app_version:应用版本号
	 pro_version:应用区县版本

	 输出
	 app：版本
	 app.name:版本名
	 app.code:软件代码
	 app.desc:描述
	 app.version_name:版本号(1.5.1)
	 app.version_code:版本迭代号
	 app.url:下载链接
	 app.update_time:版本信息更新时间
	 app.is_must:是否强制更新1-是,0-否

	 app_pro.version_name:省市区版本

	 app_pro.pro:省市区
	 app_pro.pro.id 省市区ID
	 app_pro.pro.name 省市区NAME
	 app_pro.pro.pid 省市区pid
	 */
	version: function(do_data, do_success, do_error) {
		var params = new com.data.ajax.param();
		params.url = com.data._BASE_URL + "version/checkVersion";
		params.fun_success = do_success;
		params.data = do_data;
		params.loading = {
			title: '检查更新',
			options: {
				back: "none" //可取值"none"表示截获处理返回键，但不做任何响应；"close"表示截获处理返回键并关闭等待框；"transmit"表示不截获返回键，向后传递给Webview窗口继续处理（与未显示等待框的情况一致）
			}
		}
		params.fun_error = function(msg, code) {
			if(do_error) {
				do_error(msg);
			} else {
				mui.toast(msg);
			}
		}
		com.data.ajax.jsonp(params);
	},
	getImgCheck: function(do_data, do_success, do_error) {
		var params = new com.data.ajax.param();
		params.url = com.data._BASE_URL + "jsoncloud/common/imgCode/getImgCheck";
		params.fun_success = do_success;
		params.data = do_data;
		params.loading = {
			title: '检查更新',
			options: {
				back: "none" //可取值"none"表示截获处理返回键，但不做任何响应；"close"表示截获处理返回键并关闭等待框；"transmit"表示不截获返回键，向后传递给Webview窗口继续处理（与未显示等待框的情况一致）
			}
		}
		params.fun_error = function(msg, code) {
			if(do_error) {
				do_error(msg);
			} else {
				mui.toast(msg);
			}
		}
		com.data.ajax.jsonp(params);
	},
	/**
	 * 获取一个codeToken
	 * 同步获取
	 * @param  do_success 回调成功
	 * @param  do_error   回调失败
	 */
	getCodeToken: function() {
		var code_token_ = null;
		var params = new com.data.ajax.param();
		params.url = com.data._BASE_URL + "common/getCodeToken.json";
		params.fun_success = function(data) {
			code_token_ = data.code_token;
		};
		params.loading = {
			title: '获取图形验证码',
			options: {
				back: "none" //可取值"none"表示截获处理返回键，但不做任何响应；"close"表示截获处理返回键并关闭等待框；"transmit"表示不截获返回键，向后传递给Webview窗口继续处理（与未显示等待框的情况一致）
			}
		};
		params.async = false; //同步加载
		com.data.ajax.jsonp(params);
		console.log("获取最新的code_token[" + code_token_ + "]");
		return code_token_;
	}
}

com.data.user = {
	//获取手机验证码
	getPhoneCode: function(do_data, do_success, do_error) {
		var params = new com.data.ajax.param();

		params.url = com.data._BASE_URL + "smsController.do?single_sms_send_check_mobile";
		params.fun_success = do_success;
		params.data = do_data;
		params.loading = {
			title: '处理中...',
			options: {
				back: "none" //可取值"none"表示截获处理返回键，但不做任何响应；"close"表示截获处理返回键并关闭等待框；"transmit"表示不截获返回键，向后传递给Webview窗口继续处理（与未显示等待框的情况一致）
			}
		}
		com.data.ajax.jsonp(params);
	}, 
	getPhoneCodeUncheck: function(do_data, do_success, do_error) {
		var params = new com.data.ajax.param();

		params.url = com.data._BASE_URL + "smsController.do?single_sms_send_uncheck_mobile";
		params.fun_success = do_success;
		params.data = do_data;
		params.loading = {
			title: '处理中...',
			options: {
				back: "none" //可取值"none"表示截获处理返回键，但不做任何响应；"close"表示截获处理返回键并关闭等待框；"transmit"表示不截获返回键，向后传递给Webview窗口继续处理（与未显示等待框的情况一致）
			}
		}
		com.data.ajax.jsonp(params);
	},
	register: function(do_data, do_success, do_error) {
		var params = new com.data.ajax.param();

		params.url = com.data._BASE_URL + "registerController.do?register_info_save";
		params.fun_success = do_success;
		params.data = do_data;
		params.loading = {
			title: '处理中...',
			options: {
				back: "none" //可取值"none"表示截获处理返回键，但不做任何响应；"close"表示截获处理返回键并关闭等待框；"transmit"表示不截获返回键，向后传递给Webview窗口继续处理（与未显示等待框的情况一致）
			}
		}
		com.data.ajax.jsonp(params);
	},
	login: function(do_data, do_success, do_error) {
		var params = new com.data.ajax.param();

		params.url = com.data._BASE_URL + "loginController.do?user_check";
		params.fun_success = do_success;
		params.data = do_data;
		params.loading = {
			title: '处理中...',
			options: {
				back: "none" //可取值"none"表示截获处理返回键，但不做任何响应；"close"表示截获处理返回键并关闭等待框；"transmit"表示不截获返回键，向后传递给Webview窗口继续处理（与未显示等待框的情况一致）
			}
		}
		
		com.data.ajax.jsonp(params);
	},
	loginByCode: function(do_data, do_success, do_error) {
		var params = new com.data.ajax.param();

		params.url = com.data._BASE_URL + "loginController.do?verification_code_login_check";
		params.fun_success = do_success;
		params.data = do_data;
		params.loading = {
			title: '处理中...',
			options: {
				back: "none" //可取值"none"表示截获处理返回键，但不做任何响应；"close"表示截获处理返回键并关闭等待框；"transmit"表示不截获返回键，向后传递给Webview窗口继续处理（与未显示等待框的情况一致）
			}
		}
		com.data.ajax.jsonp(params);
	},
	addUserInfo: function(do_data, do_success, do_error) {
		var params = new com.data.ajax.param();

		params.url = com.data._BASE_URL + "registerController.do?register_other_info_save";
		params.fun_success = do_success;
		params.data = do_data;
		params.loading = {
			title: '处理中...',
			options: {
				back: "none" //可取值"none"表示截获处理返回键，但不做任何响应；"close"表示截获处理返回键并关闭等待框；"transmit"表示不截获返回键，向后传递给Webview窗口继续处理（与未显示等待框的情况一致）
			}
		}
		com.data.ajax.jsonp(params);
	},
	getQuestions: function(do_data, do_success, do_error) {
		var params = new com.data.ajax.param();

		params.url = com.data._BASE_URL + "questionnaireController.do?questionnaire_query";
		params.fun_success = do_success;
		params.data = do_data;
		params.loading = {
			title: '处理中...',
			options: {
				back: "none" //可取值"none"表示截获处理返回键，但不做任何响应；"close"表示截获处理返回键并关闭等待框；"transmit"表示不截获返回键，向后传递给Webview窗口继续处理（与未显示等待框的情况一致）
			}
		}
		com.data.ajax.jsonp(params);
	},
	commitAnswer: function(do_data, do_success, do_error) {
		var params = new com.data.ajax.param();
		params.url = com.data._BASE_URL + "questionnaireController.do?survey_save";
		params.fun_success = do_success;
		params.data = do_data;
		params.loading = {
			title: '处理中...',
			options: {
				back: "none" //可取值"none"表示截获处理返回键，但不做任何响应；"close"表示截获处理返回键并关闭等待框；"transmit"表示不截获返回键，向后传递给Webview窗口继续处理（与未显示等待框的情况一致）
			}
		}
		com.data.ajax.jsonp(params);
	},
	checkHaveBankCard: function(do_data, do_success, do_error) {
		var params = new com.data.ajax.param();
		params.url = com.data._BASE_URL + "bankController.do?my_bank_card_query";
		params.fun_success = do_success;
		params.data = do_data;
		params.loading = {
			title: '处理中...',
			options: {
				back: "none" //可取值"none"表示截获处理返回键，但不做任何响应；"close"表示截获处理返回键并关闭等待框；"transmit"表示不截获返回键，向后传递给Webview窗口继续处理（与未显示等待框的情况一致）
			}
		}
		com.data.ajax.jsonp(params);
	},
	addBankCard: function(do_data, do_success, do_error) {
		var params = new com.data.ajax.param();
		params.url = com.data._BASE_URL + "bankController.do?bank_card_save";
		params.fun_success = do_success;
		params.data = do_data;
		params.loading = {
			title: '处理中...',
			options: {
				back: "none" //可取值"none"表示截获处理返回键，但不做任何响应；"close"表示截获处理返回键并关闭等待框；"transmit"表示不截获返回键，向后传递给Webview窗口继续处理（与未显示等待框的情况一致）
			}
		}
		com.data.ajax.jsonp(params);
	},
	changeBankCard: function(do_data, do_success, do_error) {
		var params = new com.data.ajax.param();
		params.url = com.data._BASE_URL + "bankController.do?bank_card_change";
		params.fun_success = do_success;
		params.data = do_data;
		params.loading = {
			title: '处理中...',
			options: {
				back: "none" //可取值"none"表示截获处理返回键，但不做任何响应；"close"表示截获处理返回键并关闭等待框；"transmit"表示不截获返回键，向后传递给Webview窗口继续处理（与未显示等待框的情况一致）
			}
		}
		com.data.ajax.jsonp(params);
	},
	loginout: function(do_data, do_success, do_error) {
		var params = new com.data.ajax.param();
		params.url = com.data._BASE_URL + "loginController.do?logout";
		params.fun_success = do_success;
		params.data = do_data;
		params.loading = {
			title: '处理中...',
			options: {
				back: "none" //可取值"none"表示截获处理返回键，但不做任何响应；"close"表示截获处理返回键并关闭等待框；"transmit"表示不截获返回键，向后传递给Webview窗口继续处理（与未显示等待框的情况一致）
			}
		}
		com.data.ajax.jsonp(params);
	},
	showMyCard: function(do_data, do_success, do_error) {
		var params = new com.data.ajax.param();
		params.url = com.data._BASE_URL + "bankController.do?my_bank_card_query";
		params.fun_success = do_success;
		params.data = do_data;
		params.loading = {
			title: '处理中...',
			options: {
				back: "none" //可取值"none"表示截获处理返回键，但不做任何响应；"close"表示截获处理返回键并关闭等待框；"transmit"表示不截获返回键，向后传递给Webview窗口继续处理（与未显示等待框的情况一致）
			}
		}
		com.data.ajax.jsonp(params);
	},
	delMyCard: function(do_data, do_success, do_error) {
		var params = new com.data.ajax.param();
		params.url = com.data._BASE_URL + "bankController.do?bank_card_delete";
		params.fun_success = do_success;
		params.data = do_data;
		params.loading = {
			title: '处理中...',
			options: {
				back: "none" //可取值"none"表示截获处理返回键，但不做任何响应；"close"表示截获处理返回键并关闭等待框；"transmit"表示不截获返回键，向后传递给Webview窗口继续处理（与未显示等待框的情况一致）
			}
		}
		com.data.ajax.jsonp(params);
	},
	showMyInfo: function(do_data, do_success, do_error) {
		var params = new com.data.ajax.param();
		params.url = com.data._BASE_URL + "accountController.do?account_info_query";
		params.fun_success = do_success;
		params.data = do_data;
		params.loading = {
			title: '处理中...',
			options: {
				back: "none" //可取值"none"表示截获处理返回键，但不做任何响应；"close"表示截获处理返回键并关闭等待框；"transmit"表示不截获返回键，向后传递给Webview窗口继续处理（与未显示等待框的情况一致）
			}
		}
		com.data.ajax.jsonp(params);
	},
	upMyInfo: function(do_data, do_success, do_error) {
		var params = new com.data.ajax.param();
		params.url = com.data._BASE_URL + "accountController.do?account_info_update";
		params.fun_success = do_success;
		params.data = do_data;
		params.loading = {
			title: '处理中...',
			options: {
				back: "none" //可取值"none"表示截获处理返回键，但不做任何响应；"close"表示截获处理返回键并关闭等待框；"transmit"表示不截获返回键，向后传递给Webview窗口继续处理（与未显示等待框的情况一致）
			}
		}
		com.data.ajax.jsonp(params);
	},
	updateLoginPwd: function(do_data, do_success, do_error) {
		var params = new com.data.ajax.param();
		params.url = com.data._BASE_URL + "accountController.do?login_password_update";
		params.fun_success = do_success;
		params.data = do_data;
		params.loading = {
			title: '处理中...',
			options: {
				back: "none" //可取值"none"表示截获处理返回键，但不做任何响应；"close"表示截获处理返回键并关闭等待框；"transmit"表示不截获返回键，向后传递给Webview窗口继续处理（与未显示等待框的情况一致）
			}
		}
		com.data.ajax.jsonp(params);
	},
	setLoginPwd: function(do_data, do_success, do_error) {
		var params = new com.data.ajax.param();
		params.url = com.data._BASE_URL + "accountController.do?login_password_set";
		params.fun_success = do_success;
		params.data = do_data;
		params.loading = {
			title: '处理中...',
			options: {
				back: "none" //可取值"none"表示截获处理返回键，但不做任何响应；"close"表示截获处理返回键并关闭等待框；"transmit"表示不截获返回键，向后传递给Webview窗口继续处理（与未显示等待框的情况一致）
			}
		}
		com.data.ajax.jsonp(params);
	},
	updateTradePwd: function(do_data, do_success, do_error) {
		var params = new com.data.ajax.param();
		params.url = com.data._BASE_URL + "accountController.do?trading_password_update";
		params.fun_success = do_success;
		params.data = do_data;
		params.loading = {
			title: '处理中...',
			options: {
				back: "none" //可取值"none"表示截获处理返回键，但不做任何响应；"close"表示截获处理返回键并关闭等待框；"transmit"表示不截获返回键，向后传递给Webview窗口继续处理（与未显示等待框的情况一致）
			}
		}
		com.data.ajax.jsonp(params);
	},
}

com.data.funds = {
	getUpFunds: function(do_data, do_success, do_error) {
		var params = new com.data.ajax.param();
		// do_data[""]=null;
		params.url = com.data._BASE_URL + "fundChoiceController.do?fund_choices_query";
		params.fun_success = do_success;
		params.data = do_data;
//		params.loading = {
//			title: '处理中...',
//			options: {
//				back: "none" //可取值"none"表示截获处理返回键，但不做任何响应；"close"表示截获处理返回键并关闭等待框；"transmit"表示不截获返回键，向后传递给Webview窗口继续处理（与未显示等待框的情况一致）
//			}
//		}
		params.fun_error = function(msg, code) {
			if(do_error) {
				do_error(msg)
			} else {
				mui.toast(msg);
			}
		}
		com.data.ajax.jsonp(params);
	},

	getMyFundsSum: function(do_data, do_success, do_error) {
		var params = new com.data.ajax.param();
		params.url = com.data._BASE_URL + "fundInfoController.do?current_holding_fund_amount";
		params.fun_success = do_success;
		params.data = do_data;
//		params.loading = {
//			title: '处理中...',
//			options: {
//				back: "none" //可取值"none"表示截获处理返回键，但不做任何响应；"close"表示截获处理返回键并关闭等待框；"transmit"表示不截获返回键，向后传递给Webview窗口继续处理（与未显示等待框的情况一致）
//			}
//		}
		params.fun_error = function(msg, code) {
			if(do_error) {
				do_error(msg)
			} else {
				mui.toast(msg);
			}
		}
		com.data.ajax.jsonp(params);
	},
	//东证动态
//	getdzdt: function(do_data, do_success, do_error) {
//		var params = new com.data.ajax.param();
//		// do_data[""]=null;
//		params.url = com.data._BASE_URL + "newsController.do?news_detail_query";
//		params.fun_success = do_success;
//		params.data = do_data;
//		params.loading = {
//			title: '处理中...',
//			options: {
//				back: "none" //可取值"none"表示截获处理返回键，但不做任何响应；"close"表示截获处理返回键并关闭等待框；"transmit"表示不截获返回键，向后传递给Webview窗口继续处理（与未显示等待框的情况一致）
//			}
//		}
//		params.fun_error = function(msg, code) {
//			if(do_error) {
//				do_error(msg)
//			} else {
//				mui.toast(msg);
//			}
//		}
//		com.data.ajax.jsonp(params);
//	},
	//我的基金-当前持有
	fundMyNow: function(do_data, do_success, do_error) {
		var params = new com.data.ajax.param();
		// do_data[""]=null;
		params.url = com.data._BASE_URL + "fundInfoController.do?current_holding_fund_query";
		params.fun_success = do_success;
		params.data = do_data;
		params.loading = {
			title: '处理中...',
			options: {
				back: "none" //可取值"none"表示截获处理返回键，但不做任何响应；"close"表示截获处理返回键并关闭等待框；"transmit"表示不截获返回键，向后传递给Webview窗口继续处理（与未显示等待框的情况一致）
			}
		}
		params.fun_error = function(msg, code) {
			if(do_error) {
				do_error(msg)
			} else {
				mui.toast(msg);
			}
		}
		com.data.ajax.jsonp(params);
	},
	//我的基金-带持有
	fundMyHolding: function(do_data, do_success, do_error) {
		var params = new com.data.ajax.param();
		// do_data[""]=null;
		params.url = com.data._BASE_URL + "fundInfoController.do?waiting_holding_fund_query";
		params.fun_success = do_success;
		params.data = do_data;
		params.loading = {
			title: '处理中...',
			options: {
				back: "none" //可取值"none"表示截获处理返回键，但不做任何响应；"close"表示截获处理返回键并关闭等待框；"transmit"表示不截获返回键，向后传递给Webview窗口继续处理（与未显示等待框的情况一致）
			}
		}
		params.fun_error = function(msg, code) {
			if(do_error) {
				do_error(msg)
			} else {
				mui.toast(msg);
			}
		}
		com.data.ajax.jsonp(params);
	},
	//我的基金-待赎回
	fundMyRedeem: function(do_data, do_success, do_error) {
		var params = new com.data.ajax.param();
		// do_data[""]=null;
		params.url = com.data._BASE_URL + "fundInfoController.do?waiting_redeem_fund_query";
		params.fun_success = do_success;
		params.data = do_data;
		params.loading = {
			title: '处理中...',
			options: {
				back: "none" //可取值"none"表示截获处理返回键，但不做任何响应；"close"表示截获处理返回键并关闭等待框；"transmit"表示不截获返回键，向后传递给Webview窗口继续处理（与未显示等待框的情况一致）
			}
		}
		params.fun_error = function(msg, code) {
			if(do_error) {
				do_error(msg)
			} else {
				mui.toast(msg);
			}
		}
		com.data.ajax.jsonp(params);
	},
	//我的基金-申请确认
	fundMyApply: function(do_data, do_success, do_error) {
		var params = new com.data.ajax.param();
		// do_data[""]=null;
		params.url = com.data._BASE_URL + "tradeController.do?apply_status_query";
		params.fun_success = do_success;
		params.data = do_data;
		params.loading = {
			title: '处理中...',
			options: {
				back: "none" //可取值"none"表示截获处理返回键，但不做任何响应；"close"表示截获处理返回键并关闭等待框；"transmit"表示不截获返回键，向后传递给Webview窗口继续处理（与未显示等待框的情况一致）
			}
		}
		params.fun_error = function(msg, code) {
			if(do_error) {
				do_error(msg)
			} else {
				mui.toast(msg);
			}
		}
		com.data.ajax.jsonp(params);
	},
	getFundsList: function(do_data, do_success, do_error) {
		var params = new com.data.ajax.param();
		// do_data[""]=null;
		params.url = com.data._BASE_URL + "fundInfoController.do?fund_query";
		params.fun_success = do_success;
		params.data = do_data;
		params.loading = {
			title: '处理中...',
			options: {
				back: "close" //可取值"none"表示截获处理返回键，但不做任何响应；"close"表示截获处理返回键并关闭等待框；"transmit"表示不截获返回键，向后传递给Webview窗口继续处理（与未显示等待框的情况一致）
			}
		}
		params.fun_error = function(msg, code) {
			if(do_error) {
				do_error(msg)
			} else {
				mui.toast(msg);
			}
		}
		com.data.ajax.jsonp(params);
	},
	getFundsUpByType: function(do_data, do_success, do_error) {
		var params = new com.data.ajax.param();
		// do_data[""]=null;
		params.url = com.data._BASE_URL + "fundInfoController.do?fund_query";
		params.fun_success = do_success;
		params.data = do_data;
		params.loading = {
			title: '处理中...',
			options: {
				back: "none" //可取值"none"表示截获处理返回键，但不做任何响应；"close"表示截获处理返回键并关闭等待框；"transmit"表示不截获返回键，向后传递给Webview窗口继续处理（与未显示等待框的情况一致）
			}
		}
		params.fun_error = function(msg, code) {
			if(do_error) {
				do_error(msg)
			} else {
				mui.toast(msg);
			}
		}
		com.data.ajax.jsonp(params);
	},
	getFundMoreInfo: function(do_data, do_success, do_error) {
		var params = new com.data.ajax.param();
		// do_data[""]=null;
		params.url = com.data._BASE_URL + "fundInfoController.do?fund_detail_query";
		params.fun_success = do_success;
		params.data = do_data;
		params.loading = {
			title: '处理中...',
			options: {
				back: "none" //可取值"none"表示截获处理返回键，但不做任何响应；"close"表示截获处理返回键并关闭等待框；"transmit"表示不截获返回键，向后传递给Webview窗口继续处理（与未显示等待框的情况一致）
			}
		}
		params.fun_error = function(msg, code) {
			if(do_error) {
				do_error(msg)
			} else {
				mui.toast(msg);
			}
		}
		com.data.ajax.jsonp(params);
	},
	getFundLink: function(do_data, do_success, do_error) {
		var params = new com.data.ajax.param();
		// do_data[""]=null;
		params.url = com.data._BASE_URL + "fundInfoController.do?old_hq_line_query";
		params.fun_success = do_success;
		params.data = do_data;
		params.loading = {
			title: '处理中...',
			options: {
				back: "none" //可取值"none"表示截获处理返回键，但不做任何响应；"close"表示截获处理返回键并关闭等待框；"transmit"表示不截获返回键，向后传递给Webview窗口继续处理（与未显示等待框的情况一致）
			}
		}
		params.fun_error = function(msg, code) {
			if(do_error) {
				do_error(msg)
			} else {
				mui.toast(msg);
			}
		}
		com.data.ajax.jsonp(params);
	},
	checkUserStatue: function(do_data, do_success, do_error) {
		var params = new com.data.ajax.param();
		// do_data[""]=null;
		params.url = com.data._BASE_URL + "tradeController.do?trade_limit_check";
		params.fun_success = do_success;
		params.data = do_data;
		params.loading = {
			title: '处理中...',
			options: {
				back: "none" //可取值"none"表示截获处理返回键，但不做任何响应；"close"表示截获处理返回键并关闭等待框；"transmit"表示不截获返回键，向后传递给Webview窗口继续处理（与未显示等待框的情况一致）
			}
		}
		params.fun_error = function(msg, code) {
			if(do_error) {
				do_error(msg)
			} else {
				mui.toast(msg);
			}
		}
		com.data.ajax.jsonp(params);
	},
	checkUserLevel: function(do_data, do_success, do_error) {
		var params = new com.data.ajax.param();
		// do_data[""]=null;
		params.url = com.data._BASE_URL + "warningController.do?risk_check";
		params.fun_success = do_success;
		params.data = do_data;
		params.loading = {
			title: '处理中...',
			options: {
				back: "none" //可取值"none"表示截获处理返回键，但不做任何响应；"close"表示截获处理返回键并关闭等待框；"transmit"表示不截获返回键，向后传递给Webview窗口继续处理（与未显示等待框的情况一致）
			}
		}
		params.fun_error = function(msg, code) {
			if(do_error) {
				do_error(msg)
			} else {
				mui.toast(msg);
			}
		}
		com.data.ajax.jsonp(params);
	},
	getWarningInfo: function(do_data, do_success, do_error) {
		var params = new com.data.ajax.param();
		// do_data[""]=null;
		params.url = com.data._BASE_URL + "warningController.do?warning_query";
		params.fun_success = do_success;
		params.data = do_data;
		params.loading = {
			title: '处理中...',
			options: {
				back: "none" //可取值"none"表示截获处理返回键，但不做任何响应；"close"表示截获处理返回键并关闭等待框；"transmit"表示不截获返回键，向后传递给Webview窗口继续处理（与未显示等待框的情况一致）
			}
		}
		params.fun_error = function(msg, code) {
			if(do_error) {
				do_error(msg)
			} else {
				mui.toast(msg);
			}
		}
		com.data.ajax.jsonp(params);
	},
	saveMark: function(do_data, do_success, do_error) {
		var params = new com.data.ajax.param();
		// do_data[""]=null;
		params.url = com.data._BASE_URL + "warningController.do?warning_mark_save";
		params.fun_success = do_success;
		params.data = do_data;
		params.loading = {
			title: '处理中...',
			options: {
				back: "none" //可取值"none"表示截获处理返回键，但不做任何响应；"close"表示截获处理返回键并关闭等待框；"transmit"表示不截获返回键，向后传递给Webview窗口继续处理（与未显示等待框的情况一致）
			}
		}
		params.fun_error = function(msg, code) {
			if(do_error) {
				do_error(msg)
			} else {
				mui.toast(msg);
			}
		}
		com.data.ajax.jsonp(params);
	},

	addOrder: function(do_data, do_success, do_error) {
		var params = new com.data.ajax.param();
		// do_data[""]=null;
		params.url = com.data._BASE_URL + "tradeController.do?fund_trade";
		params.fun_success = do_success;
		params.data = do_data;
		params.loading = {
			title: '处理中...',
			options: {
				back: "none" //可取值"none"表示截获处理返回键，但不做任何响应；"close"表示截获处理返回键并关闭等待框；"transmit"表示不截获返回键，向后传递给Webview窗口继续处理（与未显示等待框的情况一致）
			}
		}
		params.fun_error = function(msg, code) {
			if(do_error) {
				do_error(msg)
			} else {
				mui.toast(msg);
			}
		}
		com.data.ajax.jsonp(params);
	},
	getFundRecord: function(do_data, do_success, do_error) {
		var params = new com.data.ajax.param();
		params.url = com.data._BASE_URL + "tradeController.do?trade_apply_query";
		params.fun_success = do_success;
		params.data = do_data;
		params.loading = {
			title: '处理中...',
			options: {
				back: "none" //可取值"none"表示截获处理返回键，但不做任何响应；"close"表示截获处理返回键并关闭等待框；"transmit"表示不截获返回键，向后传递给Webview窗口继续处理（与未显示等待框的情况一致）
			}
		}
		params.fun_error = function(msg, code) {
			if(do_error) {
				do_error(msg)
			} else {
				mui.toast(msg);
			}
		}
		com.data.ajax.jsonp(params);
	},
	getDingTouList: function(do_data, do_success, do_error) {
		var params = new com.data.ajax.param();
		params.url = com.data._BASE_URL + "fixController.do?fixallot_query";
		params.fun_success = do_success;
		params.data = do_data;
		params.loading = {
			title: '处理中...',
			options: {
				back: "none" //可取值"none"表示截获处理返回键，但不做任何响应；"close"表示截获处理返回键并关闭等待框；"transmit"表示不截获返回键，向后传递给Webview窗口继续处理（与未显示等待框的情况一致）
			}
		}
		params.fun_error = function(msg, code) {
			if(do_error) {
				do_error(msg)
			} else {
				mui.toast(msg);
			}
		}
		com.data.ajax.jsonp(params);
	},

	getDingMore: function(do_data, do_success, do_error) {
		var params = new com.data.ajax.param();
		params.url = com.data._BASE_URL + "fixController.do?fixallot_query";
		params.fun_success = do_success;
		params.data = do_data;
		params.loading = {
			title: '处理中...',
			options: {
				back: "none" //可取值"none"表示截获处理返回键，但不做任何响应；"close"表示截获处理返回键并关闭等待框；"transmit"表示不截获返回键，向后传递给Webview窗口继续处理（与未显示等待框的情况一致）
			}
		}
		params.fun_error = function(msg, code) {
			if(do_error) {
				do_error(msg)
			} else {
				mui.toast(msg);
			}
		}
		com.data.ajax.jsonp(params);
	},

	getDingTouRecord: function(do_data, do_success, do_error) {
		var params = new com.data.ajax.param();
		params.url = com.data._BASE_URL + "tradeController.do?trade_apply_query";
		params.fun_success = do_success;
		params.data = do_data;
		params.loading = {
			title: '处理中...',
			options: {
				back: "none" //可取值"none"表示截获处理返回键，但不做任何响应；"close"表示截获处理返回键并关闭等待框；"transmit"表示不截获返回键，向后传递给Webview窗口继续处理（与未显示等待框的情况一致）
			}
		}
		params.fun_error = function(msg, code) {
			if(do_error) {
				do_error(msg)
			} else {
				mui.toast(msg);
			}
		}
		com.data.ajax.jsonp(params);
	},

	stopDingTou: function(do_data, do_success, do_error) {
		var params = new com.data.ajax.param();
		params.url = com.data._BASE_URL + "fixController.do?fixallot_update";
		params.fun_success = do_success;
		params.data = do_data;
		params.loading = {
			title: '处理中...',
			options: {
				back: "none" //可取值"none"表示截获处理返回键，但不做任何响应；"close"表示截获处理返回键并关闭等待框；"transmit"表示不截获返回键，向后传递给Webview窗口继续处理（与未显示等待框的情况一致）
			}
		}
		params.fun_error = function(msg, code) {
			if(do_error) {
				do_error(msg)
			} else {
				mui.toast(msg);
			}
		}
		com.data.ajax.jsonp(params);
	},
	doMoneyReturn: function(do_data, do_success, do_error) {
		var params = new com.data.ajax.param();
		params.url = com.data._BASE_URL + "tradeController.do?fund_redeem";
		params.fun_success = do_success;
		params.data = do_data;
		params.loading = {
			title: '处理中...',
			options: {
				back: "none" //可取值"none"表示截获处理返回键，但不做任何响应；"close"表示截获处理返回键并关闭等待框；"transmit"表示不截获返回键，向后传递给Webview窗口继续处理（与未显示等待框的情况一致）
			}
		}
		params.fun_error = function(msg, code) {
			if(do_error) {
				do_error(msg)
			} else {
				mui.toast(msg);
			}
		}
		com.data.ajax.jsonp(params);
	},

	doFundsOrder: function(do_data, do_success, do_error) {
		var params = new com.data.ajax.param();
		params.url = com.data._BASE_URL + "fixController.do?fixallot_add";
		params.fun_success = do_success;
		params.data = do_data;
		params.loading = {
			title: '处理中...',
			options: {
				back: "none" //可取值"none"表示截获处理返回键，但不做任何响应；"close"表示截获处理返回键并关闭等待框；"transmit"表示不截获返回键，向后传递给Webview窗口继续处理（与未显示等待框的情况一致）
			}
		}
		params.fun_error = function(msg, code) {
			if(do_error) {
				do_error(msg)
			} else {
				mui.toast(msg);
			}
		}
		com.data.ajax.jsonp(params);
	},
	changeFundsOrder: function(do_data, do_success, do_error) {
		var params = new com.data.ajax.param();
		params.url = com.data._BASE_URL + "fixController.do?fixallot_update";
		params.fun_success = do_success;
		params.data = do_data;
		params.loading = {
			title: '处理中...',
			options: {
				back: "none" //可取值"none"表示截获处理返回键，但不做任何响应；"close"表示截获处理返回键并关闭等待框；"transmit"表示不截获返回键，向后传递给Webview窗口继续处理（与未显示等待框的情况一致）
			}
		}
		params.fun_error = function(msg, code) {
			if(do_error) {
				do_error(msg)
			} else {
				mui.toast(msg);
			}
		}
		com.data.ajax.jsonp(params);
	},
	// 申购规则
	getBuyRules: function(do_data, do_success, do_error) {
		var params = new com.data.ajax.param();
		params.url = com.data._BASE_URL + "fundInfoController.do?trade_limit_query";
		params.fun_success = do_success;
		params.data = do_data;
		params.loading = {
			title: '处理中...',
			options: {
				back: "none" //可取值"none"表示截获处理返回键，但不做任何响应；"close"表示截获处理返回键并关闭等待框；"transmit"表示不截获返回键，向后传递给Webview窗口继续处理（与未显示等待框的情况一致）
			}
		}
		params.fun_error = function(msg, code) {
			if(do_error) {
				do_error(msg)
			} else {
				mui.toast(msg);
			}
		}
		com.data.ajax.jsonp(params);
	},

	// 申购费率\赎回费率
	getBuyRate: function(do_data, do_success, do_error) {
		var params = new com.data.ajax.param();
		params.url = com.data._BASE_URL + "fundInfoController.do?fund_rate_query";
		params.fun_success = do_success;
		params.data = do_data;
		params.loading = {
			title: '处理中...',
			options: {
				back: "none" //可取值"none"表示截获处理返回键，但不做任何响应；"close"表示截获处理返回键并关闭等待框；"transmit"表示不截获返回键，向后传递给Webview窗口继续处理（与未显示等待框的情况一致）
			}
		}
		params.fun_error = function(msg, code) {
			if(do_error) {
				do_error(msg)
			} else {
				mui.toast(msg);
			}
		}
		com.data.ajax.jsonp(params);
	},

	// 忘记密码
	forgetpwd: function(do_data, do_success, do_error) {
		var params = new com.data.ajax.param();
		params.url = com.data._BASE_URL + "accountController.do?login_password_reset";
		params.fun_success = do_success;
		params.data = do_data;
		params.loading = {
			title: '处理中...',
			options: {
				back: "none" //可取值"none"表示截获处理返回键，但不做任何响应；"close"表示截获处理返回键并关闭等待框；"transmit"表示不截获返回键，向后传递给Webview窗口继续处理（与未显示等待框的情况一致）
			}
		}
		params.fun_error = function(msg, code) {
			if(do_error) {
				do_error(msg)
			} else {
				mui.toast(msg);
			}
		}
		com.data.ajax.jsonp(params);
	},
	// 忘记密码 的短信验证

	forgetpwdMsg: function(do_data, do_success, do_error) {
		var params = new com.data.ajax.param();
		params.url = com.data._BASE_URL + "smsController.do?single_sms_send_check_mobile_for_forget_pass";
		params.fun_success = do_success;
		params.data = do_data;
		params.loading = {
			title: '处理中...',
			options: {
				back: "none" //可取值"none"表示截获处理返回键，但不做任何响应；"close"表示截获处理返回键并关闭等待框；"transmit"表示不截获返回键，向后传递给Webview窗口继续处理（与未显示等待框的情况一致）
			}
		}
		params.fun_error = function(msg, code) {
			if(do_error) {
				do_error(msg)
			} else {
				mui.toast(msg);
			}
		}
		com.data.ajax.jsonp(params);
	},
	// 私募基金列表
	getList4SelfFund: function(do_data, do_success, do_error) {
		var params = new com.data.ajax.param();
		params.url = com.data._BASE_URL + "fundInfoController.do?fund_query";
		params.fun_success = do_success;
		params.data = do_data;
		params.loading = {
			title: '处理中...',
			options: {
				back: "none" //可取值"none"表示截获处理返回键，但不做任何响应；"close"表示截获处理返回键并关闭等待框；"transmit"表示不截获返回键，向后传递给Webview窗口继续处理（与未显示等待框的情况一致）
			}
		}
		params.fun_error = function(msg, code) {
			if(do_error) {
				do_error(msg)
			} else {
				mui.toast(msg);
			}
		}
		com.data.ajax.jsonp(params);
	},
	// 私募基金信息
	getInfo4SelfFund: function(do_data, do_success, do_error) {
		var params = new com.data.ajax.param();
		params.url = com.data._BASE_URL + "fundInfoController.do?fund_detail_query";
		params.fun_success = do_success;
		params.data = do_data;
		params.loading = {
			title: '处理中...',
			options: {
				back: "none" //可取值"none"表示截获处理返回键，但不做任何响应；"close"表示截获处理返回键并关闭等待框；"transmit"表示不截获返回键，向后传递给Webview窗口继续处理（与未显示等待框的情况一致）
			}
		}
		params.fun_error = function(msg, code) {
			if(do_error) {
				do_error(msg)
			} else {
				mui.toast(msg);
			}
		}
		com.data.ajax.jsonp(params);
	},
	// 基金预约
	doSelfFundsOrder: function(do_data, do_success, do_error) {
		var params = new com.data.ajax.param();
		params.url = com.data._BASE_URL + "bookingController.do?booking_save";
		params.fun_success = do_success;
		params.data = do_data;
		params.loading = {
			title: '处理中...',
			options: {
				back: "none" //可取值"none"表示截获处理返回键，但不做任何响应；"close"表示截获处理返回键并关闭等待框；"transmit"表示不截获返回键，向后传递给Webview窗口继续处理（与未显示等待框的情况一致）
			}
		}
		params.fun_error = function(msg, code) {
			if(do_error) {
				do_error(msg)
			} else {
				mui.toast(msg);
			}
		}
		com.data.ajax.jsonp(params);
	},
}

com.data.futures = {
	openAnAccount: function(do_data, do_success, do_error) {
		var params = new com.data.ajax.param();
		params.url = "http://guishu.dzqh.com.cn:18089/futuresAccountController.do?getAccountByPhoe";
		params.fun_success = do_success;
		params.data = do_data;
		params.loading = {
			title: '处理中...',
			options: {
				back: "none" //可取值"none"表示截获处理返回键，但不做任何响应；"close"表示截获处理返回键并关闭等待框；"transmit"表示不截获返回键，向后传递给Webview窗口继续处理（与未显示等待框的情况一致）
			}
		}
		params.fun_error = function(msg, code) {
			if(do_error) {
				do_error(msg)
			} else {
				mui.toast(msg);
			}
		}
		com.data.ajax.jsonp(params);
	}
}

	
	