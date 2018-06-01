com.data.huaerjie ={
    getMostReadNews: function(do_data, do_success, do_error){
        var params = new com.data.ajax.param();
    
		// do_data[""]=null;
		params.type = "GET";
        params.url = "https://dedicated.wallstreetcn.com/api/v1/fabricate-articles";
        params.fun_success = do_success;
        params.data = do_data;

        	params.loading = {
            title: '处理中...',
            options: {
                back: "none" //可取值"none"表示截获处理返回键，但不做任何响应；"close"表示截获处理返回键并关闭等待框；"transmit"表示不截获返回键，向后传递给Webview窗口继续处理（与未显示等待框的情况一致）
             }
           }
        
        
        params.fun_error = function(msg, code){
            if(do_error){
                do_error(msg)
            } else {
                mui.toast(msg);
            }
        }
        com.data.ajax.json(params);
    },
    //获取热点新闻
    getCommoditiesNews: function(do_data, do_success, do_error){
        var params = new com.data.ajax.param();
    
		// do_data[""]=null;
		params.type = "GET";
        params.url = "https://dedicated.wallstreetcn.com/api/v1/articles?category=commodities";
        params.fun_success = do_success;
        params.data = do_data;

        	params.loading = {
            title: '处理中...',
            options: {
                back: "none" //可取值"none"表示截获处理返回键，但不做任何响应；"close"表示截获处理返回键并关闭等待框；"transmit"表示不截获返回键，向后传递给Webview窗口继续处理（与未显示等待框的情况一致）
             }
           }
        
        
        params.fun_error = function(msg, code){
            if(do_error){
                do_error(msg)
            } else {
                mui.toast(msg);
            }
        }
        com.data.ajax.json(params);
    },
    getNewsWebURL: function(do_data, do_success, do_error){
        var params = new com.data.ajax.param();
        params.url = com.data._BASE_URL + "sysConfController.do?sys_conf_query";
        params.fun_success = do_success;
        params.data = do_data;
        	params.loading = {
            title: '处理中...',
            options: {
                back: "none" //可取值"none"表示截获处理返回键，但不做任何响应；"close"表示截获处理返回键并关闭等待框；"transmit"表示不截获返回键，向后传递给Webview窗口继续处理（与未显示等待框的情况一致）
            }
            }
       
        params.fun_error = function(msg, code){
            if(do_error){
                do_error(msg)
            }else{
                mui.toast(msg);
            }
        }
        com.data.ajax.jsonp(params);
    }
}