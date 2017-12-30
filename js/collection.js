$(function(){
	var speed = 30;	
    $('#loopslider').each(function(){
        var loopsliderWidth = $(this).width();
        var loopsliderHeight = $(this).height();
        $(this).children('ul').wrapAll('<div id="loopslider_wrap"></div>');
 
        var listWidth = $('#loopslider_wrap').children('ul').children('li').width();
        var listCount = $('#loopslider_wrap').children('ul').children('li').length;
 
        var loopWidth = (listWidth)*(listCount);
        var ls = loopWidth/speed;
 
        $('#loopslider_wrap').css({
            top: '0',
            left: '0',
            width: ((loopWidth) * 2),
            height: (loopsliderHeight),
            overflow: 'hidden',
            position: 'absolute'
        });
 
        $('#loopslider_wrap ul').css({
            width: (loopWidth)
        });
        TweenMax.to('#loopslider_wrap' , ls , {
         	left : '-' + (loopWidth) + 'px' ,
         	ease : Power0.easeNone ,
         	repeat: -1
		});
 
        $('#loopslider_wrap ul').clone().appendTo('#loopslider_wrap');
    });
    
    $(".cboxElement").colorbox({
		inline:true,
		arrowKey:false
});
	$(window).resize(function(){
		$.colorbox.resize();
	});
});

$('.gallery').each(function(){
	$(this).off().on('click',function(event){
		event = event || window.event;
	    var target = event.target || event.srcElement;
	    var link = target.src ? target.parentNode : target;
	    var options = {
	    	index: link,
			event: event,
			toggleControlsOnSlideClick:false,
			closeOnSlideClick:false,
			continuous: false,
			thumbnailIndicators: false
		};
	    var links = $(this).find('a');
	    blueimp.Gallery(links, options);
	});
});

$('.movie').each(function(){
	$(this).off().on('click',function(event){
		var id = $(this).find('a').attr('data-id');
		event = event || window.event;
	    var target = event.target || event.srcElement;
	    var link = target.src ? target.parentNode : target;
	    var options = {
	    	index: link,
			event: event,
			toggleControlsOnSlideClick:false,
			emulateTouchEvents: false,
			closeOnSlideClick:false,
			continuous: false,
			thumbnailIndicators: false,
			onopened: function () {
				var html = '';
				html += '<iframe id="vimeoplayer" src="https://player.vimeo.com/video/';
				html += id;
				html += '?title=0&byline=0&portrait=0&api=1&autoplay=1&player_id=vimeoplayer" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
            	$('#blueimp-gallery .slide').html(html);
            	$('#wrap2').css({'display':'none'});

        	},
        	onclosed: function () {
        		$('#wrap2').css({'display':'block'});
        	}
		};
	    var links = $(this).find('a');
	    blueimp.Gallery(links, options);

	});
});
	
