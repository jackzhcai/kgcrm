(function($) {
	$.fn.lazyload=function(options){
		var _this = this;
		var toparr = [];
		var winh = $(window).height();
		for(var i=0;i<_this.length;i++){
			var top = _this.eq(i).offset().top;
			toparr.push(top);
		}
		$(window).scroll(function(){
			var stop = $(window).scrollTop();
			for(var i = 0; i<toparr.length;i++){
				if(_this.eq(i).is(':visible')){
					if(toparr[i]==0){
						var t = _this.eq(i).offset().top;
						if(t>0){
							toparr[i] = t;
							if(toparr[i]<(winh+stop)){
								_this.eq(i).attr('src',_this.eq(i).attr('original')).hide().fadeIn();
								toparr[i] = -1;
							}
						}
					}else if(toparr[i]>0){
						if(toparr[i]<(winh+stop)){
							_this.eq(i).attr('src',_this.eq(i).attr('original')).hide().fadeIn();
							toparr[i] = -1;
						}
					}
				}
				
			}
		});
		$(window).trigger('scroll');
	}
})(jQuery);

$(document).ready(function(){
	function banner(){
		var box = $('#banner');
		var goleft = box.find('.goleft');
		var goright = box.find('.goright');
		var lis = box.find('li');
		var cil = box.find('.circle span')
		var maxl = box.find('li').length;
		var st = 0;
		var isdong = false;
		var inter;
		lis.not(lis.eq(0)).hide();
		box.on('mouseenter',function(){
			goleft.animate({'opacity':1},300);
			goright.animate({'opacity':1},300);
		}).on('mouseleave',function(){
			goleft.animate({'opacity':0.1},300);
			goright.animate({'opacity':0.1},300);
		})
		goleft.click(function(){
			if(isdong){
				return false;
			}
			isdong = true;
			st--;
			if(st<0){
				st = maxl-1;
			}
			lis.css('z-index',1);
			lis.eq(st).css('z-index',2).clearQueue().stop().fadeIn(500,function(){
				lis.not(lis.eq(st)).hide();
				isdong = false;
			});
			cil.eq(st).css('opacity',1).siblings().css('opacity',0.3);
		});
		goright.click(function(){
			if(isdong){
				return false;
			}
			isdong = true;
			st++;
			if(st>=maxl){
				st = 0;
			}
			lis.css('z-index',1);
			lis.eq(st).css('z-index',2).clearQueue().stop().fadeIn(500,function(){
				lis.not(lis.eq(st)).hide();
				isdong = false;
			});
			cil.eq(st).css('opacity',1).siblings().css('opacity',0.3);
		});

		setTimeout(function(){
			inter = setInterval(function(){
				goright.click();
			},10000);
		},100);
	}
	// banner();

	function bannerone(){
		var dom = $('#bannerone');
		var ul = dom.find('ul');
		var li = dom.find('li');
		var cov = dom.find('.text em');
		var til = dom.find('.title');
		var maxl = li.length;
		var inter;
		var st = -1;
		cov.each(function(i,n){
			$(this).data('width',572-til.eq(i).width()).css('width',572-til.eq(i).width());
		});
		li.each(function(i,n){
			$(this).on('mouseenter',function(){
				cov.eq(i).clearQueue().stop().animate({'width':0});
				li.eq(i).clearQueue().stop().animate({'opacity':1});
			}).on('mouseleave',function(){
				st = i;
				cov.eq(i).animate({'width':cov.eq(i).data('width')});
				li.eq(i).animate({'opacity':0.5});
			})
		});

		setTimeout(function(){
			next();
			inter = setInterval(function(){
				next();
			},5000);
		},100);
		ul.on('mouseenter',function(){
			cov.eq(st).animate({'width':cov.eq(st).data('width')});
			li.animate({'opacity':0.5});
			clearInterval(inter);
		}).on('mouseleave',function(){
			inter = setInterval(function(){
				next();
			},5000);
		})
		function next(){
			st++;
			if(st>=maxl){
				st = 0;
			}
			for(var i=0; i<maxl;i++){
				if(i==st){
					cov.eq(i).clearQueue().stop().animate({'width':0});
					li.eq(i).clearQueue().stop().animate({'opacity':1});
				}else{
					cov.eq(i).animate({'width':cov.eq(i).data('width')});
					li.eq(i).animate({'opacity':0.5});
				}
			}
		}
	}
	bannerone();

function bannertwo(){
		var dom = $('#bannertwo');
		var ul = dom.find('ul');
		var li = dom.find('li');
		var ci = dom.find('.circle span');
		var maxl = li.length;
		var inter;
		var st = -1;
		li.each(function(i,n){
			$(this).on('mouseenter',function(){
				ci.eq(i).clearQueue().stop().animate({'opacity':1},300);
				li.eq(i).clearQueue().stop().animate({'opacity':1},300);
			}).on('mouseleave',function(){
				st = i;
				ci.eq(i).animate({'opacity':0.5},300);
				li.eq(i).animate({'opacity':0.5},300);
			})
		});

		setTimeout(function(){
			next();
			inter = setInterval(function(){
				next();
			},5000);
		},100);
		ul.on('mouseenter',function(){
			li.animate({'opacity':0.4});
			clearInterval(inter);
		}).on('mouseleave',function(){
			inter = setInterval(function(){
				next();
			},5000);
		})
		function next(){
			st++;
			if(st>=maxl){
				st = 0;
			}
			for(var i=0; i<maxl;i++){
				if(i==st){
					li.eq(i).clearQueue().stop().animate({'opacity':1});
					ci.eq(i).clearQueue().stop().animate({'opacity':1});
				}else{
					li.eq(i).animate({'opacity':0.4});
					ci.eq(i).animate({'opacity':0.4});
				}
			}
		}
	}
	bannertwo();















































	$('body').on('click','*[data-selectshow]',function(){
		$($(this).data('selecttar')).addClass('hide');
		$(this).addClass('active').siblings().removeClass('active');
		$($(this).data('selectshow')).removeClass('hide');
	})

	$(window).scroll(function(){
		var top = $(window).scrollTop();
		if(top>100){
			$('.headline').animate({'height':51},300)
		}else if(top<100){
			$('.headline').clearQueue().stop().animate({'height':81},300)
		}
	})

});

var funshow = function(element){
	var dom = element.ele;
	var _this = this;
	_this.trager = dom.find('.featurebtn a');
	_this.lis = dom.find('.ls');
	_this.trager.click(function(){
		// $(this).clearQueue().stop().animate({'opacity':1}).siblings().animate({'opacity':0.4});
		// var i = _this.trager.index($(this));
		// _this.lis.css('z-index',1).fadeOut(400);
		// _this.lis.eq(i).css('z-index',2).clearQueue().stop().fadeIn(500);

	});

}

var picslide = function(element){
	var dom = element.ele;
	var _this = this;
	_this.delay = element.delay;
	_this.range = element.range;
	_this.maxl = dom.find('img').length;
	if(_this.maxl==1){return false;}
	_this.cont = dom.find('ul');
	_this.trager = dom.find('.circle span');
	_this.goleft = dom.find('.goleft');
	_this.goright = dom.find('.goright');
	dom.on('mouseenter',function(){
		_this.goleft.fadeIn();
		_this.goright.fadeIn();
	});
	dom.on('mouseleave',function(){
		_this.goleft.clearQueue().stop().fadeOut();
		_this.goright.clearQueue().stop().fadeOut();
	});
	var st = 0;
	_this.goleft.click(function(){
		st--;
		if(st<=0){st=0}
		_this.trager.eq(st).clearQueue().stop().animate({'opacity':1}).siblings().animate({'opacity':0.3});
		_this.cont.clearQueue().stop().animate({'left':-_this.range*st});
	});
	_this.goright.click(function(){
		st++;
		if(st>=_this.maxl){
			st = _this.maxl-1;
		}
		_this.trager.eq(st).clearQueue().stop().animate({'opacity':1}).siblings().animate({'opacity':0.3});
		_this.cont.clearQueue().stop().animate({'left':-_this.range*st});
	});
	_this.trager.click(function(){
		$(this).clearQueue().stop().animate({'opacity':1}).siblings().animate({'opacity':0.3});
		st = _this.trager.index($(this));
		_this.cont.clearQueue().stop().animate({'left':-_this.range*st});
	})
}


var goscroll = function(element){
	var dom = element.element;
	var _this = this;
	_this.trager = dom.find('.featurebtn a');
	_this.maxh = dom.height()+dom.offset().top-dom.find('.featurebtn').height();
	_this.ls = dom.find('.ls');
	_this.tg = dom.find('.featurebtn');
	var arr = [];
	for(var i=0; i<_this.ls.length;i++){
		arr.push(_this.ls.eq(i).offset().top)
	}
	_this.trager.click(function(){
		var i =_this.trager.index($(this));
		$(window).scrollTop(arr[i]-50)
	});
	$(window).scroll(function(){
		var stop = $(window).scrollTop();
		var i = index(stop);
		_this.trager.eq(i).addClass('active').siblings().removeClass('active');
		if(_this.maxh-stop<80){
			_this.tg.css('top',_this.maxh-stop);
		}else{
			_this.tg.removeAttr('style');
		}
		if(stop<794){
			_this.tg.removeClass('fixed').removeAttr('style');
		}else{
			_this.tg.addClass('fixed');
		}
	});
	function index(top){
		var num = 0;
		for(var i=0;i<arr.length;i++){
			if(top>arr[i]-60){
				num = i;
			}
		}
		return num;
	}
}
