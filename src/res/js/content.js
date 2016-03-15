/*
 * zry 2015-11-05
 * 生成文件列表div 点击进入详情页,下载
 *
 */

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
var fileEntity = {
    fid:[],        //id标识号
    dates: [],
    names: [],
    kcbzDatas: [], //课程标准
    ssnjDatas: [], //所属年级
    ssksDatas: [], //科室
    wjlxDatas: [], //文件类型
    filenames: [],
    filename: [],
    bzxx:[],
    commentsperson:[],
    fcomments:[],  //评论
    filenamesTitle: [],
    filenamesType: [],
    maxPage: 0, //最大的页码
    totalData: 0, //总数据
    jsonText: "[" //封装json
};
    queryDB(); //默认加载文件列表
    // console.log("我是content.js里面的queryDB()函数");
   /* var host = window.location.host; //"localhost:85"
    var href = window.location.href; //"http://localhost:85/gecp2/src/index.html"*/
    $('#cont').on('click', '.content', function(event) {
        // $('.content').click(function(event) { //对于动态生成的html，这样是不可行的
        var fileName = $(this).children('.cont-title').eq(0).text();
        var uldName = $(this).children('.cont-name').eq(0).text();
        var uldDate = $(this).children('.cont-date').eq(0).text();
        var kcbz = $(this).children('.kcbz-data').eq(0).text();
        var ssnj = $(this).children('.ssnj-data').eq(0).text();
        var ssks = $(this).children('.ssks-data').eq(0).text();
        var wjlx = $(this).children('.wjlx-data').eq(0).text();
        var bzxx = $(this).children('.bzxx-data').eq(0).text();
        var commentsperson = $(this).children('.commentsperson').eq(0).text();
        var fcomments = $(this).children('.fcomments').eq(0).text();
        var fid = $(this).children('.fid').eq(0).text();
        console.log(fileName);
        sessionStorage.setItem('fileName', fileName);
        sessionStorage.setItem('uldName', uldName);
        sessionStorage.setItem('uldDate', uldDate);
        sessionStorage.setItem('kcbz', kcbz);
        sessionStorage.setItem('ssnj', ssnj);
        sessionStorage.setItem('ssks', ssks);
        sessionStorage.setItem('wjlx', wjlx);
        sessionStorage.setItem('bzxx', bzxx);
        sessionStorage.setItem('commentsperson', commentsperson);
        sessionStorage.setItem('fcomments', fcomments);
        sessionStorage.setItem('fid', fid);
        console.log(fcomments);
        /**/
        // window.fileName1 = fileName;  //跨html是不能使用

        $('#mainframe',parent.document).css('height', '1100px');
        // document.querySelector('#mainframe').innerHTML = "";
        $('#mainframe',parent.document).attr('src', 'res/fileDetial.html');

    });

    
});

/**
 * [queryDB 查询数据库]
 * @param  {[string]} queryFilter [where语句条件]
 * @return {[type]}             [description]
 */
function queryDB(queryFilter) {
    /*从数据中读取数据*/
    //queryFilter=queryFilter.slice(0,-4);
    // isRefresh(queryFilter);
    // console.log(queryFilter);
    //重新置为空，不然数据会累加
    fileEntity = {
        fid:[],     
        dates: [],
        names: [],
        kcbzDatas: [], //课程标准
        ssnjDatas: [], //所属年级
        ssksDatas: [], //科室
        wjlxDatas: [], //文件类型
        filenames: [],
        filename: [],
        bzxx:[],
        commentsperson:[],
        fcomments:[],  //评论内容
        filenamesTitle: [],
        filenamesType: [],
        maxPage: 0, //最大的页码
        totalData: 0, //总数据
        jsonText: "[" //封装json
    };
    // var queryFilter1=queryFilter.slice(0, -4);
    // var queryFilter1=queryFilter.substring(0, 4);

    var sqlServices = new gEcnu.WebSQLServices.SQLServices({
        'processCompleted': function(data) {
            console.log(data); //回掉函数返回的数据
            // console.log(data[0].date);
            for (var i = 0; i < data.length; i++) {
                fileEntity.dates.push(data[i].date); //
                fileEntity.names.push(data[i].uldname); //
                fileEntity.kcbzDatas.push(data[i].kcbz); //
                fileEntity.ssnjDatas.push(data[i].ssnj); //
                fileEntity.ssksDatas.push(data[i].ssks); //
                fileEntity.wjlxDatas.push(data[i].wjlx); //

                fileEntity.filename[i] = data[i].filename;
                fileEntity.bzxx[i] = data[i].bzxx;
                fileEntity.commentsperson[i] = data[i].commentsperson;
                fileEntity.fcomments[i] = data[i].fcomments;
                fileEntity.fid[i] = data[i].fid;
                fileEntity.filenames.push(fileEntity.filename[i]); //整个名字//
                //名字和类型分开
                var split = fileEntity.filenames[i].split('.');
                fileEntity.filenamesTitle.push(split[0]); //
                fileEntity.filenamesType.push(split[1]); //

                /*var jsonText={
                    "names":
                };*/
                // 封装成json
                fileEntity.jsonText += '{ "upNames":"' + fileEntity.names[i - 1] + '","date":"' + fileEntity.dates[i - 1] + '","kcbz":"' + fileEntity.kcbzDatas[i] +
                    '","ssnj":"' + fileEntity.ssnjDatas[i] + '","ssks":"' + fileEntity.ssksDatas[i] + '","wjlx":"' + fileEntity.wjlxDatas[i] +
                    '","filenames":"' + fileEntity.filenames[i] + '"},';

            }

            jsonText = fileEntity.jsonText.slice(0, -1);
            jsonText += ("]");
            jsonText = JSON.parse(jsonText);

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
        'fields': 'fid,uldname,kcbz,ssnj,ssks,wjlx,date,filename,bzxx,commentsperson,fcomments',
        'filter': queryFilter
    };
    sqlServices.processAscyn("SQLQUERY", "gecp2", lyrOrSQL);
    /**********数据库End**********************/
}
/*绘制内容列表*/
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
    // var fragDocument = document.createDocumentFragment();
    for (var i = pageNum * 15; i < N; i++) {
        /*var cloned=$('#content').clone(true);//true带着所有时间克隆
        console.log(cloned);
        $('.cont').append(cloned);*/
        if (fileEntity.filenames[i] != null || fileEntity.filenames[i] != undefined) { //不能改为！==
            var html = "<div id='content' class='content cont2'>" +
                "<img src='img/nr/" + (j + 1) + ".png' class='cont-img' alt=''/>" +
                "<p class='cont-title' id='cont-title'>" + fileEntity.filenames[i] + "</p>" +
                "<span class='cont-name'>" + fileEntity.names[i] + " </span> " +
                "<span class='cont-date'>" + fileEntity.dates[i] + "</span>" +
                "<span id='kcbz-data' class='kcbz-data'>" + fileEntity.kcbzDatas[i] + "</span>" +
                "<span id='ssnj-data' class='ssnj-data'>" + fileEntity.ssnjDatas[i] + "</span>" +
                "<span id='ssks-data' class='ssks-data'>" + fileEntity.ssksDatas[i] + "</span>" +
                "<span id='wjlx-data' class='wjlx-data'>" + fileEntity.wjlxDatas[i] + "</span>" +
                "<span id='bzxx-data' class='bzxx-data'>" + fileEntity.bzxx[i] + "</span>" +
                "<span id='fcomments' class='fcomments'>" + fileEntity.fcomments[i] + "</span>" +
                "<span id='fid' class='fid'>" + fileEntity.fid[i] + "</span>" +
                "<span id='commentsperson' class='commentsperson'>" + fileEntity.commentsperson[i] + "</span>" +
                "</div>";
            /*var html = "<div id='content' class='content cont2'>" +
                "<img src='img/nr/" + (j + 1) + ".png' class='cont-img' alt=''/>" +
                "<p class='cont-title' id='cont-title'>" + fileEntity.filenames[i] + "</p>" +
                "<span class='cont-name'>" + fileEntity.names[i] + " </span> " +
                "<span class='cont-date'>" + fileEntity.dates[i] + "</span>" +
                "</div>";*/
            j++;
            //console.log(html);
            $('.cont').append(html);
            // fragDocument.appendChild(html);
        }
        // $('.cont').append(fragDocument);
    }
}


