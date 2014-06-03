(function(){
	var shareConfig = {
	    "appid":'wx841a97238d9e17b2',
	    "img_url":'http://i1.dpfile.com/pc/tgzt/c029558e55a833cb5aa3e48fe896e1e0(960x250)/thumb.jpg?rd=0.49754394590854645',
	    "img_width":"640",
	    "img_height":"640",
	    "link":'http://hd.t.dianping.com/events/shejian-jc/mm/sh',
	    "desc":'点评团抢鲜为您精心挑选节目中的美食团购，看完舌尖享受美味，根本停不下来！',
	    "title":'舌尖2家常出镜美食抢先看，热腾腾刚出锅的团购哦！-上海站',
	    "timelineTitle":"舌尖2家常出镜美食抢先看，热腾腾刚出锅的团购哦！-上海站"
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