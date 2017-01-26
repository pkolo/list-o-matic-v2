$(document).ready(function() {

  $('#album_search').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      url: '/discog_search',
      method: 'post',
      data: $(this).serialize()
    })
    .done(function(r) {
      console.log(r)
    })
  })

})
