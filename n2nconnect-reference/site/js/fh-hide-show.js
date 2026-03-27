$(document).ready(function(){

  $("#showannual-chart").click(function(){
    $("#annualtab").fadeOut();
    $("#annualchart").delay(400).fadeIn();
    $('#showannual-chart-img').attr("src", "images/chart_icon_blue.png");
    $('#showannual-list-img').attr("src", "images/table_icon_grey.png");
  });
    
      $("#showannual-list").click(function(){
    $("#annualchart").fadeOut();
    $("#annualtab").delay(400).fadeIn();
    $('#showannual-chart-img').attr("src", "images/chart_icon_grey.png");
    $('#showannual-list-img').attr("src", "images/table_icon_blue.png");
  });
    
});