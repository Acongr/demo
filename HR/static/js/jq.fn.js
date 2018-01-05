var $fntime = true;
;(function($){
	$.fn.textSlider = function(settings){    
            settings = jQuery.extend({
                speed : "normal",
                line : 2,
                timer : 3000
            }, settings);
            return this.each(function() {
                $.fn.textSlider.scllor( $( this ), settings );
            });
        };
	$.fn.textSlider.scllor = function($this, settings){
            var ul = $("ul:eq(0)",$this );
            var timerID;
            var li = ul.children();
            var liHight=$(li[0]).height();
            var upHeight=0-settings.line*liHight;//滚动的高度；
            var scrollUp=function(){
                ul.animate({marginTop:upHeight},settings.speed,function(){
                    for(i=0;i<settings.line;i++){
                        ul.find("li:first",$this).appendTo(ul);
                    }
                    ul.css({marginTop:0});
                });
            };
            var autoPlay=function(){
                timerID = window.setInterval(scrollUp,settings.timer);
            };
            var autoStop = function(){
                window.clearInterval(timerID);
            };
            //事件绑定
            ul.hover(autoStop,autoPlay).mouseout();
	};
	$.fn.textScroll=function(){
		var speed=60,flag=null,tt,that=$(this),child=that.children();
		var p_w=that.width(), w=child.width();
		child.css({left:p_w});
		var t=(w-p_w)/speed * 1000;
		function play(m){
			var tm= m==undefined ? t : m;
            child.animate({left:-w},tm,"linear",function(){
				$(this).css("left",p_w);
				play();
			});
		}
		// child.on({
		// 	mouseenter:function(){
		// 		var l=$(this).position().left;
		// 		$(this).stop();
		// 		tt=(-(-w-l)/speed)*1000;
		// 	},
		// 	mouseleave:function(){
		// 		play(tt);
		// 		tt=undefined;
		// 	}
		// });
		play();
	}
    /*// 弹窗动画以及背景
    $.fn.modall = function(modal){
        var time = '';
        if(modal==="hide"){
          var $this = this;
          this.removeClass("in").addClass("hide").hide()
          $(".modal-backdrop").addClass("hide").removeClass("in").remove();
        }else if(modal==="show"){
            clearTimeout(time);
          var $this = this;
            this.show().removeClass("hide");
            time = setTimeout(function(){
                $this.addClass("in");
            },50)
          
          $("body").append('<div class="modal-backdrop fade hide" style="display: none;z-index: 50"></div>');
          $(".modal-backdrop").show().addClass("in").removeClass("hide");
        }
        return this;
    };
    $.fn.modal = function(modal){
        if(modal==="hide"){
            if($fntime){
                $fntime = false;
                var $this = this;
                this.removeClass("in")
                $(".modal-backdrop").addClass("hide").removeClass("in");
                time = setTimeout(function(){
                    $this.addClass("hide");
                },200)
                setTimeout(function(){
                    $this.hide();
                    $(".modal-backdrop").remove()
                    $fntime = true;
                },400)
            }
            
        }else if(modal==="show"){
            if($fntime){
                var $this = this;
                this.show().removeClass("hide");
                setTimeout(function(){
                    $this.addClass("in");
                    $fntime = true;
                },50)
                $("body").append('<div class="modal-backdrop fade hide" style="display: none;z-index: 50"></div>');
                $(".modal-backdrop").show().addClass("in").removeClass("hide");
            }
        }
        return this;
    };
    // 特殊显示弹窗事件
    $.fn.modal1 = function(modal){   
        if(modal==="hide"){
          this.addClass("hide").removeClass("in").animate({"opacity": 0},function(){$(this).hide().css("opacity","")});
          $(".cove1").addClass("hide").removeClass("in").animate({"opacity": 0},function(){$(this).hide().css("opacity","")});
        }else if(modal==="show"){
          this.show().addClass("in").removeClass("hide").animate({"opacity": 1},1000);
          $("body").append('<div class="cove1 in"></div>');
          $(".cove1").show().addClass("in").removeClass("hide").animate({"opacity": .5},1000);
        }
        return this;
    };*/
})(jQuery);



// 判断是否为ie9 以下
function iewhat(){
    var browser=navigator.appName 
    var b_version=navigator.appVersion 
    var version=b_version.split(";"); 
    var stt = version[1]||'';
    var trim_Version=stt.replace(/[ ]/g,""); 
    if((browser=="Microsoft Internet Explorer" && trim_Version=="MSIE6.0")||(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE7.0")||(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE8.0"))
    { 
        return true;
    }else{
        return false;
    }
}
var alert_time = '';
//弹出信息提示
function alert(infoContent){
    if($("#infoDiv_b").length==0){
        var html = "<div id=\"infoDiv_b\" class=\"modal plan-modal hide fade\">"+
                    "<div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>"+
                    "<h3>操作提示</h3></div><div class=\"modal-body\"><div class=\"tip-success\">"+infoContent+"</div></div></div>";
        $(html).appendTo("body");
        $("#infoDiv_b").modal('show');
        clearTimeout(alert_time);
        alert_time = setTimeout("$('#infoDiv_b').modal('hide').remove()",2000);
        $("#infoDiv_b .close").click(function(){
            $('#infoDiv_b').modal('hide').remove();
        })
    }
}

// 传入时间参数返回距离现在的时间
function time_new(time){
    time = time.replace(new RegExp("-","gm"),"/");
   var d = (new Date(time)).getTime()
   var t = new Date().getTime();
   if(time == null){
    t == 0;
    d == 0;
    var s = "null";
    return s;
   }
   var s = ~~((t-d)/1000/60);
   if(s==0){
        s= "刚刚";
   }else if(s>0&&s<60){
        s = s+"分钟前";
   }else if(s>=60&&s<1440){
        s= ~~(s/60)+"小时前";
   }else if(s>=1440&&s<43200){
        s= ~~(s/60/24)+"天前";
   }else if(s>=43200){
   //   s= ~~(s/60/24/30)+"个月前";
   // }else if(s>=518400){
        d = new Date(d)
        var vYear = d.getFullYear()+"-";
        var vMon = d.getMonth() + 1+"-";
        var vDay = d.getDate()+" ";
        var h = d.getHours(); 
        var m = d.getMinutes();
        var se = d.getSeconds();
        if( new Date().getFullYear()+"-" == vYear){
            s= vMon + vDay;
        }else{
            s= vYear + vMon + vDay;
        }
   }
    return s;
}
// 判断是否为空或者是否全是空格
function isNull( str ){
    if ( str == "" ) return true;
    var regu = "^[ ]+$";
    var re = new RegExp(regu);
    return re.test(str);
}
// 判断电话号码
function IsTel(Tel){
    var re=new RegExp(/^((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$/);
    var retu=Tel.match(re);
    if(retu){
        return true;
    }else{
        return false;
    }
}
var navigation = function(){
    var w = $(window).width();
    if(w<1150){
        $(".navigation").css({"right": 0});
    }else if(w>1150){
        $(".navigation").css({"right": (w-1030)/2-110});
    }
}


//by函数接受一个成员名字符串做为参数
//并返回一个可以用来对包含该成员的对象数组进行排序的比较函数
var by = function(name,flag){
 return function(o, p){
   var a, b;
   if (typeof o === "object" && typeof p === "object" && o && p) {
     a = o[name];
     b = p[name];
     if (a === b) {
       return 0;
     }
     if (typeof a === typeof b) {
        if(flag){
           return a < b ? -1 : 1;
        }else{
           return a < b ? 1 : -1;
        }
     }
        if(flag){
            return typeof a < typeof b ? -1 : 1;
        }else{
            return typeof a < typeof b ? 1 : -1;
        }
   }
   else {
     throw ("error");
   }
 }
}

//采用正则表达式获取地址栏参数
function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
//保留两位小数  
//功能：将浮点数四舍五入，取小数点后2位 
function toDecimal(x) { 
  var f = parseFloat(x); 
  if (isNaN(f)) { 
    return; 
  } 
  f = Math.round(x*100)/100; 
  return f; 
} 


!function(t,e,i){var o=["webkit","Moz","ms","O"],r={},n;function a(t,i){var o=e.createElement(t||"div"),r;for(r in i)o[r]=i[r];return o}function s(t){for(var e=1,i=arguments.length;e<i;e++)t.appendChild(arguments[e]);return t}var f=function(){var t=a("style",{type:"text/css"});s(e.getElementsByTagName("head")[0],t);return t.sheet||t.styleSheet}();function l(t,e,i,o){var a=["opacity",e,~~(t*100),i,o].join("-"),s=.01+i/o*100,l=Math.max(1-(1-t)/e*(100-s),t),p=n.substring(0,n.indexOf("Animation")).toLowerCase(),u=p&&"-"+p+"-"||"";if(!r[a]){f.insertRule("@"+u+"keyframes "+a+"{"+"0%{opacity:"+l+"}"+s+"%{opacity:"+t+"}"+(s+.01)+"%{opacity:1}"+(s+e)%100+"%{opacity:"+t+"}"+"100%{opacity:"+l+"}"+"}",f.cssRules.length);r[a]=1}return a}function p(t,e){var r=t.style,n,a;if(r[e]!==i)return e;e=e.charAt(0).toUpperCase()+e.slice(1);for(a=0;a<o.length;a++){n=o[a]+e;if(r[n]!==i)return n}}function u(t,e){for(var i in e)t.style[p(t,i)||i]=e[i];return t}function c(t){for(var e=1;e<arguments.length;e++){var o=arguments[e];for(var r in o)if(t[r]===i)t[r]=o[r]}return t}function d(t){var e={x:t.offsetLeft,y:t.offsetTop};while(t=t.offsetParent)e.x+=t.offsetLeft,e.y+=t.offsetTop;return e}var h={lines:12,length:7,width:5,radius:10,rotate:0,corners:1,color:"#000",speed:1,trail:100,opacity:1/4,fps:20,zIndex:2e9,className:"spinner",top:"auto",left:"auto",position:"relative"};function m(t){if(!this.spin)return new m(t);this.opts=c(t||{},m.defaults,h)}m.defaults={};c(m.prototype,{spin:function(t){this.stop();var e=this,i=e.opts,o=e.el=u(a(0,{className:i.className}),{position:i.position,width:0,zIndex:i.zIndex}),r=i.radius+i.length+i.width,s,f;if(t){t.insertBefore(o,t.firstChild||null);f=d(t);s=d(o);u(o,{left:(i.left=="auto"?f.x-s.x+(t.offsetWidth>>1):parseInt(i.left,10)+r)+"px",top:(i.top=="auto"?f.y-s.y+(t.offsetHeight>>1):parseInt(i.top,10)+r)+"px"})}o.setAttribute("aria-role","progressbar");e.lines(o,e.opts);if(!n){var l=0,p=i.fps,c=p/i.speed,h=(1-i.opacity)/(c*i.trail/100),m=c/i.lines;(function y(){l++;for(var t=i.lines;t;t--){var r=Math.max(1-(l+t*m)%c*h,i.opacity);e.opacity(o,i.lines-t,r,i)}e.timeout=e.el&&setTimeout(y,~~(1e3/p))})()}return e},stop:function(){var t=this.el;if(t){clearTimeout(this.timeout);if(t.parentNode)t.parentNode.removeChild(t);this.el=i}return this},lines:function(t,e){var i=0,o;function r(t,o){return u(a(),{position:"absolute",width:e.length+e.width+"px",height:e.width+"px",background:t,boxShadow:o,transformOrigin:"left",transform:"rotate("+~~(360/e.lines*i+e.rotate)+"deg) translate("+e.radius+"px"+",0)",borderRadius:(e.corners*e.width>>1)+"px"})}for(;i<e.lines;i++){o=u(a(),{position:"absolute",top:1+~(e.width/2)+"px",transform:e.hwaccel?"translate3d(0,0,0)":"",opacity:e.opacity,animation:n&&l(e.opacity,e.trail,i,e.lines)+" "+1/e.speed+"s linear infinite"});if(e.shadow)s(o,u(r("#000","0 0 4px "+"#000"),{top:2+"px"}));s(t,s(o,r(e.color,"0 0 1px rgba(0,0,0,.1)")))}return t},opacity:function(t,e,i){if(e<t.childNodes.length)t.childNodes[e].style.opacity=i}});(function(){function t(t,e){return a("<"+t+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',e)}var e=u(a("group"),{behavior:"url(#default#VML)"});if(!p(e,"transform")&&e.adj){f.addRule(".spin-vml","behavior:url(#default#VML)");m.prototype.lines=function(e,i){var o=i.length+i.width,r=2*o;function n(){return u(t("group",{coordsize:r+" "+r,coordorigin:-o+" "+-o}),{width:r,height:r})}var a=-(i.width+i.length)*2+"px",f=u(n(),{position:"absolute",top:a,left:a}),l;function p(e,r,a){s(f,s(u(n(),{rotation:360/i.lines*e+"deg",left:~~r}),s(u(t("roundrect",{arcsize:i.corners}),{width:o,height:i.width,left:i.radius,top:-i.width>>1,filter:a}),t("fill",{color:i.color,opacity:i.opacity}),t("stroke",{opacity:0}))))}if(i.shadow)for(l=1;l<=i.lines;l++)p(l,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(l=1;l<=i.lines;l++)p(l);return s(e,f)};m.prototype.opacity=function(t,e,i,o){var r=t.firstChild;o=o.shadow&&o.lines||0;if(r&&e+o<r.childNodes.length){r=r.childNodes[e+o];r=r&&r.firstChild;r=r&&r.firstChild;if(r)r.opacity=i}}}else n=p(e,"animation")})();if(typeof define=="function"&&define.amd)define(function(){return m});else t.Spinner=m}(window,document);
var opts = {
    lines: 9, // The number of lines to draw
    length: 0, // The length of each line
    width: 10, // The line thickness
    radius: 15, // The radius of the inner circle
    corners: 1, // Corner roundness (0..1)
    rotate: 0, // The rotation offset
    color: '#000', // #rgb or #rrggbb
    speed: 1, // Rounds per second
    trail: 60, // Afterglow percentage
    shadow: false, // Whether to render a shadow
    hwaccel: false, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    top: 'auto', // Top position relative to parent in px
    left: 'auto' // Left position relative to parent in px
};
var target = document.getElementById('foo');
var spinne = new Spinner(opts).spin(target);
var target1 = document.getElementById('foo1');
var spinne = new Spinner(opts).spin(target1);



/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2006, 2014 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD (Register as an anonymous module)
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    var pluses = /\+/g;
    function encode(s) {
        return config.raw ? s : encodeURIComponent(s);
    }
    function decode(s) {
        return config.raw ? s : decodeURIComponent(s);
    }
    function stringifyCookieValue(value) {
        return encode(config.json ? JSON.stringify(value) : String(value));
    }
    function parseCookieValue(s) {
        if (s.indexOf('"') === 0) {
            // This is a quoted cookie as according to RFC2068, unescape...
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }
        try {
            // Replace server-side written pluses with spaces.
            // If we can't decode the cookie, ignore it, it's unusable.
            // If we can't parse the cookie, ignore it, it's unusable.
            s = decodeURIComponent(s.replace(pluses, ' '));
            return config.json ? JSON.parse(s) : s;
        } catch(e) {}
    }
    function read(s, converter) {
        var value = config.raw ? s : parseCookieValue(s);
        return $.isFunction(converter) ? converter(value) : value;
    }
    var config = $.cookie = function (key, value, options) {
        // Write
        if (arguments.length > 1 && !$.isFunction(value)) {
            options = $.extend({}, config.defaults, options);

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setMilliseconds(t.getMilliseconds() + days * 864e+5);
            }
            return (document.cookie = [
                encode(key), '=', stringifyCookieValue(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }
        // Read
        var result = key ? undefined : {},
            // To prevent the for loop in the first place assign an empty array
            // in case there are no cookies at all. Also prevents odd result when
            // calling $.cookie().
            cookies = document.cookie ? document.cookie.split('; ') : [],
            i = 0,
            l = cookies.length;

        for (; i < l; i++) {
            var parts = cookies[i].split('='),
                name = decode(parts.shift()),
                cookie = parts.join('=');

            if (key === name) {
                // If second argument (value) is a function it's a converter...
                result = read(cookie, value);
                break;
            }
            // Prevent storing a cookie that we couldn't decode.
            if (!key && (cookie = read(cookie)) !== undefined) {
                result[name] = cookie;
            }
        }
        return result;
    };
    config.defaults = {};
    $.removeCookie = function (key, options) {
        // Must not alter options, thus extending a fresh object...
        $.cookie(key, '', $.extend({}, options, { expires: -1 }));
        return !$.cookie(key);
    };

}));
/* =========================================================
 * bootstrap-modal.js v2.3.2
 * http://getbootstrap.com/2.3.2/javascript.html#modals
 * =========================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */


!function ($) {

  "use strict"; // jshint ;_;


 /* MODAL CLASS DEFINITION
  * ====================== */

  var Modal = function (element, options) {
    this.options = options
    this.$element = $(element)
      .delegate('[data-dismiss="modal"]', 'click.dismiss.modal', $.proxy(this.hide, this))
    this.options.remote && this.$element.find('.modal-body').load(this.options.remote)
  }

  Modal.prototype = {

      constructor: Modal

    , toggle: function () {
        return this[!this.isShown ? 'show' : 'hide']()
      }

    , show: function () {
        var that = this
          , e = $.Event('show')

        this.$element.trigger(e)

        if (this.isShown || e.isDefaultPrevented()) return

        this.isShown = true

        this.escape()

        this.backdrop(function () {
          var transition = $.support.transition && that.$element.hasClass('fade')

          if (!that.$element.parent().length) {
            that.$element.appendTo(document.body) //don't move modals dom position
          }

          that.$element.show()

          if (transition) {
            that.$element[0].offsetWidth // force reflow
          }

          that.$element
            .addClass('in')
            .attr('aria-hidden', false)

          that.enforceFocus()

          transition ?
            that.$element.one($.support.transition.end, function () { that.$element.focus().trigger('shown') }) :
            that.$element.focus().trigger('shown')

        })
      }

    , hide: function (e) {
        e && e.preventDefault()

        var that = this

        e = $.Event('hide')

        this.$element.trigger(e)

        if (!this.isShown || e.isDefaultPrevented()) return

        this.isShown = false

        this.escape()

        $(document).off('focusin.modal')

        this.$element
          .removeClass('in')
          .attr('aria-hidden', true)

        $.support.transition && this.$element.hasClass('fade') ?
          this.hideWithTransition() :
          this.hideModal()
      }

    , enforceFocus: function () {
        var that = this
        $(document).on('focusin.modal', function (e) {
          if (that.$element[0] !== e.target && !that.$element.has(e.target).length) {
            that.$element.focus()
          }
        })
      }

    , escape: function () {
        var that = this
        if (this.isShown && this.options.keyboard) {
          this.$element.on('keyup.dismiss.modal', function ( e ) {
            e.which == 27 && that.hide()
          })
        } else if (!this.isShown) {
          this.$element.off('keyup.dismiss.modal')
        }
      }

    , hideWithTransition: function () {
        var that = this
          , timeout = setTimeout(function () {
              that.$element.off($.support.transition.end)
              that.hideModal()
            }, 500)

        this.$element.one($.support.transition.end, function () {
          clearTimeout(timeout)
          that.hideModal()
        })
      }

    , hideModal: function () {
        var that = this
        this.$element.hide()
        this.backdrop(function () {
          that.removeBackdrop()
          that.$element.trigger('hidden')
        })
      }

    , removeBackdrop: function () {
        this.$backdrop && this.$backdrop.remove()
        this.$backdrop = null
      }

    , backdrop: function (callback) {
        var that = this
          , animate = this.$element.hasClass('fade') ? 'fade' : ''

        if (this.isShown && this.options.backdrop) {
          var doAnimate = $.support.transition && animate

          this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
            .appendTo(document.body)

          this.$backdrop.click(
            this.options.backdrop == 'static' ?
              $.proxy(this.$element[0].focus, this.$element[0])
            : $.proxy(this.hide, this)
          )

          if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

          this.$backdrop.addClass('in')

          if (!callback) return

          doAnimate ?
            this.$backdrop.one($.support.transition.end, callback) :
            callback()

        } else if (!this.isShown && this.$backdrop) {
          this.$backdrop.removeClass('in')

          $.support.transition && this.$element.hasClass('fade')?
            this.$backdrop.one($.support.transition.end, callback) :
            callback()

        } else if (callback) {
          callback()
        }
      }
  }


 /* MODAL PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.modal

  $.fn.modal = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('modal')
        , options = $.extend({}, $.fn.modal.defaults, $this.data(), typeof option == 'object' && option)
      if (!data) $this.data('modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option]()
      else if (options.show) data.show()
    })
  }

  $.fn.modal.defaults = {
      backdrop: true
    , keyboard: true
    , show: true
  }

  $.fn.modal.Constructor = Modal


 /* MODAL NO CONFLICT
  * ================= */

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


 /* MODAL DATA-API
  * ============== */

  $(document).on('click.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this = $(this)
      , href = $this.attr('href')
      , $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
      , option = $target.data('modal') ? 'toggle' : $.extend({ remote:!/#/.test(href) && href }, $target.data(), $this.data())

    e.preventDefault()

    $target
      .modal(option)
      .one('hide', function () {
        $this.focus()
      })
  })

}(window.jQuery);