/*
 * zry 2015-11-05
 * 生成文件列表div
 *
 */
var fileEntity={
     dates:[],
     names:[],
     kcbzDatas :[], //课程标准
     ssnjDatas :[], //所属年级
     ssksDatas :[], //科室
     wjlxDatas :[], //文件类型
     filenames :[],
     filename :[],
     filenamesTitle :[],
     filenamesType :[],
     maxPage:0, //最大的页码
     totalData:0, //总数据
     jsonText:"["//封装json
};
//fileEntity.dates = [] ; //日期
//var dates = [];  //日期
/*var names = []; //上传人
var kcbzDatas = []; //课程标准
var ssnjDatas = []; //所属年级
var ssksDatas = []; //科室
var wjlxDatas = []; //文件类型
var filenames = [];
var filename = [];
var filenamesTitle = [];
var filenamesType = [];
var maxPage; //最大的页码
var totalData; //总数据
var jsonText="[";//封装json*/

$(document).ready(function() {
    //console.log("jquery ok!");
    console.log("我是content.js");
    queryDB();
    console.log("我是content.js里面的queryDB()函数");
    // var lastLength=data.length();
    // console.log(lastLength);

});

function queryDB(queryFilter){
    /*从数据中读取数据*/
    //queryFilter=queryFilter.slice(0,-4);
    // isRefresh(queryFilter);
    console.log(queryFilter);
    //重新置为空，不然数据会累加
    fileEntity = {
      dates:[],
     names:[],
     kcbzDatas :[], //课程标准
     ssnjDatas :[], //所属年级
     ssksDatas :[], //科室
     wjlxDatas :[], //文件类型
     filenames :[],
     filename :[],
     filenamesTitle :[],
     filenamesType :[],
     maxPage:0, //最大的页码
     totalData:0, //总数据
     jsonText:"["//封装json
    };
    // var queryFilter1=queryFilter.slice(0, -4);
    // var queryFilter1=queryFilter.substring(0, 4);
    
    // console.log(queryFilter1);
    var sqlServices = new gEcnu.WebSQLServices.SQLServices({
        'processCompleted': function(data) {
            console.log(data);//回掉函数返回的数据
            // console.log(data[0].date);
            for (var i = 0; i < data.length; i++) {
                fileEntity.dates.push(data[i].date);   //
                fileEntity.names.push(data[i].uldname);//
                fileEntity.kcbzDatas.push(data[i].kcbz);//
                fileEntity.ssnjDatas.push(data[i].ssnj);//
                fileEntity.ssksDatas.push(data[i].ssks);//
                fileEntity.wjlxDatas.push(data[i].wjlx);//

                fileEntity.filename[i] = data[i].filename;
                fileEntity.filenames.push(fileEntity.filename[i]); //整个名字//
                //名字和类型分开
                var split = fileEntity.filenames[i].split('.');
                fileEntity.filenamesTitle.push(split[0]);//
                fileEntity.filenamesType.push(split[1]);//

                /*var jsonText={
                    "names":
                };*/
                // 封装成json
                fileEntity.jsonText+='{ "upNames":"'+fileEntity.names[i-1]+'","date":"'+fileEntity.dates[i-1]+'","kcbz":"'+fileEntity.kcbzDatas[i]+
                '","ssnj":"'+fileEntity.ssnjDatas[i]+'","ssks":"'+fileEntity.ssksDatas[i]+'","wjlx":"'+fileEntity.wjlxDatas[i]+
                '","filenames":"'+fileEntity.filenames[i]+'"},';

            }

               jsonText=fileEntity.jsonText.slice(0, -1);
               jsonText+=("]");
               jsonText=JSON.parse(jsonText);

               /* var kcbzTopic=jsonText[1].kcbz;
                var ssnjTopic=jsonText[0].ssnj;
                // console.log(json2String);
                console.log(kcbzTopic);
                console.log(ssnjTopic);
               //console.log(jsonText);*/

            //动态创建div？JQuery复制  
            /*var txt1="<p>Text.</p>"; // 以 HTML 创建新元素
            var txt2=$("<p></p>").text("Text.");  // 以 jQuery 创建新元素
            var txt3=document.createElement("p"); // 以 DOM 创建新元素
            txt3.innerHTML="Text.";
            $("p").append(txt1,txt2,txt3); // 追加新元素
            */
            
            getContentDiv(0); //绘制内容div

        },
        'processFailed': function() {
            console.log("content.js文件下数据库操作失败！");
        }
    });
    //processAscyn: function(ActionType,map,lyrOrSQL,Params)
    var lyrOrSQL = {
        'lyr': 'uploadFile',
        'fields': 'uldname,kcbz,ssnj,ssks,wjlx,date,filename',
        'filter':queryFilter
    };
    sqlServices.processAscyn("SQLQUERY", "gecp2", lyrOrSQL);
    /**********数据库End**********************/
}
function getContentDiv(pageNum) {
    // var pageNum=$('#page-num').val();
    /*if(type=="init"){
    	pageNum=1;
    }*/
    totalData = fileEntity.filenamesTitle.length;
    // console.log(totalData);
    // console.log("totalData 1 ="+totalData);
    // $('#total-data').val(totalData);
    var maxPage = Math.ceil(totalData / 15);
    maxPage = (maxPage === 0) ? 2 : maxPage;
    // console.log(maxPage);
    if ((pageNum + 1) > maxPage) {
        console.log(pageNum + 1);
        alert("已经到达最后一页！");
        return;
    }
    var N = (pageNum + 1) * 15;
    //分页取数据
    $('.cont').empty(); //清除所有再去添加
    var j = 0;
    for (var i = pageNum * 15; i < N; i++) {
        /*var cloned=$('#content').clone(true);//true带着所有时间克隆
        console.log(cloned);
        $('.cont').append(cloned);*/
        if (fileEntity.filenamesTitle[i] != null || fileEntity.filenamesTitle[i] != undefined) {//不能改为！==
            var html = "<div id='content' class='content cont2'>" +
                "<img src='img/nr/" + (j + 1) + ".png' class='cont-img' alt=''/>" +
                "<p class='cont-title' id='cont-title'>" + fileEntity.filenamesTitle[i] + "</p>" +
                "<span class='cont-name'>" + fileEntity.names[i] + " </span> " +
                "<span class='cont-date'>" + fileEntity.dates[i] + "</span>" +
                "</div>";
            j++;
            //console.log(html);
            $('.cont').append(html);
        }
    }
}
