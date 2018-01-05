$(function() {
	var token;
	var tgc=$.cookie("CASTGC");
	var username=$.cookie("username");
	var loginObj = "";
	var uuid = "";
	var url1 = "http://api.hq88.com/v5/api/auth/getToken?username="+username+"&tgc="+tgc;
	// 获取用户信息
	function getuuid(){
		$.ajax({
		    type: "get",
			url:  url1,
		    contentType: "application/json; charset=utf-8",
		    dataType: "jsonp",
		    cache: "false",
		    jsonp: 'jsoncallback',
		    success: function (data) {
		        loginObj=$.parseJSON(data.loginBean);
		    }
		})
	}
	if(!!$.cookie("CASTGC")&&!!$.cookie("username")){
		getuuid();
	}
	$(".nav .btn").click(function(){
		if(!!$.cookie("CASTGC")&&!!$.cookie("username")){
			if(loginObj.companyUuid==="V5hq"){
			    window.location.href="http://www.hq88.com/lms5/member/courseBag/courseBag_toBuy?uuid=af94087e-8ad8-4f9f-946e-8a42117007ec"; 
			}else{
			    window.location.href="http://www.hq88.com/lms/member/ku/kuIndex"; 
			}
		}else{
			$("#myModal").modal("show");
		}
	})
	scrollTop_am();
  	function scrollTop_am(){
  		if($(window).scrollTop()>=3200){
			$(".course_nr dl").eq(0).addClass("on")
			$(".course_nr dl").eq(1).addClass("on");
			setTimeout(function(){
				$(".course_nr dl").eq(2).addClass("on");
				$(".course_nr dl").eq(3).addClass("on");
			}, 500)
			setTimeout(function(){
				$(".course_nr dl").eq(4).addClass("on");
				$(".course_nr dl").eq(5).addClass("on");
			}, 1000)
			setTimeout(function(){
				$(".course_nr dl").eq(6).addClass("on");
				$(".course_nr dl").eq(7).addClass("on");
			}, 1500)
		}
		if($(window).scrollTop()>=700&&$(window).scrollTop()<=1200){
			setTimeout(function(){
	  			$(".banner2 .center_l,.banner2 .center_r").addClass("on")
			}, 500)
	  	}
  	}
  	banner_am();
	function banner_am(){
		setTimeout(function(){
			$(".banner1 .img1").addClass("on");
		}, 500)
		setTimeout(function(){
			$(".banner1 .img2").addClass("on");
		}, 1000)
		setTimeout(function(){
			$(".banner1 .title").addClass("on");
		}, 1500)
	}
	$(window).scroll(function(){
	  	scrollTop_am();
	})
	// setInterval(function(){
	//   	scrollTop_am();
 //    },10);
})