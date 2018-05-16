 /**
  * 基于juqery
     * 保存为base64
     * @param {Object} obj
     * @param {Number} [obj.quality=0.8] 图片品质，1为原图
     * @param {Function} obj.success(obj) 替换后的执行
     * @example
     *
     */
    var _imgblobfile;
    var _imgquality;
    var _imgsuccess;
    var localResizeIMG = function(obj) {
     _imgsuccess=obj.success;
     var file=obj.fileInput.files[0];
     var URL = window.URL || window.webkitURL;
     _imgblobfile = URL.createObjectURL(file);
     _imgquality = obj.quality==undefined?0.8:obj.quality;
     var reader=new FileReader();
     reader.readAsDataURL(file);
     reader.onload=function(){
         // 通过 reader.result 来访问生成的 DataURL
         var url=reader.result;
         if($(".img-modal").length<=0){
             var panl="<div class='img-modal'>";
             panl+="<div class='wd100 relative'>";
             panl+="<div onclick='_imgOption.cancel()' class='wd20 float-left h50px color-blue ws1 textcenter'>取消</div>";
             panl+="<div class='wd60 float-left h50px'></div>";
             panl+="<div onclick='_imgOption.submit()' class='wd20 float-left h50px color-blue ws1 textcenter'>完成</div>";
             panl+="</div>";
             panl+="<div class='img-choose relative'>";
             panl+="</div>";
             panl+="<div class='wd90 color-white ft12 textcenter h50px'>*是否发送图片</div>";
             panl+="</div>";
             $("body").append(panl);
         }
         $(".img-choose").append("<img src='"+url+"'>");
         $(".img-modal").fadeIn();
     };
 };

 var _imgOption={
     cancel:function(){
         $(".img-modal").fadeOut(300);
         setTimeout(function(){
             $(".img-modal .img-choose img").remove();
         },300);
     },
     //完成
     submit:function(){
             $(".img-modal").fadeOut(300);
             setTimeout(function(){
                 $(".img-modal .img-choose img").remove();
             },300);

             var img = new Image();
             img.src = _imgblobfile;
             img.onload = function() {
                 var that = this;
                 //实际图片宽高比例
                 var w = that.width,
                     h = that.height,
                     scale = w / h;

                 //修正后宽高比例
                 w = $(".img-choose").width() || w;
                 h = w / scale;

                 //h=w>h?h:w;//看看能否设置成正方形

                 //截取y轴坐标，看看图片位置是否变化
                 var chooseimg = $(".img-modal .img-choose img");
                 var x=chooseimg.position().left;//x坐标
                 var y=chooseimg.position().top;//y坐标
                 var canvas = document.createElement('canvas');
                 var ctx = canvas.getContext('2d');
                 $(canvas).attr({
                     width: w,
                     height: h
                 });



                 ctx.drawImage(that, x, y, w, h);

                 var base64 = canvas.toDataURL('image/jpeg', _imgquality || 0.8);

                 /*
                 // 淇IOS
                 if (navigator.userAgent.match(/iphone/i)) {
                     var mpImg = new MegaPixImage(img);
                     mpImg.render(canvas, {
                         maxWidth: w,
                         maxHeight: h,
                         quality: obj.quality || 0.8
                     });
                     base64 = canvas.toDataURL('image/jpeg', _imgquality || 0.8);
                 }

                 // 淇android
                 if (navigator.userAgent.match(/Android/i)) {
                     var encoder = new JPEGEncoder();
                     base64 = encoder.encode(ctx.getImageData(0, 0, w, h), _imgquality * 100 || 80);
                 }
                 */
                 _imgsuccess(base64);


             };
         }
 };