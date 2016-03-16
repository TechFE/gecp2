/*文件下载页，评论页
    by zry
    2016-3-1
*/
$(document).ready(function() {
    /**********************************************************************/
    /*文件详情和文件类型图标填充*/
    var fileDetialSource = {
        fileDetialName: function() {
            var downloadFileName = sessionStorage.getItem('fileName'),
                uldNameDetail = sessionStorage.getItem('uldName'),
                uldDateDetail = sessionStorage.getItem('uldDate'),
                kcbzDataDetail = sessionStorage.getItem('kcbz'),
                ssnjDataDetail = sessionStorage.getItem('ssnj'),
                ssksDataDetail = sessionStorage.getItem('ssks'),
                wjlxDataDetail = sessionStorage.getItem('wjlx'),
                bzxxDataDetail = sessionStorage.getItem('bzxx');
            console.log(downloadFileName);
            window.downloadFileName = downloadFileName;

            $('.file-detail-title').html(downloadFileName);
            $('.detial-uldname').html(uldNameDetail);
            $('.detial-ulddate').html(uldDateDetail);
            $('.detial-kcbz').html(kcbzDataDetail);
            $('.detial-ssnj').html(ssnjDataDetail);
            $('.detial-ssks').html(ssksDataDetail);
            $('.detial-wjlx').html(wjlxDataDetail);
            $('.detial-bzxx').html(bzxxDataDetail);
        },
        /**
         * [fileTypeImage 文件类型图片插图]
         * @param  {[string]} downloadFileName [下载文件的名]
         * 
         */
        fileTypeImage: function(downloadFileName) {
            var fileType = downloadFileName.slice(-3);
            switch (fileType) {
                case "png":
                case "jpg":
                case "gif":
                    $('.file-type-img-src').attr("src", "img/type/pic.png");
                    break;
                case ".7z":
                    $('.file-type-img-src').attr("src", "img/type/7z.png");
                    break;
                case "doc":
                case "ocx":
                    $('.file-type-img-src').attr("src", "img/type/docx.png");
                    break;
                case "xls":
                case "lsx":
                    $('.file-type-img-src').attr("src", "img/type/excel.png");
                    break;
                case "pdf":
                    $('.file-type-img-src').attr("src", "img/type/pdf.png");
                    break;
                case "ppt":
                case "ptx":
                    $('.file-type-img-src').attr("src", "img/type/PPT.png");
                    break;
                case "rar":
                    $('.file-type-img-src').attr("src", "img/type/rar.png");
                    break;
                case "mp3":
                    $('.file-type-img-src').attr("src", "img/type/MP3.png");
                    break;
                case "txt":
                    $('.file-type-img-src').attr("src", "img/type/txt.png");
                    break;
                case "mp4":
                case "mov":
                case "avi":
                case "mvb":
                case "3gp":
                    $('.file-type-img-src').attr("src", "img/type/VIDEO.png");
                    break;
                case "zip":
                    $('.file-type-img-src').attr("src", "img/type/zip.png");
            }
        }
    };


    /*评论实现*/
    var fComments = {
        _submit: function() {
            var commentsText = $('.assess-message').val();
            var fid = sessionStorage.getItem('fid');
            var comments = sessionStorage.getItem('fcomments');
            var allComments = (comments == 'null' ? '' : comments + '&*#&') + commentsText;
            console.log(allComments);
            var commentsPerson = getCookie('username');
            /*根据fid  写进数据库*/
            var Params = {
                'Fields': ['fid', 'fcomments', 'commentsperson'],
                'Data': [
                    [fid, allComments, commentsPerson]
                ]
            };
            var sqlServices = new gEcnu.WebSQLServices.SQLServices({
                'processCompleted': function() {
                    alert("评论成功！");
                    $('.assess-message').val('');
                    parent.location.href=parent.location.reload();
                    $('.ind-res').click();
                },
                'processFailed': function() {
                    console.log("fileDetial.js文件下数据库操作失败！");
                }
            });
            sqlServices.processAscyn("UPDATE", "gecp2", "uploadFile", Params);
        },
        commentsList: function(pageNum) {
            //所有评论
            var allFComments = sessionStorage.getItem('fcomments');
            var allFCommentsSplit = allFComments.split("&*#&"); //是个数组
            console.log(allFCommentsSplit);
            var commentsPerson = sessionStorage.getItem('commentsperson');
            if (commentsPerson == "null" || commentsPerson == "undefined" || commentsPerson === "") {
                commentsPerson = "匿名";
            }
            $('.comments-divs').html('');
            for (var i = pageNum * 5; i < (pageNum + 1) * 5; i++) {
                if (allFCommentsSplit[i] != null && allFCommentsSplit[i] != undefined && allFCommentsSplit[i] != "") {

                    var html = "<div class='one-comments'>" +
                        "<div class='cicle-img'></div>" +
                        "<div class='comments-person-content'>" +
                        "<div class='comments-person'>" + commentsPerson + "</div>" +
                        "<div class='comments-content'>" + allFCommentsSplit[i] + "</div>" +
                        "</div>" +
                        "</div>";
                    $('.comments-divs').append(html);
                } else {
                    $('.comments-divs').append("<br><br><br><br><p>没有更多评论了！</p>");
                    break;
                }

            }

        }


    };

    var _downloadFile = {
        /**
         * [downloadFileByURL 链接模拟下载]
         * @param  {[string]} fileName [文件名全称]
         * 
         */
        downloadFileByURL: function(fileName) {
            var a = document.getElementById('downloadFtsetBtn');
            var host = window.location.host; //"localhost:85"
            if (a == undefined) {
                a = document.createElement('a');
                a.id = 'downloadFtsetBtn';
                a.style.display = 'none';
                a.target = '_blank';
                document.body.appendChild(a);
            }
            try {
                a.href = 'http://' + host + '/gecp2/fileserver?fn=upload/' + fileName;
                a.download = fileName;
                /* if (typeof navigator.msSaveBlob == "function"){  //IE
                     navigator.msSaveBlob(blob, fileName);
                 }*/
                a.click();
                /*if(callback!=undefined){
                    callback();
                }*/
            } catch (e) {
                console.error(e);
            }
        },
        /**
         * [downloadFileByBinary 按照二进制下载]
         * @param  {[type]} fileName [文件名全称]
         * 
         */
        downloadFileByBinary: function(fileName) {
            var host = window.location.host; //"localhost:85"
            /*下载查看  FileServer API*/
            $.ajax({
                    url: 'http://' + host + '/gecp2/fileserver',
                    type: 'POST',
                    // data: 'req=getzip&fn=upload/'+fileName+'&fn2='+fileName+'.zip'
                    data: 'req=getfile&fn=upload/' + fileName,
                    success: function(content) {
                        var blob = new Blob([content], { "type": 'text' }); //HTML 5 API 下载的时候注意type类型
                        console.log(blob);
                        var a = document.getElementById('downloadFtsetBtn');
                        if (a == undefined) {
                            a = document.createElement('a');
                            a.id = 'downloadFtsetBtn';
                            a.style.display = 'none';
                            a.target = '_blank';
                            document.body.appendChild(a);
                        }
                        try {
                            var URL = window.URL || window.webkitURL;
                            window.objectURL = URL.createObjectURL(blob);
                            a.href = objectURL;
                            console.log(objectURL);
                            a.download = fileName;
                            if (typeof navigator.msSaveBlob == "function") { //IE
                                navigator.msSaveBlob(blob, fileName);
                            }
                            a.click();
                            /*if(callback!=undefined){
                                callback();
                            }*/
                        } catch (e) {
                            console.error(e);
                        }
                    }
                })
                .done(function() {
                    console.log("success");
                    URL.revokeObjectURL(window.objectURL);
                })
                .fail(function() {
                    console.log("error");
                })
                .always(function() {
                    console.log("complete");
                });
        }
    };




    /********************************************************************************/

    fileDetialSource.fileDetialName(); //读取session 并填到列表中
    fileDetialSource.fileTypeImage(window.downloadFileName); //资源类型图片

    /*下载资源*/
    $('.download-file-btn').hover(function() {
        $(this).css('cursor', 'pointer');
    }, function() {
        $(this).css('cursor', 'default');
    });
    $('.download-file-btn').on('click', function(event) {
        var fileType = downloadFileName.slice(-3);
        if (fileType == "txt" || fileType == "tml" || fileType == "css" || fileType == ".js") {
            _downloadFile.downloadFileByBinary(window.downloadFileName);
        } else {
            _downloadFile.downloadFileByURL(window.downloadFileName);
        }
    });
    // 点击进行评论
    $('.assess-submit').click(function(event) {
        fComments._submit();
    });

    /*分页实现*/
    $.jqPaginator('#pagination1', {
        totalPages: 100,
        visiblePages: 10,
        currentPage: 1,
        onPageChange: function(num, type) {
            // $('#p1').text(type + '：' + num);
            console.log(type + '：' + num);
            if (type == "init") {
                num = 1;
            }
            fComments.commentsList(num - 1);
        }
    });
    $('#pagination1').jqPaginator('option', {
        currentPage: 1,
        //pageSize:15,
        visiblePages: 7,
        first: '<li class="first"><a href="javascript:;">首页</a></li>',
        prev: '<li class="prev"><a href="javascript:;">上一页</a></li>',
        next: '<li class="next"><a href="javascript:;">下一页</a></li>',
        page: '<li class="page"><a href="javascript:;">{{page}}</a></li>',
        last: '<li class="last"><a href="javascript:;">末页</a></li>'
    });

});
