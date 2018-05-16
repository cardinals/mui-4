/**
 * Created by Administrator on 2016-05-12.
 */
/***获取公共数据***/
var CCom = new Object();
CCom.rootPath=function() {
    //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
    var curWwwPath = window.document.location.href;
    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
    var pathName = window.document.location.pathname;
    var pos = curWwwPath.indexOf(pathName);
    //获取主机地址，如： http://localhost:8083
    var localhostPaht = curWwwPath.substring(0, pos);
    //获取带"/"的项目名，如：/uimcardprj
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    return (localhostPaht + projectName+"/");
}

//接口地址
CCom.interUrl = "http://hr.delightgo.com/ev2/";

//项目地址
CCom.baseUrl = CCom.rootPath();

//构造请求参数:添加userToken
CCom.buildReqParam = function () {
    var param = new Object();
    param.data = new Object();
    return param;
}




//序列化成jsonObject
CCom.seraObject = function ($form) {
    var a = $form.serializeArray();
    var o = {};
    $.each(a, function () {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
CCom.seraArray = function ($form) {
    return $form.serializeArray();
};
CCom.request = function (param) {
    if (!param) param = new Object();
    if (!param.data) param.data = new Object();
    if(param.data.token==undefined||param.data.token==null){
        param.data.token = userOption.token()==null?"":userOption.token();
    }
    param.data.appVersion = "2.0";
    param.data.source = "WAP";
    param.data.url = CCom.interUrl+param.url;
    console.info("request-->param:");
    console.info(param);
    $.ajax({
        type: param.requestType,
        url: CCom.interUrl+param.url,//param.url,
        //contentType: "application/json;charset=utf-8",
        data: param.data == undefined ? null : JSON.stringify(param.data),
        dataType: "json",
        async:param.async==undefined?true:param.async,
        success: function (data) {
            console.info("response success:")
            console.info(data);
            CCom.hiddenLoader();
            if(data.respStatus==undefined){
                param.success(data);
            }else if (data.respStatus != "SUCCESS") {
                console.info(data.errorMsgCn);
                if (param.error == undefined) {
                    alert(data.errorMsgCn);
                    if (data.errorCode == "CUSTOMER_TOKEN_ERROR") {//未登录或session过期异常，则直接跳转到登陆页面
                        userOption.removeUser();//清除原有的旧cookie
                        //do something...
                        
                    }
                    return;
                } else {
                    param.error(data);
                }
            } else {
                //data.data["message"] = data.message;
                param.success(data.data,data);
            }
        },
        error: function (err) {
            CCom.hiddenLoader();
            //alert("网络异常或服务器异常。");
            console.info("net err:")
            console.info(err);
        }
    });
}
CCom.get = function (param) {
	param.requestType = "get";
    CCom.request(param);
};
CCom.insert = function (param) {
    CCom.request(param);
};
CCom.delete = function (param) {
    CCom.request(param);
};
CCom.post = function (param) {
	param.requestType = "post";
    CCom.request(param);
};

CCom.loadgif_base64 = "data:image/gif;base64,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";

CCom.getList = function (param) {
    CCom.showLoader();
    CCom.request(param);
};

//显示加载更多
CCom.showLoader = function () {
    if ($('.scrollToEndLoaderCls').length <= 0) {
        var panl = "<div class=\"scrollToEndLoaderCls wd100 h30px contextcolor textcenter\">" +
            " <images onclick=\"getbase64(this)\" src=\"" + CCom.loadgif_base64 + "\" class=\"inline-block vertical-middle\" height=\"16\"> " +
            " <span class=\"inline-block vertical-middle contextcolor ft12\">加载更多...</span> " +
            " </div>";
        $("body").append(panl);
    }
    $('.scrollToEndLoaderCls').fadeIn(0);
}

//隐藏加载更多
CCom.hiddenLoader = function () {
    if ($('.scrollToEndLoaderCls').length > 0) {
        setTimeout(function () {
            $('.scrollToEndLoaderCls').fadeOut(0);
        }, 300);
    }
}


//停止冒泡事件
CCom.stopBubble = function (e) {
    if (e && e.stopPropagation) {//非IE浏览器
        e.stopPropagation();
    } else {//IE浏览器
        window.event.cancelBubble = true;
    }
};

//进入页面
CCom.enterPage = function (page) {
    location.href = page;
};
//后退页面
CCom.backPage = function () {
    //location.replace(document.referrer);
    history.go(-1);
};


//获取url中的参数
CCom.getUrlParam = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
};

//提示跳转轨迹,上一页路径和当前页路径
CCom.alertRedirectTrail = function () {
    alert("preUrl:\n" + document.referrer + "\ncurUrl:\n" + location.href);
}

CCom.isWeiXin = function () {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}


CCom.alertAppLoadFloat = function () {
    if ($("#appLoadFloat").length <= 0) {
        var panl = "<div id=\"appLoadFloat\" class=\"fixed right0 z1000\" style=\"top: 260px;width: 70px;\">" +
            "<div onclick=\"$(\'#appLoadFloat\').remove();\" class=\"wd100 h20px absolute top0 left0\"></div>" +
            "<a href=\"http://a.app.qq.com/o/simple.jsp?pkgname=cn.edu.shu.dlm\"><images src=\"http://7xlxgt.com1.z0.glb.clouddn.com/%E4%B8%8B%E8%BD%BD2.png\" class=\"block wd100\"  /></a>" +
            "</div>";
        $("body").append(panl);
    }
}

//按钮灰化
CCom.btnDisable = function (element, disable_tip) {
    console.info(1);
    $(element).addClass("btn-disabled");
    $(element).addClass("relative");
    $(element).append("<div onclick='CCom.stopBubble()' class='tip absolute top0 left0 wd100 h100 btn-disabled'>" + disable_tip + "</div>");
}

CCom.btnEnbale = function (element) {
    $(element).find(".tip").remove();
    $(element).removeClass("btn-disabled");
    $(element).removeClass("relative");
}

CCom._addImgFileListener=function(obj, fun) {
    $(obj).change(function() {
        var file = this.files[0];
        CCom.fileBase64(file,fun);
    });
}


CCom.fileBase64=function(file,fun) {
    try {
        var reader = new FileReader();
        reader.onload = function() {
            var img = new Image();
            img.src = reader.result;
            img.onload = function() {
                var w = img.width,
                    h = img.height;
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                $(canvas).attr({
                    width: w,
                    height: h
                });
                ctx.drawImage(img, 0, 0, w, h);
                var base64 = canvas.toDataURL('image/jpeg', 0.5);
                var result = {
                    url: window.URL.createObjectURL(file),
                    base64: base64,
                    clearBase64: base64.substr(base64.indexOf(',') + 1),
                    suffix: base64.substring(base64.indexOf('/') + 1, base64.indexOf(';')),
                };
                fun(result);
            }
        }
        reader.readAsDataURL(file);
    } catch(e) {
        console.info("err ===========>CCom.fileBase64=====>");
        console.info(e);
    }
}


/**
 * 初始化
 */
CCom.init = function () {
    //CCom.alertAppLoadFloat();
}

CCom.init();


/** **********************************用户相关*************************************/
var userOption = new Object();
//删除用户
userOption.removeUser = function () {
    userOption.saveUser(null);
}
//保存用户信息
userOption.saveUser = function (info) {

    $.cookie('userInfo', info ? JSON.stringify(info) : null, {path: "/", expires: 7}) //,domain:"delightgo.com"
};

userOption.get = function(key){
    var cookieToken = $.cookie("userInfo");
    if (!cookieToken || "null" == cookieToken)return null;
    return JSON.parse(cookieToken)[key];
}
userOption.token = function () {
    return userOption.get("token");
};



$(function(){

    try {
        //alert(userOption.headImg());
        $("#navbar_headimg").attr("src", userOption.headImg());
        if(userOption.noticeCount()==0){
            $("#navbar_notice").hide();
        }else{
            $("#navbar_notice").text(userOption.noticeCount());
        }
        $("#navbar_name").text(userOption.name());
    }catch(e){
        console.error(e);
    }

});

/** ********************************** cookie *************************************/
/*! jquery.cookie v1.4.1 | MIT */
!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? a(require("jquery")) : a(jQuery)
}(function (a) {
    function b(a) {
        return h.raw ? a : encodeURIComponent(a)
    }

    function c(a) {
        return h.raw ? a : decodeURIComponent(a)
    }

    function d(a) {
        return b(h.json ? JSON.stringify(a) : String(a))
    }

    function e(a) {
        0 === a.indexOf('"') && (a = a.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
        try {
            return a = decodeURIComponent(a.replace(g, " ")), h.json ? JSON.parse(a) : a
        } catch (b) {
        }
    }

    function f(b, c) {
        var d = h.raw ? b : e(b);
        return a.isFunction(c) ? c(d) : d
    }

    var g = /\+/g, h = a.cookie = function (e, g, i) {
        if (void 0 !== g && !a.isFunction(g)) {
            if (i = a.extend({}, h.defaults, i), "number" == typeof i.expires) {
                var j = i.expires, k = i.expires = new Date;
                k.setTime(+k + 864e5 * j)
            }
            return document.cookie = [b(e), "=", d(g), i.expires ? "; expires=" + i.expires.toUTCString() : "", i.path ? "; path=" + i.path : "", i.domain ? "; domain=" + i.domain : "", i.secure ? "; secure" : ""].join("")
        }
        for (var l = e ? void 0 : {}, m = document.cookie ? document.cookie.split("; ") : [], n = 0, o = m.length; o > n; n++) {
            var p = m[n].split("="), q = c(p.shift()), r = p.join("=");
            if (e && e === q) {
                l = f(r, g);
                break
            }
            e || void 0 === (r = f(r)) || (l[q] = r)
        }
        return l
    };
    h.defaults = {}, a.removeCookie = function (b, c) {
        return void 0 === a.cookie(b) ? !1 : (a.cookie(b, "", a.extend({}, c, {expires: -1})), !a.cookie(b))
    }
});

/******************StringUtil & DateUtil ********************/
String.prototype.isEmojiCharacter=function() {
    substring = this;
    for ( var i = 0; i < substring.length; i++) {
        var hs = substring.charCodeAt(i);
        if (0xd800 <= hs && hs <= 0xdbff) {
            if (substring.length > 1) {
                var ls = substring.charCodeAt(i + 1);
                var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
                if (0x1d000 <= uc && uc <= 0x1f77f) {
                    return true;
                }
            }
        } else if (substring.length > 1) {
            var ls = substring.charCodeAt(i + 1);
            if (ls == 0x20e3) {
                return true;
            }
        } else {
            if (0x2100 <= hs && hs <= 0x27ff) {
                return true;
            } else if (0x2B05 <= hs && hs <= 0x2b07) {
                return true;
            } else if (0x2934 <= hs && hs <= 0x2935) {
                return true;
            } else if (0x3297 <= hs && hs <= 0x3299) {
                return true;
            } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030
                || hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b
                || hs == 0x2b50) {
                return true;
            }
        }
    }
}

String.prototype.replaceAll = function(s1,s2) {
    return this.replace(new RegExp(s1,"gm"),s2);
}

Date.prototype.Format=function(){
    return this.getFullYear()+"-"+(this.getMonth()-1)+"-"+this.getDate()+" "+this.getHours()+":"+this.getMinutes()+":"+this.getSeconds();
}