/*
*  2015-11-9 zry
*  选择 筛选
*
**/
/*
                   _ooOoo_
                  o8888888o
                  88" . "88
                  (| -_- |)
                  O\  =  /O
               ____/`---'\____
             .'  \\|     |//  `.
            /  \\|||  :  |||//  \
           /  _||||| -:- |||||-  \
           |   | \\\  -  /// |   |
           | \_|  ''\---/''  |   |
           \  .-\__  `-`  ___/-. /
         ___`. .'  /--.--\  `. . __
      ."" '<  `.___\_<|>_/___.'  >'"".
     | | :  `- \`.;`\ _ /`;.`/ - ` : | |
     \  \ `-.   \_ __\ /__ _/   .-` /  /
======`-.____`-.___\_____/___.-`____.-'======
                   `=---='
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
         佛祖保佑       永无BUG
*/
var whereArgs="";
$(document).ready(function(){

	$('#searDiv ul').find('li:gt(0)').hover(function(){
		$(this).css('cursor','pointer');
	});
	$('#searDiv ul li:nth-child(2)').addClass('selected');

	//处理点击事件
	$('#searDiv ul').find('li:gt(0)').click(function(event){	
		event.preventDefault();//
		var topic=$.trim($(this).text());
		topic=topic.replace(/\s+/g,"");	//删去空格
		console.log(topic);
		// $('#searDiv ul li').removeClass('selected');
		var others=$(this).parent().children();//所在行其他
		var topicParentName=others[0].id;
		//console.log(others);
		console.log(topicParentName);
		others.removeClass('selected');
		$(this).addClass('selected');

		// $('#content span').css('display','block');//test
		// $('#content span:not(:contains("' + topic + '"))').hide();  //只是本页的筛选的
		// $('#content span').hide();//test
		//console.log(jsonText);
		
		//点击查询
		clk2search(topicParentName,topic);
		//whereArgs=whereArgs.slice(0,-4);
		//console.log(whereArgs);
	    //console.log("我是search.js里面的queryDB()函数");
    	// $('.cont').empty(); //清除所有再去添加
    	// $('div').remove('.content');
		document.querySelector('.cont').innerHTML="";
		//点击搜索之后  重新遍历数据库
		queryDB(whereArgs.slice(0,-4));   /*在content.js中*/
 
	});
});
	
	/**
	 * [clk2search 点击查询]
	 * @return {[string]} [where语句]
	 */
	function clk2search(topicParentName,topic){
		
		switch(topicParentName){
			case "kcbz":
				/*var ind=whereArgs.indexOf("kcbz");
				console.log(ind);*/			
				// whereArgs.replace(/^kcbz='.*'\sand$/g,"");
				whereArgs=whereArgs.replace(/kcbz=\'[\u4e00-\u9fa5]+\' and/g,"").trim();		
				whereArgs+=" kcbz='"+topic+"' and ";
					//点击全部的时候
				whereArgs=whereArgs.replace(/kcbz=\'全部\' and/g,"").trim();					
				break;
			case "wjgs":
				whereArgs=whereArgs.replace(/wjlx=\'[\u4e00-\u9fa5]+\' and/g,"").trim();		
				whereArgs+=" wjlx='"+topic+"' and ";
				whereArgs=whereArgs.replace(/wjlx=\'全部\' and/g,"").trim();					

				break;
			case "ssnj":
				whereArgs=whereArgs.replace(/ssnj=\'[\u4e00-\u9fa5]+\' and/g,"").trim();		
				whereArgs+=" ssnj='"+topic+"' and ";
				whereArgs=whereArgs.replace(/ssnj=\'全部\' and/g,"").trim();					

				break;
			case "ssks":
				whereArgs=whereArgs.replace(/ssks=\'[\u4e00-\u9fa5]+\' and/g,"").trim();		
				whereArgs+=" ssks='"+topic+"' and ";
				whereArgs=whereArgs.replace(/ssks=\'全部\' and/g,"").trim();					
				break;
		} 

		return whereArgs;
	}

