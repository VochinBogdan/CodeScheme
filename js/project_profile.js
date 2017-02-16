/*$(document).ready(function() {
    // run test on initial page load
    checkSize();

    // run test on resize of the window
    $(window).resize(checkSize);
});

//Function to the css rule
function checkSize(){
    if ($(".checkSize").css("float") == "none" ){
        expandTab(tabName);
    }
	else if ($(".checkSize").css("float") == "left" ){
        openTab(tabName);
    }
}*/

var mql = window.matchMedia("screen and (min-width: 480px)")
if (mql.matches){ // if media query matches
	function expandTab(tabName) {
		var i;
		var idName = tabName + "_big";
		var x = document.getElementsByClassName("tab");
		for (i = 0; i < x.length; i++) {
		   x[i].style.display = "none";  
		}
		document.getElementById(idName).style.display = "block";  
	}
}
else{
	function expandTab(tabName) {
		var i;
		var x = document.getElementsByClassName("expand_tab");
		for (i = 0; i < x.length; i++) {
		   x[i].style.display = "none";  
		}
		document.getElementById(tabName).style.display = "block";  
	}
}
/*
if($(window).width() <= 480){
	function expandTab(tabName) {
		var i;
		var x = document.getElementsByClassName("expand_tab");
		for (i = 0; i < x.length; i++) {
		   x[i].style.display = "none";  
		}
		document.getElementById(tabName).style.display = "block";  
	}
}
else{
	function expandTab(tabName) {
		var i;
		var idName = tabName + "_big";
		var x = document.getElementsByClassName("tab");
		for (i = 0; i < x.length; i++) {
		   x[i].style.display = "none";  
		}
		document.getElementById(idName).style.display = "block";  
	}
}
*/