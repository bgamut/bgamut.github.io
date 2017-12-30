
jQuery(document).ready(function($) {

  var delayTime = 6000;
  var animTime = 1200;
  var pageIndex = 0;
  var timerId = undefined;
  var isScrolling = false;
  var currentSection = 0;
  var totalSections = 8;
  var offsetY = 100;

  $(document).on('click', '#return-top', function(){
    var speed = 1000;
	var href= $(this).attr("href");
	var target = $(href == "#" || href == "" ? 'html' : href);
	var position = target.offset().top;
	$("html, body").animate({scrollTop:position}, speed, "swing");
	return false;
  });

  $(document).on('click', '.country-link', function(){
    var speed = 1000;
	var href= $(this).attr("href");
	var target = $(href == "#" || href == "" ? 'html' : href);
	var position = target.offset().top;
	$("html, body").animate({scrollTop:position}, speed, "swing");
	return false;
  });

  $(document).on('click', '#mobile-menu-open', function(){
    $('.header-container2 nav').slideToggle();
    return false;
  });

  $(document).on('click', '.mobile .header-container2 .collection-title', function(){
    $('.header-container2 .type-container').removeClass('open');
    $('.header-container2 .collection-title').removeClass('active');
    $(this).next().toggleClass('open').end().addClass('active');
  });

  $(document).on('mouseover', '.pc .collection', function(){
    $(this).find('.type-container').addClass('open');
  }).on('mouseout', '.pc .collection', function(){
    $(this).find('.type-container').removeClass('open');
  });

  function init(){
  	resize();	
    $(".main-contents").prepend( $(".main-contents").find('section:last') );
    //timerId = setTimeout( loop, delayTime );
    $('.nav-arrow a').on('click', function(){
      if (isScrolling) return false;
      changeImage( 'moveUp' );
      return false;
    });

    setTimeout( function(){
      // $('.nav-arrow').slideDown(400);
      $('.nav-arrow').animate({'margin-bottom': 30, 'opacity': 1},  1000, 'easeOutQuart' );
    }, 1500 );
  }

  function resize(){
    var ww = $(window).width();
    var wh = $(window).height();
    offsetY = wh * 0.05;
    
    $('section').width( ww ).height( wh - offsetY );
    $('.main-contents').css('marginTop', -wh + offsetY);
    
    var wrapClassName = '';
    if( $(window).width() <= 640 ){
      wrapClassName = 'mobile';
      if( $('#gnav-bar').is(':visible') ){
        $('#gnav-bar').hide();
      }
    }
    else{
      wrapClassName = 'pc';
      if( $('#gnav-bar').is(':hidden') ){
        $('#gnav-bar').show();
      }
    }
    
    $('#wrap').attr('class', wrapClassName );
  }
  $(window).bind('resize', resize);

  var scroller = (function(){
    var $content = $(".main-contents");
    var pageIndex = 0;
    var easing = 'cubic-bezier(0.770, 0.000, 0.175, 1.000)';
    
    if (!$.support.transition){
      $.fn.transition = $.fn.animate;
      easing = 'easeInOutQuart';
    }
    
    var self = {
      getPageIndex : getPageIndex,
      moveUp : moveUp,
      moveDown : moveDown
    }
    
    function changeImage( direction, callback ){
      var toy = $(window).height() - offsetY;
      
      switch( direction ){
        case 'moveUp' : 
          toy *= -1;
          pageIndex++;
          break;
        case 'moveDown' : 
          pageIndex--;
          break;
        default : break;
      }
      
      $content.transition({ y: toy }, animTime, easing, function(){
        if( direction == 'moveUp' ){
          $content.append( $content.find('section').eq(0) );
        }
        else{
          $content.prepend( $content.find('section:last') );
        }
        $content.transition({ y: 0 }, 0 );
        if( typeof callback == "function" ){
          callback();
        }
      });
    }
    
    function moveUp( callback ){
        // changeImage( arguments.callee.name, callback );
        changeImage( 'moveUp', callback );
    }
    
    function moveDown( callback ){
        changeImage( 'moveDown', callback );
    }
    
    function getPageIndex(){
      return pageIndex
    }
    
    return self;
  })();

  function changeImage( type ){
    if( timerId != undefined ){
      clearTimeout( timerId );
      timerId = undefined;
    }
    isScrolling = true;
    scroller[type]( function(){
      isScrolling = false;
      //timerId = setTimeout( loop, delayTime );
    });
  }

  function loop(){
    if( scroller.getPageIndex() >= 4 ){
      return false;
    }
    changeImage( 'moveUp' );
  }

  $('.main-contents').on('mousewheel', function(event) {
    event.preventDefault();
    var ancienneSection;
    var type = undefined;
    if (isScrolling) return;
    if ( Math.abs(event.deltaY) < 5 ) return;
    if (event.deltaY > 0){
        type = 'moveDown';
    };
    if (event.deltaY < 0){
        type = 'moveUp'; 
    };
    changeImage( type );
  });

  $("#main section").swipe( {
    //Generic swipe handler for all directions
    swipe:function(event, direction, distance, duration, fingerCount) {
      // console.log( "You swiped " + direction + " " + ++count + " times "  );
      if (isScrolling) return;
      switch( direction ){
        case "up"   : type = 'moveUp'; break;
        case "down" : type = 'moveDown'; break;
        default : return false;
      }
      changeImage( type );
    },
    threshold:0
  });

  init();
});