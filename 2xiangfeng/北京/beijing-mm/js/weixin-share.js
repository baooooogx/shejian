(function(){
	var shareConfig = {
	    "appid":'wx841a97238d9e17b2',
	    "img_url":'http://i1.dpfile.com/pc/tgzt/c33a44f893eb3f84b66494bb22381c6e(960x250)/thumb.jpg?rd=0.6308581111952662',
	    "img_width":"640",
	    "img_height":"640",
	    "link":'http://hd.t.dianping.com/events/shejian-xf/mm/bj',
	    "desc":'517吃货节，点评团为您精心挑选《舌尖2》美味菜肴，吃舌尖上的美食才是真吃货！',
	    "title":'点评团抢鲜献上《舌尖2相逢》出镜美食团购！-北京站',
	    "timelineTitle":"点评团抢鲜献上《舌尖2相逢》出镜美食团购！-北京站"
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