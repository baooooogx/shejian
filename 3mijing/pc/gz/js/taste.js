$(document).ready(function(){
	var width = $(window).width();
	if((width-1000)/2-106 > 0){
		var distance = ((width-1000)/2 - 106)/3;
		$(".float").css("right",distance*2);
	} else {
		$(".float").css("right",0);
	}
})
