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
/* Search Wrapper and Function from http://codepen.io/martinomag/full/LGjez/*/
$(document).ready(function(){
    $(".search-wrapper input").mouseenter(function(){
        $(".search-wrapper button").css("background-color", "#89bdd3");
    });

    $(".search-wrapper input").mouseout(function(){
        $(".search-wrapper button").css("background-color", "" );
    });
});
