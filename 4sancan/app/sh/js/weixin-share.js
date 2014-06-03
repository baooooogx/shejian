(function(){
	var shareConfig = {
	    "appid":'wx841a97238d9e17b2',
	    "img_url":'http://i1.dpfile.com/pc/tgzt/501330a8eb1af7cb945fe352fe3abc10(960x250)/thumb.jpg?rd=0.8330320452805609',
	    "img_width":"640",
	    "img_height":"640",
	    "link":'http://hd.t.dianping.com/events/shejian-sc/mm/sh',
	    "desc":'点评团为您精心挑选最后一期舌尖2的美味菜肴。让我们跟随舌尖，回味一餐一饭。',
	    "title":'点评团抢鲜献上《舌尖2·秘境》出镜美食团购',
	    "timelineTitle":"点评团抢鲜献上《舌尖2·秘境》出镜美食团购"
	};
	var binded = false;

	function bindShare(){
	    if(binded){
	        return;
	    }
	    if(window.WeixinJSBridge){
	        binded = true;
	        //分享好友
	        WeixinJSBridge.on('menu:share:appmessage', function(argv){
        		WeixinJSBridge.invoke('sendAppMessage',shareConfig, function(res) {});
	        });

	        //分享朋友圈
	        WeixinJSBridge.on('menu:share:timeline', function(argv){
	            WeixinJSBridge.invoke('shareTimeline',shareConfig, function(res) {});
	        });
	    }
	}
	bindShare();
	document.addEventListener('WeixinJSBridgeReady', bindShare, false);
})();