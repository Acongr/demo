(function($){
    $.fn.extend({

        left_btn:function(){
            $(this).click(function(){
                var _box = $(this).parent().find(".box");
			    var _left = ~~_box.position().left;
			    var _list_w = _box.children().eq(0).width();
			    if(_left!==0&&_left%_list_w==0){
			      _box.animate({"left":_left+_list_w});
			    }  
            });    
        },
        right_btn:function(_ind_length){
            $(this).click(function(){
                var _box = $(this).parent().find(".box");
                var _left = ~~_box.position().left;
			    var _list_w = _box.children().eq(0).width()
			    var _length = ~~_box.children().length;
			    if(_left!==_ind_length*_list_w-_length*_list_w&&_left%_list_w==0){
			      _box.animate({"left":_left-_list_w});
			    }
            });    
        }
    });    
})(jQuery);
/*
 * 懒加载
 */
(function(){
	var scrollElement = document.querySelector('.page'),
    viewH = document.documentElement.clientHeight;
 
	function lazyload(){
	  var nodes = document.querySelectorAll('img[data-src]');
	 
	  Array.prototype.forEach.call(nodes,function(item,index){
	    var rect;
	    if(item.dataset.src==='') return;
	 
	    rect = item.getBoundingClientRect();
	 
	    if(rect.bottom>=0 && rect.top < viewH){
	        (function(item){
	          var img = new Image();
	          img.onload = function(){
	            item.src = img.src;
	          }
	          img.src = item.dataset.src
	          item.dataset.src = ''
	        })(item)
	    }
	  })
	}
	 
	lazyload();
	 
	scrollElement.addEventListener('scroll',throttle(lazyload,500,1000));
	 
	function throttle(fun, delay, time) {
	    var timeout,
	        startTime = new Date();
	    return function() {
	        var context = this,
	            args = arguments,
	            curTime = new Date();
	        clearTimeout(timeout);
	        if (curTime - startTime >= time) {
	            fun.apply(context, args);
	            startTime = curTime;
	        } else {
	            timeout = setTimeout(fun, delay);
	        }
	    };
	};

})
$(function(){
	var c1 = new Carousel();
	var d1 = new Drag();
	d1.init({    //配置参数
		id : 'div1'
	});
	$(".left_btn").left_btn();
	$(".right_btn").right_btn(7);
	// 定位讲师介绍分页
	sss();
	function sss(){
		if($("#div1").css("left")==="-1752px"){
			$("#div1").css("left","")
			setTimeout(function(){
	    		sss();
			}, 2000)
		}else{
			setTimeout(function(){
	    		$(".right_btn").click();
	    		sss();
			}, 2000)
		}
	}
	$(window).scroll(function(){
		console.log($(window).scrollTop())
		if($(window).scrollTop()>4100){
			$(".advantage_bg").addClass("on")
		}

	})
	$(".list_item>span").click(function(){
		var _id = $(this).attr("data-list");
		var _ind = $(this).index();
		c1.add_active($(this))
		$('.teacher_box').animate({scrollTop: _ind*235*3})
	})
	$('.teacher_box').scroll(function(){
		var _dscrollTop = $(this).scrollTop();
		var _yusu = _dscrollTop%(235*3);
		var _ind = Math.round(_dscrollTop/(235*3));
		c1.add_active($(".list_item span").eq(_ind))
	})
	$(".way .list li,.subscript span").click(function(){
		var _ind = $(this).index();
		c1.add_active($(".way .list li").eq(_ind))
		c1.add_active($(".center_img .imgbox img").eq(_ind))
		c1.add_active($(".subscript span").eq(_ind))
		c1.init(_ind);
	})
})
//组件开发 : 多组对象，像兄弟之间的关系( 代码复用的一种形式 )

function Carousel(){
	this.curIndex = 0;
	this.timeInterval = 3000;
	this.baseWidth = $(".center_img .imgbox img").width();
	this.aBtn = $(".subscript span");
	this.aLi = $(".center_img .imgbox img");
	this.oUl = $(".center_img .imgbox");
	this.time_ = null;
	this.init(0);
}
Carousel.prototype.init = function(ind){
	this.curIndex = ind;
	var This = this;
	clearInterval(This.time_)
	This.time_ = setInterval(function(argument){
		This.change()
	},This.timeInterval);
}
Carousel.prototype.change = function(){
	this.aBtn = $(".subscript span");
	if(this.curIndex == this.aBtn.length) {
 		this.curIndex =0;   
	} else {
 		this.move(this.curIndex);
 		this.curIndex += 1;
	}
}
Carousel.prototype.move = function(index){
	if(index>this.aLi.length-1) {
     	index = 0;
     	iNow = index;
    }
    if(index<0) {
     	index = this.aLi.length - 1;
     	iNow = index;
    }
	this.add_active(this.aLi.eq(index))
	this.add_active($(".way .list li").eq(index))
	this.add_active($(".center_img .imgbox img").eq(index))
	this.add_active($(".subscript span").eq(index))
    this.oUl[0].style.left = -index * this.baseWidth + "px";
}
Carousel.prototype.add_active = function(obj){
	obj.addClass("active").siblings().removeClass("active");
}


var leng_i = $(".box>.list").length;
var leng_w = $(".box>.list").width();
$(".box_>.box").css({"width": leng_i*leng_w});
function Drag(){
	this.obj = null;
	this.disX = 0;
	this.disY = 0;
	this.settings = {   //默认参数
	};
	
}
Drag.prototype.init = function(opt){
	var This = this;
	this.obj = document.getElementById(opt.id);
	extend( this.settings , opt );
	this.obj.onmousedown = function(ev){
		var ev = ev || window.event;
		This.fnDown(ev);
		
		fireEvent(This , 'toDown');
		
		document.onmousemove = function(ev){
			var ev = ev || window.event;
			This.fnMove(ev);
		};
		document.onmouseup = function(){
			This.fnUp();
			fireEvent(This , 'toUp');
			var _ld = This.obj.offsetLeft;
			var _l = This.obj.offsetLeft%leng_w;
			var _cs = 0;
			if(Math.abs(_l)>leng_w/2){
				 $("#div1").animate({"left":((_ld - _l)/146-1)*146});
			}else{
				 $("#div1").animate({"left":_ld - _l});

			}
		};
		return false;
	};
	
};

Drag.prototype.fnDown = function(ev){
	this.disX = ev.clientX - this.obj.offsetLeft;
};
Drag.prototype.fnMove = function(ev){
    if((ev.clientX - this.disX)<=0&&(ev.clientX - this.disX)>=-(leng_i-7)*leng_w){
		this.obj.style.left = ev.clientX - this.disX + 'px';
    }
};
Drag.prototype.fnUp = function(){
	document.onmousemove = null;
	document.onmouseup = null;
};


function fireEvent(obj,events){   //主动触发自定义事件
	if(obj.listeners && obj.listeners[events]){
		for(var i=0;i<obj.listeners[events].length;i++){
			 obj.listeners[events][i]();
		}
	}
}

function extend(obj1,obj2){
	for(var attr in obj2){
		obj1[attr] = obj2[attr];
	}
}