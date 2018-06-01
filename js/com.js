/**
 常用的js方法集
 必要依赖 jquery
 <script src="//cdn.bootcss.com/jquery/1.8.3/jquery.min.js"></script>
 */
if (!com) {
    var com = new Object();
}

if (!com.util) {
    com.util = new Object();
}

//-------------------------------------------util
com.util.hasClass = function (obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

com.util.addClass = function (obj, cls) {
    if (!this.hasClass(obj, cls)) obj.className += " " + cls;
}

com.util.removeClass = function (obj, cls) {
    if (this.hasClass(obj, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        obj.className = obj.className.replace(reg, ' ');
    }
}
com.util.fixtwo = function(num){
    num+="";
    var length = num.length;
    var index1 = num.indexOf(".")
    if(index1==-1){
        return num+=".00";
    }else {
        if(index1+3 == length){
            return num;
        }else if(index1+2==length){
            return num+"0";
        }else{
            return num.substring(0,index1+3)
        }
    }

}
com.util.fileBase64Img = function (fileObj, fun_success) {
    // 创建一个FileReader对象
    var reader = new FileReader();
    // 绑定load事件
    reader.onload = function (e) {
//        fun_success(e.target.result);
        //压缩图片
        var img = new Image()
            , widthOrHeight = 640
            , quality = 0.7  //图像质量
            , canvas = document.createElement("canvas")
            , drawer = canvas.getContext("2d");
        img.src = this.result;
        if (img.height > img.width) {
            canvas.width = widthOrHeight * (img.width / img.height);
            canvas.height = widthOrHeight;
        } else {
            canvas.width = widthOrHeight
            canvas.height = widthOrHeight * (img.height / img.width);
        }

        drawer.drawImage(img, 0, 0, canvas.width, canvas.height);
        var d = canvas.toDataURL("image/jpeg", quality);
        fun_success(d);
    }
    // 读取File对象的数据
    var files = fileObj.files;
    if (files) {
        for (var i = 0; i < files.length; i++) {
            reader.readAsDataURL(files[i]);
        }
    }
}

//上传的图片需要处理
com.util.upB64 = function (srcB64) {
    if (!srcB64) {
        return srcB64;
    }
    //清除头部标记，不然服务端需要去除
    return srcB64.replace("data:image/jpeg;base64,", "");
}

//解析jquery form  serializeArray 生成的数据
com.util.parseFormArray = function (formArr) {
    var subData = {};
    for (var i = 0; i < formArr.length; i++) {
        var name = formArr[i].name;
        subData[name] = formArr[i].value;
    }
    return subData;
}

/**
 * 格式化时间
 * @param date
 * @param format
 * @parma type def:date 是字符串格式  1：是时间搓
 * @returns {XML|string|void}
 */
com.util.formatDate = function (dateString, format, type) {
    if (!dateString) {
        return '';
    }
    var time = null;
    if (type && type == 1) {
        time = new Date(dateString);
    } else {
        var da = dateString.replace("年", "-").replace("月", "-")
            .replace("日", "").replace(/-/g, "/").split(/\/|\:|\ /);
        if (!format) format = "yyyy-MM-dd";
        if (!dateString)return "";
        var ss = "00";
        try {
            var xx = da[5];
            if (xx) {
                ss = xx;
            }
        } catch (e) {
        }
        time = new Date(da[0], da[1] - 1, da[2], da[3], da[4], ss);
    }

    var o = {
        "M+": time.getMonth() + 1, //月份
        "d+": time.getDate(), //日
        "H+": time.getHours(), //小时
        "m+": time.getMinutes(), //分
        "s+": time.getSeconds(), //秒
        "q+": Math.floor((time.getMonth() + 3) / 3), //季度
        "S": time.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(format)) format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));

    return format;
}

com.util.showWeek = function (w_date) {
    switch (w_date) {
        case 0:
            w_date = "周日"
            break;
        case 1:
            w_date = "周一"
            break;
        case 2:
            w_date = "周二"
            break;
        case 3:
            w_date = "周三"
            break;
        case 4:
            w_date = "周四"
            break;
        case 5:
            w_date = "周五"
            break;
        case 6:
            w_date = "周六"
            break;
        default:
            break;
    }
    return w_date;
}

com.util.diffSecond = function (start_date, end_date) {
    var start_ = Date.parse(start_date.replace(/-/g, "/"));
    var end_ = Date.parse(end_date.replace(/-/g, "/"));
    var s = (start_ - end_) / 1000;
    return parseInt(s);
}

com.util.diffMinute = function (start_date, end_date) {
    var start_ = Date.parse(start_date.replace(/-/g, "/"));
    var end_ = Date.parse(end_date.replace(/-/g, "/"));
    var s = (start_ - end_) / 1000;
    if (s % 60 == 0) {
        return parseInt(s / 60);
    } else {
        return parseInt(s / 60) + 1;
    }
}

com.util.diffDay = function (start_date, end_date) {
    var start_ = Date.parse(start_date.replace(/-/g, "/"));
    var end_ = Date.parse(end_date.replace(/-/g, "/"));
    var date3 = start_ - end_;  //时间差的毫秒数
    return Math.floor(date3 / (24 * 3600 * 1000));
}

com.util.addDay = function (start_date, day) {
    var start_ = Date.parse(start_date.replace(/-/g, "/"));
    return com.util.formatDate(start_ + day * 24 * 60 * 60 * 1000, "yyyy-MM-dd", 1);
}

/* 
 * url 目标url
 * arg 需要替换的参数名称 
 * arg_val 替换后的参数的值  
 * return url 参数替换后的url
 */
com.util.changeURLArg = function (url, arg, arg_val) {
    var pattern = arg + '=([^&]*)';
    var replaceText = arg + '=' + arg_val;
    if (url.match(pattern)) {
        var tmp = '/(' + arg + '=)([^&]*)/gi';
        tmp = url.replace(eval(tmp), replaceText);
        return tmp;
    } else {
        if (url.match('[\?]')) {
            return url + '&' + replaceText;
        } else {
            return url + '?' + replaceText;
        }
    }
    return url + '\n' + arg + '\n' + arg_val;
}
//处理长文本显示问题 text待处理文本 num：最多显示字段
com.util.hiddenMore=function (text,num) {
    var size = text.length;
    if(size<=num){
        return text;
    }else {
        text = text.substring(0,num);
        return text+"..."
    }
}
/**
 * 如果不存在就显示空
 * @param data
 */
com.util.es = function (data, def) {
    var def_ = "";
    if (data != null && typeof(data) == "number" && data == 0) {
        return 0;
    }
    if (def) {
        def_ = def;
    }
    return data ? data : def_;
}

/**
 * 校验是否为double
 */
com.util.checkDouble = function (checkString) {
    var reg = /^[-\+]?\d+(\.\d+)?$/;
    if (reg.test(checkString)) {
        return true;
    }
    return false;
}

/**
 * 比较版本大小，如果新版本nv大于旧版本ov则返回true，否则返回false
 * @param {String} ov
 * @param {String} nv
 * @return {Boolean}
 */
com.util.compareVersion = function (ov, nv) {
    if (!ov || !nv || ov == "" || nv == "") {
        return false;
    }
    var b = false,
        ova = ov.split(".", 4),
        nva = nv.split(".", 4);
    for (var i = 0; i < ova.length && i < nva.length; i++) {
        var so = ova[i],
            no = parseInt(so),
            sn = nva[i],
            nn = parseInt(sn);
        if (nn > no || sn.length > so.length) {
            return true;
        } else if (nn < no) {
            return false;
        }
    }
    if (nva.length > ova.length && 0 == nv.indexOf(ov)) {
        return true;
    }
}


/**
 * 二维数组
 * @param list_data_ 数据
 * @param count_ 列数
 * @param filter 过滤条件
 */
com.util.arr2 = function (list_data_, count_) {
    if (!count_) {
        count_ = 2;
    }
    var tr_list = [];
    var td_list = [];
    for (var i = 0; i < list_data_.length; i++) {
        td_list[td_list.length] = list_data_[i];
        if (td_list.length % count_ == 0 || list_data_.length == (i + 1)) {
            tr_list[tr_list.length] = td_list;
            td_list = [];
        }
    }
    return tr_list;
}


//==================================================#深度克隆
com.util.clone = function (obj) {
    var objClone;
    if (obj.constructor == Object) {
        objClone = new obj.constructor();
    } else {
        objClone = new obj.constructor(obj.valueOf());
    }
    for (var key in obj) {
        if (objClone[key] != obj[key]) {
            if (typeof(obj[key]) == 'object') {
                objClone[key] = com.util.clone(obj[key]);
            } else {
                objClone[key] = obj[key];
            }
        }
    }
    objClone.toString = obj.toString;
    objClone.valueOf = obj.valueOf;
    return objClone;
}

//---------------------------------------------获取hmtl get 方式的页面间参数解析
if (!com.html_get) {
    com.html_get = new Object();
}

com.html_get.Request = function (key) {
    var strHref = window.document.location.href;
    var intPos = strHref.indexOf("?");
    var strRight = strHref.substr(intPos + 1);
    var arrTmp = strRight.split("&");
    for (var i = 0; i < arrTmp.length; i++) {
        var arrTemp = arrTmp[i].split("=");
        if (arrTemp[0].toUpperCase() == key.toUpperCase()) return arrTemp[1];
    }
    return "";
}
//---------------------------------------------模版引擎封装

if (!com.doT) {
    com.doT = new Object();
}

com.doT.get = function (template_id, data) {
    return doT.template(document.querySelector("#" + template_id).innerText)(data);
}
//---------------------------------------------表单的公用方法
if (!com.form) {
    com.form = new Object();
}
//---------------------------------------------验证信息 
if (!com.valid) {
    com.valid = new Object();
}

/* 
 根据〖中华人民共和国国家标准 GB 11643-1999〗中有关公民身份号码的规定，公民身份号码是特征组合码，由十七位数字本体码和一位数字校验码组成。排列顺序从左至右依次为：六位数字地址码，八位数字出生日期码，三位数字顺序码和一位数字校验码。
 地址码表示编码对象常住户口所在县(市、旗、区)的行政区划代码。
 出生日期码表示编码对象出生的年、月、日，其中年份用四位数字表示，年、月、日之间不用分隔符。
 顺序码表示同一地址码所标识的区域范围内，对同年、月、日出生的人员编定的顺序号。顺序码的奇数分给男性，偶数分给女性。
 校验码是根据前面十七位数字码，按照ISO 7064:1983.MOD 11-2校验码计算出来的检验码。 

 出生日期计算方法。
 15位的身份证编码首先把出生年扩展为4位，简单的就是增加一个19或18,这样就包含了所有1800-1999年出生的人;
 2000年后出生的肯定都是18位的了没有这个烦恼，至于1800年前出生的,那啥那时应该还没身份证号这个东东，⊙﹏⊙b汗...
 下面是正则表达式:
 出生日期1800-2099  (18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])
 身份证正则表达式 /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i
 15位校验规则 6位地址编码+6位出生日期+3位顺序号
 18位校验规则 6位地址编码+8位出生日期+3位顺序号+1位校验位

 校验位规则     公式:∑(ai×Wi)(mod 11)……………………………………(1)
 公式(1)中：
 i----表示号码字符从由至左包括校验码在内的位置序号；
 ai----表示第i位置上的号码字符值；
 Wi----示第i位置上的加权因子，其数值依据公式Wi=2^(n-1）(mod 11)计算得出。
 i 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
 Wi 7 9 10 5 8 4 2 1 6 3 7 9 10 5 8 4 2 1
 */
//身份证号合法性验证
//支持15位和18位身份证号
//支持地址编码、出生日期、校验位验证
com.valid.identityCode = function (code) {
    var city = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江 ",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北 ",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏 ",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外 "
    };
    var tip = "";
    var pass = true;

    if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X|x)$/i.test(code)) {
        tip = "身份证号格式错误";
        pass = false;
    }

    else if (!city[code.substr(0, 2)]) {
        tip = "地址编码错误";
        pass = false;
    }
    else {
        //18位身份证需要验证最后一位校验位
        if (code.length == 18) {
            code = code.split('');
            //∑(ai×Wi)(mod 11)
            //加权因子
            var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            //校验位
            var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++) {
                ai = code[i];
                wi = factor[i];
                sum += ai * wi;
            }
            var last = parity[sum % 11];
            var parity_ = parity[sum % 11];
            var parity_1 = null;
            if (parity_ == 'X') {
                parity_1 = 'x';
            } else {
                parity_1 = parity_;
            }
            if (parity_ != code[17] && parity_1 != code[17]) {
                tip = "校验位错误";
                pass = false;
            }
        }
    }
    //if(!pass) alert(tip);
    return pass;
}

/**
 * 验证手机号
 * @param phone
 * @returns {boolean}
 */
com.valid.phone = function (phone) {
    if (!(/^1[3|4|5|7|8]\d{9}$/.test(phone))) {
        return false;
    }
    return true;
}

com.valid.score = function (fen) {
    var reg = /^\d{1,3}$/;
    var re = fen.match(reg);
    if (re) {
        if (fen < 100)
            return true;
    }
    return false;
}

/**
 * 验证邮箱
 验证规则：姑且把邮箱地址分成“第一部分@第二部分”这样
 第一部分：由字母、数字、下划线、短线“-”、点号“.”组成，
 第二部分：为一个域名，域名由字母、数字、短线“-”、域名后缀组成，
 而域名后缀一般为.xxx或.xxx.xx，一区的域名后缀一般为2-4位，如cn,com,net，现在域名有的也会大于4位
 * @param email_
 * @returns {boolean}
 */
com.valid.email = function (email_) {
    //对电子邮件的验证
    var myreg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    return myreg.test(email_);
}

//---------------------------------------------自定义的,重写和添加的方法，原生的
String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
}
//---------------------------------------------显示一些信息
if (!com.show) {
    com.show = new Object();
}

/*
 根据文件的 大小，显示计算出合理的数值，999.123G,800mb,1.3mb，900kb，
 */
com.show.fileSize = function (size) {
    if (size <= 999) {
        return size + "B";
    }

    var kb = parseFloat(size / 1024);
    kb = kb.toFixed(2);
    if (kb <= 999) {
        return kb + "KB";
    }

    var mb = parseFloat(parseInt(kb) / 1024);
    mb = mb.toFixed(2);
    if (mb <= 999) {
        return mb + "MB";
    }

    var gb = parseFloat(parseInt(mb) / 1024);
    gb = gb.toFixed(2);
    if (gb <= 999) {
        return gb + "GB";
    }

    var tb = parseFloat(parseInt(gb) / 1024);
    tb = tb.toFixed(2);
    return tb + "TB";
}

com.show.nodata = function (tip,base_url) {
    if(!base_url){
        base_url = '../../';
    }
    return "<div style=\"margin-top: 20%;width: 100%\">" +
        "<div style=\"width: 90%;margin-left: 5%;text-align: center\">" +
        "<p class=\"contextcolor\">" + tip + "</p>" +
        "<img src=\""+base_url+"img/icon/def_no_data.png\" style=\"width: 50%;\" />" +
        "</div>" +
        "</div>";
}

//---------------------------------------------h5+ 的一些方法
if (!com.plus) {
    com.plus = new Object();
}

//上传七牛文件
com.plus.qiniu = {
    /**
     *
     * @param file_path  图片的文件路径
     * @param type_      图片上传的的类型 0：用户头像
     * @param do_success 图片的删除成功回调
     *          url_,key_
     * @param do_error
     */
    upload: function (file_path, type_, do_success, do_error) {
        var this_wt = null;
        var this_cname = null;
        var this_bucket = null;
        var has_showtitle = true;
        var task = plus.uploader.createUpload("http://upload.qiniu.com/", {
                method: "POST"
                , timeout: 15
                , retry: 3
                , retryInterval: 20
            },
            function (t, status) { //
                // console.info("打印上传图片结果")
                // console.info("Status"+status)
                // console.info(JSON.parse(t.responseText))
                if (status == 200) {
                    plus.uploader.clear() //清除上传
                    var data = JSON.parse(t.responseText);
                    mui.toast("上传完毕");
                    if (this_wt) {
                        this_wt.close();
                        this_wt = null;
                    }
                    do_success(this_cname + data.key, data.key, this_bucket);
                } else {
                    mui.toast("上传失败");
                    if (do_error) {
                        do_error();
                    }
                }
                if (this_wt) {
                    this_wt.close();
                }
            }
        );
        task.addEventListener("statechanged", function (upload, status) {
            var upSize = upload.uploadedSize;
            var totalSize = upload.totalSize;
            var baifen = 0;
            if (totalSize != 0 || upSize != 0) {
                baifen = ((upSize / totalSize) * 100).toFixed(2);
            }
            if (!this_wt) {
                this_wt = plus.nativeUI.showWaiting("上传中...", {
                    back: "none"
                });
            }
            if (has_showtitle) {//防止更新线程的时候死
                has_showtitle = false;
                setTimeout(function () {
                    if (this_wt) {
                        this_wt.setTitle("上传进度[" + baifen + "%]");
                        has_showtitle = true;
                    }
                }, 100);
            }
            if (upload.state == 4 && status == 200) {
                task.clear;
                if (this_wt) {
                    this_wt.close();
                    this_wt = null;
                }
            }
        }, false);
        com.data.user.qiniuUpload({
            type: type_
            , filename: file_path
        }, function (data) {
            this_bucket = data.scope;
            task.addData("key", data.key);
            task.addData("scope", this_bucket);
            task.addData("token", data.uptoken);
            task.addFile(file_path, {
                "key": "file",
                "name": "file"
            });
            //原生的等待
            this_cname = data.domain;
            setTimeout(function () {
                task.start();
            }, 100)
        }, function (msg) {
            mui.toast(msg);
        });
    }
    ,upload_card: function (file_path, type_, do_success, do_error) {
        var this_wt = null;
        var this_cname = null;
        var this_bucket = null;
        var has_showtitle = true;
        var task = plus.uploader.createUpload("http://upload.qiniu.com/", {
                method: "POST"
                , timeout: 15
                , retry: 3
                , retryInterval: 20
            },
            function (t, status) { //
                // console.info("打印上传图片结果")
                // console.info("Status"+status)
                // console.info(JSON.parse(t.responseText))
                if (status == 200) {
                    plus.uploader.clear() //清除上传
                    var data = JSON.parse(t.responseText);
                    mui.toast("上传完毕");
                    if (this_wt) {
                        this_wt.close();
                        this_wt = null;
                    }
                    do_success(this_cname + data.key, data.key, this_bucket);
                } else {
                    mui.toast("上传失败");
                    if (do_error) {
                        do_error();
                    }
                }
                if (this_wt) {
                    this_wt.close();
                }
            }
        );
        task.addEventListener("statechanged", function (upload, status) {
            var upSize = upload.uploadedSize;
            var totalSize = upload.totalSize;
            var baifen = 0;
            if (totalSize != 0 || upSize != 0) {
                baifen = ((upSize / totalSize) * 100).toFixed(2);
            }
            if (!this_wt) {
                this_wt = plus.nativeUI.showWaiting("上传中...", {
                    back: "none"
                });
            }
            if (has_showtitle) {//防止更新线程的时候死
                has_showtitle = false;
                setTimeout(function () {
                    if (this_wt) {
                        this_wt.setTitle("上传进度[" + baifen + "%]");
                        has_showtitle = true;
                    }
                }, 100);
            }
            if (upload.state == 4 && status == 200) {
                task.clear;
                if (this_wt) {
                    this_wt.close();
                    this_wt = null;
                }
            }
        }, false);
        com.data.user.qiniuUpload_card({
            type: type_
            , filename: file_path
        }, function (data) {
            // alert(JSON.stringify(data));
            this_bucket = data.scope;
            task.addData("key", data.key);
            task.addData("scope", this_bucket);
            task.addData("token", data.uptoken);
            task.addFile(file_path, {
                "key": "file",
                "name": "file"
            });
            //原生的等待
            this_cname = data.domain;
            setTimeout(function () {
                task.start();
            }, 100)
        }, function (msg) {
            mui.toast(msg);
        });
    }
}
//下载网络资源
com.plus.download = {
    _folder: {
        agenda: "agenda/"
    }
    /**
     *
     * @param _url 下载的路径
     * @param _name 下载的文件名称
     * @param _folder 下载到文件的目录
     */
    , do: function (_url, _name, _folder) {
        var this_wt = null;
        var this_success = false;
        var save_path_ = "_downloads/" + _folder + _name;
        var dtask = plus.downloader.createDownload(_url, {
            filename: save_path_
            , timeout: 10
            , retry: 1
            , retryInterval: 5
        }, function (d, status) {
            // 下载完成
            this_success = true;
            this_wt.close();
            if (status == 200) {
                mui.alert("下载完成: " + d.filename);
            } else {
                mui.toast("下载失败: " + status);
            }
        });
        dtask.addEventListener("statechanged", function (download, status) {
            var downloadedSize = download.downloadedSize;
            var totalSize = download.totalSize;
            this_wt.setTitle(com.show.fileSize(downloadedSize) + "/" + com.show.fileSize(totalSize));
        }, false);
        this_wt = plus.nativeUI.showWaiting("下载中...", {
            //back: "close"
            back: "none"
        });
        dtask.start();
    }
}
//本地存储
com.plus.storage = {
    get: function (key) {
        var info = plus.storage.getItem(key);
        if (info) {
            return JSON.parse(info);
        }
        return null;
    }
    , put: function (key, json_obj) {
        plus.storage.setItem(key, JSON.stringify(json_obj));
    }
    , remove: function (key) {
        plus.storage.removeItem(key);
    }
    , clear: function () {
        plus.storage.clear();//清除所有存储的数据。
    }
}
//打开页面
com.plus.openWindow = function (url, extras_, tip_) {
    if (!tip_) {
        tip_ = "loading...";
    }
    var extras = {
        pre_webviewid: plus.webview.currentWebview().id
    }
    if (extras_) {
        mui.extend(extras, extras_)
    }
    return mui.openWindow({
        url: url,
        id: url,
        extras: extras,
        createNew: false,//是否重复创建同样id的webview，默认为false:不重复创建，直接显示
        show: {
            autoShow: true,//页面loaded事件发生后自动显示，默认为true
            aniShow: "slide-in-right",//页面显示动画，默认为”slide-in-right“；
            duration: "100"//页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
        }
//      ,
//      waiting: {
//          autoShow: true,//自动显示等待框，默认为true
//          title: tip_//等待对话框上显示的提示内容
//      }
    });
}
//打开页面,有回调
com.plus.openWindowX = function (url, extras_, tip_, fun_load_) {
    if (!tip_) {
        tip_ = "loading...";
    }
    var extras = {
        pre_webviewid: plus.webview.currentWebview().id
    }
    if (extras_) {
        mui.extend(extras, extras_);
    }
//  var nwaiting = plus.nativeUI.showWaiting(tip_);//显示原生等待框 
    var webviewContent = plus.webview.create(url, url, null, extras);//后台创建webview并打开show.html
    webviewContent.addEventListener("loaded", function () { //注册新webview的载入完成事件 
//      nwaiting.close();
        webviewContent.show("slide-in-right", 100); //把新webview窗体显示出来，显示动画效果为速度200毫秒的右侧移入动画
        if (fun_load_) {
            fun_load_();
        }
        //plus.webview.currentWebview().close();
    }, false);
    return webviewContent;
}
//获取到当前的webview 对象
com.plus.getCurrWebview = function(){
    var currwebview = {
        getPreid: function () {
            if (!this.self) {
                return null;
            }
            return this.self.pre_webviewid
        }
        , getSelfid: function () {
            if (!this.self) {
                return null;
            }
            return this.self.id;
        }
        , even_show: function (fun_) {
            this.self.addEventListener('show', function () {
                fun_();
            });
        }
        , even_hide: function (fun_) {
            this.self.addEventListener('hide', function () {
                fun_();
            });
        }
        , self: null
    };
    currwebview.self = plus.webview.currentWebview();
    return currwebview;
}
/**
 * 底部谈框 打电话
 * @param arry:[{title:'',color:'',style:'destructive'|'default'},{title:''},{title:''}]
 */
com.plus.actionSheet = function (title_, arry_, fun_) {
    plus.nativeUI.actionSheet({
        title: title_,
        cancel: "取消",
        buttons: arry_
    }, function (e) {
        var index = e.index;
        //index==0 表示取消按钮，其他一次类推
        if (index > 0) {
            fun_(index - 1);
        }
    });
}
/**
 * 时间控件
 */
com.plus.dateTime = {
    getTime: function (fun_succss, fun_err) {
        var dTime = new Date();
        plus.nativeUI.pickTime(function (e) {
            var d = e.date;
            var hours = d.getHours();
            if (hours < 10) {
                hours = "0" + hours;
            }
            var minutes = d.getMinutes();
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            var time = hours + ":" + minutes;
            fun_succss(time);
        }, function (e) {
            mui.toast("您没有选择时间");
        }, {
            title: "请选择时间",
            is24Hour: true,
            time: dTime
        });
    }
    , getDate: function (fun_succss, fun_err) {
        var dDate = new Date();
        var minDate = new Date();
        var maxDate = new Date();
        maxDate.setFullYear(2216, 11, 31);
        plus.nativeUI.pickDate(function (e) {
            var d = e.date;
            var month = d.getMonth() + 1;
            if (month < 10) {
                month = "0" + month;
            }
            var dates = d.getDate();
            if (dates < 10) {
                dates = "0" + dates;
            }
            var get_date = d.getFullYear() + "-" + month + "-" + dates;
            fun_succss(get_date);
        }, function (e) {
            mui.toast("您没有选择日期");
        }, {
            title: "请选择日期",
            date: dDate,
            minDate: minDate,
            maxDate: maxDate
        });
    }
    , get: function (fun_succss) {
        var get_date;
        var this_ = this;
        this_.getDate(function (data) {
            get_date = data;
            this_.getTime(function (data) {
                fun_succss(get_date + " " + data);
            });
        });
    }

}
/**
 * 退出应用
 */
com.plus.closeApp = function () {
    plus.runtime.quit();
}
/**
 * 判断是否退出应用
 */
var clickNum = 0;
com.plus.hasCloseApp = function () {
    // mui.confirm('确认退出程序么？'
    //     , '确认退出'
    //     , ['取消', '确定']
    //     , function (e) {
    //         if (e.index == 1) {
    //             com.plus.closeApp();
    //         }
    //     });

    clickNum++;
    if(clickNum > 1){
        plus.runtime.quit();
    }else{
        mui.toast("再按一次退出应用");
    }
    setTimeout(function(){
        clickNum = 0
    },1000);
    return false;
}
/**
 * 设置应用屏幕
 */
com.plus.fullscreen = {
    setFull: function () {
        if (this.isFull()) {
            return;
        }
        plus.navigator.setFullscreen(true);
    }
    , setNoFull: function () {
        if (this.isFull()) {
            plus.navigator.setFullscreen(false);
        }
    }
    , isFull: function () {
        return plus.navigator.isFullscreen();
    }
}
//---------------------------------------------video 的一些方法
if (!com.video) {
    com.video = new Object();
}
//第一次加载时间
com.video.qq = {
    init: function (querayStr) {
        var this_ = this;
        setTimeout(function () {
            var frame_ele = document.querySelector(querayStr);
            this_.initFrame(frame_ele);
        },200);
    }
    /**
     * 初始化iframe
     * @param frame_ele
     eg：
     <iframe
     data-src="{{= it.mediaInfo.url }}"
     style="width:100%;height:55vw;background-image: url('../../img/media/media_index.png');background-size: cover"
     ></iframe>
     */
    , initFrame: function (frame_ele) {
        var video_ = frame_ele;
        if (!video_) {
            console.error("video_:null");
            return;
        }
        video_.setAttribute("data-vidtype", "1");
        video_.setAttribute("allowfullscreen", "");
        video_.setAttribute("frameborder", "0");
        video_.setAttribute("scrolling", "no");
        video_.style.overflow = "hidden";

        var width = video_.offsetWidth;
        var height = video_.offsetHeight;
        var data_src = video_.getAttribute("data-src");
        var sub_i = data_src.indexOf("&width");
        if (sub_i > 0) {
            data_src = data_src.substring(0, sub_i);
        }
        sub_i = data_src.indexOf("&height");
        if (sub_i > 0) {
            data_src = data_src.substring(0, sub_i);
        }
        //替换掉
        data_src = data_src.replace("preview", "player");
        video_.setAttribute("src", data_src + "&width=" + width + "&height=" + height + "&auto=0");
    }
}
//---------------------------------------------map 的一些方法
if (!com.map) {
    com.map = new Object();
}
com.map.baidu={
    
}