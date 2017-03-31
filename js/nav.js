/* Navigation functions */
function navButton() {
    var x = document.getElementById("my-topnav");
    if (x.className === "nav") {
        x.className += " responsive";
    } else {
        x.className = "nav";
    }
}

function getParameterByName(name) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
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

    var username = getParameterByName("loggedInUsername");

    $("#user_profile").click(function() {
        window.location.replace("UserProfile.html?loggedInUsername=" + username+ "&username=" + username);
    });

    $("#create_project").click(function() {
        window.location.replace("projectCreate.html?loggedInUsername=" + username);
    });

    $("#logo").click(function() {
        window.location.replace("dashboard.html?loggedInUsername=" + username);
    });
});
