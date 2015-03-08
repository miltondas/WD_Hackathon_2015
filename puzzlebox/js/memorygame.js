$(document).ready(function()
{
	var canAnimate = false;
	
	var path = 'images/memorygame/cards/';
	var card_settings = [
		{ id : '1', graphic : 'card-1.jpg'},
		{ id : '1', graphic : 'card-1.jpg'},
		{ id : '2', graphic : 'card-2.jpg'},
		{ id : '2', graphic : 'card-2.jpg'},
		{ id : '3', graphic : 'card-3.jpg'},
		{ id : '3', graphic : 'card-3.jpg'},
		{ id : '4', graphic : 'card-4.jpg'},
		{ id : '4', graphic : 'card-4.jpg'},
		{ id : '5', graphic : 'card-5.jpg'},
		{ id : '5', graphic : 'card-5.jpg'},
		{ id : '6', graphic : 'card-6.jpg'},
		{ id : '6', graphic : 'card-6.jpg'},
		{ id : '7', graphic : 'card-7.jpg'},
		{ id : '7', graphic : 'card-7.jpg'},
		{ id : '8', graphic : 'card-8.jpg'},
		{ id : '8', graphic : 'card-8.jpg'}			
	];
	
	var current_cards = [];
	var can_flip_cards = true;
	var num_cards_turned = 0;
	var start_time = 0;
	var timer_interval = 0;
	
	function update_timer()
	{
		var current_time = new Date().getTime() - start_time;
		var val = Math.round((current_time/1000)*10)/10;

		// If integer, add a decimal zero since it is missing...
		if (val == parseInt(val))
			val += ".0";
			
		$('div .time').html(val);
	}
	
	function on_animation_end(fn)
	{
		var self = this;
		// Wait for the animation to finish
		self.addEventListener( 'webkitTransitionEnd', function( event )
		{
			self.removeEventListener( 'webkitTransitionEnd', arguments.callee, false);
			fn.call(self);
		}, false );
	}
	
	// Shuffle array
	card_settings.sort(function() {return 0.5 - Math.random()});
	
	// Initialize cards with id and graphic
	$(".card").each(function(i)
	{
		$(this).data('card-id', card_settings[i].id);
		$(this).find(".front").css('background', 'url(' + path + card_settings[i].graphic + ')');
	
		if (canAnimate)
			$(this).addClass("shadow_hack");
	});
	
	$(".card").hover(function()
	{
		if (!$(this).hasClass('selected'))
			$(this).addClass('customhover');
	}, function ()
	{
		if (!$(this).data('animating') && !$(this).hasClass('selected'))
			$(this).removeClass('customhover')
	});
	
	
	$(".card").click(function()
	{
		if(start_time == 0)
		{
			start_time = new Date().getTime();
			timer_interval = window.setInterval(update_timer, 50);
		}

		var self = this;
		
		if (can_flip_cards)
		{
			// Already visible?
			if ($(self).hasClass('selected'))
				return;

			if(current_cards.length < 2)
			{
				if(canAnimate)
				{
					$(this).data('animating', true);
					on_animation_end.call(this, function()
					{
						$(this).data('animating', false);
					});
				}
				
				$(self).removeClass('customhover').addClass('selected');
				current_cards.push($(this));

				$('div .num-turns').html(++num_cards_turned);
			}
			
					
			if(current_cards.length == 2)
			{
				can_flip_cards = false;
				
				var is_pair = (current_cards[0].data('card-id') == current_cards[1].data('card-id'));
				
				// Game over
				if ($('.card.selected').size() == $(".card").size() && is_pair)
				{
					window.clearInterval(timer_interval);
					update_timer();
					$('#welldone').append("<b style='color: green;'>Well Done! Puzzle completed!</b>");
				}
				
				if(canAnimate)
				{
					on_animation_end.call(this, function()
					{
						if (!is_pair)
						{
							window.setTimeout(function()
							{
								current_cards[0].removeClass('selected');
								current_cards[1].removeClass('selected');
								current_cards = [];
								can_flip_cards = true;
							}, 500);
						}
						else
						{
							current_cards = [];
							can_flip_cards = true;
						}
		
						
					});
				}
				else
				{
					if (!is_pair)
					{
						window.setTimeout(function()
						{
							current_cards[0].removeClass('selected');
							current_cards[1].removeClass('selected');
							current_cards = [];
							can_flip_cards = true;
							
						}, 750);
					}
					else
					{
						current_cards = [];
						can_flip_cards = true;
					}
				}
			}
		}
	});
});