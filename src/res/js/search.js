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
	console.log("我是search.js");
	$('#searDiv ul').find('li:gt(0)').hover(function(){
		$(this).css('cursor','pointer');
		// console.log("hover!!!!");

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
		console.log(whereArgs);
	    console.log("我是search.js里面的queryDB()函数");
    	// $('.cont').empty(); //清除所有再去添加
    	// $('div').remove('.content');
		document.querySelector('.cont').innerHTML="";
    	console.log('%c点击搜索','background:red');
		//点击搜索之后  重新遍历数据库
		queryDB(whereArgs.slice(0,-4));

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

	/*function quertDB(){
		var failsql = "";
   		var sqlServices = new gEcnu.WebSQLServices.SQLServices({
        'processCompleted': function(data) {
       
            getContentDiv(0); //绘制内容div
        },
        'processFailed': function() {
            console.log("content.js文件下数据库操作失败！");
        }
    });
    //processAscyn: function(ActionType,map,lyrOrSQL,Params)
    var lyrOrSQL = {
        'lyr': 'uploadFile',
        'fields': 'uldname,kcbz,ssnj,ssks,wjlx,date,filename'
    };
    console.log(whereArgs);
    sqlServices.processAscyn("SQLQUERY", "gecp2", lyrOrSQL);
    /**********数据库End**********************/
	//}*/
	//点击查询
	// function clk2search(){
	// 	/*topicParentName取得后，比对jsonText,通过父类变遍历所有项，
	// 	取得与点击对象一致的，重新封装一json数据，传给content.js，并且只是刷新内容div
	// 	问题：只是刷新内容div的实现？*/
	// 	// var json2String=JSON.stringify(jsonText);
	// 	//console.log(jsonText);
	// 	//console.log(jsonText[1]);
	// 	//判断如果是课程标准
	// 	var kcbzTopic=[],wjgsTopic=[],ssnjTopic=[],ssksTopic=[];
	// 	var searchIndex=[];
	// 	var jsonRes=[];//选择之后的结果
	// 	switch(topicParentName){
	// 		case "kcbz":
	// 			for (var i = 0; i < jsonText.length; i++) {
	// 				kcbzTopic[i]=jsonText[i].kcbz;
	// 				if(kcbzTopic[i]==topic){ //课程标准符合
	// 					searchIndex.push(i);
	// 					jsonRes.push(jsonText[i]);
	// 				}
	// 			}
	// 				jsonText=jsonRes;
	// 				console.log(jsonText);
	// 				/*console.log(kcbzTopic);
	// 				console.log(searchIndex);
	// 				console.log(jsonRes);*/
	// 			break;
	// 		case "wjgs":
	// 			for (var i = 0; i < jsonText.length; i++) {
	// 				wjgsTopic[i]=jsonText[i].wjlx;
	// 				if(wjgsTopic[i]==topic){ 
	// 					searchIndex.push(i);
	// 					jsonRes.push(jsonText[i]);
	// 				}
	// 			}
	// 				jsonText=jsonRes;
	// 				console.log(jsonText);
	// 			break;
	// 		case "ssnj":
	// 			for (var i = 0; i < jsonText.length; i++) {
	// 				ssnjTopic[i]=jsonText[i].ssnj;
	// 				if(ssnjTopic[i]==topic){ 
	// 					searchIndex.push(i);
	// 					jsonRes.push(jsonText[i]);
	// 				}
	// 			}
	// 				jsonText=jsonRes;
	// 				console.log(jsonText);
	// 			break;
	// 		case "ssks":
	// 		for (var i = 0; i < jsonText.length; i++) {
	// 				ssksTopic[i]=jsonText[i].ssks;
	// 				if(ssksTopic[i]==topic){ 
	// 					searchIndex.push(i);
	// 					jsonRes.push(jsonText[i]);
	// 				}
	// 			}
	// 				jsonText=jsonRes;
	// 				console.log(jsonText);
	// 			break;

	// 	}
	// }