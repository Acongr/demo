(function($){
    $.fn.extend({
        left_btn:function(){
            $(this).click(function(){
            	// 获取内容父级
                var _box = $(this).parent().find(".box");
            	// 获取元素left值
			    var _left = ~~_box.position().left;
            	// 获取内容父级宽度
			    var _list_w = _box.children().eq(0).width();
            	// 判断是否静止，是否到最后一个
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

$(function(){
	var c1 = new Carousel();
	var d1 = new Drag();
	// 轮播拖拽
	// d1.init({id : 'div1'});
	// 上一个
	// $(".left_btn").left_btn();
	// 下一个
	// $(".right_btn").right_btn(7);

	// 友情链接轮播
	var setI = function(){
		
	}
	
	$("#div1").append($("#div1").html());
	var leng_i = $(".box>.list").length;
	var leng_w = $(".box>.list").width();
	$(".box_>.box").css({"width": leng_i*leng_w});
	var _timeI = null;
	var flag = true;
	var flag1 = true;
	var _index_in = 0;
	function setI_guanggao(){
		_timeI = setTimeout(function(){
			var _left = ~~$("#div1").position().left;
			if(_left>-~~$("#div1").width()/2){
				$("#div1").animate({"left":_left-146})
			}else{
				$("#div1").css({"left":0})
			}
			setI_guanggao();
		},2000)
	}
	// 定位讲师介绍分页
	$(".list_item>span").click(function(){
		var _ind = $(this).index();
		c1.add_active($(this))
		$('.teacher_box').animate({scrollTop: _ind*235*3})
	})

	// 讲师信息轮播展示
	var scrollTime = null;
	function scroll_t(){
		scrollTime = setTimeout(function(){
			var _ind = $(".list_item>.active").index();
			if(_ind=== $(".list_item>span").length-1){
				c1.add_active($(".list_item>span").eq(0))
				$('.teacher_box').animate({scrollTop: 0})
			}else{
				c1.add_active($(".list_item>span").eq(_ind+1))
				$('.teacher_box').animate({scrollTop: ~~(_ind+1)*235*3})
			}
			scroll_t();
		},4000)
	}
	scroll_t();

	$('.teacher_box,.list_item').hover(function(){
		clearTimeout(scrollTime);
	},function(){
		scroll_t();
	})
	$('.imgbox,.subscript,.list clearfix').hover(function(){
		clearInterval(c1.time_)
		_index_in = ~~$(".imgbox .active").index();
	},function(){
		c1.init(_index_in);
	})

	// 滚动到一定位置显示页码
	// $('.teacher_box').scroll(function(){
	// 	var _dscrollTop = $(this).scrollTop();
	// 	var _yusu = _dscrollTop%(235*3);
	// 	var _ind = Math.round(_dscrollTop/(235*3));
	// 	c1.add_active($(".list_item span").eq(_ind))
	// })

	// 讲师信息页码选择
	$(".way .list li,.subscript span").click(function(){
		var _ind = $(this).index();
		c1.add_active($(".way .list li").eq(_ind))
		c1.add_active($(".center_img .imgbox img").eq(_ind))
		c1.add_active($(".subscript span").eq(_ind))
		c1.init(_ind);
	})

				setI_guanggao()
	// 判断浏览器滚动位置，从而判断开始执行轮播
	$(document).scroll(function(){
		var _sTop = $(this).scrollTop();
			console.log(_sTop)
		if(_sTop>1500){
			console.log(1)
			clearInterval(c1.time_)
			if(!flag1){
				_index_in = ~~$(".imgbox .active").index();
			}
			flag1 = true;
		}else{
			if(flag1){
				c1.init(_index_in);
				flag1 = false;
			}
			
		}
		if(_sTop<4500){
			clearTimeout(_timeI)
			flag = true;
		}else{
			if(flag){
				setI_guanggao()
				flag = false;
			}
		}
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
		This.change();
	},This.timeInterval);
}
Carousel.prototype.change = function(){
	this.aBtn = $(".subscript span");
	if(this.curIndex === this.aBtn.length) {
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