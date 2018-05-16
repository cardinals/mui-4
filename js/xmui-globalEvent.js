/**
 * 参考：http://ask.dcloud.net.cn/question/7694?sort_key=add_time&sort=ASC
 * 全部调用回调事件

 eg: 调用：
	mui.ge.fireEvent("login", {
		info: "登陆成功"
	}, function(args) {
		
		args.detail.info //收到消息
	});
 发布回调方法
 //订单列表页面
    mui.ge.addListener("login", function(args) {
        args.detail.info //登陆成功
        mui.ge.callback(args, {
            info: "收到消息"
        })
    });
 *
 */
(function($) {
	$.ge = [];
	$.ge.callbackCount = 0;
	$.ge.prefix = "globalEvent.";

	$.ge.addListener = function(eventName, fn) {
		window.addEventListener($.ge.prefix + eventName, fn);
		$.ge.push(eventName);
	}

	$.ge.removeListener = function(fn) {
		window.removeEventListener(fn);
	}

	/**
	 * 触发事件
	 * @eventName 事件名称
	 * @args 参数
	 * @callback 回调函数
	 * @webviewId 要调用的webviewId，不指定则调用所有webview上的事件监听器
	 */
	$.ge.fireEvent = function(eventName, args, callback, webviewId) {
		//如果有回调函数，则在参数中添加回调函数的信息
		if (callback) {
			var callback_name = "globalEvent_callback" + $.ge.callbackCount;
			$.ge.callbackCount++;
			$.extend(args, {
				globalEvent_callback: callback_name,
				globalEvent_webviewId: plus.webview.currentWebview().id
			});
			//添加回调事件监听
			$.ge.addListener(callback_name, callback);
		}
		if (webviewId) {
			var wv = plus.webview.getWebviewById(webviewId);
			mui.fire(wv, $.ge.prefix + eventName, args);
		} else {
			var views = plus.webview.all();
			for (var i = 0; i < views.length; i++) {
				mui.fire(views[i], $.ge.prefix + eventName, args);
			}
		}
	}

	/**
	 * 调用回调函数，若事件触发者没有提供回调函数，则什么都不做
	 * @call_args 调用者的参数
	 * @args 回传给调用者的参数
	 */
	$.ge.callback = function(call_args, args) {
		var id = call_args.detail.globalEvent_webviewId;
		var eventName = call_args.detail.globalEvent_callback;
		if (id != null && eventName != null) {
			$.ge.fireEvent(eventName, args, null, id);
		}
	}

})(mui);