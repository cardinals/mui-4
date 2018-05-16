function toFix2(doublenum){
    var a = parseFloat(doublenum)
    return a.toFixed(2)
}

function calcFundsRatio(money,ratioSection) {
    if(money==''){
        return "--";
    }
    if(isNaN(money)){
        return "输入范围有误";
    }
    if(ratioSection==null||ratioSection.length==0){
        return 0;
    }else {
        for(var index =0 ; index < ratioSection.length ;index++){
            var ratioOne = ratioSection[index];
            if(parseFloat(money)>=parseFloat(ratioOne.min)&&parseFloat(money)<parseFloat(ratioOne.max)){
                return (money*ratioOne.ratio).toFixed(2)+"元";
            }
        }
        return "输入范围有误";
    }
}


function getFundTypeNameByType(fund_type) {
    var fundTypeName = "";

    if (fund_type == null || fund_type == "") {
        fundTypeName = "";
    }
    switch (fund_type) {
        case "0":	fundTypeName = "普通型（股票型）";
            break;
        case "2":	fundTypeName = "货币型";
            break;
        case "3":	fundTypeName = "偏股型";
            break;
        case "4":	fundTypeName = "股债平衡型";
            break;
        case "5":	fundTypeName = "偏债型";
            break;
        case "6":	fundTypeName = "债券型";
            break;
        case "7":	fundTypeName = "保本型";
            break;
        case "8":	fundTypeName = "指数型";
            break;
        case "9":	fundTypeName = "短债型";
            break;
        case "a":	fundTypeName = "QDII";
            break;
        case "b":	fundTypeName = "混合基金";
            break;
        case "c":	fundTypeName = "券商理财";
            break;
        case "d":	fundTypeName = "牛熊宝";
            break;
        case "e":	fundTypeName = "现金产品";
            break;
        case "f":	fundTypeName = "一对多产品";
            break;
        case "h":	fundTypeName = "封闭式T+0";
            break;
        case "i":	fundTypeName = "保证金理财";
            break;
        case "j":	fundTypeName = "现金产品";
            break;
        case "k":	fundTypeName = "一对多产品";
            break;
        case "l":	fundTypeName = "短期理财产品";
            break;
        case "m":	fundTypeName = "ETF";
            break;
        case "n":	fundTypeName = "专户产品";
            break;
        case "o":	fundTypeName = "LOF";
            break;
        case "P":	fundTypeName = "OTC";
            break;
        case "S":	fundTypeName = "ETF联接型";
            break;
        case "T":	fundTypeName = "FOF基金";
            break;
        default:
            fundTypeName = "";
    };
    return fundTypeName;
}


function getFundRiskLevelName(fundRiskLevel) {
    var fundRiskLevelName = "";

    if (fundRiskLevel == null || fundRiskLevel == "") {
        fundRiskLevelName = "";
    }

    switch (fundRiskLevel) {
        case "1":
            fundRiskLevelName = "低风险";
            break;
        case "2":
            fundRiskLevelName = "中低风险";
            break;
        case "3":
            fundRiskLevelName = "中风险";
            break;
        case "4":
            fundRiskLevelName = "中高风险";
            break;
        case "5":
            fundRiskLevelName = "高风险";
            break;
        default:
            fundRiskLevelName = "低风险";
    }

    return fundRiskLevelName;
}


function getInvestorRiskToleranceName(invest_risk_tolerance) {
    var investorRiskToleranceName = "";

    if (invest_risk_tolerance == null || invest_risk_tolerance == "") {
        investorRiskToleranceName = "";
    }

    switch (invest_risk_tolerance) {
        case "1":
            investorRiskToleranceName = "保守型";
            break;
        case "2":
            investorRiskToleranceName = "稳健型";
            break;
        case "3":
            investorRiskToleranceName = "温和型";
            break;
        case "4":
            investorRiskToleranceName = "积极型";
            break;
        case "5":
            investorRiskToleranceName = "激进型";
            break;
        default:
            investorRiskToleranceName = "";
    }

    return investorRiskToleranceName;
}

function getBankName(bankno){
    var bankName = "";
    switch (bankno) {
        case "002":
            bankName = "工商银行";
            break;
        case "003":
            bankName = "中国农业银行";
            break;
        case "004":
            bankName = "中国银行";
            break;
        case "005":
            bankName = "中国建设银行";
            break;
        case "006":
            bankName = "中国交通银行";
            break;
        case "015":
            bankName = "中信银行";
            break;
        case "009":
            bankName = "中国光大银行";
            break;
        case "014":
            bankName = "中国民生银行";
            break;
        case "011":
            bankName = "兴业银行";
            break;
        case "016":
            bankName = "广东发展银行";
            break;
        case "920":
            bankName = "中国平安银行";
            break;
        case "934":
            bankName = "邮政储蓄银行";
            break;
    }
    return bankName;
}


function getBankImg(bankno){
    var bankImgUrl = "";
    switch (bankno) {
        case "002":
            bankImgUrl = "../../images/bank_icon/icon_bank_1.png";
            break;
        case "003":
            bankImgUrl = "../../images/bank_icon/icon_bank_2.png";
            break;
        case "004":
            bankImgUrl = "../../images/bank_icon/icon_bank_3.png";
            break;
        case "005":
            bankImgUrl = "../../images/bank_icon/icon_bank_4.png";
            break;
        case "006":
            bankImgUrl = "../../images/bank_icon/icon_bank_5.png";
            break;
        case "015":
            bankImgUrl = "../../images/bank_icon/icon_bank_6.png";
            break;
        case "009":
            bankImgUrl = "../../images/bank_icon/icon_bank_12.png";
            break;
        case "014":
            bankImgUrl = "../../images/bank_icon/icon_bank_7.png";
            break;
        case "011":
            bankImgUrl = "../../images/bank_icon/icon_bank_8.png";
            break;
        case "016":
            bankImgUrl = "../../images/bank_icon/icon_bank_9.png";
            break;
        case "920":
            bankImgUrl = "../../images/bank_icon/icon_bank_10.png";
            break;
        case "934":
            bankImgUrl = "../../images/bank_icon/icon_bank_11.png";
            break;
    }
    return bankImgUrl;
}

function getZhiYe(code){
	var zhiyename = "";
	switch(code){
		case "1":
			zhiyename = "政府部门";
			break;
		case "2":
			zhiyename = "教科文";
			break;
		case "3":
			zhiyename = "金融";
			break;
		case "4":
			zhiyename = "商贸";
			break;
		case "5":
			zhiyename = "房地产";
			break;
		case "6":
			zhiyename = "制造业";
			break;
		case "7":
			zhiyename = "自由职业";
			break;
		case "09":
			zhiyename = "事业单位";
			break;
		case "10":
			zhiyename = "国有企业";
			break;
		case "11":
			zhiyename = "公务员";
			break;
		case "12":
			zhiyename = "专业技术人员";
			break;
		case "13":
			zhiyename = "办事人员";
			break;
		case "14":
			zhiyename = "军人";
			break;
		case "15":
			zhiyename = "商业和服务类人员";
			break;
		case "16":
			zhiyename = "生产、运输设备操作人员";
			break;
		case "18":
			zhiyename = "农、林、牧、渔、水利业生产人员";
			break;
		case "8":
			zhiyename = "其它";
			break;
	}
	return zhiyename;
}
function getDateFromat(date){
	var data = date.substring(0,4)+"-"+date.substring(4,6)+"-"+date.substring(6,8);
	return data;
}

//取得确认标志名称

function getConfirmName(confirm_flag){

    var confirmName = "";



    if (confirm_flag == null || confirm_flag == "") {

        confirmName = "";

    }

    switch (confirm_flag) {

        case "0":

            confirmName = "确认失败";

            break;

        case "1":

            confirmName = "确认成功";

            break;

        case "2":

            confirmName = "部分确认";

            break;

        case "3":

            confirmName = "实时确认成功";

            break;

        case "4":

            confirmName = "撤单";

            break;

        case "5":

            confirmName = "行为确认";

            break;

        case "9":

            confirmName = "未确认";

            break;



        default:

            confirmName = "";

    };

    return confirmName;



}



/**

 * 根据基金状态编码取得基金状态名称

 *

 * @param fund_status

 */

function getFundStatusByCode(fund_status) {

    var fundStatusName = "";



    if (fund_status == null || fund_status == "") {

        fundStatusName = "";

    }



    switch (fund_status) {

        case "0":

            fundStatusName = "正常开放";

            break;

        case "1":

            fundStatusName = "认购时期";

            break;

        case "2":

            fundStatusName = "停止赎回";

            break;

        case "3":

            fundStatusName = "停止申购";

            break;

        case "4":

            fundStatusName = "封闭期";

            break;

        case "5":

            fundStatusName = "停止交易";

            break;

        case "6":

            fundStatusName = "基金终止";

            break;

        case "7":

            fundStatusName = "权益登记";

            break;

        case "8":

            fundStatusName = "红利发放";

            break;

        case "9":

            fundStatusName = "发行失败";

            break;

        case "a":

            fundStatusName = "非本机构代销";

            break;

        case "b":

            fundStatusName = "发行成功";

            break;

        case "z":

            fundStatusName = "转认购期";

            break;

        default:

            fundStatusName = "";

    }

    ;



    return fundStatusName;

}


function getGenderName(gender) {

    var genderName = "";



    if (gender == null || gender == "") {

        genderName = "";

    }



    switch (gender) {

        case "0":

            genderName = "男";

            break;

        case "1":

            genderName = "女";

            break;

        default:

            genderName = "";

    }



    return genderName;

}




/**

 * 根据职业编码取得名称

 *

 * @param invest_risk_tolerance

 */

function getProfName(ofund_prof_code) {

    var profName = "";



    if (ofund_prof_code == null || ofund_prof_code == "") {

        profName = "";

    }



    switch (ofund_prof_code) {

        case "1":

            profName = "政府部门";

            break;

        case "2":

            profName = "教科文";

            break;

        case "3":

            profName = "金融";

            break;

        case "4":

            profName = "商贸";

            break;

        case "5":

            profName = "房地产";

            break;

        case "6":

            profName = "制造业";

            break;

        case "7":

            profName = "自由职业";

            break;

        case "8":

            profName = "其它";

            break;

        case "09":

            profName = "事业单位";

            break;

        case "10":

            profName = "国有企业";

            break;

        case "11":

            profName = "公务员";

            break;

        case "12":

            profName = "专业技术人员";

            break;

        case "13":

            profName = "办事人员";

            break;

        case "14":

            profName = "军人";

            break;

        case "15":

            profName = "商业和服务类人员";

            break;

        case "16":

            profName = "生产、运输设备操作人";

            break;

        case "17":

            profName = "农、林、牧、渔、水利业生产人员";

            break;

        default:

            profName = "";

    }



    return profName;

}


/**

 * 根据业务类型编码取得名称

 *

 * @param invest_risk_tolerance

 */

function getBusinName(fund_busin_code){

    var profName = "";



    if (fund_busin_code == null || fund_busin_code == "") {

        profName = "";

    }



    switch (fund_busin_code) {

        case "982":

            profName = "定期定额转换协议签订";

            break;

        case "983":

            profName = "定期定额转换协议修改";

            break;

        case "984":

            profName = "定期定额转换协议取消";

            break;

        case "985":

            profName = "定期定额基金转换";

            break;

        case "001":

            profName = "开户";

            break;

        case "002":

            profName = "销户";

            break;

        case "003":

            profName = "资料修改";

            break;

        case "004":

            profName = "基金账户冻结";

            break;

        case "005":

            profName = "基金账户解冻";

            break;

        case "008":

            profName = "基金账号登记";

            break;

        case "009":

            profName = "取消基金账号登记";

            break;

        case "010":

            profName = "撤销帐户申请";

            break;

        case "999":

            profName = "交易密码清密";

            break;

        case "989":

            profName = "交易密码修改";

            break;

        case "998":

            profName = "增加交易账号";

            break;

        case "997":

            profName = "银基通开通";

            break;

        case "996":

            profName = "银基通销户";

            break;



        case "995":

            profName = "交易账户解冻";

            break;

        case "994":

            profName = "交易账户冻结";

            break;

        case "993":

            profName = "银行信息修改";

            break;

        case "992":

            profName = "发交易账号卡";

            break;

        case "991":

            profName = "解除锁定";

            break;

        case "990":

            profName = "发基金账号卡";

            break;

        case "096":

            profName = "交易账号销户";

            break;

        case "020":

            profName = "认购";

            break;

        case "021":

            profName = "预约认购";

            break;

        case "022":

            profName = "申购";

            break;

        case "023":

            profName = "预约申购";

            break;

        case "039":

            profName = "定期定额申购";

            break;

        case "024":

            profName = "赎回";

            break;

        case "025":

            profName = "预约赎回";

            break;

        case "026":

            profName = "转托管";

            break;

        case "027":

            profName = "托管转入";

            break;

        case "028":

            profName = "托管转出";

            break;

        case "097":

            profName = "内部转托管";

            break;

        case "029":

            profName = "设置分红方式";

            break;

        case "031":

            profName = "份额冻结";

            break;

        case "032":

            profName = "份额解冻";

            break;

        case "033":

            profName = "非交易过户";

            break;

        case "036":

            profName = "基金转换";

            break;

        case "053":

            profName = "撤销申请";

            break;

        case "091":

            profName = "定期定额赎回协议签订";

            break;

        case "092":

            profName = "优惠承诺协议";

            break;

        case "094":

            profName = "定期定额赎回协议取消";

            break;

        case "095":

            profName = "定期定额赎回";

            break;

        case "090":

            profName = "定期定额申购协议签订";

            break;

        case "988":

            profName = "定期定额申购协议修改";

            break;

        case "093":

            profName = "定期定额申购协议取消";

            break;

        case "986":

            profName = "预约基金转换";

            break;

        case "080":

            profName = "确权";

            break;

        case "A02":

            profName = "风险揭示书签署";

            break;

        case "A03":

            profName = "约定书签署";

            break;

        case "A04":

            profName = "约定书取消";

            break;

        case "T01":

            profName = "基金联动协议";

            break;

        case "T02":

            profName = "基金联动协议修改";

            break;

        case "T03":

            profName = "基金联动协议终止";

            break;

        case "085":

            profName = "基金分拆";

            break;

        case "086":

            profName = "基金合并";

            break;

        case "099":

            profName = "分拆合并撤销";

            break;

        case "082":

            profName = "ETF实物申购";

            break;

        case "084":

            profName = "ETF实物赎回";

            break;

        case "089":

            profName = "冲账";

            break;

        case "A01":

            profName = "电子合同签署";

            break;

        case "A01":

            profName = "电子合同补正";

            break;

        case "A06":

            profName = "盘后业务签约";

            break;

        case "A07":

            profName = "盘后业务签约资料修改";

            break;

        case "0AH":

            profName = "子账户新增";

            break;

        case "0AG":

            profName = "子账户修改";

            break;

        case "098":

            profName = "快速过户";

            break;

        case "058":

            profName = "修改主交易账号";

            break;

        case "A09":

            profName = "盘后业务密码修改";

            break;

        case "A08":

            profName = "盘后业务密码清密";

            break;

        case "A22":

            profName = "货币赎回转购";

            break;

        case "A20":

            profName = "赎回转认购";

            break;

        case "A10":

            profName = "产品投资说明书签署";

            break;

        case "AAA":

            profName = "产品风险等级变动";

            break;

        default:

            profName = "";

    }

    return profName;

}


//取得确认标志名称
function getConfirmName(confirm_flag){
    var confirmName = "";

    if (confirm_flag == null || confirm_flag == "") {
        confirmName = "";
    }
    switch (confirm_flag) {
        case "0":
            confirmName = "确认失败";
            break;
        case "1":
            confirmName = "确认成功";
            break;
        case "2":
            confirmName = "部分确认";
            break;
        case "3":
            confirmName = "实时确认成功";
            break;
        case "4":
            confirmName = "撤单";
            break;
        case "5":
            confirmName = "行为确认";
            break;
        case "9":
            confirmName = "未确认";
            break;

        default:
            confirmName = "";
    };
    return confirmName;
}


/**
 * 根据业务类型编码取得名称
 *
 * @param invest_risk_tolerance
 */
function getBusinName(fund_busin_code) {
    var profName = "";

    if (fund_busin_code == null || fund_busin_code == "") {
        profName = "";
    }

    switch (fund_busin_code) {
        case "982":
            profName = "定期定额转换协议签订";
            break;
        case "983":
            profName = "定期定额转换协议修改";
            break;
        case "984":
            profName = "定期定额转换协议取消";
            break;
        case "985":
            profName = "定期定额基金转换";
            break;
        case "001":
            profName = "开户";
            break;
        case "002":
            profName = "销户";
            break;
        case "003":
            profName = "资料修改";
            break;
        case "004":
            profName = "基金账户冻结";
            break;
        case "005":
            profName = "基金账户解冻";
            break;
        case "008":
            profName = "基金账号登记";
            break;
        case "009":
            profName = "取消基金账号登记";
            break;
        case "010":
            profName = "撤销帐户申请";
            break;
        case "999":
            profName = "交易密码清密";
            break;
        case "989":
            profName = "交易密码修改";
            break;
        case "998":
            profName = "增加交易账号";
            break;
        case "997":
            profName = "银基通开通";
            break;
        case "996":
            profName = "银基通销户";
            break;

        case "995":
            profName = "交易账户解冻";
            break;
        case "994":
            profName = "交易账户冻结";
            break;
        case "993":
            profName = "银行信息修改";
            break;
        case "992":
            profName = "发交易账号卡";
            break;
        case "991":
            profName = "解除锁定";
            break;
        case "990":
            profName = "发基金账号卡";
            break;
        case "096":
            profName = "交易账号销户";
            break;
        case "020":
            profName = "认购";
            break;
        case "021":
            profName = "预约认购";
            break;
        case "022":
            profName = "申购";
            break;
        case "023":
            profName = "预约申购";
            break;
        case "039":
            profName = "定期定额申购";
            break;
        case "024":
            profName = "赎回";
            break;
        case "025":
            profName = "预约赎回";
            break;
        case "026":
            profName = "转托管";
            break;
        case "027":
            profName = "托管转入";
            break;
        case "028":
            profName = "托管转出";
            break;
        case "097":
            profName = "内部转托管";
            break;
        case "029":
            profName = "设置分红方式";
            break;
        case "031":
            profName = "份额冻结";
            break;
        case "032":
            profName = "份额解冻";
            break;
        case "033":
            profName = "非交易过户";
            break;
        case "036":
            profName = "基金转换";
            break;
        case "053":
            profName = "撤销申请";
            break;
        case "091":
            profName = "定期定额赎回协议签订";
            break;
        case "092":
            profName = "优惠承诺协议";
            break;
        case "094":
            profName = "定期定额赎回协议取消";
            break;
        case "095":
            profName = "定期定额赎回";
            break;
        case "090":
            profName = "定期定额申购协议签订";
            break;
        case "988":
            profName = "定期定额申购协议修改";
            break;
        case "093":
            profName = "定期定额申购协议取消";
            break;
        case "986":
            profName = "预约基金转换";
            break;
        case "080":
            profName = "确权";
            break;
        case "A02":
            profName = "风险揭示书签署";
            break;
        case "A03":
            profName = "约定书签署";
            break;
        case "A04":
            profName = "约定书取消";
            break;
        case "T01":
            profName = "基金联动协议";
            break;
        case "T02":
            profName = "基金联动协议修改";
            break;
        case "T03":
            profName = "基金联动协议终止";
            break;
        case "085":
            profName = "基金分拆";
            break;
        case "086":
            profName = "基金合并";
            break;
        case "099":
            profName = "分拆合并撤销";
            break;
        case "082":
            profName = "ETF实物申购";
            break;
        case "084":
            profName = "ETF实物赎回";
            break;
        case "089":
            profName = "冲账";
            break;
        case "A01":
            profName = "电子合同签署";
            break;
        case "A01":
            profName = "电子合同补正";
            break;
        case "A06":
            profName = "盘后业务签约";
            break;
        case "A07":
            profName = "盘后业务签约资料修改";
            break;
        case "0AH":
            profName = "子账户新增";
            break;
        case "0AG":
            profName = "子账户修改";
            break;
        case "098":
            profName = "快速过户";
            break;
        case "058":
            profName = "修改主交易账号";
            break;
        case "A09":
            profName = "盘后业务密码修改";
            break;
        case "A08":
            profName = "盘后业务密码清密";
            break;
        case "A22":
            profName = "货币赎回转购";
            break;
        case "A20":
            profName = "赎回转认购";
            break;
        case "A10":
            profName = "产品投资说明书签署";
            break;
        case "AAA":
            profName = "产品风险等级变动";
            break;
        default:
            profName = "";
    }

    return profName;
}

/**
 * 取得定投状态名称
 *
 * @param fix_state
 */
function getFixStateName(fix_state) {
    var fixStateName = "";

    if (fix_state == null || fix_state == "") {
        fixStateName = "";
    }

    switch (fix_state) {
        case "A":
            fixStateName = "定投中";
            break;
        case "H":
            fixStateName = "终止";
            break;
        case "P":
            fixStateName = "暂停";
            break;
        default:
            fixStateName = "";
    }

    return fixStateName;
}

/**
 * 取得扣款周期
 *
 * @param protocol_period_unit
 * @param protocol_fix_day
 */
function getProtocolPeriodName(protocol_period_unit,protocol_fix_day) {
    if(protocol_period_unit=="0"){
        return "每月 "+protocol_fix_day+"日";
    }else{
        var msg="每周";
        if(protocol_fix_day=="2"){
            msg=msg+"一";
        }else if(protocol_fix_day=="3"){
            msg=msg+"二";
        }else if(protocol_fix_day=="4"){
            msg=msg+"三";
        }else if(protocol_fix_day=="5"){
            msg=msg+"四";
        }else{
            msg=msg+"五";
        }
    }

    return msg;
}


//扣款状态
function getDeductStatus(fund_status){
    var fundStatusName = "";

    if (fund_status == null || fund_status == "") {
        fundStatusName = "";
    }

    switch (fund_status) {
        case "0":
            fundStatusName = "未校验";
            break;
        case "1":
            fundStatusName = "无效";
            break;
        case "2":
            fundStatusName = "有效";
            break;
        case "3":
            fundStatusName = "已发送扣款指令";
            break;
    };

    return fundStatusName;

}
