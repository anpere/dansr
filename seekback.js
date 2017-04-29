$(document).ready(function() {
  // Set all instances of .draggable-wrapper to be draggable in the body
  $('.draggable-wrapper').draggable({ containment: "body"});
  $('.handlebar').draggable({ containment: "body"});


    $("#indicator").css({right: 0});
    $("#indicator").draggable({ axis: "x", containment: "parent"});
    $("#indicator").on("drag", function(event, ui) {
      $("#indicator").stop();
      var width = $("#seekbar").width();
      var clickedPosX_centered = event.clientX - event.delegateTarget.offsetLeft - $('#indicator').width()*1.0;
      //Adjust to 0 if negative to avoid glitches:
      if(clickedPosX_centered < 0) {
        clickedPosX_centered = 0;
      }
      else if(clickedPosX_centered > width) {
        clickedPosX_centered = width;
      }
      
      $("#indicator").css({ left:  clickedPosX_centered });
      var fractionalPosition = clickedPosX_centered / width; //Math.abs(ui.position.left / width);
      loopVideoTo(fractionalPosition * 100.);
    });
    
  // prevents the movement of the indicator when dragging the handlebar
  $(".handlebar").mousedown(function(event) {
    event.stopPropagation();
  });
  
    var rect = document.getElementById("seekback").getBoundingClientRect();
    $(".handlebar").draggable({ axis: "x", containment: "parent"});

    // updates the grey rectangles on the sides of the handlebar
    // DISCUSS: inverting the greyed out section?
    $(".handlebar").on("drag", function(event, ui) {
      var width = $("#seekbar").width();
      var clickedPosX_centered = event.clientX - event.delegateTarget.offsetLeft - $(this).width()*1.0;
      //Adjust to 0 if negative to avoid glitches:
      if(clickedPosX_centered < 0) {
        clickedPosX_centered = 0;
      }
      else if(clickedPosX_centered > width) {
        clickedPosX_centered = width;
      }
      
      $(this).css({ left:  clickedPosX_centered });
      
      loopVideoTo( clickedPosX_centered/width * 100.);
      
      var fractionalPosition = ui.position.left / width;
      if ($(this).attr("id") == "sectionEnd") {
        var handle = document.getElementById("sectionEnd").getBoundingClientRect();
        secEnd = fractionalPosition;
        $("#grayRight").css({"left": ui.position.left+20, "width": rect.right-handle.left-10});
      } else {
        secStart = fractionalPosition;
        $("#grayLeft").css({"width": ui.position.left});
      }
      event.stopPropagation();
    });

    $("#seekbar").on("mousedown", function(event) {
      $("#indicator").stop();
      var seekbarWidth = $("#seekbar").width();
      var clickedPosX_centered = event.clientX - event.delegateTarget.offsetLeft - $('#indicator').width()*1.0;
      //Adjust to 0 if negative to avoid glitches:
      if(clickedPosX_centered < 0) {
        clickedPosX_centered = 0;
      }
      else if(clickedPosX_centered > seekbarWidth) {
        clickedPosX_centered = seekbarWidth;
      }
      
      $("#indicator").css({ left:  clickedPosX_centered });
      loopVideoTo( clickedPosX_centered/$("#seekbar").width() * 100.);
    });
  });