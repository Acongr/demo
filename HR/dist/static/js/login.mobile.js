function loginMobile(){document.getElementById("loginModal").style.display="block"}function myModal(){$("#myModal").modal("show")}function loginClose(){document.getElementById("loginModal").style.display="none"}function setCookie(e,o){var n=new Date;n.setTime(n.getTime()+36e5),document.cookie=e+"="+escape(o)+";expires="+n.toGMTString()}function setCookieNoExpire(e,o){document.cookie=e+"="+escape(o)}function getCookie(e){var o,n=new RegExp("(^| )"+e+"=([^;]*)(;|$)");return(o=document.cookie.match(n))?o[2]:null}function savePwd(){setCookie("rmbUsername",$("#username").val()),$("#rememberPwd").attr("checked")&&setCookie("rmbPwd",$("#password").val())}function checkLogin(){var u=$("#username").val(),p=$("#password").val();""!=u&&""!=p&&null!=u&&null!=p?$.getJSON("http://www.hq88.com/common/login_checkLogin?jsoncallback=?",{u:u,p:p},function(data){var json=eval(data);"1000"==json.result?($("#foo2").css("display","block"),savePwd(),location.href="http://sso.hq88.com/userLogin?username="+u+"&password="+p+"&service="+winHref+"&renew=true",loginClose()):null!=json.message&&($("#loginMessage").text(json.message).show(),clearTimeout(clear_myModal_show),$(".modal-backdrop").css("display","none"),clear_myModal_show=setTimeout(function(){$("#myModal").modal("show")},500))}):(clearTimeout(clear_myModal_show),$(".modal-backdrop").css("display","none"),clear_myModal_show=setTimeout(function(){$("#myModal").modal("show")},500),$("#loginMessage").text("帐号密码不能为空！").show())}function loginAuthorize(e){location.href="http://qy.hq88.com/login/bindPlat/bind_"+e+"Authorize?service="+winHref}var winHref=window.location.href,winHrefIndex=winHref.indexOf("?ticket=");winHrefIndex>0&&(winHref=winHref.substring(0,winHrefIndex));var clear_myModal_show="";$(".remindp").click(function(){$(this).hide().prev().focus()}),$("#username,#password").focus(function(){$(this).next().hide()});