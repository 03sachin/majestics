$(document).ready(function() {

  // Count animation
  $('.count').each(function () {
    $(this).prop('Counter',5).animate({
        Counter: $(this).data('count')
    }, {
        duration: 8000,
        easing: 'swing',
        step: function (now) {
            $(this).text(Math.ceil(now));
        }
    });
  });

});
