/* Navigation functions */
function navButton() {
    var x = document.getElementById("my-topnav");
    if (x.className === "nav") {
        x.className += " responsive";
    } else {
        x.className = "nav";
    }
}

/* Search Bar */
$(document).ready(function(){
     $(".search-wrapper input").mouseenter(function(){
         $(".search-wrapper button").css("background-color", "#4aba10");
       
         
     });
   $(".search-wrapper input").mouseout(function(){
         $(".search-wrapper button").css("background-color", "" );
      });
});
