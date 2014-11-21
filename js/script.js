/* Author: 
	Brett Johnson (mostly)
*/



$(document).ready(function() {

	// FitVids
    $(".video").fitVids();


	// Bootstrap ScrollSpy
	$('body > #mainNav').scrollSpy();	

	
	// animate scrolling
	$.localScroll({duration:400});
	
	
	// set panels equal to window size
	setPanelSize();
	
    $(window).resize(function(){
    	setPanelSize();
    });
    


	 // function to set panels to window size and constrain video
	function setPanelSize(){
		var windowHeight = $(window).height();
		var windowWidth = $(window).width();
		var videoWidth;
		//calculate whether the video is too tall for the space
		if ( ((windowWidth-120)*.5625) > (windowHeight-160) ) {
			videoWidth = (windowHeight-160)*1.777;
		}
		//resize video and panel
	    $('.videocontent').css({'max-width':videoWidth+'px'});
	    $('.panel').css({'height':windowHeight+'px'});
	    //reset scrollspy
		$('body').scrollSpy('refresh');
	}
	
	
	

	// Enable the API on each Vimeo video - http://labs.funkhausdesign.com/examples/vimeo/froogaloop2-api-basics.html
    jQuery('iframe.vimeo').each(function(){
        Froogaloop(this).addEvent('ready', playerReady);
    });
    
    function playerReady(playerID){
		// Add event listener for Finish
		Froogaloop(playerID).addEvent('finish', function(){
			var currentId;
			currentId = playerID.substring(0, playerID.indexOf("-player"));
			// set element being show or hidden and toggle it's class
			$("#" + currentId).removeClass("playing"); 
			// toggle class on the nav - used to adjust placement when watching
			$("#nav-" + currentId).removeClass("nav-playing");
			// reset nav
			$("#main-nav").removeClass('watching'); 
			//scroll to perfectly position
			$.scrollTo( "#" + currentId, 400);
			// animate share buttons
			$("#" + currentId + " .share").addClass('animated');
		});
	}


    
	// hide/show video info - uses css to set state
	$(".toggle").click(function(){
		
		// set parent panel ID for use especially in the vimeo calls
		var currentId = $(this).parents(".panel").attr('id');
		
		// hide and pause open video if it exists
		if ($(".playing").length) {
			var oldId = $(".playing").attr('id');
			if (oldId != currentId) {
				Froogaloop(oldId + "-player").api('pause');
				$(".playing").toggleClass("playing");
				$(".nav-playing").toggleClass("nav-playing");
			}
		}
		
		// set element being show or hidden and toggle it's class
		var showHide = $("#" + currentId).toggleClass("playing"); 
		
		// toggle class on the nav - used to adjust placement when watching
		$("#nav-" + currentId).toggleClass("nav-playing");
		
		// play or pause video appropriately
		if (showHide.hasClass("playing")) {
			Froogaloop(currentId + "-player").api('play');
			$("#main-nav").addClass('watching'); // set nav
		} else {
			Froogaloop(currentId + "-player").api('pause');
			$("#main-nav").removeClass('watching'); // reset nav
		}
		
		//scroll to perfectly position
		$.scrollTo( "#" + currentId, 400);
		
		
		
		$("#" + currentId + " .share").removeClass('animated');

		return false;
	});
	
	
	// hide and pause video if new section is selected
	$(".next-arrow, #main-nav a").click(function(){
		if ($(".playing").length) {
			var oldId = $(".playing").attr('id');
			Froogaloop(oldId + "-player").api('pause');
			$(".playing").toggleClass("playing");
			// reset nav
			$(".nav-playing").toggleClass("nav-playing");
			$("#main-nav").removeClass('watching');
		}	
	});
	
});



