$(function(){
	var winHei = $(window).height();//屏幕可视高度
	var winWei = $(window).width();//屏幕可视宽度
	var cleartimeout_c,cleartimeout_d;
	jQuery.fn.extend({
		//关键词、字  高亮处理
		highlight:function(option){
			this.each(function(){
				//words 高亮词 ；effectbox  作用区域
				var args = {
					effectbox:"body",
					cstyle:"cbhclass"
				}
				$("head").append("<style>.cbhclass{color:#f00}</style>")
				$.extend(args,option);
				var words  = Verification(args.words);
				var cstyle = Verification(args.cstyle);
				for (var i=0; i<words.length; i++) {
					var contents = $(args.effectbox).html(); 
					var values = contents.split(words[i]);
					var cbstyle = (i>=cstyle.length)?cstyle[0]:cstyle[i];
					$(args.effectbox).html(values.join("<span  class='"+cbstyle+"'>" + words[i] + "</span>"));
				}
			})
			return this;
		},
		//提示
		prompt:function(option){
			this.each(function(){
				clearTimeout(cleartimeout_c);
				clearTimeout(cleartimeout_d);
				$(".cb_prompt_show").remove();
				if(typeof option  != "object"){
					option = {
						msg:option
					}
				}
				//默认参数设置
				var args = {
					showtime:"2500",//多少毫秒小时
					enter:"animated bounceInLeft",//进入动画
					out:"animated rollOut",//消失动画
					place:"0",        
					zindex:"999",
					cbstyle:"cb_prompt",
					animateTime:'1000',
					msg:"六月初之提示插件"
				};
				$.extend(args,option);
				var html = "<span class='"+args.cbstyle+" cb_prompt_show' style='position:fixed;z-index:"+args.zindex+"'>"+args.msg+"</span>";
				$("body").append(html);
				$(".cb_prompt_show").addClass(args.enter);
				var l = Math.floor((winWei-$(".cb_prompt_show").outerWidth())/2);
				var b = Math.floor((winHei-$(".cb_prompt_show").outerHeight())/2);
				switch (parseInt(args.place)){
					case 0://0  垂直水平居中
						$(".cb_prompt_show").css({left:l,bottom:b});
						break;
					case 1://1紧贴顶部水平居中
						$(".cb_prompt_show").css({left:l,top:"5%"});
						break;
					case 2://2紧贴底部水平居中
						$(".cb_prompt_show").css({left:l,bottom:"5%"});
						break;
					case 3://3紧贴左边垂直居中
						$(".cb_prompt_show").css({left:"5%",bottom:b});
						break;
					case 4://4 紧贴右边垂直居中
						$(".cb_prompt_show").css({right:"5%",bottom:b});
						break;
					case 5://5左上角
						$(".cb_prompt_show").css({left:"5%",top:"5%"});
						break;
					case 6://6右上角
						$(".cb_prompt_show").css({right:"5%",top:"5%"});
						break;
					case 7://7左下角
						$(".cb_prompt_show").css({left:"5%",bottom:"5%"});
						break;
					default://右下角
						$(".cb_prompt_show").css({right:"5%",bottom:"5%"});
						break;
				}
				cleartimeout_c = setTimeout(function(){
					$(".cb_prompt_show").removeClass(args.enter);
					$(".cb_prompt_show").addClass(args.out);
				},parseInt(args.showtime));
				cleartimeout_d = setTimeout(function(){
					$(".cb_prompt_show").remove();
				},parseInt(args.showtime)+parseInt(args.animateTime))
			})
		},
		tips:function(option){
			this.each(function(){
				var args = {
					direction:"top",
					distance:100,
					action:"show"
				}
				$.extend(args,option);
				// 滚动条距离顶部的距离 大于 200px时
				if($(window).scrollTop() >= args.distance){
					$(".scroll_top").fadeIn(1000); // 开始淡入
				} else{
					$(".scroll_top").stop(true,true).fadeOut(1000); // 如果小于等于 200 淡出
				}
			})
			return this;
		},
		//滚动视差
		scrolls:function(option){
			this.each(function(){
				var _this = $(this);
				var args = {
					height:100,
					enter:"animated bounceInDown",//进入动画
					out:"animated rotateOutDownLeft",//出去动画
					loop:0,//执行次数  0  单次  1循环
				}
				$.extend(args,option);
				window.addEventListener("scroll",function(e){
					var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
					if(_this.offset().top <= scrollTop+winHei) {
						_this.removeClass(args.out);
						_this.addClass(args.enter);
						_this.css("opacity","1")
					}else if(_this.offset().top >= scrollTop+winHei-100){
						_this.removeClass(args.enter);
						_this.addClass(args.out);
						_this.css("opacity","0")
					}
				});
			})
			return this;
		},
		//距离顶部显示隐藏
		scroll:function(option){
			this.each(function(){
				var args = {
					direction:"top",
					distance:100,
					action:"show"
				}
				$.extend(args,option);
				$(window).scroll(function(){
					// 滚动条距离顶部的距离 大于 200px时
					if($(window).scrollTop() >= args.distance){
						$(".scroll_top").fadeIn(1000); // 开始淡入
					} else{
						$(".scroll_top").stop(true,true).fadeOut(1000); // 如果小于等于 200 淡出
					}
				});
				
				
			})
			return this;
		},
		//回到顶部或去底部
		/*go:function(option){
			this.each(function(){
				//默认参数设置
				var args = {
					action:"slow",//动作  时间
					positions:"body",//数字或id
				};
				$.extend(args,option);
				var aa = $(args.positions).scrollTop();
				alert(aa+"ppp")
				$("html,body").animate({scrollTop:0}, slow);
			})
		}*/


/*···································华丽的分界线··················································*/
	});
	
/*···································华丽的分界线··················································*/					
	function Verification(val){//字符串转数组
		var newArray = [val];
		var Arrays = val instanceof Array;
		return (Arrays==true)?val:newArray;
	}
})