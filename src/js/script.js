$('.main-carousel').flickity({
  // options
  cellAlign: 'left',
  contain: true,
  groupCells: true,
});

$('form').submit(() => {
  let error;

  if (!$('input').val()) {
    error = true;
  }

  if (error) {
    alert('Please enter a valid email address!');
    return false;
  }

  alert('You have successfully been subscribed!');
  event.preventDefault();
  $('form').fadeOut(500);
});
