function getLocalTime(nS) {     
   return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');     
}   
function getStartDateTime(dateTime){
	dateTime.setHours(0);
	dateTime.setMinutes(0);
	dateTime.setSeconds(0);
	dateTime.setMilliseconds(0);
	
	return dateTime;
}

function addDay(da,AddDayCount) 
{ 
	var da = (da.replace(/-/g, "/"))     // 把2016-05-24 转换为2016/05/24 
	var dd = new Date(da); 
	dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期 
	
	return dd;
}
//取得当前URL对象
function getCurrentURL(document){
	var thisURL = document.URL;
	
	return  new URI(thisURL);
}
//取得参数
function getQueryStringValue(currentURL,queryParam){
   // Get current URL.
   //var currentURL = new URI();
   
  // If queryParam is in the querystring of currentURL
  if(currentURL.hasQuery(queryParam)){
    // Get all querystring values as a json object
    var qsValues = currentURL.query(true);
    // return queryParam's value
    return qsValues[queryParam];
  }else{
    // queryParam is not in the querystring. So return as undefined.
    return "";
  }
}
//画面跳转
//参数方式 para1=value1&para2=value2
function windowHref(url,paras){
	if(paras!=""){
		window.location.href=url+"?"+paras;
	}else{
		window.location.href=url;
	}
} 
//画面跳转
//参数方式 para1=value1&para2=value2
function windowOpen(url,paras){
	if(paras!=""){
		window.open(url+"?"+paras);
	}else{
		window.open(url);
	}
} 
function f_close(){
    if(typeof(WeixinJSBridge)!="undefined"){
        WeixinJSBridge.call('closeWindow');
    }else{
        if (navigator.userAgent.indexOf("MSIE") > 0) {  
            if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {  
                window.opener = null; window.close();  
            }  
            else {  
                window.open('', '_top'); window.top.close();  
            }  
        }  
        else if (navigator.userAgent.indexOf("Firefox") > 0) {  
            window.location.href = 'about:blank ';  
            //window.history.go(-2);  
        }  
        else {  
            window.opener = null;   
            window.open('', '_self', '');  
            window.close();  
        }
    }
}
function setQueryString(paras){
	//timestamp（yyyyMMddHHmmss）
	 var timestamp=new Date().format("yyyyMMddHHmmss");
	//var timestamp=format("yyyyMMddHHmmss",new Date());
	if(paras==""){
		paras="timestamp="+timestamp
	}else{
		paras=paras+"&timestamp="+timestamp
		//paras="timestamp="+timestamp+"&"+paras
	}
	
	var sign=getSign(paras);
	var app_key="orient_weixin_key_20171220";
	//var jsoncallback="jsoncallback";
	
	
	//paras=paras+"&sign="+sign+"&app_key="+app_key+"&jsoncallback="+jsoncallback;
	paras=paras+"&sign="+sign+"&app_key="+app_key;
	return paras;
}
function getSign(paras){
	
	var arr = paras.split('&');
	//过滤中文
	$.each(arr, function(idx, obj) {  
		if(obj.indexOf("%25") > 0 ){
			arr[idx]=decodeURIComponent(obj);
		}
	});
	var paras=gerSortedParas(arr);
	
	var paraStr="";
	//para1=value1&para2=value2
	$.each(paras,function(n,value){
		paraStr=paraStr+value+"&";
    });
	
	paraStr=paraStr.substring(0,paraStr.length-1);
	
	//return $.md5("9e787f77f3774fa7ac053321ed556bb4"+paraStr).toUpperCase();
	return md5("445aa51278ba4d58ac2a9a3e5d210945"+paraStr).toUpperCase();
}
//参数排序 升序
//参数方式 para1=value1,para2=value2.... 数组
function gerSortedParas(paras){
	return paras.sort();  
}
var apiURL="https://apijijin.dzqh.com.cn:11443/";