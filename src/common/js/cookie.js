/*
*zry
*2015-11-22
*cookie的处理逻辑
*/
/*设置cookie*/
function setCookie(c_name,value,expiredays){
	var exdate=new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	document.cookie=c_name+"="+escape(value)+((expiredays==null)?"" : ";expires="+exdate.toGMTString());
}

/*得到cookie*/

function getCookie(c_name){
  c_start=document.cookie.indexOf(c_name + "=");
  if (c_start!=-1){ 
	    c_start=c_start + c_name.length+1 ;
	    c_end=document.cookie.indexOf(";",c_start);
	    if (c_end==-1) c_end=document.cookie.length;
	    return unescape(document.cookie.substring(c_start,c_end));
  } 
  
	return "";
}

/*function checkCookie(c_name){
username=getCookie('c_name')
if (username!=null && username!="")
  {
  	return('Welcome again '+username+'!');
  }
}*/
