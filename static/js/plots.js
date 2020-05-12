  
$('#county').on('change',function(){
    county = document.getElementById('county').value
    window.location = `${window.location.origin}/county?selected=${county}`
});

$(document).ready(function() {
    // Construct URL object using current browser URL
    var url = new URL(document.location);
  
    // Get query parameters object
    var params = url.searchParams;
  
    // Get value of paper
    var selected = params.get("selected");
    
    if(!selected){
        //Set default for index page
        selected = "DENVER COUNTY"
    }

    // Set it as the dropdown value
    $("#county").val(selected);
  });