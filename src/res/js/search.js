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
		topicParentName=others[0].id;
		//console.log(others);
		console.log(topicParentName);
		others.removeClass('selected');
		$(this).addClass('selected');

		// $('#content span').css('display','block');//test
		// $('#content span:not(:contains("' + topic + '"))').hide();  //只是本页的筛选的
		// $('#content span').hide();//test
		//console.log(jsonText);
		/*topicParentName取得后，比对jsonText,通过父类变遍历所有项，
		取得与点击对象一致的，重新封装一json数据，传给content.js，并且只是刷新内容div
		问题：只是刷新内容div的实现？*/
		// var json2String=JSON.stringify(jsonText);
		var kcbzTopic=jsonText[1].kcbz;
		var ssnjTopic=jsonText[2].ssnj;
		// console.log(json2String);
		console.log(kcbzTopic);
		console.log(ssnjTopic);

	});
});
