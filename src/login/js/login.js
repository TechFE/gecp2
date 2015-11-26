/*注册页面跳转 登陆验证*/

/*登陆验证*/
$(document).ready(function(){
	console.log("ok");
	$('.login-in').click(function(){
		var username=$.trim($('.login-username').val());
		if(username==""||username==null){
			return;
		}
		
		var pwd=$.trim($('.login-password').val());

		//从数据库中取数据
		/*var sqlServices= new gEcnu.WebSQLServices.SQLServices();
		var lyrOrSQL={
			lyr:'register_users',
			fileds:'password',
			filter:"username='"+username+"'"
		};
		var getPwd=sqlServices.processAscyn("SQLQUERY","gecp2",lyrOrSQL);
		console.log(getPwd);*/
		var lyrOrSQL={
			'lyr':'register_users',
			'fields':'password',
			'filter':"username='"+username+"'"
		};
		
		var sqlservice=new gEcnu.WebSQLServices.SQLServices({'processCompleted':function(data){
				//console.log(data[0].password); //回调函数里返回数据
			// data[0]
			 var user_pwd=data[0].password;
			 if(pwd==user_pwd){
			 	setCookie('username',username,7);
			 	window.location.href="index.html";
			 }else{
			 	alert("用户名或者密码不正确！");
			 }
		},'processFailed':{}});
		sqlservice.processAscyn(gEcnu.ActType.SQLQUERY ,"gecp2",lyrOrSQL);



	});
	


});