/*
* zry 2015-11-05
* 生成文件列表div
*
*/
/*全局变量*/
var dates=[];//日期
var names=[];//上传人
var kcbzDatas=[];//课程标准
var ssnjDatas=[];//所属年级
var ssksDatas=[]; //科室
var wjlxDatas=[];//文件类型
var filenames=[];filename=[]; filenamesTitle=[];filenamesType=[];
var maxPage;//最大的页码
var totalData;//总数据
$(document).ready(function(){
	//console.log("jquery ok!");
	/*从数据中读取数据*/
	var failsql="";
	var sqlServices=new gEcnu.WebSQLServices.SQLServices({'processCompleted':function(data){
		// console.log(data);//回掉函数返回的数据
		// console.log(data[0].date);
		
		for (var i = 0; i < data.length; i++) {
			dates.push(data[i].date);
			names.push(data[i].uldname);
			kcbzDatas.push(data[i].kcbz);
			ssnjDatas.push(data[i].ssnj);
			ssksDatas.push(data[i].ssks);
			wjlxDatas.push(data[i].wjlx);

			filename[i]=data[i].filename;
			filenames.push(filename[i]);  //整个名字
			//名字和类型分开
			var split=filenames[i].split('.');
			filenamesTitle.push(split[0]);
			filenamesType.push(split[1]);
		};

			//动态创建div？JQuery复制	
			/*var txt1="<p>Text.</p>"; // 以 HTML 创建新元素
			var txt2=$("<p></p>").text("Text.");  // 以 jQuery 创建新元素
			var txt3=document.createElement("p"); // 以 DOM 创建新元素
			txt3.innerHTML="Text.";
			$("p").append(txt1,txt2,txt3); // 追加新元素
			*/	
			
			/*$('.cont-title').text(filenamesTitle[i]);
			// console.log(names[0]);
			$('.cont-name').text(names[i]);
			$('.cont-date').text(dates[i]);*/
		// console.log(dates);
		// console.log(names);
		//分页
			
		/*console.log(filenames);
		console.log(filenamesTitle);
		console.log(filenamesType);*/
		// console.log(ssnjDatas);
		getContentDiv(0);//绘制内容div

	},'processFailed':function(){
		console.log("content.js文件下数据库操作失败！");
	}});
	//processAscyn: function(ActionType,map,lyrOrSQL,Params)
	var lyrOrSQL={
		'lyr':'uploadFile',
		'fields':'uldname,kcbz,ssnj,ssks,wjlx,date,filename'
	};
	sqlServices.processAscyn("SQLQUERY","gecp2",lyrOrSQL);
	/**********数据库End**********************/

});


	function getContentDiv(pageNum){
		// var pageNum=$('#page-num').val();
		/*if(type=="init"){
			pageNum=1;
		}*/
		totalData=filenamesTitle.length;
		// console.log(totalData);
		// console.log("totalData 1 ="+totalData);
		// $('#total-data').val(totalData);
		var maxPage=Math.ceil(totalData/15);
		maxPage=(maxPage==0)?2:maxPage;
		// console.log(maxPage);
		if((pageNum+1)>maxPage){
			console.log(pageNum+1);
			alert("已经到达最后一页！");
			return;
		}
		var N=(pageNum+1)*15;
		//分页取数据
		$('.cont').empty();//清除所有再去添加
		var j=0;
		for (var i=pageNum*15;i < N; i++) {
				/*var cloned=$('#content').clone(true);//true带着所有时间克隆
				console.log(cloned);
				$('.cont').append(cloned);*/
			if(filenamesTitle[i]!=null||filenamesTitle[i]!=undefined){
				var html="<div id='content' class='content cont2'>"+
			"<img src='img/nr/"+(j+1)+".png' class='cont-img' alt=''/>"+
	        "<p class='cont-title' id='cont-title'>"+ filenamesTitle[i]+ "</p>"+
	        "<span class='cont-name'>"+names[i]+" </span> "+
	        "<span class='cont-date'>"+dates[i]+"</span>"+
	        "<span id='kcbz-data'>"+kcbzDatas[i]+"</span>"+
	        "<span id='ssnj-data'>"+ssnjDatas[i]+"</span>"+
	        "<span id='ssks-data'>"+ssksDatas[i]+"</span>"+
	        "<span id='wjlx-data'>"+wjlxDatas[i]+"</span>"+
	        "</div>";
				j++;
				$('.cont').append(html);
			}
		}
	} 