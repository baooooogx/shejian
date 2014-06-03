(function(){
	var win=$(window),
        winWidth=win.width(),
        winHeight=win.height(),
        ajaxWaiting=false,
        f_disable = false,
        f_deline = false,
        f_finish = false,
        f_start = false,
        openType = window.location.href.match(/opentype=[^?&=]*/g);

	var weiboShareDialogue="<div class='weibo_share_dialogue'>\
            <a href='' class='close'></a>\
            <h4>分享到：</h4>\
            <ul class='share_btn_list clearfix'>\
                <li class='sina'><a href=''>新浪微博</a></li>\
                <li class='qq'><a href='' >腾讯微博</a></li>\
                <li class='weixin'><a >微信朋友圈</a></li>\
            </ul>\
        </div>";
     var $wybtn = $(".wybtn a");
     if(openType && openType.length>0){
        openType = openType[0].replace("opentype=","");
     }

    
	function main(){
		bindEvent();
	}


	function bindEvent(){
		$('.share').on('click', function(e){
			e.preventDefault();
            showShareDialogue();
        });
	}

    window.DPApp = window.DPApp || {
        send_message: function (method, args, callback) {
            var hasCallback = callback && typeof callback == 'function';
            var callbackId = hasCallback ? callbacksCount++ : 0;
            if (hasCallback) {
                callbacks[callbackId] = callback;
            }

            args['callbackId'] = callbackId;
            args = (typeof args === 'object') ? JSON.stringify(args) : args + '';
            window.location.href = 'js://_?method=' + method + '&args=' + encodeURIComponent(args) + '&callbackId=' + callbackId;
        },

        callback: function (callbackId, retValue) {
            try {
                var callback = callbacks[callbackId];
                if (!callback) {
                    return;
                }

                callback.apply(null, [retValue]);
            } catch (e) {
                // alert(e);
            }
        },

        share: function (args) {
            this.send_message('share', args, null);
        },

        unbindfinish: function (args) {
            this.send_message('unbindfinish', args, null);
        },
        bindfinish: function (args) {
            this.send_message('bindfinish', args, null);
        }
    };
    
    function shareWeixinFunc() {
        //show in native app
        if (typeof window.DPApp != 'undefined') {
            // 分享PC页链接
            var jump_url ="http://hd.t.dianping.com/events/shejian-mj/mm/gz";
            var shareData = {
                "image": "http://i1.dpfile.com/pc/tgzt/501330a8eb1af7cb945fe352fe3abc10(960x250)/thumb.jpg?rd=0.8330320452805609",
                "url": jump_url+'?opentype=browser',
                "title": "点评团献上《舌尖2·三餐》出镜美食团购 -广州站",
                "desc": "点评团为您精心挑选最后一期舌尖2的美味菜肴。让我们跟随舌尖，回味一餐一饭。"
            };
            try {
                window.DPApp.share(shareData);
            } catch (shareErr) {

            }
        } 
    }

	function showShareDialogue(){
        var dialogue=$(weiboShareDialogue),
            closeBtn=dialogue.find("a.close"),
            shareBtns=dialogue.find(".share_btn_list a"),
            dialoguePosition={
                left:(winWidth-200)/2,
                top:(winHeight-110)/2
            };
        dialogue.appendTo($('body')).css(dialoguePosition);


        if(openType == "browser") {
            //show in browser
            $(".weibo_share_dialogue").addClass("weibo_share_dialogue2");
            $(".weibo_share_dialogue").find("li").eq(2).remove();
        }

        closeBtn.on('click', function(e){
            e.preventDefault();

            dialogue.remove();
            showOverlay(true);
        });

        showOverlay();

        var sinaShareBtn = shareBtns.eq(0),
        	qqShareBtn = shareBtns.eq(1),
        	sinaShareContent = "【舌尖2·三餐】出镜美食同步购。点评团抢鲜为您精心挑选节目中的美食团购。让我们跟随舌尖，回味一餐一饭。";
        	qqShareContent = "【舌尖2·三餐】出镜美食同步购。点评团抢鲜为您精心挑选节目中的美食团购。让我们跟随舌尖，回味一餐一饭。";
        	sinaShareURL = "http://hd.t.dianping.com/events/shejian-sc/mm/gz",
        	qqShareURL = "http://hd.t.dianping.com/events/shejian-sc/mm/gz",
        	sinaSharePic = "http://t.dianping.com/events/eventpic/weiboshejian7.jpg";
        	qqSharePic = "http://t.dianping.com/events/eventpic/weiboshejian7.jpg";

			// sinaShareBtn.attr('href','dianping://web?url='+encodeURIComponent('http://v.t.sina.com.cn/share/share.php?appkey=1392673069&&source=&content=utf-8&searchPic=false&utm_sorce=weibo&utm_compaign=xinlang&url='+sinaShareURL+'&title='+sinaShareContent));
			sinaShareBtn.attr("target","_blank").attr('href','http://v.t.sina.com.cn/share/share.php?appkey=1392673069&&source=&content=utf-8&searchPic=false&utm_sorce=weibo&utm_compaign=xinlang&url='+encodeURIComponent(sinaShareURL)+'&title='+sinaShareContent+'&pic='+encodeURIComponent(sinaSharePic));
			
			// qqShareBtn.attr('href','dianping://web?url='+encodeURIComponent('http://share.v.t.qq.com/index.php?c=share&a=index&source=1000013&site=http%3A%2F%2Fwww.dianping.com&utm_sorce=weibo&utm_compaign=tengxun&url='+qqShareURL+'&title='+qqShareContent));
			qqShareBtn.attr("target","_blank").attr('href','http://share.v.t.qq.com/index.php?c=share&a=index&source=1000013&site=http%3A%2F%2Fwww.dianping.com&utm_sorce=weibo&utm_compaign=tengxun&url='+encodeURIComponent(qqShareURL)+'&title='+qqShareContent+'&pic='+qqSharePic);

		$(".weibo_share_dialogue .weixin").on("click", function(){
			shareWeixinFunc();
		});
	}

	function showOverlay(clear){
        var overlay=$('<div id="J_overlay" class="dialogue_overlay"></div>');

        if(!clear){
            overlay.appendTo($('body')).css({
                'width':winWidth,
                'height':$('body').height(),
                'opacity':0.5
            });
        }else{
            $('#J_overlay').remove();
        }
    }

	function updateDonation(){
		setDonation();
		setTimeout(function () {
	        updateDonation();
	    }, 60000)
	}

	

    function toDecimal(x) {  
        var f = parseFloat(x);  
        if (isNaN(f)) {  
            return;  
        }  
        f = Math.round(x*100)/100;  
        return f;  
    }

	function setHasLove(money){
		//设置已有爱心捐助
		var $hasLove = $('.has-love .number');

		var i_node;
		var text = '';
		var arr_mon = (money+'').split('')
		var len = arr_mon.length;
		var $is = $(".number i");
		for(var j =0 ;j<len;j++){
			$($is.eq(6-len+j)).text(arr_mon[j]);
		}
	}

	function showTips(info){
		var tips=$('<p class="ajax-tips weixin-share-tips">'+info+'</p>').appendTo('body');

		tips.css({
			width: winWidth,
			height: winHeight
		});

		setTimeout(function(){
			tips.remove();
		},5000);
	}

	$(document).ready(function(){
		main();
	});
})();

