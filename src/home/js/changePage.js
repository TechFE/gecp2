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
			$('#mainframe').css('height','1800px');
			$('#mainframe').attr('src','home/home.html');
		}

		if(txt=="资源"){
			$('#mainframe').css('height','1000px');
			$('#mainframe').attr('src','res/res.html');		
		}

		if(txt=="社区"){
			$('#mainframe').css('height','650px');
			$('#mainframe').attr('src','shequ/shequ.html');	
		}
	});

	$('.yxyy-subs li a').click(function(event) {
		$('.yxyy-menu').css('color', '#FFF');
		var subTxt = $(this).text();
		switch(subTxt){
			case "集体备课" :
				$('#mainframe').css('height','650px');
				$('#mainframe').attr('src','yanxiu/jtbk.html');
				break;	
			case "评课议课" :
				$('#mainframe').css('height','650px');
				$('#mainframe').attr('src','yanxiu/pkyk.html');
				break;	
			case "课题研究" :
				$('#mainframe').css('height','650px');
				$('#mainframe').attr('src','yanxiu/ktyj.html');
				break;	
			case "科研成果" :
				$('#mainframe').css('height','650px');
				$('#mainframe').attr('src','yanxiu/kycg.html');
				break;
		}
	});
});