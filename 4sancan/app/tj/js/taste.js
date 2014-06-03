$(document).ready(function(){
	var width = $(window).width();
	if((width-1000)/2-106 > 0){
		var distance = ((width-1000)/2 - 106)/3;
		$(".float").css("right",distance*2);
	} else {
		$(".float").css("right",0);
	}
})

/*$(document).on("click",".announce-pointer",function() {
	$(".announce-pointer").css("background","url(images/yellow.png)");
	$(".current-li").removeClass("current-li");
	$(this).css("background","url(images/red.png)");
	$(this).closest("li").addClass("current-li");
});*/