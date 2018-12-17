$('.main-carousel').flickity({
    // options
    cellAlign: 'left',
    contain: true,
    groupCells: true
  });

  $(window).scroll(function() {    // this will work when your window scrolled.
		var height = $(window).scrollTop();  //getting the scrolling height of window
		if(height  > 155) {
			$("header").css({"position": "fixed"});
		} else{
			$("header").css({"position": "relative"});
		}
	});