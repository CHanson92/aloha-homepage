$(document).ready(function(){
$('.main-carousel').flickity({
    // options
    cellAlign: 'left',
    contain: true
  });

  $('#updates').on('submit', 'form', function(event) {
    event.preventDefault();
    let emailInput = $('#subscribe-email');
    if(emailInput.val().length!==0) {
        alert('You have been subscribed!');
    } else {
        alert('Please enter more information to be subscribed!');
    }
});

});

