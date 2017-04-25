$( "#codeSearch" ).autocomplete({
  source: availableCodes
});

$('#codeSearch').keypress(function(e) {
  //TODO: Prevent multiple entries from being added
  if(e.which == 13) { // keycode of return is 13
    //Add entered code to auto-complete list:
    availableCodes.push($('#codeSearch').val());
    
    $( "#codeSearch" ).val(""); //clear text field
    $( "#codeSearch" ).autocomplete({ source: availableCodes });
  }
});
