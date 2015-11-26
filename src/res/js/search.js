/*
*  2015-11-9 zry
*  选择 筛选
*
**/
$(document).ready(function(){
	$('#searDiv ul').find('li:gt(0)').hover(function(){
		$(this).css('cursor','pointer');
		// console.log("hover!!!!");

	});
	$('#searDiv ul li:nth-child(2)').addClass('selected');

	//处理点击事件
	$('#searDiv ul').find('li:gt(0)').click(function(event){
		event.preventDefault();//
		var topic=$(this).text();
		console.log(topic);
		// $('#searDiv ul li').removeClass('selected');
		var others=$(this).parent().children();//所在行其他
		others.removeClass('selected');
		$(this).addClass('selected');

		// $('#content span').css('display','block');//test
		// $('#content span:not(:contains("' + topic + '"))').hide();  //只是本页的筛选的
		// $('#content span').hide();//test

	});
})
