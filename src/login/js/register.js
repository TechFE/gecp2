/*
*zry
*2015-11-21
* 注册
*
******/
$(document).ready(function(){
	//console.log("ok");
	var username,realname,password,password2, email,inputIntro;
	$('.btn-register').click(function(){
		//e.preventDefault();
		 username=$.trim($('.username').val());
		 realname=$.trim($('.realname').val());
		 password=$.trim($('.password').val());
		 password2=$.trim($('.password2').val());
		 email=$.trim($('.email').val());
		 inputIntro=$.trim($('.inputIntro').val());
		console.log(username+realname+password+email+inputIntro);
		//填写逻辑
		if(username==""||password==""){
			/*$('alertModal').modal('show');
			$('#alertModal').on('show.bs.modal',function(event){
				var modal = $(this);
  				modal.find('.modal-body').text('带 * 的为必填项！' );
			});*/
			alert("带 * 的为必填项！");
			// continue;
			return;
			return;
		}
		if(password!=password2){
			/*$('#alertModal').on('show.bs.modal',function(event){
				var modal = $(this);
  				modal.find('.modal-body').text('确认密码和密码不一致!' );
			});*/
			alert("确认密码和密码不一致");
			return;
		}
		//存入数据库中
		var params={
			Fields:['username','realname','password','email','introduce'],
			Data:[[username,realname,password,email,inputIntro]]
		};
		var sqlServices=new gEcnu.WebSQLServices.SQLServices();
		sqlServices.processAscyn("ADD","gecp2","register_users",params);

		/*注册成功，登陆*/
		//$('#myModal').on('show.bs.modal', function (event) {
      	 $('#myModal').modal('show');			
	     // });//modal
	 
    });//注册click
	//注册成功===>登陆
	$('.reg-login').click(function(){
		window.location.href="../login.html";
	});
	// 重置
      $('.btn-reset').click(function(){
      	// $('#resetModal').on('show.bs.modal', function (event) {}
      	   $('#resetModal').modal('show');
      });
      //确定重置
       $('.confirmReset').click(function(){
      	   username="";
      	   $('#resetModal').modal('hide');
      	    $('.username').val('');
			$('.realname').val('');
			$('.password').val('');
			$('.password2').val('');
			$('.email').val('');
			$('.inputIntro').val('');

      }); 
  });  //$(document).ready(sfunction()