var winHref = window.location.href;
var winHrefIndex = winHref.indexOf("?ticket=");
if(winHrefIndex>0){winHref=winHref.substring(0,winHrefIndex);}
  
function loginMobile(){
  var loginModal = document.getElementById('loginModal');
  loginModal.style.display = 'block';
}
function myModal(){
  $('#myModal').modal('show');
}

function loginClose(){
  var loginModal = document.getElementById('loginModal');
  loginModal.style.display = 'none';
}

//
function setCookie(name,value)
{
    var exp = new Date();
    exp.setTime(exp.getTime() + 1*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

function setCookieNoExpire(name,value)
{
    document.cookie = name + "="+ escape (value);
}

function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return (arr[2]);
    else
        return null;
}

// 记住帐号密码
function savePwd(){
  setCookie("rmbUsername",$("#username").val());
  if($("#rememberPwd").attr("checked")){
    setCookie("rmbPwd",$("#password").val());
  }
}
//检测登录信息
var clear_myModal_show = "";
function checkLogin(){
  var u = $("#username").val();
  var p = $("#password").val();
  if(u!=""&&p!=""&&u!=null&&p!=null){
      $.getJSON("http://www.hq88.com/common/login_checkLogin?jsoncallback=?", {'u':u,'p':p},
      function(data){
      var json=eval(data);
      if(json['result']=="1000"){
        $("#foo2").css("display","block");
        savePwd();
        location.href="http://sso.hq88.com/userLogin?username="+u+"&password="+p+"&service="+winHref+"&renew=true";
        loginClose();
      }else if(json['message']!=null){
        $("#loginMessage").text(json['message']).show();
        clearTimeout(clear_myModal_show);
        $(".modal-backdrop").css("display","none");
        clear_myModal_show = setTimeout(function(){
          $('#myModal').modal('show');
        },500)
      }
    });
  }else{
        clearTimeout(clear_myModal_show);
        $(".modal-backdrop").css("display","none");
    clear_myModal_show = setTimeout(function(){
          $('#myModal').modal('show');
        },500)
    $("#loginMessage").text("帐号密码不能为空！").show();
  }
}

// qq sina授权登录
function loginAuthorize(type){
  location.href="http://qy.hq88.com/login/bindPlat/bind_"+type+"Authorize?service="+winHref;
}

$(".remindp").click(function(){
  $(this).hide().prev().focus();
})
$("#username,#password").focus(function(){
  $(this).next().hide();
})
