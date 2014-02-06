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
  			
  			loop_tiles($(this), config, 0);
  			$(window).bind("resize", loop_tiles($(this), config, 0));

  		} else if(bg_horizontal_pos == 50){

  			// start_position = ($(window).innerWidth()/2);
  			// loop_tiles($(this), config, start_position);
  			loop_tiles($(this), config, 0);
  			fix_center($(this), config);

  			//$(window).bind("resize", loop_tiles($(this), config, 0));
  			//$(window).bind("resize", fix_center(config));
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
	}

    function loop_tiles(object, config, start_position){

		left_pos = -(parseInt(config.width) * 2) + start_position;

		for (var image=1; image < object.width()/parseInt(config.width); image++){

			left_pos += (parseInt(config.width) * 2);

			if(object.find('.reflectile-' + image).length == 0){

	  			object.find('.reflectile-container').append('<span class="reflectile reflectile-' + image + '"></span>');
	  			
	  			object.find('.reflectile-' + image).css({
	  				position: 'absolute',
	  				left:  left_pos + 'px',
	  				width: config.width,
	  				height: object.css('height'),
	  				'background-image': object.css('background-image'),
	  				top: '0px'
	  			});
	  			
	  			flipImage(object.find('.reflectile-' + image));
	  		}
		}

	}

	function loop_center_tile(object, config){
		left_pos = ( ($(object).width() % (parseInt(config.width)/2)) + parseInt(config.width) ) / 2;
		//console.log(left_pos);
		//new_left = 230; //left_pos / 2;
		
		left_pos = -600 + left_pos;



		for (var image=1; image < object.width()/parseInt(config.width); image++){

			left_pos += (parseInt(config.width) * 2);

			if(object.find('.reflectile-' + image).length == 0){

	  			object.find('.reflectile-container').append('<span class="reflectile reflectile-' + image + '"></span>');
	  			
	  			object.find('.reflectile-' + image).css({
	  				position: 'absolute',
	  				left:  left_pos + 'px',
	  				width: config.width,
	  				height: object.css('height'),
	  				'background-image': object.css('background-image'),
	  				top: '0px'
	  			});
	  			
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

