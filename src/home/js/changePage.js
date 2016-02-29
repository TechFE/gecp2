/*
*zry
*2015-11-20
*切换页面
**/
/*下面两句是调试使用的*/
/*$('#mainframe').css('height','1000px');
$('#mainframe').attr('src','res/res.html');	*/	

$(document).ready(function(){
	$('.navbar-nav li').hover(function(){
		$(this).addClass('hover');
	},function(){
		$(this).removeClass('hover');
	});
	$('.navbar-nav li a:first').css('color','#FFF');
	$('.navbar-nav li a').click(function(){
		$('.navbar-nav li a').css('color','#9d9d9d');
		$(this).css('color','#FFF');

		var txt=$(this).text();
		console.log(txt);
		if(txt=="首页"){
			// $('#main-div').css('height','1720px');
			$('#mainframe').css('height','1800px');
			$('#mainframe').attr('src','home/home.html');
		}

		if(txt=="资源"){
			// $('#main-div').css('height','950px');
			$('#mainframe').css('height','1000px');
			$('#mainframe').attr('src','res/res.html');		
			console.log("okk");
		}

		if(txt=="社区"){
			//$('#main-div').css('height','650px');
			$('#mainframe').css('height','650px');
			$('#mainframe').attr('src','shequ/shequ.html');	
		}

		if(txt=="研修"){
			//$('#main-div').css('height','650px');
			$('#mainframe').css('height','650px');
			$('#mainframe').attr('src','yanxiu/yanxiu.html');		
		}
	});
});