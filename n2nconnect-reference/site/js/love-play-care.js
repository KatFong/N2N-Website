$(document).ready(function(){
    
  $("#show-love").click(function(){
    $("#love-photo").delay(400).fadeIn();
    $("#love-text").delay(400).fadeIn();
    $("#play-photo").fadeOut();
    $("#play-text").fadeOut();
    $("#care-photo").fadeOut();
    $("#care-text").fadeOut();
    $("#show-love").addClass( "lpcactive" );
    $( "#show-play" ).removeClass( "lpcactive" );
    $( "#show-care" ).removeClass( "lpcactive" );
  });

  $("#show-play").click(function(){
    $("#play-photo").delay(400).fadeIn();
    $("#play-text").delay(400).fadeIn();
    $("#love-photo").fadeOut();
    $("#love-text").fadeOut();
    $("#care-photo").fadeOut();
    $("#care-text").fadeOut();
    $("#show-play").addClass( "lpcactive" );
    $( "#show-care" ).removeClass( "lpcactive" );
    $( "#show-love" ).removeClass( "lpcactive" );
  });
    
  $("#show-care").click(function(){
    $("#care-photo").delay(400).fadeIn();
    $("#care-text").delay(400).fadeIn();
    $("#love-photo").fadeOut();
    $("#love-text").fadeOut();
    $("#play-photo").fadeOut();
    $("#play-text").fadeOut();
    $("#show-care").addClass( "lpcactive" );
    $( "#show-play" ).removeClass( "lpcactive" );
    $( "#show-love" ).removeClass( "lpcactive" );
  });
    
});