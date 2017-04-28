$(function () {
  $('#mkFrame').hide();
  //easter eggs	
  cheet('↑ ↑ ↓ ↓ ← → ← → b a', function () {
    $('#egg').show();
    $('#egg').append("<h1 class='egg_h1'><br>" + "Hi there!" + "</h1>");
    $('#egg').append("<p class='egg_p'>" + "Hit escape to exit" + "</p>");
  });

  cheet('↓ ↑ ← ← a → ↓', function () {
    $('#egg2').show();
    $('#egg2').append("<button id='MK'>" + "A <br />NEW CHALLENGER <br />APPROACHES!<br />Click Here!</button>");

    var frame = "<iframe id='#mkFrame' src='http://twisteddevelopments.co.uk/testing_grounds/MK/index.html' style='width: 80vw; height: 100vh; margin-top: 10px;'> </iframe>"

    $("#MK").click(function () {
      $('#MK').replaceWith($(frame));
    });
  });

  cheet('esc', function () {
    $('#egg').hide();
    $('#egg2').hide();
    console.log("LEEEEROY");
  });
});