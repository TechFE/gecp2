$(document).ready(function(){
	var username=getCookie('username');
	//console.log(username);
	if(username!=null&&username!=""){
		$("#index-user").text("欢迎你！"+username);
		$("#index-user").css('color','#9d9d9d');
		$("#index-user").css('margin-top','15px');
		var html="<li id='login-out' >&nbsp;&nbsp;&nbsp;注销</li> ";
		// $("#login-out").css('left','15px');
		$("#index-user").append(html);
		$("#index-user").css('width','150px');
		$("#login-out").css('float','right');
		$("#index-user").css('display','flex');
		$("#index-user").css('align-items','center');

		// 实现注销
		$("#login-out").hover(function(){
			$(this).addClass('hover');
		},function(){
			$(this).removeClass('hover');
		});
		$("#login-out").click(function(){
			setCookie('username','',-1);//删除cookie
			//刷新
			window.location.reload(true);//刷新
		});
	}
});


