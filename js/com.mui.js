/**
 * Created by chenb on 2017/4/2.
 V1.0
 */
//数据处理
if (!com) {
    var com = new Object();
}
if (!com.mui) {
    com.mui = new Object();
}

/**
 * 分页 下拉滚动刷新，上拉加载更多的封装
 *
 依赖：
 <link href="../../css/mui.css" rel="stylesheet"/>
 <link href="../../css/xmui.pullToRefresh.material.css" rel="stylesheet"/>
 <script src="../../js/mui.min.js"></script>
 <script src="../../js/mui.pullToRefresh.js"></script>
 <script src="../../js/mui.pullToRefresh.material.js"></script>
 html:
 <div class="mui-scroll-wrapper">
 <div class="mui-scroll" id="content" style="padding-bottom: 10px;padding-top: 10px;">

 </div>
 </div>
 js:

 scroll = com.mui.muiScroll(document.querySelector("#content")
 , function (index, size, do_success, do_error) {
                    do_success(0);
 });

 * @param ele_   mui_scroll 的节点 ele
 * @param do_search_ 回调 functioin(index,size,do_success(hasNext),do_error()){}
 */
com.mui.muiScroll = function (ele_, do_search_) {
    var scroll = {
        page_data: {
            "page.currentPage": 1
            , "page.pageSize": 5
        }
        , init: function () {
            var that_ = this;
            mui(ele_).pullToRefresh({
                down: {
                    callback: function () {
                        var self = this;
                        self.refresh(true);
                        that_.page_data["page.currentPage"] = 1;
                        
                        //下拉的回调
                        setTimeout(function () {
                            do_search_(that_.page_data["page.currentPage"]
                                , that_.page_data["page.pageSize"]
                                , function (hasNext_) {//回调OK
                                    self.endPullDownToRefresh();
                                    if (hasNext_ != 1) {//
                                        self.endPullUpToRefresh(true);
                                    } else {
                                        self.endPullUpToRefresh(false);
                                    }
                                }, function () {//回调数据请求失败
                                    self.endPullDownToRefresh();
                                }, ele_
                            );
                        },100);
                    }
                },
                up: {
                    callback: function () {
                        var self = this;
                        //添加起始位置
                        that_.page_data["page.currentPage"] +=1;
                        setTimeout(function () {
                            do_search_(
                                that_.page_data["page.currentPage"]
                                , that_.page_data["page.pageSize"]
                                , function (hasNext_) {
                                    if (hasNext_ != 1) {//
                                        self.endPullUpToRefresh(true);
                                    }else{
                                        self.endPullUpToRefresh(false);
                                    }
                                }
                                , function () {
                                    self.endPullUpToRefresh(false);
                                }
                                ,ele_
                            );
                        },100);
                    }
                }
            });
        }
        , refresh: function () {
            setTimeout(function () {
                mui(ele_).pullToRefresh().pullDownLoading();
            }, 500);
        }
    }
    scroll.init();
    return scroll;
    
}

