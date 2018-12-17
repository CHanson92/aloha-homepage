$('.main-carousel').flickity({
    // options
    cellAlign: 'left',
    contain: true,
    groupCells: true
  });

  function checkPosition() {
	  if (window.matchMedia('(max-width:600px)').matches) {
		$(window).scroll(function() {    // this will work when your window scrolled.
			var height = $(window).scrollTop();  //getting the scrolling height of window
			if(height  > 155) {
				$("header").css({"position": "fixed"});
			} else{
				$("header").css({"position": "relative"});
			}
		});
	  }
	  else {
	  }
  }
