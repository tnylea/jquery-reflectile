(function($){

  $.fn.reflectile = function(options) {

  	var config = {
        'width': '500px'
    };
    
    if (options){$.extend(config, options);}

  	return this.each(function(){

  		// Get the background position left, center, or right
  		bg_pos = $(this).css('background-position');
  		bg_pos = bg_pos.split(" ");
  		bg_horizontal_pos = parseInt(bg_pos[0]);


  		if($(this).find('.reflectile-container').length == 0){
  		
	  		$(this).append('<div class="reflectile-container">');
	  		$(this).find('.reflectile-container').css({
	  			position: 'absolute',
	  			top: '0px',
	  			left: '0px',
	  			height: $(this).css('height'),
	  			overflow: 'hidden'
	  		});

	  	}

	  	$(this).find('.reflectile-container').css('width', $(this).css('width'));
		$(this).children().css('z-index', '2');
	  	$(this).children().css('position', 'relative');


  		if(bg_horizontal_pos == 0){
  			
  			loop_tiles($(this), config, 'left');
  			$(window).bind("resize", loop_tiles($(this), config, 'left'));

  		} else if(bg_horizontal_pos == 50){

  			loop_tiles($(this), config, 'left');
  			fix_center($(this), config, 'left');

  		} else if(bg_horizontal_pos == 100){

  			loop_tiles($(this), config, 'right');
  			$(window).bind("resize", loop_tiles($(this), config, 'right'));

  		}

  		$('.reflectile').css('z-index', '1');
  		$(this).append('</div>');

    });

	function fix_center(object, config){
		num_images = parseInt($(window).innerWidth() / parseInt(config.width));
		if(num_images % 2){
			container_left = ($(window).innerWidth() % (parseInt(config.width)) ) / 2; 
		} else {
			container_left = (($(window).innerWidth() % (parseInt(config.width)) ) / 2 ) + 400; 
		}
		object.find('.reflectile-container').css('left', container_left + 'px' );
		object.find('.reflectile-container').css('width', parseInt(object.css('width')) - container_left + 'px' );
	}

    function loop_tiles(object, config, bg_position){

		pos = -(parseInt(config.width) * 2);

		for (var image=1; image < object.width()/parseInt(config.width); image++){

			pos += (parseInt(config.width) * 2);

			if(object.find('.reflectile-' + image).length == 0){

	  			object.find('.reflectile-container').append('<span class="reflectile reflectile-' + image + '"></span>');
	  			
	  			object.find('.reflectile-' + image).css({
	  				position: 'absolute',
	  				width: config.width,
	  				height: object.css('height'),
	  				'background-image': object.css('background-image'),
	  				top: '0px'
	  			});

	  			object.find('.reflectile-' + image).css(bg_position, pos + 'px');
	  			
	  			flipImage(object.find('.reflectile-' + image));
	  		}
		}

	}

	function flipImage(object){
		$(object).css('-moz-transform', 'scaleX(-1)');
	    $(object).css('-o-transform', 'scaleX(-1)');
	    $(object).css('-webkit-transform', 'scaleX(-1)');
	    $(object).css('transform', 'scaleX(-1)');
	    $(object).css('filter', 'FlipH');
	    $(object).css('-ms-filter', 'FlipH');
	}

  };

})(jQuery);

